import { useState } from "react";
import SHSLogo from "../../../assets/images/shs-logo.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#7C0F0F] to-[#5A0B0B] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Adopt Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-200 border-b border-orange-200/30 pb-2">Adopt</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/adopt/cat" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Adoptable Cats
                </a>
              </li>
              <li>
                <a href="/adopt/dog" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Adoptable Dogs
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/adoption-process-return-policy/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Adoption Policy & Process
                </a>
              </li>
              <li>
                <a href="/adopt" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Apply to Adopt
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/private-adoptions/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Private Adoptions
                </a>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/20">
              <a
                href="/foster"
                className="text-orange-200 hover:text-white font-medium transition-colors duration-200 cursor-pointer">
                Foster
              </a>
            </div>
          </div>

          {/* Donate Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-200 border-b border-orange-200/30 pb-2">Donate</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/favorite" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Wish List
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/shelter-medical-fund/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Shelter Medical Fund
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/donate-a-vehicle/"
                  className="hover:text-orange-200 transition-colors duration-200 underline cursor-pointer">
                  Donate a Vehicle
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/planned-giving/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Planned Giving
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/walk-for-a-dog/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Walk for a Dog
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/shopping-partners-that-give-back/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Shopping Partners
                </a>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/20">
              <a
                href="/volunteer"
                className="text-orange-200 hover:text-white font-medium transition-colors duration-200 cursor-pointer">
                Volunteer
              </a>
            </div>
          </div>

          {/* Programs & Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-200 border-b border-orange-200/30 pb-2">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.sequoiahumane.org/spay-neuter-assistance/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Spay/Neuter Assistance
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/microchipping/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Microchipping
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/lost-animals-2/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Lost or Found Animals
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/surrenders/"
                  className="hover:text-white transition-colors duration-200 cursor-pointer">
                  Surrenders
                </a>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/20 space-y-2">
              <div>
                <a
                  href="https://www.sequoiahumane.org/events/"
                  className="text-orange-200 hover:text-white font-medium transition-colors duration-200 cursor-pointer">
                  Events
                </a>
              </div>
              <div className="text-sm">
                <a
                  href="https://www.sequoiahumane.org/resources/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Resources
                </a>
              </div>
            </div>
          </div>

          {/* Services & Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-200 border-b border-orange-200/30 pb-2">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.sequoiahumane.org/vaccine-clinics/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Vaccine Clinics
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/pet-emergency-funding/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Pet Emergency Funding
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/animal-abuse/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Animal Abuse
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/education/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Education
                </a>
              </li>
            </ul>
          </div>

          {/* About & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-200 border-b border-orange-200/30 pb-2">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.sequoiahumane.org/newsletter/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/mission-vision/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Mission & Vision
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/board-of-directors/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Board of Directors
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/statistics/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Lives Saved Statistics
                </a>
              </li>
              <li>
                <a
                  href="https://www.sequoiahumane.org/tailwaggers-thrift-shop/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Tailwaggers Thrift Shop
                </a>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/20 space-y-2">
              <div>
                <a
                  href="https://www.sequoiahumane.org/contact/"
                  className="text-orange-200 hover:text-white font-medium transition-colors duration-200 cursor-pointer">
                  Contact
                </a>
              </div>
              <div className="text-sm">
                <a
                  href="https://www.sequoiahumane.org/join-our-team/"
                  className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                  Join our Team
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Logo/Branding Section */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#7C0F0F] font-bold text-xl">🐾</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">Sequoia Humane Society</h4>
                <p className="text-sm text-gray-300">Saving lives, one animal at a time</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                Home
              </a>
              <a href="/adopt" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                Adopt
              </a>
              <a href="/foster" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                Foster
              </a>
              <a href="/volunteer" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                Volunteer
              </a>
              <a href="/donate" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                Donate
              </a>
              <a href="/match" className="hover:text-orange-200 transition-colors duration-200 cursor-pointer">
                Pet Match
              </a>
            </div>

            {/* Social Media & Contact Info */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/sequoiahumane.eureka"
                className="hover:text-[#C1272D] transition-colors duration-200"
                aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com/sequoiahumane"
                className="hover:text-[#C1272D] transition-colors duration-200"
                aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sequoiahumanesociety/"
                className="hover:text-[#C1272D] transition-colors duration-200"
                aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a6.25 6.25 0 1 1-6.25 6.25 6.25 6.25 0 0 1 6.25-6.25zm0 1.5a4.75 4.75 0 1 0 4.75 4.75 4.75 4.75 0 0 0-4.75-4.75zm6.5 1.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-300">Follow us for updates & adoptable pets</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Sequoia Humane Society. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">A 501(c)(3) non-profit organization dedicated to animal welfare</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
