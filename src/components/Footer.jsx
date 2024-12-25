import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-10 max-w-screen">
      <div className="text-center mb-6">
        <p className='pb-3 text-sm'>Contact me</p>
        {/* Social Media Links */}
        <a href="https://www.instagram.com/_.solovert._/" target="_blank" rel="noopener noreferrer" className="mx-3 text-xl hover:text-pink-600">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.youtube.com/@solovert_escape24" target="_blank" rel="noopener noreferrer" className="mx-3 text-xl hover:text-red-600">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="mailto:akashoz72425@gmail.com" target="_blank" rel="noopener noreferrer" className="mx-3 text-xl hover:text-blue-600">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p className="text-sm text-center max-w-md mx-auto">
        &copy; {currentYear} <a href="/">SolWalls.com</a>  All rights reserved.
      </p>
    </footer>
  );
}



