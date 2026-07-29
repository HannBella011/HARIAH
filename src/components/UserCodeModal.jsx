/**
 * UserCodeModal Component
 * Modal for users to enter their 4-digit code
 * Code is saved to localStorage for persistence
 */

import { useState, useEffect } from 'react';

const UserCodeModal = ({ onCodeSubmit, onCancel }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdminConfirmation, setShowAdminConfirmation] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminNameError, setAdminNameError] = useState('');

  // Load saved code from localStorage on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('userCode');
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  // Check if admin was already verified in this session
  useEffect(() => {
    const adminVerified = sessionStorage.getItem('adminVerified');
    if (adminVerified === 'true') {
      setShowAdminConfirmation(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate code format
    if (!/^\d{4}$/.test(code)) {
      setError('Please enter a valid 4-digit code (0000-9999)');
      return;
    }

    // Check if admin code - show confirmation (unless already verified this session)
    if (code === '0000') {
      const adminVerified = sessionStorage.getItem('adminVerified');
      if (adminVerified === 'true') {
        // Already verified, proceed directly
        setLoading(true);
        try {
          await onCodeSubmit(code);
        } catch (err) {
          setError(err.message || 'Failed to verify admin access.');
        } finally {
          setLoading(false);
        }
      } else {
        setShowAdminConfirmation(true);
      }
      return;
    }

    setLoading(true);
    
    try {
      // Submit to parent component for validation/registration
      await onCodeSubmit(code);
      
      // localStorage is now handled by parent component
    } catch (err) {
      setError(err.message || 'Failed to save code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminConfirmation = async (e) => {
    e.preventDefault();
    setAdminNameError('');

    if (!adminName.trim()) {
      setAdminNameError('Please enter your name');
      return;
    }

    // Check for exact match
    if (adminName.trim() !== 'Hale Ylana') {
      setAdminNameError('Incorrect name. Access denied.');
      setAdminName('');
      return;
    }

    setLoading(true);
    
    try {
      // Submit the admin code
      await onCodeSubmit(code);
      // Store admin verification in session
      sessionStorage.setItem('adminVerified', 'true');
    } catch (err) {
      setAdminNameError(err.message || 'Failed to verify admin access.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCode = () => {
    setShowAdminConfirmation(false);
    setAdminName('');
    setAdminNameError('');
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    // Only allow digits and max 4 characters
    if (/^\d{0,4}$/.test(value)) {
      setCode(value);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2
          className="text-3xl md:text-4xl font-bold text-black mb-6 text-center"
          style={{ fontFamily: 'var(--button-font)' }}
        >
          {showAdminConfirmation ? 'Admin Verification' : 'Enter Your Code'}
        </h2>

        {!showAdminConfirmation ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input */}
            <div>
              <label htmlFor="userCode" className="block text-sm font-medium text-gray-700 mb-2">
                Code Number
              </label>
              <input
                id="userCode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                value={code}
                onChange={handleCodeChange}
                placeholder="0000"
                className="w-full px-4 py-3 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-black focus:ring-0 focus:outline-none transition-colors"
                disabled={loading}
                autoFocus
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Explanation Text */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Your Code Number is your unique identifier. It helps you view and manage the arias you've sent. No password needed — just remember your 4-digit code!
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.length !== 4}
              className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              {loading ? 'Verifying...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAdminConfirmation} className="space-y-6">
            {/* Admin Name Input */}
            <div>
              <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-2">
                What is your name?
              </label>
              <input
                id="adminName"
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-black focus:ring-0 focus:outline-none transition-colors"
                disabled={loading}
                autoFocus
              />
            </div>

            {/* Error Message */}
            {adminNameError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{adminNameError}</p>
              </div>
            )}

            {/* Explanation Text */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Admin access requires identity verification. Please enter your exact name to continue.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || !adminName.trim()}
                className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                style={{ fontFamily: 'var(--button-font)' }}
              >
                {loading ? 'Verifying...' : 'Verify Admin Access'}
              </button>
              
              <button
                type="button"
                onClick={handleBackToCode}
                className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300"
                style={{ fontFamily: 'var(--button-font)' }}
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserCodeModal;
