// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/ProfessionalTemplate.jsx
import React from 'react';
import { formatDate } from '../_utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ProfessionalTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects } = resumeData;

  return (
    <div className="resume-container w-[794px] h-[1123px] mx-auto p-4 font-sans text-gray-800">
      {/* Header */}
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex justify-center flex-wrap mt-1 text-sm">
          {personalInfo.email && (
            <span className="icon-container flex items-center mr-2 mb-1">
              <Mail className="h-4 w-4 mr-2" />
              <span>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="icon-container flex items-center mr-2 mb-1">
              <Phone className="h-4 w-4 mr-2" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.address && (
            <span className="icon-container flex items-center mr-2 mb-1">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{personalInfo.address}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="icon-container flex items-center mr-2 mb-1">
              <Linkedin className="h-4 w-4 mr-2" />
              <span>{personalInfo.linkedin}</span>
            </span>
          )}
          {personalInfo.website && (
            <span className="icon-container flex items-center mr-2 mb-1">
              <Globe className="h-4 w-4 mr-2" />
              <span>{personalInfo.website}</span>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
            Professional Summary
          </h2>
          <p className="text-gray-800 text-base pl-2 line-clamp-5">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
            Work Experience
          </h2>
          <div className="space-y-2 pl-2">
            {workExperience.map((experience) => (
              <div key={experience.id} className="grid grid-cols-2 gap-2 text-base">
                <div>
                  <h3 className="font-semibold">{experience.position}</h3>
                  <div>{experience.company}</div>
                  <p className="mt-1 line-clamp-3">{experience.description}</p>
                </div>
                <div className="text-right">
                  <span>
                    {formatDate(experience.startDate)} -{' '}
                    {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
            Education
          </h2>
          <div className="space-y-2 pl-2 text-base">
            {education.map((edu) => (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <div>{edu.institution}</div>
                </div>
                <div className="text-right">
                  <span>
                    {formatDate(edu.startDate)} -{' '}
                    {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1 pl-2 text-base">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2 py-0.5 rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
            Certifications
          </h2>
          <div className="space-y-1 pl-2 text-base">
            {certifications.map((cert) => (
              <div key={cert.id} className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">{cert.name}</span>
                  <span> - {cert.issuer}</span>
                </div>
                <div className="text-right">
                  <span>{formatDate(cert.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
            Projects
          </h2>
          <div className="space-y-2 pl-2 text-base">
            {projects.map((project) => (
              <div key={project.id} className="grid grid-cols-2 gap-2">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="mt-1 line-clamp-3">{project.description}</p>
                </div>
                <div className="text-right">
                  <span>
                    {formatDate(project.startDate)} -{' '}
                    {project.endDate ? formatDate(project.endDate) : 'Present'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;