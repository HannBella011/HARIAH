/**
 * HARIAH - Main App Component
 * A musical message sharing application
 */

import { useEffect, useState } from 'react';
import DomeGallery, { DEFAULT_IMAGES } from './components/DomeGallery';
import SendAriaModal from './components/SendAriaModal';
import SearchAriaModal from './components/SearchAriaModal';
import ProfileModal from './components/ProfileModal';
import UserCodeModal from './components/UserCodeModal';
import { subscribeToArias, syncPendingArias } from './lib/ariaStorage';

const normalizeAria = ariaData => ({
  ...ariaData,
  picture: ariaData.picture || ariaData.imageURL || null,
  imageURL: ariaData.imageURL || ariaData.picture || null,
  senderName: ariaData.senderName || 'Anonymous',
  songLink: ariaData.songLink || ariaData.songURL || '',
  createdAt: ariaData.createdAt?.toDate ? ariaData.createdAt.toDate() : ariaData.createdAt || new Date()
});

const createAriaImage = ariaData => {
  const aria = normalizeAria(ariaData);

  return {
    src: aria.imageURL || aria.picture,
    alt: `Aria for ${aria.recipient}`,
    id: `aria_${aria.id || Date.now()}`,
    isNew: Boolean(aria.isNew),
    aria: aria
  };
};

const replaceImageAtSlot = (images, ariaImage, slotIndex) => {
  if (!ariaImage?.src) return images;

  const slot = slotIndex % DEFAULT_IMAGES.length;
  const nextImages = Array.from(
    { length: DEFAULT_IMAGES.length },
    (_, index) => images[index] || DEFAULT_IMAGES[index]
  );

  nextImages.forEach((image, index) => {
    if (index !== slot && image.src === ariaImage.src) {
      nextImages[index] = DEFAULT_IMAGES[index];
    }
  });

  nextImages[slot] = ariaImage;
  return nextImages;
};

