// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/PortfolioTemplate.jsx
import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { formatDate } from '../_utils/helpers';

const PortfolioTemplate = ({ resumeData }) => {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    certifications,
    projects,
  } = resumeData;

  return (
    <div className="w-[794px] h-[1123px] mx-auto bg-white p-6 font-sans text-gray-800">
      {/* Header */}
      <div className="text-center border border-gray-300 p-4 rounded mb-6 bg-gray-150">
        <h1 className="text-3xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex justify-center space-x-4 text-sm text-gray-600 mt-2">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              {personalInfo.linkedin}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5 text-sm">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-lg font-semibold border-b mb-1">About Me</h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b mb-1">Experience</h2>
            <ul className="list-disc pl-5 space-y-3">
              {workExperience.map((exp) => (
                <li key={exp.id}>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{exp.position}</p>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-gray-500">
                      {formatDate(exp.startDate)} –{' '}
                      {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </div>
                  </div>
                  {exp.descriptionBullets ? (
                    <ul className="list-disc pl-5 mt-1 text-gray-700 space-y-1">
                      {exp.descriptionBullets.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 mt-1">{exp.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b mb-1">Education</h2>
            <ul className="list-disc pl-5 space-y-2">
              {education.map((edu) => (
                <li key={edu.id} className="flex justify-between">
                  <div>
                    <p className="font-semibold">{edu.degree}</p>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-gray-500">
                    {formatDate(edu.startDate)} –{' '}
                    {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b mb-1">Skills</h2>
            <div className="flex flex-wrap gap-2 text-gray-700">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-gray-100 px-2 py-1 rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b mb-1">Certifications</h2>
            <ul className="list-disc pl-5 space-y-1">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{cert.name}</span> —{' '}
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="text-gray-500">{formatDate(cert.date)}</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b mb-1">Projects</h2>
            <ul className="list-disc pl-5 space-y-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{project.name}</p>
                    <span className="text-gray-500">
                      {formatDate(project.startDate)} –{' '}
                      {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </span>
                  </div>
                  {project.descriptionBullets ? (
                    <ul className="list-disc pl-5 mt-1 text-gray-700 space-y-1">
                      {project.descriptionBullets.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 mt-1">{project.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default PortfolioTemplate;
