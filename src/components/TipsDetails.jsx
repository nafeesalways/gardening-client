import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Loader from './Loader';

const TipsDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTipDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://gardening-hub-server-indol.vercel.app/singleData/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tip details');
        }
        const data = await response.json();
        setTip(data);
      } catch (err) {
        console.error('Error fetching tip:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTipDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center shadow-lg">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 dark:text-red-400 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!tip) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>{tip.title} | GardenHub</title>
      </Helmet>

      {/* Hero Section with Image */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-900">
        <img 
          src={tip.imageUrl} 
          alt={tip.title} 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/1200x500.png?text=Garden+Tip";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {tip.category && (
                <span className="px-3 py-1 bg-green-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                  {tip.category}
                </span>
              )}
              {tip.difficulty && (
                <span className="px-3 py-1 bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                  {tip.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              {tip.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Meta Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tip.category && (
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tip.category}</p>
              </div>
            )}

            {tip.difficulty && (
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tip.difficulty}</p>
              </div>
            )}

            {tip.author && (
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tip.author}</p>
              </div>
            )}

            {tip.date && (
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {new Date(tip.date).toLocaleDateString()}
                </p>
              </div>
            )}

            {tip.likes !== undefined && (
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">Likes</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tip.likes}</p>
              </div>
            )}

            {tip.views !== undefined && (
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">Views</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tip.views}</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Description Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              About This Tip
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
              {tip.description || 'No detailed description available for this gardening tip.'}
            </p>
          </div>
        </div>

        {/* Additional Tips Section (if available) */}
        {tip.tips && tip.tips.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Key Points
            </h2>
            <ul className="space-y-3">
              {tip.tips.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsDetails;
