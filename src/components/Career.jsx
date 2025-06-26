import React, { useState } from "react";

const Career = () => {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const positions = [
    {
      id: 1,
      title: "Content Writer",
      type: "Remote",
      description: "Write engaging blog posts and gardening tips for our community.",
    },
    {
      id: 2,
      title: "Frontend Developer (React)",
      type: "Part-Time",
      description: "Work on UI/UX for GardenHub using React and Tailwind CSS.",
    },
    {
      id: 3,
      title: "Community Manager",
      type: "Full-Time",
      description: "Engage with users, manage discussions, and organize events.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 text-green-900">
      <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">🌿 Careers at GardenHub</h2>
      <p className="text-center text-green-700 max-w-2xl mx-auto mb-12">
        Help us grow the world greener. We’re always looking for passionate people who want to 
        make a difference through sustainable gardening, technology, and community.
      </p>

      {/* Open Roles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {positions.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-xl border border-green-200 p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-green-900">{role.title}</h3>
            <p className="text-sm text-green-600">{role.type}</p>
            <p className="mt-3 text-green-700">{role.description}</p>
            <button
              onClick={() => setSelectedPosition(role.title)}
              className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Application Form */}
      {selectedPosition && !submitted && (
        <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-4 text-green-800">
            Apply for: {selectedPosition}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border border-green-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-2 border border-green-300 rounded"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Why do you want this role?"
              required
              className="w-full px-4 py-2 border border-green-300 rounded"
            />
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
              Submit Application
            </button>
          </form>
        </div>
      )}

      {/* Submission Success Message */}
      {submitted && (
        <div className="text-center mt-10 bg-green-100 p-6 rounded-xl max-w-xl mx-auto">
          <h4 className="text-xl font-semibold text-green-800">🎉 Application Submitted!</h4>
          <p className="text-green-700 mt-2">Thank you for applying for the {selectedPosition} role. We’ll be in touch soon!</p>
        </div>
      )}
    </section>
  );
};

export default Career;
