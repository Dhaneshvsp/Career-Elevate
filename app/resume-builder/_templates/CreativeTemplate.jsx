//resume-builder/_templates/CreativeTemplate.jsx:
import React from 'react';
import { formatDate } from '../_utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const CreativeTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects } = resumeData;

  return (
    <div className="flex h-full font-sans">
      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-800 text-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">
            {personalInfo.firstName}<br />{personalInfo.lastName}
          </h1>

          <div className="mt-4 space-y-2 text-indigo-100 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-600 pb-2">
              Skills
            </h2>

            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}/5</span>
                  </div>
                  <div className="w-full bg-indigo-900 rounded-full h-1.5">
                    <div
                      className="bg-indigo-300 h-1.5 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-600 pb-2">
              Education
            </h2>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <div className="text-indigo-200 text-sm">{edu.institution}</div>
                  <div className="text-indigo-300 text-xs mt-1">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-600 pb-2">
              Certifications
            </h2>

            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-indigo-200 text-sm">{cert.issuer}</div>
                  <div className="text-indigo-300 text-xs">{formatDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 bg-white">
        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Work Experience
            </h2>

            <div className="space-y-6">
              {workExperience.map((experience) => (
                <div key={experience.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-semibold text-gray-900">{experience.position}</h3>
                    <span className="text-indigo-600 text-sm">
                      {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                    </span>
                  </div>
                  <div className="text-indigo-700 font-medium">{experience.company}</div>
                  <p className="mt-2 text-gray-700">{experience.description}</p>

                  {experience.achievements.length > 0 && (
                    <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                      {experience.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Projects
            </h2>

            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                    <span className="text-indigo-600 text-sm">
                      {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-indigo-600 hover:text-indigo-800"
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