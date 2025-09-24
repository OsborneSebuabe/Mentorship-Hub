import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Trophy, Star } from 'lucide-react';
import heroImage from '@/assets/hero-mentorship.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="University students and mentors collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-6 animate-fade-in">
              <Star className="w-4 h-4 mr-2 text-secondary" />
              University of Ghana's Premier Mentorship Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up leading-tight">
              Connect with 
              <span className="text-secondary block lg:inline lg:ml-3">
                Expert Mentors
              </span>
              <span className="block">Shape Your Future</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-white/90 mb-8 max-w-2xl animate-fade-in-left leading-relaxed">
              Join thousands of UG students, lecturers, and alumni in Ghana's most comprehensive 
              mentorship ecosystem. Get personalized guidance, career insights, and academic support 
              to accelerate your success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-right">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl" className="group bg-white text-primary hover:bg-white/90">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="glass" size="xl" className="group">
                  Learn More
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 animate-bounce-in">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-white/80 text-sm">Active Mentors</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">5000+</div>
                <div className="text-white/80 text-sm">Students Helped</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/80 text-sm">Departments</div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              {/* Feature Card 1 */}
              <div className="glass p-6 rounded-xl float animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-secondary/20 rounded-lg mr-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Smart Matching</h3>
                    <p className="text-white/70 text-sm">AI-powered mentor pairing</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  Get matched with mentors based on your interests, academic goals, and career aspirations.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="glass p-6 rounded-xl float animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg mr-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Resource Library</h3>
                    <p className="text-white/70 text-sm">Comprehensive learning materials</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  Access career guides, research materials, and skill development resources.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="glass p-6 rounded-xl float animate-fade-in-right" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-success/20 rounded-lg mr-4">
                    <Trophy className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Track Progress</h3>
                    <p className="text-white/70 text-sm">Monitor your growth</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  Earn badges, track sessions, and measure your academic and career progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;