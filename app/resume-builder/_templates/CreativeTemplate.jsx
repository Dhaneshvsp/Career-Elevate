// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/CreativeTemplate.jsx
import React from 'react';
import { formatDate } from '../_utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const CreativeTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects } = resumeData;

  return (
    <div className="resume-container w-[794px] h-[1123px] mx-auto bg-white p-4 font-sans text-gray-800 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-800 text-white p-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-1">
            {personalInfo.firstName} <br /> {personalInfo.lastName}
          </h1>
          <div className="mt-2 space-y-1 text-xs text-indigo-100">
            {personalInfo.email && (
              <span className="icon-container">
                <Mail className="h-3 w-3 mr-1" />
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="icon-container">
                <Phone className="h-3 w-3 mr-1" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.address && (
              <span className="icon-container">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{personalInfo.address}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="icon-container">
                <Linkedin className="h-3 w-3 mr-1" />
                <span>{personalInfo.linkedin}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="icon-container">
                <Globe className="h-3 w-3 mr-1" />
                <span>{personalInfo.website}</span>
              </span>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 border-b border-indigo-600 pb-1">
              Skills
            </h2>
            <div className="space-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="text-xs">
                  <div className="flex justify-between mb-0.5">
                    <span>{skill.name}</span>
                    <span>{skill.level}/5</span>
                  </div>
                  <div className="w-full bg-indigo-900 rounded-full h-1">
                    <div
                      className="bg-indigo-300 h-1 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 border-b border-indigo-600 pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <div className="text-indigo-200">{edu.institution}</div>
                  <div className="text-indigo-300">
                    {formatDate(edu.startDate)} -{' '}
                    {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2 border-b border-indigo-600 pb-1">
              Certifications
            </h2>
            <div className="space-y-1 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-indigo-200">{cert.issuer}</div>
                  <div className="text-indigo-300">{formatDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-4 bg-white">
        {summary && (
          <section className="mb-4">
            <h2 className="text-lg font-bold text-indigo-800 mb-2">About Me</h2>
            <p className="text-gray-700 text-xs leading-relaxed line-clamp-5">{summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-bold text-indigo-800 mb-2">Work Experience</h2>
            <div className="space-y-3">
              {workExperience.map((experience) => (
                <div key={experience.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900">{experience.position}</h3>
                    <span className="text-indigo-600">
                      {formatDate(experience.startDate)} -{' '}
                      {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                    </span>
                  </div>
                  <div className="text-indigo-700 font-medium">{experience.company}</div>
                  <p className="mt-1 text-gray-700 line-clamp-3">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-bold text-indigo-800 mb-2">Projects</h2>
            <div className="space-y-3 text-xs">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <span className="text-indigo-600">
                      {formatDate(project.startDate)} -{' '}
                      {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700 line-clamp-3">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-xs hover:text-indigo-800"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;