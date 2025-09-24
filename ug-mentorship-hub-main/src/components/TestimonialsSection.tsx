import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Akosua Mensah',
    role: 'Computer Science Student',
    year: '3rd Year',
    avatar: '',
    content: 'The mentorship program transformed my academic journey. My mentor helped me secure an internship at a top tech company and guided me through research opportunities I never knew existed.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dr. Emmanuel Kwaku',
    role: 'Senior Lecturer',
    department: 'Business Administration',
    avatar: '',
    content: 'Being a mentor on this platform has been incredibly rewarding. The structured approach helps me better support students, and seeing their growth makes every session worthwhile.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Kwame Asante',
    role: 'Alumni',
    year: 'Class of 2019',
    avatar: '',
    content: 'As an alumnus working in fintech, I love giving back through micro-mentorship sessions. The platform makes it easy to connect with students who share my interests and career path.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Efua Boateng',
    role: 'Economics Student',
    year: '2nd Year',
    avatar: '',
    content: 'The resource library and career guidance helped me discover my passion for development economics. My mentor connected me with research opportunities that shaped my future goals.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Prof. Sarah Osei',
    role: 'Department Head',
    department: 'Psychology',
    avatar: '',
    content: 'This platform has revolutionized how we approach student mentorship at UG. The analytics help us track student progress and ensure no one falls through the cracks.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Michael Adjei',
    role: 'Graduate Student',
    year: 'MSc Computer Science',
    avatar: '',
    content: 'The peer mentorship and alumni connections were invaluable during my thesis research. I found collaborators and got industry insights that enhanced my work significantly.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-6 animate-fade-in">
            Trusted by the UG Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Hear from students, lecturers, and alumni who have experienced the transformative 
            power of structured mentorship at the University of Ghana.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group relative overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="h-8 w-8 text-primary" />
              </div>

              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.year && ` • ${testimonial.year}`}
                      {testimonial.department && ` • ${testimonial.department}`}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '5,000+', label: 'Students Mentored' },
            { number: '1,200+', label: 'Active Mentors' },
            { number: '50+', label: 'Departments' },
            { number: '95%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="animate-bounce-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Join the Community?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your mentorship journey today and become part of Ghana's most vibrant 
            academic and professional network.
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

export default TestimonialsSection;