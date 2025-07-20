import React from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-2 ">
      {/* Creative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce" />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 animate-bounce" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-2 ">
        <div className="space-y-6 sm:space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight pt-3">
              Transforming Ideas Into
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                Digital Experiences
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Frontend developer specializing in React, TypeScript, and modern web technologies. 
              I create pixel-perfect, responsive interfaces that users love to interact with.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={scrollToProjects}
              className="group flex items-center space-x-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3 border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600 font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 pt-6 sm:pt-8">
            <a
              href="https://github.com/Oscarlee0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:bg-purple-50"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </a>
            <a
              href="https://www.linkedin.com/in/oscarobetta/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:bg-blue-50"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </a>
            <a
              href="mailto:alex@example.com"
              className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:bg-indigo-50"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce "
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 " />
      </button>
    </section>
  );
};

export default Hero;