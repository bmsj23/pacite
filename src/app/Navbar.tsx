import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl flex items-center justify-between px-8 py-4 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
 
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-primary tracking-tight">Pacite</span>
      </Link>


      <ul className="flex gap-8">
        <li>
          <Link
            href="/"
            className="text-gray-700 font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:bg-green-50 hover:text-primary"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/tools"
            className="text-gray-700 font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:bg-green-50 hover:text-primary"
          >
            Tools
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-gray-700 font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:bg-green-50 hover:text-primary"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;