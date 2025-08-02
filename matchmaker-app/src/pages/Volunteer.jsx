function Volunteer() {
  const opportunities = [
    {
      title: "Community Outreach",
      description: "Help us connect with local communities and spread awareness.",
      time: "4-6 hours/week",
      location: "Various locations"
    },
    {
      title: "Event Planning",
      description: "Organize fundraising events and community gatherings.",
      time: "6-8 hours/week",
      location: "Office + Events"
    },
    {
      title: "Social Media",
      description: "Create content and manage our social media presence.",
      time: "3-5 hours/week",
      location: "Remote"
    },
    {
      title: "Administrative Support",
      description: "Assist with office tasks and general support.",
      time: "4-6 hours/week",
      location: "Office"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#C1272D] to-[#7C0F0F] text-white py-12 px-4 sm:py-16 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">❤️</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Volunteer With Us</h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-4">
            Join our community and make a real difference. Your time and skills matter.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-[#C1272D]">500+</div>
              <div className="text-sm sm:text-base text-[#888888]">Volunteers</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-[#C1272D]">50K+</div>
              <div className="text-sm sm:text-base text-[#888888]">Hours</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-[#C1272D]">1,000+</div>
              <div className="text-sm sm:text-base text-[#888888]">Lives Helped</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-[#C1272D]">25+</div>
              <div className="text-sm sm:text-base text-[#888888]">Programs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#252525] text-center mb-8 sm:mb-12">
            How You Can Help
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {opportunities.map((opp, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-lg border-l-4 border-[#C1272D] hover:shadow-xl transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-[#252525] mb-3">{opp.title}</h3>
                <p className="text-[#888888] mb-4 text-sm sm:text-base">{opp.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-xs sm:text-sm text-[#888888]">
                    <span className="w-4 h-4 mr-2 text-[#C1272D]">⏰</span>
                    {opp.time}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-[#888888]">
                    <span className="w-4 h-4 mr-2 text-[#C1272D]">📍</span>
                    {opp.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-12 sm:py-16 bg-white px-4 sm:px-6 mb-32">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#252525] text-center mb-6 sm:mb-8">
            Apply to Volunteer
          </h2>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfRxxM2zsr62z8vbRYA4Ev8SUY6q6xr7aY4Wa0R5YLQcGQSLw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#C1272D] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#7C0F0F] transition-colors text-sm sm:text-base block text-center"
          >
            Submit Application
          </a>
        </div>
      </div>
    </div>
  );
}

export default Volunteer;