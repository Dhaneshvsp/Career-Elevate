//resume-builder/_templates/MinimalTemplate.jsx:
import React from 'react';
import { formatDate } from '../_utils/helpers';

const MinimalTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects } = resumeData;

  return (
    <div className="p-8 font-sans text-gray-800 max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-gray-600 space-x-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <p className="text-gray-700 text-center">{summary}</p>
        </section>
      )}

      <hr className="my-6 border-gray-200" />

      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">Experience</h2>
          <div className="space-y-5">
            {workExperience.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">{experience.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {formatDate(experience.startDate)} -{' '}
                    {experience.current ? 'Present' : formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="text-gray-700 italic">{experience.company}</div>
                <p className="mt-2 text-gray-600">{experience.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">Education</h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-gray-600 text-sm">
                    {formatDate(edu.startDate)} -{' '}
                    {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-gray-700 italic">{edu.institution}</div>
                {edu.field && <div className="text-gray-600">{edu.field}</div>}
                {edu.description && <p className="mt-2 text-gray-600">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">Certifications</h2>
          <div className="space-y-5">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                <div className="text-gray-700 italic">{cert.issuer}</div>
                <div className="text-gray-600 text-sm">{formatDate(cert.date)}</div>
                {cert.url && (
                  <a href={cert.url} className="text-blue-600 hover:underline text-sm">
                    View Certification
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">Projects</h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <span className="text-gray-600 text-sm">
                    {formatDate(project.startDate)} -{' '}
                    {project.current ? 'Present' : formatDate(project.endDate)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{project.description}</p>
                {project.url && (
                  <a href={project.url} className="text-blue-600 hover:underline text-sm">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;