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

      <div className="app-footer fixed bottom-4 left-0 right-0 text-center z-40 pointer-events-none px-4">
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
