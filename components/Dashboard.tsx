"use client"

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

const Dashboard = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to login page if no token
      toast.error('Please login!');
      router.push('/login'); 
    } else {
      // Decode token to get user ID
      const decodedToken = jwt_decode(token) as { id: number }; // Type assertion
      const userId = decodedToken.id;

      // Fetch user data based on user ID
      axios.get(`http://localhost:8000/users/${userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari localStorage
    toast.warning('You are logged out!');
    router.push('/login');
  };

  return (
    <>
      {isLoading ? (
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='flex items-center justify-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500'></div>
            <p className='ml-2'>Loading...</p>
          </div>
        </div>
      ) : (
        <div className='h-screen flex flex-col items-center justify-center'>
          <h2 className='mb-2'>Welcome to Dashboard</h2>
          <div className='mb-2'>
            {userData ? (
              <div>
                <p>Welcome, {userData.username}!</p>
                <p>Email: {userData.email}</p>
              </div>
            ) : (
              <div className='flex items-center justify-center'>
                <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500'></div>
                <p className='ml-2'>Loading user data......</p>
              </div>
            )} 
          </div>
          <div className='w-fit'>
            <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-8 rounded-md">Logout</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
