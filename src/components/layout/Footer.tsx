import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 px-6 border-t mt-auto">
      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Vibe. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer; 