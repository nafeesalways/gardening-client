import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await fetch('/explore.json'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGardeners(data);
      } catch (err) {
        console.error("Failed to fetch gardeners:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  if (loading) return <Loader />;
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 font-semibold">Error loading gardeners</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Helmet>
        <title>GardenHub | Explore Gardeners</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            Explore Our Gardeners
          </h1>
          <p className="text-green-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Connect with experienced gardeners and learn from their expertise
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Gardeners</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-600">{gardeners.length}</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-gray-500 text-xs sm:text-sm">Updated as of today</p>
              <p className="text-green-600 font-semibold text-sm sm:text-base">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gardener Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {gardeners.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500 text-base sm:text-lg">No gardeners found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {gardeners.map((gardener) => (
              <div 
                key={gardener._id} 
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={gardener.imageUrl}
                    alt={gardener.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                      gardener.status === 'Active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-400 text-white'
                    }`}>
                      {gardener.status}
                    </span>
                  </div>
                  
                  {/* Tips Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 rounded-full shadow-md">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-bold text-gray-700">
                        {gardener.totalTips || 0} Tips
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  {/* Name */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                    {gardener.name}
                  </h2>

                  {/* Info Grid */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{gardener.age} years old</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-600">{gardener.gender}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-gray-600">{gardener.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreGardeners;
