import React from 'react';
import { Code, Palette, Smartphone, Star, Headphones } from 'lucide-react';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux", "JavaScript"]
  },
  {
    title: "Framer", 
    skills: ["Framer Motion", "Animations", "Prototyping", "Interactive Design", "Micro-interactions", "UI Components"]
  },
  {
    title: "Virtual Assistant",
    skills: ["Data Entry", "Email Management", "Calendar Scheduling", "Research Tasks", "Content Writing", "Customer Support"]
  },
  {
    title: "Tools",
    skills: ["VS Code", "Postman", "Framer", "Figma", "GitHub", "Vercel"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 border border-blue-200/50">
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Frontend technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-blue-200/50"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-xl ${
                  index === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                  index === 1 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                  index === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                  'bg-gradient-to-r from-orange-500 to-red-500'
                }`}>
                  {index === 0 ? <Code className="w-5 h-5 text-white" /> :
                   index === 1 ? <Palette className="w-5 h-5 text-white" /> :
                   index === 2 ? <Headphones className="w-5 h-5 text-white" /> :
                   <Smartphone className="w-5 h-5 text-white" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {category.title}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 hover:scale-105 cursor-default ${
                      index === 0 ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/50' :
                      index === 1 ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50' :
                      index === 2 ? 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/50' :
                      'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200/50'
                    }`}
                    style={{ animationDelay: `${skillIndex * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              "React Native", "Vite", "HTML/CSS", "Sass/SCSS", "Webpack", "REST APIs"
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 rounded-full font-medium hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 text-sm sm:text-base border border-gray-200/50 hover:border-blue-200/50 cursor-default"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex flex-col items-center space-y-4 bg-gradient-to-r from-blue-50 to-purple-50 p-6 sm:p-8 rounded-2xl border border-blue-200/50 max-w-md mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Ready to Collaborate?
            </h3>
            <p className="text-gray-600 text-center">
              Let's combine these skills to create something amazing together.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start a Project</span>
              <Star className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;