import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import SocialLogin from '../SocialLogin/SocialLogin';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  UploadCloud
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
      setRegisterError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary text-primary-content shadow-2xl shadow-primary/20 mb-4 rotate-3">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-base-content tracking-tight">
            Create <span className="text-primary">Account</span>
          </h1>
          <p className="text-base-content/60 mt-2 font-medium">Join our community and start your journey</p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden rounded-[2.5rem]">
          <div className="card-body p-8 md:p-10">
            
            {/* Status Feedback */}
            {registerError && (
              <div className="alert alert-error shadow-sm mb-6 rounded-2xl py-3 animate-pulse">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-bold">{registerError}</span>
              </div>
            )}

            {registerSuccess && (
              <div className="alert alert-success shadow-sm mb-6 rounded-2xl py-3">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-bold text-white">Redirecting to your dashboard...</span>
              </div>
            )}

            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
              
              {/* Name Input */}
              <div className="form-control">
                <label className="label-text font-bold opacity-70 uppercase tracking-widest text-[10px] mb-2 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 text-base-content/40 group-focus-within:text-primary transition-colors w-5 h-5" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-base-300 focus:border-primary transition-all outline-none font-medium"
                    {...register('name', { required: 'Name is required' })}
                  />
                </div>
              </div>

              {/* Profile Image Input */}
              <div className="form-control">
                <label className="label-text font-bold opacity-70 uppercase tracking-widest text-[10px] mb-2 ml-1">Profile Picture</label>
                <div className="relative group">
                   <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-base-300 rounded-2xl cursor-pointer bg-base-200 hover:bg-base-300 hover:border-primary/50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-2 pb-2">
                            <UploadCloud className="w-6 h-6 mb-1 text-base-content/40 group-hover:text-primary" />
                            <p className="text-xs text-base-content/40 font-medium">Click to upload photo</p>
                        </div>
                        <input type="file" className="hidden" {...register('image', { required: 'Image is required' })} />
                    </label>
                  </div>
                </div>
                {errors.image && <p className="text-error text-[10px] font-bold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.image.message}</p>}
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label-text font-bold opacity-70 uppercase tracking-widest text-[10px] mb-2 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-base-content/40 group-focus-within:text-primary transition-colors w-5 h-5" />
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-base-300 focus:border-primary transition-all outline-none font-medium"
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label-text font-bold opacity-70 uppercase tracking-widest text-[10px] mb-2 ml-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 text-base-content/40 group-focus-within:text-primary transition-colors w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-12 pr-12 rounded-2xl bg-base-200 border-base-300 focus:border-primary transition-all outline-none font-medium"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                        message: 'Need: Upper, Lower, Number & Symbol',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-base-content/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-[10px] font-bold mt-1 ml-1 flex items-center gap-1 leading-tight"><AlertCircle size={10}/> {errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                disabled={isLoading || registerSuccess}
                className="btn btn-primary w-full rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>Create Account <ArrowRight className="ml-2 w-5 h-5" /></>
                )}
              </button>
            </form>

            <div className="divider my-6 text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">Or Join With</div>

            <SocialLogin />
          </div>

          {/* Footer Link */}
          <div className="bg-base-200/50 py-6 px-8 text-center border-t border-base-300">
            <p className="text-sm font-medium text-base-content/60">
              Already have an account?{' '}
              <Link
                to="/login"
                state={location.state}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;