function App() {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserCodeModal, setShowUserCodeModal] = useState(false);
  const [selectedAria, setSelectedAria] = useState(null);
  const [galleryImages, setGalleryImages] = useState([...DEFAULT_IMAGES]);
  const [statusMessage, setStatusMessage] = useState('');
  const [nextReplaceIndex, setNextReplaceIndex] = useState(0);
  const [userCode, setUserCode] = useState(null);
  const [pendingSendAria, setPendingSendAria] = useState(false);

  // Check for existing user code on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('userCode');
    if (savedCode) {
      setUserCode(savedCode);
    }
  }, []);

  const handleSendAria = ariaData => {
    const aria = normalizeAria({
      ...ariaData,
      isNew: true
    });
    setSelectedAria(aria);
    setStatusMessage('');
    setShowSendModal(false);

    if (aria.imageURL || aria.picture) {
      setGalleryImages(prev => replaceImageAtSlot(prev, createAriaImage(aria), nextReplaceIndex));
      setNextReplaceIndex(prev => (prev + 1) % DEFAULT_IMAGES.length);
    }
  };

  const handleSearchResult = ariaData => {
    const aria = normalizeAria({ ...ariaData, isNew: true });
    setSelectedAria(aria);
    setStatusMessage('');
    setShowSearchModal(false);

    if (aria.imageURL || aria.picture) {
      setGalleryImages(prev => {
        const imageSrc = aria.imageURL || aria.picture;
        const existingIndex = prev.findIndex(image => image.src === imageSrc);
        return replaceImageAtSlot(
          prev,
          createAriaImage(aria),
          existingIndex >= 0 ? existingIndex : nextReplaceIndex
        );
      });
    }
  };

  const handleGalleryImageClick = imageClickData => {
    if (imageClickData.aria) {
      setSelectedAria(imageClickData.aria);
      setStatusMessage('');
    }
  };

  const handleBackToHome = () => {
    setShowSendModal(false);
    setShowSearchModal(false);
    setShowProfileModal(false);
    setShowUserCodeModal(false);
    setSelectedAria(null);
    setStatusMessage('');
    setPendingSendAria(false);
  };

  const handleCodeSubmit = async (code) => {
    try {
      // Special handling for admin code 0000 (Bella)
      if (code === '0000') {
        // Admin code - don't register, just set it
        setUserCode(code);
        localStorage.setItem('userCode', code);
        setStatusMessage(`Welcome code ${code}!`);
        
        // If user was trying to send aria, show send modal after code entry
        if (pendingSendAria) {
          setPendingSendAria(false);
          setShowUserCodeModal(false);
          setShowSendModal(true);
        } else {
          setShowUserCodeModal(false);
        }
        return;
      }

      // A code identifies this browser's sender profile. It does not need a
      // Firestore write, so first-time users can continue even when the
      // database has restrictive rules or is temporarily unavailable.
      setUserCode(code);
      localStorage.setItem('userCode', code);
      setStatusMessage(`Welcome code ${code}!`);
      
      // If user was trying to send aria, show send modal after code entry
      if (pendingSendAria) {
        setPendingSendAria(false);
        setShowUserCodeModal(false);
        setShowSendModal(true);
      } else {
        setShowUserCodeModal(false);
      }
    } catch (error) {
      throw error; // Let the modal handle the error display
    }
  };

  const handleProfileClick = () => {
    if (userCode) {
      // If user has a code, show their profile
      setShowProfileModal(true);
    } else {
      // If no code, show code entry modal
      setShowUserCodeModal(true);
    }
  };

  const handleLogout = () => {
    const loggedOutCode = userCode;
    setUserCode(null);
    setShowProfileModal(false);
    setStatusMessage(`Goodbye code ${loggedOutCode || ''}!`);
  };

  useEffect(() => {
    // Real-time listener for aria updates across devices
    void syncPendingArias();
    const unsubscribe = subscribeToArias((arias) => {
      const firebaseImages = arias
        .filter(item => item.imageURL || item.picture)
        .map(item => createAriaImage({ ...item, id: item.id, isNew: false }));

      if (firebaseImages.length > 0) {
        setGalleryImages(
          firebaseImages.slice(0, DEFAULT_IMAGES.length).reduce(
            (images, ariaImage, index) => replaceImageAtSlot(images, { ...ariaImage, isNew: false }, index),
            [...DEFAULT_IMAGES]
          )
        );
        setNextReplaceIndex(firebaseImages.length % DEFAULT_IMAGES.length);
      } else {
        setGalleryImages([...DEFAULT_IMAGES]);
        setNextReplaceIndex(0);
      }
    }, DEFAULT_IMAGES.length);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!statusMessage) return undefined;

    const timer = window.setTimeout(() => {
      setStatusMessage('');
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  return (
    <div className="min-h-screen bg-black">
      <div className="app-header fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center">
        <h1
          className="text-5xl md:text-7xl font-bold text-white transition-opacity duration-300 cursor-default"
          style={{ fontFamily: 'var(--button-font)' }}
          aria-label="HARIAH"
        >
          Hariah
        </h1>

        <div className="app-actions flex gap-3 items-center">
          <button
            onClick={handleProfileClick}
            className="p-3 bg-white text-black rounded-lg hover:shadow-lg hover:shadow-white/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300"
            aria-label="View profile"
            title="View sent Arias"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button
            onClick={() => {
              if (userCode) {
                setShowSendModal(true);
              } else {
                setPendingSendAria(true);
                setShowUserCodeModal(true);
              }
            }}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-white/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300"
            style={{ fontFamily: 'var(--button-font)' }}
            aria-label="Send an Aria"
          >
            Send Aria
          </button>
          <button
            onClick={() => setShowSearchModal(true)}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-white/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300"
            style={{ fontFamily: 'var(--button-font)' }}
            aria-label="Search for an Aria"
          >
            Search Aria
          </button>
        </div>
      </div>

      <div className="app-footer fixed bottom-4 left-0 right-0 z-40 pointer-events-none px-4">
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/HannahB3lla"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-fb text-white hover:text-white/80 transition-opacity duration-300 pointer-events-auto"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/hhunnuhh/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ig text-white hover:text-white/80 transition-opacity duration-300 pointer-events-auto"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <div className="flex-1 text-center">
            <p
              className="text-white text-xl md:text-1xl opacity-90"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              Send musical messages with pictures to the people you care about.
            </p>
            <p
              className="mt-1 text-white/70 text-xs md:text-sm"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              © HARIAH. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <main className="fixed inset-0">
        <DomeGallery
          fit={1}
          images={galleryImages.length > 0 ? galleryImages : undefined}
          selectedAria={selectedAria}
          notice={selectedAria?.notice || ''}
          onImageClick={handleGalleryImageClick}
        />
      </main>

      {statusMessage && (
        <div className="aria-status fixed inset-0 z-[90] grid place-items-center pointer-events-none px-4 text-center text-white text-xl" style={{ fontFamily: 'var(--button-font)' }}>
          {statusMessage}
        </div>
      )}

      {showSendModal && (
        <SendAriaModal onSubmit={handleSendAria} onCancel={handleBackToHome} userCode={userCode} />
      )}

      {showSearchModal && <SearchAriaModal onResultFound={handleSearchResult} onCancel={handleBackToHome} />}

      {showProfileModal && (
        <ProfileModal
          onCancel={handleBackToHome}
          onDelete={() => {
            // Gallery will auto-refresh via real-time listener
          }}
          userCode={userCode}
          onLogout={handleLogout}
        />
      )}

      {showUserCodeModal && (
        <UserCodeModal
          onCodeSubmit={handleCodeSubmit}
          onCancel={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
