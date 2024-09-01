import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Header Section */}
      {/* Add content or remove if not needed */}

      {/* Hero Section */}
      <section className="flex flex-grow items-center justify-center text-center p-6 bg-cover bg-center" style={{ backgroundImage: 'url("https://source.unsplash.com/random/1600x900?nature")' }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to DEEN KI BAATEIN</h1>
          <p className="text-lg text-gray-300 mb-6">Your ultimate destination for inspiring and insightful conversations.</p>
          <a href="#contact" className="bg-yellow-500 text-black py-2 px-6 rounded-lg font-bold hover:bg-yellow-600 transition-colors">Get in Touch</a>
        </div>
      </section>

      {/* About Section */}
      {/* Add content or remove if not needed */}

      {/* Footer Section */}
      {/* Add content or remove if not needed */}
    </div>
  );
};

export default HomePage;
