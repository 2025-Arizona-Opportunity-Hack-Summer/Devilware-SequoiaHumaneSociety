import React from 'react';
import { Link } from "react-router-dom";
import img1 from "../../assets/images/aboutimg.png";
import img2 from "../../assets/images/aboutimg2.png";


// --- SVG Icon Components for a consistent and clean look ---

const HeartIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const UsersIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const TrophyIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V22h4v-7.34"/><path d="M12 14.66L17.5 9H6.5L12 14.66z"/><path d="M12 6V3"/>
    </svg>
);

const ArrowRightIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const StarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const CatIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/><path d="M20 14c0-4.42-3.58-8-8-8S4 9.58 4 14c0 1.49.41 2.88 1.14 4.05l-1.82 2.73a.5.5 0 0 0 .68.68l2.73-1.82A7.96 7.96 0 0 0 12 22c4.42 0 8-3.58 8-8z"/>
    </svg>
);

const DogIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 5.172C10 3.74 8.88 2.5 7.5 2.5S5 3.74 5 5.172"/><path d="M14 6.172C14 4.74 15.12 3.5 16.5 3.5S19 4.74 19 6.172"/><path d="M12 10v6"/><path d="M7 10h10"/><path d="M12 16a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4zm8 0a4 4 0 0 1 4-4h.5a4 4 0 0 1 4 4v2h-8v-2a4 4 0 0 1 4-4z"/>
    </svg>
);

const PhoneIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const MailIcon = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const MapPinIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
    </svg>
);


