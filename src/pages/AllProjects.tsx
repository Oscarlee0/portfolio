import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowLeft, Sparkles, Zap, Palette, ArrowUpRight } from 'lucide-react';
import { getProjects, Project } from '../lib/contentful';

const categoryIcons = {
  "Web App": <Zap className="w-4 h-4" />,
  "Dashboard": <Palette className="w-4 h-4" />,
  "Data Viz": <Sparkles className="w-4 h-4" />,
  "Portfolio": <ArrowUpRight className="w-4 h-4" />
};

const AllProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              All Projects
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg">
                <div className="h-48 sm:h-56 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Projects</h3>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">Please check your Contentful configuration.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-30 blur-xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <button
            onClick={goBack}
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Complete Portfolio</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            All
            <span className="block sm:inline sm:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
              Projects
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of my frontend development work, featuring {projects.length} projects 
            that demonstrate creativity, technical expertise, and attention to detail.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 sm:h-56 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    {categoryIcons[project.category as keyof typeof categoryIcons] || <ArrowUpRight className="w-4 h-4" />}
                    <span className="text-xs font-medium text-gray-700">{project.category}</span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-medium text-gray-800 hover:bg-white transition-all duration-200 transform hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full font-medium text-white hover:bg-gray-900 transition-all duration-200 transform hover:scale-105"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                          hoveredProject === project.id
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white transform scale-105'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                        style={{ transitionDelay: `${techIndex * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16 pb-16">
          <div className="inline-flex flex-col items-center space-y-4 bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 max-w-md">
              Let's discuss how we can bring your ideas to life with the same attention to detail and creativity.
            </p>
            <button
              onClick={() => {
                window.location.href = '/#contact';
              }}
              className="group flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;