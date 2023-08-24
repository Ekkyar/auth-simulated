"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:8001/login', {
        email: values.email,
        password: values.password,
      });
  
      const token = response.data.token;
      if (token) {
        // set token for session
        localStorage.setItem('token', token);

        // Redirect to dashboard after successful login
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        console.error('Login failed. Please try again');
      }
    } catch (error) {
      console.error('Invalid email or password. Please try again.', error);
      toast.error('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded-md bg-slate-300/70"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border rounded-md bg-slate-300/70"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
              </div>
              <button type="submit" disabled={!isValid} className={`w-full text-white py-2 rounded-md mb-2 ${!isValid ? 'bg-blue-500/50 cursor-not-allowed' : 'bg-blue-500'}`}>Login</button>
              <div className="flex justify-center mb-4">
                <p className="text-gray-500 text-xs">{`Don't have an account? `}<Link href="/register" className="text-blue-500 hover:underline">Register here</Link></p>
              </div>
              <div className="flex justify-center">
                <button type="button" onClick={() => router.back()} className="text-gray-400 text-xs hover:text-blue-400">Back</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
