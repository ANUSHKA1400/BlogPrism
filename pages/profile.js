import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!authService.isLoggedIn()) {
      router.push('/login');
      return;
    }

    const currentUser = authService.getCurrentUser();
    setUser({
      name: currentUser.name,
      email: currentUser.email,
      bio: currentUser.bio || '',
      avatar: currentUser.avatar || ''
    });
    setLoading(false);
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, you would make an API call to update the user profile
      // For demo purposes, we'll just update localStorage
      const updatedUser = {
        ...authService.getCurrentUser(),
        name: user.name,
        bio: user.bio,
        avatar: user.avatar
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccess('Profile updated successfully!');
      
      // Update the user state
      setUser(updatedUser);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 py-8">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 py-8">
      <div className="card p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="text-sm text-green-700">{success}</div>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="form-input w-full"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="form-input w-full bg-gray-100"
              placeholder="Your email"
            />
            <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={user.bio}
              onChange={(e) => setUser({...user, bio: e.target.value})}
              className="form-input w-full"
              placeholder="Tell us about yourself"
              rows="4"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <input
              type="text"
              value={user.avatar}
              onChange={(e) => setUser({...user, avatar: e.target.value})}
              className="form-input w-full"
              placeholder="Avatar image URL"
            />
          </div>
          
          <div>
            <button 
              type="submit"
              disabled={updating}
              className="btn btn-primary"
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;