function Homepage() {
  return (
    <div className="homepage min-h-screen bg-white" style={{color: '#252525'}}>
      {/* --- Hero Section --- */}
      <div className="pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 
              className="text-[#7C0F0F] uppercase font-bold text-4xl sm:text-5xl lg:text-6xl tracking-wider" 
              style={{ fontFamily: 'Koulen, sans-serif' }}
            >
              Welcome!
            </h1>
            
            <div className="space-y-4">
              <p 
                className="text-xl sm:text-2xl md:text-3xl text-[#252525] leading-relaxed" 
                style={{ fontFamily: 'Koh Santepheap, sans-serif' }}
              >
                This is the <span className="font-bold text-[#C1272D] bg-[#C1272D]/10 px-2 py-1 rounded-lg">Sequoia</span> Humane Society!
              </p>
              
              <p className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Where compassion meets action. We're dedicated to creating a world where every animal is treated with kindness, respect, and love.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link 
                to="/volunteer" 
                className="group bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] hover:to-[#7C0F0F] text-white px-8 py-3 rounded-full font-semibold text-base lg:text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                Get Involved
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group border-2 border-[#C1272D] text-[#C1272D] px-8 py-3 rounded-full font-semibold text-base lg:text-lg hover:bg-[#C1272D] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <HeartIcon className="w-5 h-5 group-hover:scale-110 transition-transform fill-transparent group-hover:fill-white" />
                Donate Now
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] rounded-3xl transform -rotate-3 opacity-10"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#7C0F0F] to-[#C1272D] rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <HeartIcon className="w-10 h-10 text-white fill-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#252525]">Making a Difference</h3>
                  <p className="text-sm text-[#888888]">Join our mission to provide shelter, care, and love to animals in need.</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#C1272D]">2.5K+</div>
                    <div className="text-xs text-[#888888]">Animals Rescued</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#C1272D]">1.8K+</div>
                    <div className="text-xs text-[#888888]">Adoptions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#C1272D]">500+</div>
                    <div className="text-xs text-[#888888]">Volunteers</div>
                  </div>
                </div>
              </div>
              {/* --- Mini Newsletter Form --- */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-center text-[#252525] mb-3">Stay in the Loop!</p>
                  <form className="flex flex-col sm:flex-row gap-2">
                      <input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          className="w-full px-4 py-2 text-sm rounded-full border-2 border-gray-200 focus:outline-none focus:border-[#C1272D] transition-colors"
                      />
                      <button 
                          type="submit"
                          className="bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] hover:to-[#7C0F0F] text-white px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0"
                      >
                          Sign Up
                      </button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Features Section --- */}
      <div className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-4">
              Why Choose <span className="text-[#C1272D]">Sequoia</span>?
            </h2>
            <p className="text-base sm:text-lg text-[#888888] max-w-3xl mx-auto">
              We're more than just a shelter - we're a community dedicated to animal welfare and responsible pet ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7C0F0F] to-[#C1272D] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartIcon className="w-8 h-8 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-[#252525] mb-3">Compassionate Care</h3>
              <p className="text-base text-[#888888] leading-relaxed">
                Every animal receives individualized attention, medical care, and love from our dedicated team of professionals.
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7C0F0F] to-[#C1272D] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#252525] mb-3">Community Focused</h3>
              <p className="text-base text-[#888888] leading-relaxed">
                We work closely with local families and organizations to create lasting bonds between pets and their forever homes.
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7C0F0F] to-[#C1272D] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrophyIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#252525] mb-3">Proven Results</h3>
              <p className="text-base text-[#888888] leading-relaxed">
                With over a decade of experience, we've successfully placed thousands of animals in loving, permanent homes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* First Image */}
      <div className="relative w-full overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
        <img
          src={img1}
          alt="Animals at Sequoia Humane Society"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>

       {/* --- About Us Section --- */}
      <div className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-[#7C0F0F] font-bold uppercase text-3xl sm:text-4xl mb-4 tracking-wide" style={{ fontFamily: 'Koulen, sans-serif' }}>
                    About Our Shelter
                </h2>
                <div className="w-24 h-1 bg-[#C1272D] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <p className="text-lg text-[#888888] leading-relaxed">
                        The Sequoia Humane Society is a <strong className="text-[#7C0F0F]">no-kill shelter</strong> whose mission is to be a community leader in reducing pet overpopulation by providing a high-standard of care through adoption, spay/neuter and education programs.
                    </p>
                    <p className="text-lg text-[#888888] leading-relaxed">
                        Every member of the Sequoia Humane Society—whether staff, volunteers, or foster parents—is devoted to caring for each of our shelter animals with the respect, love, and compassion they deserve every day.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                        <CatIcon className="w-12 h-12 mx-auto text-[#C1272D] mb-4" />
                        <h3 className="text-xl font-bold text-[#252525]">Cat Care</h3>
                        <p className="text-sm text-[#888888]">Communal rooms and a "Cattio" for sunbathing.</p>
                    </div>
                    <div className="group bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                        <DogIcon className="w-12 h-12 mx-auto text-[#C1272D] mb-4" />
                        <h3 className="text-xl font-bold text-[#252525]">Dog Care</h3>
                        <p className="text-sm text-[#888888]">Spacious areas and guided pack walks.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Second Image */}
      <div className="relative w-full overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
        <img
          src={img2}
          alt="Happy pets at Sequoia Humane Society"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* --- Testimonials Section --- */}
      <div className="bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stories of Hope
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto">
              Hear from families who found their perfect companions through Sequoia Humane Society.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
              <div className="flex space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5"/>)}
              </div>
              <p className="text-base mb-6 leading-relaxed text-white/90">
                "The team at Sequoia helped us find the perfect companion for our family. The adoption process was smooth, and they truly care about matching pets with the right homes."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-base">Sarah & Mike Johnson</div>
                  <div className="text-sm text-white/70">Adopted Latte in 2025</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
              <div className="flex space-x-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5"/>)}
              </div>
              <p className="text-base mb-6 leading-relaxed text-white/90">
                "Volunteering at Sequoia has been incredibly rewarding. The staff is passionate, and seeing animals find their forever homes makes every moment worthwhile."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <HeartIcon className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <div className="font-semibold text-base">Emily Rodriguez</div>
                  <div className="text-sm text-white/70">Volunteer since 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Contact and Donate Section --- */}
      <div className="bg-[#252525] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-base sm:text-lg text-[#888888] max-w-3xl mx-auto">
              Have questions or want to support our cause? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* --- Contact Form and Info Column --- */}
            <div className="bg-white/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white/10 text-white placeholder-white/50 px-5 py-3 rounded-full border-2 border-transparent focus:outline-none focus:border-[#C1272D] transition-colors" />
                <input type="email" placeholder="Your Email" className="w-full bg-white/10 text-white placeholder-white/50 px-5 py-3 rounded-full border-2 border-transparent focus:outline-none focus:border-[#C1272D] transition-colors" />
                <textarea placeholder="Your Message" rows="4" className="w-full bg-white/10 text-white placeholder-white/50 px-5 py-3 rounded-2xl border-2 border-transparent focus:outline-none focus:border-[#C1272D] transition-colors"></textarea>
                <button type="submit" className="w-full group bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] hover:to-[#7C0F0F] text-white px-8 py-3 rounded-full font-semibold text-base lg:text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Send Message
                </button>
              </form>
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4 text-white/80">
                <div className="flex items-center gap-4">
                  <MapPinIcon className="w-5 h-5 text-[#C1272D]" />
                  <span>123 Animal Lover Lane, Eureka, CA 95501</span>
                </div>
                <div className="flex items-center gap-4">
                  <PhoneIcon className="w-5 h-5 text-[#C1272D]" />
                  <span>(707) 442-1782</span>
                </div>
                <div className="flex items-center gap-4">
                  <MailIcon className="w-5 h-5 text-[#C1272D]" />
                  <span>info@sequoiahumane.org</span>
                </div>
              </div>
            </div>

            {/* --- Donate Column --- */}
            <div className="bg-gradient-to-br from-[#7C0F0F] to-[#C1272D] p-8 rounded-2xl text-white text-center flex flex-col justify-center h-full">
              <HeartIcon className="w-12 h-12 mx-auto text-white/80 mb-4" />
              <h3 className="text-3xl font-bold mb-4">Support Our Mission</h3>
              <p className="mb-8 text-white/90">Your generosity helps us provide care, shelter, and find forever homes for animals in need.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <button className="bg-white/20 hover:bg-white/40 text-white font-bold py-3 rounded-full transition-colors">$25</button>
                <button className="bg-white/20 hover:bg-white/40 text-white font-bold py-3 rounded-full transition-colors">$50</button>
                <button className="bg-white/40 hover:bg-white/60 text-white font-bold py-3 rounded-full transition-colors shadow-lg">$100</button>
                <button className="bg-white/20 hover:bg-white/40 text-white font-bold py-3 rounded-full transition-colors">Custom</button>
              </div>
              <button className="w-full bg-white text-[#C1272D] font-bold py-4 rounded-full text-lg hover:bg-gray-200 transition-colors transform hover:scale-105 shadow-xl">
                Donate Securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
