import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (data) => {
    setIsLoading(true);
    setLoginError('');
    setLoginSuccess(false);

    try {
      await signInUser(data.email, data.password);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error(error);
      let errorMessage = 'Login failed. Please try again.';
      if (error.code === 'auth/user-not-found') errorMessage = 'No account found with this email.';
      else if (error.code === 'auth/wrong-password') errorMessage = 'Incorrect password.';
      else if (error.code === 'auth/invalid-email') errorMessage = 'Invalid email address.';
      else if (error.code === 'auth/too-many-requests') errorMessage = 'Too many attempts. Try later.';
      
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Logo/Header Area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-content shadow-lg mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-base-content tracking-tight">
            Welcome <span className="text-primary">Back</span>
          </h1>
          <p className="text-base-content/60 mt-2 font-medium">
            Great to see you again! Please enter your details.
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden rounded-[2.5rem]">
          <div className="card-body p-8 md:p-12">
            
            {/* Status Messages */}
            {loginError && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="alert alert-error shadow-sm mb-6 rounded-2xl py-3">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-bold">{loginError}</span>
              </motion.div>
            )}

            {loginSuccess && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="alert alert-success shadow-sm mb-6 rounded-2xl py-3">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-bold text-white">Successfully logged in!</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold opacity-70 uppercase tracking-widest text-xs">Email Address</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary transition-colors">
                    <Mail className="h-5 w-5 opacity-50" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className={`input input-bordered w-full pl-12 rounded-xl bg-base-200 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium ${errors.email ? 'input-error bg-error/5' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                    })}
                  />
                </div>
                {errors.email && <p className="text-error text-xs mt-1 font-bold flex items-center gap-1"><AlertCircle size={12}/> {errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className="form-control">
                <div className="flex justify-between items-center pr-1">
                  <label className="label">
                    <span className="label-text font-bold opacity-70 uppercase tracking-widest text-xs">Password</span>
                  </label>
                  <Link to="/forgot-password" size="sm" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary transition-colors">
                    <Lock className="h-5 w-5 opacity-50" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`input input-bordered w-full pl-12 pr-12 rounded-xl bg-base-200 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium ${errors.password ? 'input-error bg-error/5' : ''}`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Min 6 characters' },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-xs mt-1 font-bold flex items-center gap-1"><AlertCircle size={12}/> {errors.password.message}</p>}
              </div>

              {/* Remember Me */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-md" />
                  <span className="label-text font-medium opacity-70">Keep me logged in</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || loginSuccess}
                className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 disabled:bg-base-300"
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>Sign In <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </button>
            </form>

            <div className="divider my-8 text-xs font-bold opacity-30 uppercase tracking-[0.2em]">Or Secure Login With</div>

            {/* Social Login */}
            <SocialLogin />
          </div>

          {/* Footer Link */}
          <div className="bg-base-200/50 py-6 px-8 text-center border-t border-base-300">
            <p className="text-sm font-medium text-base-content/60">
              New to our platform?{' '}
              <Link
                to="/register"
                state={location.state}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-base-content/40">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
           <span className="text-xs font-bold uppercase tracking-widest">Secure 256-bit SSL Encryption</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;