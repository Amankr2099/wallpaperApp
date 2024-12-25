import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b">
        {/* Responsive text size */}
        <Link to={'/'} className='text-white'>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">SolWalls</h1>

        </Link>

        {/* Responsive input bar */}
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded w-32 sm:w-48 md:w-64 lg:w-80"
        />
      </header>
    </div>
  );
}
