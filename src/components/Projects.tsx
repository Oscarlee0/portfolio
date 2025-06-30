import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Zap, Palette, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjects, Project } from '../lib/contentful';

const categoryIcons = {
  "Web App": <Zap className="w-4 h-4" />,
  "Dashboard": <Palette className="w-4 h-4" />,
  "Data Viz": <Sparkles className="w-4 h-4" />,
  "Portfolio": <ArrowUpRight className="w-4 h-4" />
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await getProjects();
        // Filter to show only featured projects
        const featuredProjects = fetchedProjects.filter(project => project.featured);
        setProjects(featuredProjects);
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

  const handleViewMore = () => {
    navigate('/projects');
  };

  const toggleDescription = (projectId: string) => {
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedDescriptions(newExpanded);
  };

  const getShortDescription = (description: string) => {
    // Cut to exactly 70 characters
    if (description.length <= 70) return description;
    
    // Find the last space before or at 70 characters to avoid cutting words
    let cutPoint = 70;
    while (cutPoint > 0 && description[cutPoint] !== ' ') {
      cutPoint--;
    }
    
    // If no space found, just cut at 70
    if (cutPoint === 0) cutPoint = 70;
    
    return description.substring(0, cutPoint).trim() + '...';
  };

  const needsExpansion = (description: string) => {
    return description.length > 70;
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Featured Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Creative
              <span className="block sm:inline sm:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                Projects
              </span>
            </h2>
          </div>
          
          {/* Loading Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Projects</h3>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">Please check your Contentful configuration.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-30 blur-xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Featured Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Creative
            <span className="block sm:inline sm:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
              Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore my featured frontend projects where creativity meets functionality. 
            Each project tells a unique story of problem-solving and innovation.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                } ${index === 0 ? 'lg:row-span-2' : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full object-cover transition-all duration-700 ${
                        project.featured ? 'h-64 sm:h-80' : 'h-48 sm:h-56'
                      } group-hover:scale-110`}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      {categoryIcons[project.category as keyof typeof categoryIcons] || <ArrowUpRight className="w-4 h-4" />}
                      <span className="text-xs font-medium text-gray-700">{project.category}</span>
                    </div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ Featured
                    </div>

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
                    
                    {/* Description with expand/collapse */}
                    <div className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                      <p>
                        {expandedDescriptions.has(project.id) 
                          ? project.description 
                          : getShortDescription(project.description)
                        }
                      </p>
                      
                      {/* Show "click here" only if description needs expansion */}
                      {needsExpansion(project.description) && (
                        <button
                          onClick={() => toggleDescription(project.id)}
                          className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium text-sm mt-2 transition-colors duration-200"
                        >
                          <Eye className="w-3 h-3" />
                          <span>
                            {expandedDescriptions.has(project.id) ? 'Show less' : 'Click here to read more'}
                          </span>
                        </button>
                      )}
                    </div>

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
        ) : (
          <div className="text-center py-16">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">No Featured Projects</h3>
              <p className="text-yellow-600 mb-4">
                No projects are currently marked as featured. Mark some projects as featured in your Contentful CMS to display them here.
              </p>
              <button
                onClick={handleViewMore}
                className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200"
              >
                <span>View All Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* View More Button - Only show if there are featured projects */}
        {projects.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewMore}
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>View More Projects</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-4 bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900">
              Like What You See?
            </h3>
            <p className="text-gray-600 max-w-md">
              These are just a few highlights. I'd love to show you more and discuss your next project.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;