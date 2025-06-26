import React from "react";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Tips for Urban Gardening",
      description: "Discover how to grow fresh herbs and vegetables in small spaces with our expert urban gardening tips.",
      imageUrl: "https://img.freepik.com/premium-photo/home-gardening-concept-woman-hands-planting-pots_165536-10781.jpg?w=740",
    },
    {
      id: 2,
      title: "Composting Made Easy",
      description: "Turn kitchen waste into garden gold with these beginner-friendly composting techniques.",
      imageUrl: "https://img.freepik.com/premium-photo/compost-bin-kitchen-waste-garden_488220-4226.jpg?w=740",
    },
    {
      id: 3,
      title: "Best Plants for Beginners",
      description: "New to gardening? Start with these low-maintenance, rewarding plants that thrive with minimal care.",
      imageUrl: "https://img.freepik.com/premium-photo/indoor-houseplants-window-sunlight-modern-home_31965-219547.jpg?w=740",
    },
  ];

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">🌿 Gardening Blogs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-900 mb-2">{blog.title}</h3>
              <p className="text-green-700 text-sm">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
