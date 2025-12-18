import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import SocialLogin from '../SocialLogin/SocialLogin';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleRegistration = async (data) => {
    setIsLoading(true);
    setRegisterError('');
    setRegisterSuccess(false);

    try {
      
      const result = await registerUser(data.email, data.password);

      
      const formData = new FormData();
      formData.append('image', data.image[0]);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      const imgRes = await axios.post(imageAPI, formData);
      const photoURL = imgRes.data.data.url;

      
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      
      await axiosSecure.post('/users', {
        name: data.name,
        email: data.email,
        photoURL,
      });

      setRegisterSuccess(true);

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1200);
    } catch (error) {
      console.error(error);
      setRegisterError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
         
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join us and start your journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Error */}
            {registerError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 text-sm">{registerError}</p>
              </div>
            )}

            {/* Success */}
            {registerSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700 text-sm">
                  Account created successfully! Redirecting...
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    {...register('name', { required: 'Name is required' })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1 flex gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Profile Image</label>
                <div className="relative">
                  <Image className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="file"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl"
                    {...register('image', { required: 'Image is required' })}
                  />
                </div>
                {errors.image && (
                  <p className="text-red-600 text-sm mt-1 flex gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.image.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1 flex gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Strong password"
                    className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Minimum 6 characters',
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                        message:
                          'Must include uppercase, lowercase, number & symbol',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1 flex gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                disabled={isLoading || registerSuccess}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 text-center text-sm text-gray-500">
              Or continue with
            </div>

            <SocialLogin />
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t">
            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                state={location.state}
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
