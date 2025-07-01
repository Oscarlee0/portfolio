import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if we're on Netlify by looking for the netlify hostname or if form submission works
      const isNetlify = window.location.hostname.includes('netlify') || 
                       window.location.hostname !== 'localhost';
      
      if (isNetlify) {
        // Try Netlify Forms first
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }).toString(),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Netlify form submission failed');
        }
      } else {
        // For local development or non-Netlify deployments, use mailto fallback
        throw new Error('Not on Netlify, using mailto fallback');
      }
    } catch (error) {
      console.log('Form submission failed, using mailto fallback:', error);
      // Use mailto as fallback
      handleMailtoFallback();
      setSubmitStatus('success'); // Show success since mailto will open
    } finally {
      setIsSubmitting(false);
    }
  };

  // mailto fallback method
  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:obetta.oscar11@gmail.com?subject=${subject}&body=${body}`;
    
    // Open mailto link
    window.location.href = mailtoUrl;
    
    // Clear form after opening mailto
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to work together? I'd love to hear about your project and discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Creative Illustration */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Let's Create Something Amazing
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                I'm passionate about turning ideas into beautiful, functional digital experiences. Let's collaborate and build something extraordinary together.
              </p>
            </div>

            {/* Creative SVG Illustration */}
            <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-8 border border-indigo-100 overflow-hidden">
              {/* Animated Background Elements - Reduced Size */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse" />
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-8 w-4 h-4 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-30 animate-bounce" />
              </div>

              {/* Main Creative SVG */}
              <div className="relative z-10">
                <svg width="50%" height="220" viewBox="0 0 400 320" className="mx-auto">
                  <defs>
                    <linearGradient id="creativeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    <linearGradient id="creativeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                    <linearGradient id="creativeGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Creative Workspace */}
                  <g transform="translate(50, 50)">
                    {/* Main Canvas/Screen */}
                    <rect x="80" y="40" width="140" height="100" rx="8" fill="white" stroke="url(#creativeGradient1)" strokeWidth="3" />
                    <rect x="90" y="50" width="120" height="80" rx="4" fill="url(#creativeGradient1)" opacity="0.1" />
                    
                    {/* Design Elements on Canvas */}
                    <circle cx="130" cy="80" r="15" fill="url(#creativeGradient2)" opacity="0.8" />
                    <rect x="160" y="70" width="25" height="20" rx="3" fill="url(#creativeGradient3)" opacity="0.8" />
                    <polygon points="110,100 125,85 140,100" fill="url(#creativeGradient1)" opacity="0.7" />
                  </g>

                  {/* Floating Creative Tools */}
                  <g className="animate-bounce" style={{ animationDuration: '2s' }}>
                    {/* Pencil */}
                    <g transform="translate(60, 120) rotate(-15)">
                      <rect x="0" y="0" width="4" height="40" fill="url(#creativeGradient3)" />
                      <polygon points="0,0 4,0 2,-8" fill="#FCD34D" />
                      <rect x="0" y="35" width="4" height="8" fill="#F87171" />
                    </g>
                  </g>

                  <g className="animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                    {/* Brush */}
                    <g transform="translate(320, 100) rotate(20)">
                      <rect x="0" y="0" width="3" height="35" fill="#8B4513" />
                      <ellipse cx="1.5" cy="-5" rx="6" ry="8" fill="url(#creativeGradient2)" />
                    </g>
                  </g>

                  {/* Idea Lightbulb */}
                  <g transform="translate(280, 60)" className="animate-pulse">
                    <circle cx="15" cy="15" r="12" fill="url(#creativeGradient3)" opacity="0.9" filter="url(#glow)" />
                    <path d="M15 5 L15 25 M8 12 L22 12 M10 8 L20 8 M10 20 L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="15" cy="15" r="8" fill="none" stroke="white" strokeWidth="2" />
                  </g>

                  {/* Collaboration Hands */}
                  <g transform="translate(100, 180)">
                    {/* Hand 1 */}
                    <path d="M20 30 Q25 25 30 30 Q35 25 40 30 Q45 25 50 30 Q55 35 50 40 L25 40 Q15 35 20 30" 
                          fill="url(#creativeGradient1)" opacity="0.8" />
                    {/* Hand 2 */}
                    <path d="M150 30 Q145 25 140 30 Q135 25 130 30 Q125 25 120 30 Q115 35 120 40 L145 40 Q155 35 150 30" 
                          fill="url(#creativeGradient2)" opacity="0.8" />
                    
                    {/* Connecting Spark */}
                    <g transform="translate(85, 35)" className="animate-ping">
                      <polygon points="0,0 3,6 6,0 3,3" fill="url(#creativeGradient3)" />
                    </g>
                  </g>

                  {/* Creative Particles */}
                  <g className="animate-pulse">
                    <circle cx="80" cy="80" r="2" fill="url(#creativeGradient1)" opacity="0.6" />
                    <circle cx="320" cy="120" r="3" fill="url(#creativeGradient2)" opacity="0.6" />
                    <circle cx="100" cy="250" r="2" fill="url(#creativeGradient3)" opacity="0.6" />
                    <circle cx="300" cy="200" r="2" fill="url(#creativeGradient1)" opacity="0.6" />
                  </g>

                  {/* Flowing Creative Energy */}
                  <g stroke="url(#creativeGradient1)" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="8,4">
                    <path d="M50 160 Q200 120 350 180" className="animate-pulse" />
                    <path d="M80 200 Q200 240 320 200" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  </g>

                  {/* Success/Achievement Stars */}
                  <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                    <g transform="translate(300, 40)">
                      <polygon points="8,2 10,6 14,6 11,9 12,13 8,11 4,13 5,9 2,6 6,6" fill="url(#creativeGradient3)" />
                    </g>
                    <g transform="translate(70, 200)">
                      <polygon points="6,1 7,4 10,4 8,6 9,9 6,8 3,9 4,6 2,4 5,4" fill="url(#creativeGradient2)" />
                    </g>
                  </g>
                </svg>

                {/* Inspirational Text */}
                <div className="mt-6 text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    ✨ Ready to Create Magic? ✨
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every great project starts with a conversation. Let's turn your vision into reality.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Current Availability
              </h4>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 text-sm sm:text-base">
                  Available for new projects
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  {window.location.hostname === 'localhost' 
                    ? 'Your email client should open shortly!' 
                    : 'Message sent successfully! I\'ll get back to you soon.'
                  }
                </span>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 font-medium">Failed to send message</span>
                </div>
                <button
                  onClick={handleMailtoFallback}
                  className="text-red-600 hover:text-red-700 underline text-sm"
                >
                  Click here to send via your email client instead
                </button>
              </div>
            )}

            {/* Netlify Form - Hidden for JavaScript submission */}
            <form name="contact" netlify netlify-honeypot="bot-field" hidden>
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="text" name="subject" />
              <textarea name="message"></textarea>
            </form>

            {/* Actual Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Honeypot field for spam protection */}
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm sm:text-base disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm sm:text-base disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm sm:text-base disabled:opacity-50"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-colors duration-200 text-sm sm:text-base disabled:opacity-50"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Development Notice */}
            {window.location.hostname === 'localhost' && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Development Mode:</strong> The form will open your email client since Netlify Forms only work on deployed sites.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;