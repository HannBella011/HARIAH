/**
 * SearchAriaModal Component
 * Modal search interface to check if someone sent an Aria to you.
 */

import { useState } from 'react';
import { findAriasByRecipient } from '../lib/ariaStorage';

const SearchAriaModal = ({ onResultFound, onCancel }) => {
  const [searchName, setSearchName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async e => {
    e.preventDefault();
    setError('');
    setNotFound(false);
    setResults([]);

    if (!searchName.trim()) {
      setError('Please enter a name to search');
      return;
    }

    if (isSearching) return;
    setIsSearching(true);

    try {
      const found = await findAriasByRecipient(searchName.trim());
      if (found.length === 0) {
        setNotFound(true);
        return;
      }

      if (found.length === 1) {
        onResultFound(found[0]);
        return;
      }
      setResults(found);
    } catch (err) {
      console.error('Error searching for Aria:', err);
      setError('Failed to search Aria. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} aria-hidden="true" />

      <div className="relative bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
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
          Search for Your Aria
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-black border border-black rounded-lg text-white text-center">
            {error}
          </div>
        )}

        {notFound && (
          <div className="mb-4 p-4 bg-black border border-black rounded-lg text-white text-center">
            No Aria found for this name.
          </div>
        )}

        {results.length > 1 && (
          <div className="mb-4 space-y-2">
            <p className="text-center text-sm text-gray-600">Choose the Aria you want to open:</p>
            {results.map((aria, index) => (
              <button
                key={aria.id}
                type="button"
                onClick={() => onResultFound(aria)}
                className="w-full rounded-lg border border-gray-300 p-3 text-left hover:border-black hover:bg-gray-50 transition-colors"
              >
                <span className="block font-semibold text-black">Aria {index + 1}</span>
                <span className="block truncate text-sm text-gray-600">{aria.message}</span>
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label
              htmlFor="searchName"
              className="block text-sm font-medium text-black mb-2"
              style={{ fontFamily: 'var(--button-font)' }}
            >
              Your Name
            </label>
            <input
              type="text"
              id="searchName"
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              placeholder="Enter your name to check for messages"
              className="w-full px-4 py-3 bg-white border border-black rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              style={{ fontFamily: 'var(--button-font)' }}
              required
              aria-required="true"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSearching}
              className="flex-1 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--button-font)' }}
              aria-label="Search for Aria"
            >
              Search
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

export default SearchAriaModal;
