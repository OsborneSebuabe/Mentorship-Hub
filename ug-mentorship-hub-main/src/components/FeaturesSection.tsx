import React from 'react';
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Award, 
  BarChart3,
  Shield,
  Smartphone,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Smart Matching Engine',
    description: 'Advanced AI connects you with mentors based on department, interests, and career goals. See exactly why you were matched.',
  },
  {
    icon: Calendar,
    title: 'Integrated Scheduling',
    description: 'Book sessions seamlessly with calendar integration. Sync with Google Calendar and manage your mentorship timeline.',
  },
  {
    icon: MessageCircle,
    title: 'Communication Tools',
    description: 'Real-time chat, video calls, file sharing, and SMS/USSD fallback for low-bandwidth scenarios.',
  },
  {
    icon: BookOpen,
    title: 'Resource Library',
    description: 'Access downloadable career guides, research materials, soft skills lessons, and offline learning packets.',
  },
  {
    icon: Award,
    title: 'Progress Tracking',
    description: 'Earn badges, track session completion, monitor GPA trends, and showcase your professional development.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights on session frequency, satisfaction ratings, and mentorship outcomes.',
  },
  {
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Role-based access control, consent flows, and anonymized analytics to protect your data.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Lightweight mobile interface with offline support and push notifications for all devices.',
  },
  {
    icon: Globe,
    title: 'Alumni Network',
    description: 'Connect with UG alumni worldwide for micro-mentorship, project opportunities, and career guidance.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-6 animate-fade-in">
            Everything You Need for Successful Mentorship
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Our comprehensive platform combines cutting-edge technology with proven mentorship principles 
            to create meaningful connections and drive real results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect indicator */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-bounce-in">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience the future of university mentorship?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-hero text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
              Join as Student
            </button>
            <button className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Become a Mentor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;