import React from 'react';
import { BookOpenCheck, Upload, BarChart4, Globe, Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Empower Your Publishing Journey
                </h1>
                <p className="text-xl mb-8 text-green-50">
                  The complete platform for Nigerian authors to publish, track, and distribute their stories to the world.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-white"
                  >
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-700"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 mt-10 md:mt-0">
                <div className="relative">
                  <div className="bg-white p-6 rounded-lg shadow-lg transform rotate-3 transition-transform duration-300 hover:rotate-0">
                    <div className="bg-green-50 p-4 rounded">
                      <div className="h-8 bg-green-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-green-100 rounded w-1/2 mb-3"></div>
                      <div className="h-4 bg-green-100 rounded w-5/6 mb-3"></div>
                      <div className="h-4 bg-green-100 rounded w-4/6"></div>
                      <div className="mt-6 flex justify-between items-center">
                        <div className="h-10 w-24 bg-green-500 rounded"></div>
                        <div className="h-4 w-20 bg-green-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-12 -right-4 bg-white p-6 rounded-lg shadow-lg transform -rotate-6 transition-transform duration-300 hover:rotate-0">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="h-24 bg-gray-100 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Streamlined Publishing Workflow</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform helps Nigerian authors navigate the publishing process with ease, from manuscript submission to global distribution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Upload className="h-10 w-10 text-green-600" />,
                  title: 'Easy Uploads',
                  description: 'Submit manuscripts in docx or pdf format with our intuitive upload system.',
                },
                {
                  icon: <BookOpenCheck className="h-10 w-10 text-blue-600" />,
                  title: 'Format Validation',
                  description: 'Automated checks for margins, fonts, and required metadata.',
                },
                {
                  icon: <BarChart4 className="h-10 w-10 text-purple-600" />,
                  title: 'Real-time Tracking',
                  description: 'Monitor your manuscript\'s progress through each publishing stage.',
                },
                {
                  icon: <Globe className="h-10 w-10 text-orange-600" />,
                  title: 'Global Distribution',
                  description: 'Connect with global platforms to reach readers worldwide.',
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                A simple, streamlined process to take your manuscript from draft to published work.
              </p>
            </div>
            
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-green-200 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: 1,
                    title: 'Upload Manuscript',
                    description: 'Submit your document in docx or pdf format through our user-friendly interface.',
                  },
                  {
                    step: 2,
                    title: 'Review & Editing',
                    description: 'Our team reviews your manuscript and provides professional editing services.',
                  },
                  {
                    step: 3,
                    title: 'Design & Layout',
                    description: 'Your manuscript is formatted and designed according to industry standards.',
                  },
                  {
                    step: 4,
                    title: 'Publish & Distribute',
                    description: 'Your finished work is published and distributed through our global network.',
                  },
                ].map((step, index) => (
                  <div key={index} className="relative z-10">
                    <div className="bg-white rounded-lg shadow-md p-6 h-full">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-white">
                        <span className="text-green-800 font-bold">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-center">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-green-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Publishing Journey?</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Join hundreds of Nigerian authors who have successfully published their works through our platform.
                    </p>
                    <Link to="/signup">
                      <Button
                        size="lg"
                        variant="primary"
                        icon={<ArrowRight className="w-5 h-5" />}
                        iconPosition="right"
                      >
                        Start Publishing Today
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-green-50 p-10 flex items-center justify-center">
                  <div className="text-center">
                    <Book className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-xs mx-auto">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-4 bg-gray-200 w-16 rounded"></div>
                        <div className="h-4 bg-green-200 w-8 rounded"></div>
                      </div>
                      <div className="h-6 bg-gray-100 w-full rounded mb-3"></div>
                      <div className="h-4 bg-gray-100 w-3/4 rounded mb-3"></div>
                      <div className="h-4 bg-gray-100 w-5/6 rounded"></div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="h-8 bg-green-100 w-20 rounded"></div>
                        <div className="h-8 bg-green-500 w-20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">What Authors Say</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from Nigerian authors who have successfully published with our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "This platform revolutionized my publishing experience. The formatting tools saved me countless hours of work.",
                  author: "Chioma Okafor",
                  role: "Fiction Author",
                },
                {
                  quote: "I was able to track every stage of my book's journey from manuscript to publication. The transparency was refreshing.",
                  author: "Adebayo Johnson",
                  role: "Non-fiction Writer",
                },
                {
                  quote: "The global distribution options helped my poetry collection reach readers I never thought possible.",
                  author: "Ngozi Okonkwo",
                  role: "Poet",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex justify-center mb-6">
                    <svg className="h-12 w-12 text-green-400" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-center mb-6 italic">"{testimonial.quote}"</p>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;