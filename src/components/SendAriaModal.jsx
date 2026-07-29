/**
 * SendAriaModal Component
 * Modal form for sending an Aria (musical message) to someone
/**
 * SendAriaModal Component
 * Modal form for sending an Aria (musical message) to someone
 * Includes recipient name, personal message, song link, and picture upload
 */

import { useState, useEffect } from 'react';
import { saveAria } from '../lib/ariaStorage';

const readFileAsDataUrl = file =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const SendAriaModal = ({ onSubmit, onError, onCancel, userCode }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    message: '',
    songLink: '',
    picture: null,
    senderCode: userCode || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // Update senderCode when userCode prop changes
  useEffect(() => {
    if (userCode) {
      setFormData(prev => ({
        ...prev,
        senderCode: userCode
      }));
    }
  }, [userCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        picture: file
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.recipient.trim()) {
      setError('Please enter a recipient name');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter a message');
      return;
    }
    if (!formData.songLink.trim()) {
      setError('Please enter a song link');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const instantPicture = formData.picture ? previewUrl || URL.createObjectURL(formData.picture) : null;
    const submittedAria = {
      id: `local_${Date.now()}`,
      recipient: formData.recipient.trim(),
      message: formData.message.trim(),
      songLink: formData.songLink.trim(),
      picture: instantPicture,
      imageURL: instantPicture,
      senderName: 'Anonymous',
      senderCode: formData.senderCode.trim() || 'Anonymous',
      createdAt: new Date()
    };

    try {
      const persistedPicture = formData.picture ? previewUrl || await readFileAsDataUrl(formData.picture) : null;

      const ariaToPersist = {
        recipient: submittedAria.recipient,
        message: submittedAria.message,
        songLink: submittedAria.songLink,
        picture: persistedPicture,
        imageURL: persistedPicture,
        senderName: 'Anonymous',
        senderCode: submittedAria.senderCode,
        createdAt: submittedAria.createdAt
      };

      // Close and animate immediately. The network save continues in the
      // background so a slow Firestore response can never leave this button
      // stuck on "Sending".
      setFormData({
        recipient: '',
        message: '',
        songLink: '',
        picture: null,
        senderCode: userCode || ''
      });
      setPreviewUrl('');
      setIsSubmitting(false);
      onSubmit(submittedAria);

      void saveAria(ariaToPersist).catch(err => {
        console.error('Error saving Aria:', err);
        onError?.(err);
      });
    } catch (err) {
      console.error('Error sending Aria:', err);
      setIsSubmitting(false);
      onError?.();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop - dimmed */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-black hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center" style={{ fontFamily: 'var(--button-font)' }}>
          Send an Aria
        </h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-500 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Field */}
          <div>
            <label 
              htmlFor="recipient" 
              className="block text-sm font-medium text-black mb-2"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              Recipient Name
            </label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="Enter the recipient's name"
              className="w-full px-4 py-3 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              style={{ fontFamily: 'var(--button-font)' }}
              required
              aria-required="true"
            />
          </div>

          {/* Message Field */}
          <div>
            <label 
              htmlFor="message" 
              className="block text-sm font-medium text-black mb-2"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write a personal message..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              style={{ fontFamily: 'var(--button-font)' }}
              required
              aria-required="true"
            />
          </div>

          {/* Song Link Field */}
          <div>
            <label 
              htmlFor="songLink" 
              className="block text-sm font-medium text-black mb-2"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              Song Link
            </label>
            <input
              type="url"
              id="songLink"
              name="songLink"
              value={formData.songLink}
              onChange={handleChange}
              placeholder="Paste Spotify or YouTube link"
              className="w-full px-4 py-3 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              style={{ fontFamily: 'var(--button-font)' }}
              required
              aria-required="true"
            />
            <p className="text-xs text-black mt-1" style={{ fontFamily: 'var(--button-font)' }}>
              Support for Spotify and YouTube links
            </p>
          </div>

          {/* Sender Code Field */}
          <div>
            <label 
              htmlFor="senderCode" 
              className="block text-sm font-medium text-black mb-2"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              Your Code (Optional)
            </label>
            <input
              type="text"
              id="senderCode"
              name="senderCode"
              value={formData.senderCode}
              onChange={handleChange}
              placeholder="Enter your unique code"
              className="w-full px-4 py-3 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              style={{ fontFamily: 'var(--button-font)' }}
              aria-label="Your sender code"
            />
          </div>

          {/* Picture Upload Field */}
          <div>
            <label 
              htmlFor="picture" 
              className="block text-sm font-medium text-black mb-2"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              Picture (Optional)
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/*"
              onChange={handlePictureChange}
              className="w-full px-4 py-3 bg-white border border-black rounded-lg text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:cursor-pointer hover:file:bg-white hover:file:text-black transition-all"
              aria-label="Upload a picture"
            />
            {previewUrl && (
              <div className="mt-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border border-black"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--button-font)' }}
              aria-label="Send Aria"
            >
              Send Aria
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300"
              style={{ fontFamily: 'var(--button-font)' }}
              aria-label="Cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendAriaModal;
