// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/MinimalTemplate.jsx
import React from 'react';
import { formatDate } from '../_utils/helpers';

const MinimalTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects } = resumeData;

  return (
    <div className="resume-container w-[794px] h-[1123px] mx-auto p-4 font-sans text-gray-800">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-gray-600 text-xs space-x-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> • {personalInfo.phone}</span>}
          {personalInfo.address && <span> • {personalInfo.address}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-4">
          <p className="text-gray-700 text-xs text-center line-clamp-5">{summary}</p>
        </section>
      )}

      <hr className="my-3 border-gray-200" />

      {workExperience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wider">Experience</h2>
          <div className="space-y-2">
            {workExperience.map((experience) => (
              <div key={experience.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">{experience.position}</h3>
                  <span className="text-gray-600">
                    {formatDate(experience.startDate)} -{' '}
                    {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                  </span>
                </div>
                <div className="text-gray-700 italic">{experience.company}</div>
                <p className="mt-1 text-gray-600 line-clamp-3">{experience.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wider">Education</h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-gray-600">
                    {formatDate(edu.startDate)} -{' '}
                    {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </span>
                </div>
                <div className="text-gray-700 italic">{edu.institution}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-1 text-xs">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wider">Certifications</h2>
          <div className="space-y-1 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                <div className="text-gray-700 italic">{cert.issuer}</div>
                <div className="text-gray-600">{formatDate(cert.date)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wider">Projects</h2>
          <div className="space-y-2 text-xs">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <span className="text-gray-600">
                    {formatDate(project.startDate)} -{' '}
                    {project.endDate ? formatDate(project.endDate) : 'Present'}
                  </span>
                </div>
                <p className="mt-1 text-gray-600 line-clamp-3">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;