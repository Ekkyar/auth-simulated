"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { toast } from 'react-toastify';

const Register = () => {
  const router = useRouter();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
    .required('Username is required')
    .test('unique-username', 'Username is already taken', async (value) => {
      try {
        const response = await axios.get(`http://localhost:8000/users?username=${value}`);
        return response.data.length === 0;
      } catch (error) {
        console.error('Error checking username:', error);
        return false;
      }
    }),
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .test('unique-email', 'Email is already taken', async (value) => {
      try {
        const response = await axios.get(`http://localhost:8000/users?email=${value}`);
        return response.data.length === 0;
      } catch (error) {
        console.error('Error checking email:', error);
        return false;
      }
    }),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .test('passwords-match', 'Passwords must match', function (value) {
        return value === this.resolve(Yup.ref('password'));
      }),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:8000/users', {
        username: values.username,
        email: values.email,
        password: values.password, // Use hashed password later
      });
      console.log('User registered:', response.data);
      toast.success('Registration successful! Please login.');
      router.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border rounded-md bg-slate-300/70"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
            </div>
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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border rounded-md bg-slate-300/70"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
            </div>
            <button type="submit" disabled={!isValid} className={`w-full text-white py-2 rounded-md mb-2 ${!isValid ? 'bg-blue-500/50 cursor-not-allowed' : 'bg-blue-500'}`}>Register</button>
            <div className="flex justify-center mb-4">
              <p className="text-gray-500 text-xs">{`Already have an account? `}<Link href="/login" className="text-blue-500 hover:underline">login here</Link></p>
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

export default Register;
