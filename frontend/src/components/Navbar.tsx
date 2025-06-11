import React from 'react'

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold">TodoApp</div>
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/signup" className="hover:underline">
              My Todos
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition">
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}


// Roadways bus stand, inside Roadways Bus Stand Udaipole, Roadways Bus Stand Udaipole, Ganesh Ghati, Udaipur, Rajasthan 313001