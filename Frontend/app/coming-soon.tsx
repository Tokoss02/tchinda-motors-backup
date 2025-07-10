'use client';

import Image from 'next/image';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';
import Link from 'next/link';

export default function ComingSoon() {
  return (
    
    <div className="flex items-center justify-center bg-secondary text-white">
      <div className="text-center p-6 max-w-md">
        {/* ✅ Logo */}
        <div className="mb-6">
          <Image
            src="/assets/imgs/template/Tokoss-motors-Logo-w.svg" 
            alt="Tokoss Motors Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg mb-6">
          We’re working on something exciting. Please check back soon!
        </p>

        {/* ✅ Social Media Icons */}
        <div className="flex justify-center gap-4 mt-4 text-white text-xl">
          <Link
            href="https://www.facebook.com/TokossMotorsFze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="hover:text-blue-400 transition" />
          </Link>
          <Link
            href="https://www.instagram.com/tokossmotors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-pink-400 transition" />
          </Link>
          <Link
            href="https://www.youtube.com/@TokossMotors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="hover:text-red-500 transition" />
          </Link>
          <Link
            href="https://www.tiktok.com/@tokossmotors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="hover:text-gray-300 transition" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs opacity-60">
          &copy; {new Date().getFullYear()} Tokoss Motors FZE. All rights reserved.
        </div>
      </div>
    </div>
  );
}
