/**
 * ProfileModal Component
 * Modal to view and delete Aria messages sent by the user
 * Admin (code 0000) can view and delete all arias
 */

import { useState, useEffect } from 'react';
import { getAriasBySender, deleteAria, getAllAria } from '../lib/ariaStorage';

const ProfileModal = ({ onCancel, onDelete, userCode, onLogout }) => {
  const [sentArias, setSentArias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedAria, setSelectedAria] = useState(null);

  useEffect(() => {
    const fetchArias = async () => {
      try {
        setLoading(true);
        // Check if user is admin (code 0000)
        const adminUser = userCode === '0000';
        setIsAdmin(adminUser);

        if (adminUser) {
          // Admin sees all arias
          const allArias = await getAllAria();
          setSentArias(allArias);
        } else {
          // Regular user sees only their arias
          const arias = await getAriasBySender(userCode || 'Anonymous');
          setSentArias(arias);
        }
      } catch (err) {
        console.error('Error fetching arias:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArias();
  }, [userCode]);

  const handleDelete = async (ariaId) => {
    if (!confirm('Are you sure you want to delete this Aria?')) return;

    setDeletingId(ariaId);
    try {
      await deleteAria(ariaId);
      setSentArias(prev => prev.filter(aria => aria.id !== ariaId));
      onDelete?.(ariaId);
    } catch (err) {
      console.error('Error deleting aria:', err);
      alert('Failed to delete Aria. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userCode');
    onLogout?.();
  };

  const formatTimestamp = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="relative bg-white rounded-2xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

        <h2
          className="text-3xl md:text-4xl font-bold text-black mb-6 text-center"
          style={{ fontFamily: 'var(--button-font)' }}
        >
          {isAdmin ? (
            <>
              All Arias
              <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                Admin
              </span>
            </>
          ) : (
            <>My Sent Arias <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">Code {userCode}</span></>
          )}
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : sentArias.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No Arias sent yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sentArias.map(aria => (
              <article
                key={aria.id}
                className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all"
              >
                  <button
                    type="button"
                    onClick={() => setSelectedAria(aria)}
                    className="min-w-0 text-left rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label={`Read aria for ${aria.recipient}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">To:</span>
                      <span className="font-semibold text-black">{aria.recipient}</span>
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-500">From:</span>
                        <span className="font-semibold text-purple-600">{aria.senderCode}</span>
                      </div>
                    )}
                    <p className="text-gray-700 mb-2 line-clamp-2 break-words">{aria.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{formatTimestamp(aria.createdAt)}</span>
                      {(aria.songLink || aria.songURL) && (
                        <span className="text-blue-600">Song attached</span>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => handleDelete(aria.id)}
                    disabled={deletingId === aria.id}
                    className="self-start justify-self-end shrink-0 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Delete Aria"
                  >
                    {deletingId === aria.id ? 'Deleting...' : 'Delete'}
                  </button>
              </article>
            ))}
          </div>
        )}

        {/* Close Button at bottom */}
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300"
            style={{ fontFamily: 'var(--button-font)' }}
            aria-label="Log out"
          >
            Log Out
          </button>
          <button
            onClick={onCancel}
            className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300"
            style={{ fontFamily: 'var(--button-font)' }}
            aria-label="Close"
          >
            Close
          </button>
        </div>
      </div>

      {selectedAria && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedAria(null)} aria-hidden="true" />
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="pr-20 text-2xl font-bold text-black" style={{ fontFamily: 'var(--button-font)' }}>Aria for {selectedAria.recipient}</h3>
            {isAdmin && <p className="mt-1 text-sm text-purple-600">From: {selectedAria.senderCode}</p>}
            {selectedAria.imageURL || selectedAria.picture ? <img className="mt-4 max-h-[45vh] w-full rounded-xl object-contain bg-black" src={selectedAria.imageURL || selectedAria.picture} alt={`Aria for ${selectedAria.recipient}`} /> : null}
            <p className="mt-4 whitespace-pre-wrap break-words text-gray-800">{selectedAria.message}</p>
            {(selectedAria.songLink || selectedAria.songURL) && <a className="mt-4 inline-block text-blue-600 underline" href={selectedAria.songLink || selectedAria.songURL} target="_blank" rel="noopener noreferrer">Play song</a>}
            <button type="button" onClick={() => setSelectedAria(null)} className="mt-6 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
