import React from 'react';

const Tools = () => {
  const tools = [
    {
      id: 1,
      name: "Pruning Shears",
      description: "Essential for trimming plants and shrubs with ease and precision.",
      icon: "✂️",
      color: "from-blue-500 to-blue-600",
      features: ["Sharp blades", "Ergonomic grip", "Durable steel"]
    },
    {
      id: 2,
      name: "Soil Tester Kit",
      description: "Get accurate pH and moisture readings for optimal plant growth.",
      icon: "🧪",
      color: "from-purple-500 to-purple-600",
      features: ["pH meter", "Moisture sensor", "Nutrient test"]
    },
    {
      id: 3,
      name: "Watering Can",
      description: "Perfect balance between function and flow for your garden.",
      icon: "💧",
      color: "from-cyan-500 to-cyan-600",
      features: ["1-2 gallon capacity", "Rose nozzle", "Lightweight"]
    },
    {
      id: 4,
      name: "Garden Spade",
      description: "Reliable digging and edging tool for all your gardening tasks.",
      icon: "🔱",
      color: "from-orange-500 to-orange-600",
      features: ["Stainless steel", "Comfortable handle", "Versatile use"]
    },
    {
      id: 5,
      name: "Gardening Gloves",
      description: "Protect your hands while working in the soil and handling plants.",
      icon: "🧤",
      color: "from-red-500 to-red-600",
      features: ["Breathable fabric", "Grip pattern", "Various sizes"]
    },
    {
      id: 6,
      name: "Hand Rake",
      description: "Compact and efficient for loosening soil and removing weeds.",
      icon: "🌾",
      color: "from-amber-500 to-amber-600",
      features: ["Lightweight", "3 prongs", "Easy to handle"]
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-green-50 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            🛠️ Essential Gardening Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Equip yourself with the right tools to make gardening easier and more enjoyable
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 hover:-translate-y-1"
            >
              {/* Icon Background */}
              <div className={`bg-gradient-to-br ${tool.color} p-6 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-32 h-32 bg-white rounded-full absolute -right-8 -top-8"></div>
                </div>
                <span className="text-6xl block relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-5 sm:p-6">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="space-y-2 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Key Features
                  </p>
                  <ul className="space-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/20">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Invest in Quality Tools
              </h3>
              <p className="text-green-100 text-sm sm:text-base">
                Good gardening tools make the work easier and more enjoyable. Choose quality tools that will last for years and make a real difference in your gardening experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
