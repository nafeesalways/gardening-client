import React, { useState } from "react";

const Newsletter = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "How do I start a vegetable garden?",
      answer:
        "Begin by choosing a sunny location (6-8 hours of sunlight), prepare the soil with compost, and plant seeds or seedlings appropriate for your climate zone. Our planting calendar tool can help you choose the right plants for your region.",
    },
    {
      id: 2,
      question: "What's the best time to prune plants?",
      answer:
        "Most plants are best pruned in late winter or early spring before new growth begins. However, it varies by plant type. Refer to our plant-specific guides on GardenHub for detailed pruning schedules.",
    },
    {
      id: 3,
      question: "How often should I water my garden?",
      answer:
        "Most plants need 1-2 inches of water per week. However, it depends on soil type, weather, and plant species. Use our Soil Tester Kit to check moisture levels. Generally, water deeply but less frequently to encourage deeper root growth.",
    },
    {
      id: 4,
      question: "What should I do about garden pests?",
      answer:
        "Start with organic methods like companion planting, hand-picking pests, and neem oil spray. Our community section has gardeners who can help identify pests and suggest solutions tailored to your situation.",
    },
    {
      id: 5,
      question: "How can I improve my soil quality?",
      answer:
        "Add organic matter like compost, aged manure, or leaf mulch regularly. Use our Soil Tester Kit to monitor pH levels. Avoid bare soil by planting cover crops or using mulch, which also helps with moisture retention.",
    },
    {
      id: 6,
      question: "Is composting difficult for beginners?",
      answer:
        "Not at all! Composting is simple: collect brown materials (leaves), green materials (food scraps), keep it moist, and turn occasionally. Our composting guide provides step-by-step instructions for quick results.",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-green-50 to-white dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid - FAQ and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* FAQ Section */}
          <div>
            {/* FAQ Header */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Find answers to common gardening questions and get started with
                confidence
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <span className="text-left font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 ml-3 transition-transform duration-300 ${
                        openFAQ === faq.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Answer Section */}
                  {openFAQ === faq.id && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            {/* Newsletter Header */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                Stay Updated
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Get weekly gardening tips, seasonal planting guides, and
                exclusive community insights delivered to your inbox
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-4 mb-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Frequency Options */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Email Frequency
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="radio"
                      name="frequency"
                      value="weekly"
                      defaultChecked
                      className="radio radio-sm radio-green"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Weekly digest
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="radio"
                      name="frequency"
                      value="monthly"
                      className="radio radio-sm radio-green"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Monthly summary
                    </span>
                  </label>
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                type="submit"
                className="w-full btn bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-none flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Subscribe Now
              </button>
            </form>

            {/* Success Message */}
            {subscribed && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                    Successfully subscribed!.
                  </p>
                </div>
              </div>
            )}

            {/* Benefits List */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4">
                What You'll Get
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Weekly gardening tips & guides
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Seasonal planting schedules
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Exclusive community updates
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Newsletter;
