// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/CorporateTemplate.jsx
import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { formatDate } from '../_utils/helpers';

const CorporateTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills } = resumeData;

  return (
    <div className="resume-container w-[794px] h-[1123px] mx-auto bg-white p-4 font-sans text-gray-800">
      <div className="flex flex-col md:flex-row">
        {/* Left Column (Contact & Skills) */}
        <div className="w-full md:w-1/3 pr-0 md:pr-4 mb-4 md:mb-0">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-black text-center md:text-left">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="space-y-2 text-xs text-gray-600 mt-2 text-center md:text-left">
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
              {personalInfo.linkedin && (
                <span className="icon-container">
                  <Linkedin className="h-3 w-3 mr-1" />
                  <span>{personalInfo.linkedin}</span>
                </span>
              )}
            </div>
          </div>
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-gray-900 border-b border-gray-300 mb-2">
                Skills
              </h2>
              <ul className="mt-1 space-y-1 text-xs pl-2">
                {skills.map((skill) => (
                  <li key={skill.id}>{skill.name} ({skill.level}/5)</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Summary, Experience, Education) */}
        <div className="w-full md:w-2/3 pl-0 md:pl-4 border-l-0 md:border-l border-gray-300">
          {summary && (
            <section className="mb-4">
              <h2 className="text-base font-semibold text-gray-900 mb-1">About Me</h2>
              <p className="text-xs mt-1 pl-2 line-clamp-5">{summary}</p>
            </section>
          )}
          {workExperience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-base font-semibold text-gray-900 mb-1">Experience</h2>
              <div className="mt-1 space-y-2 pl-2">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="mt-1 line-clamp-3">{exp.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700">
                        {formatDate(exp.startDate)} -{' '}
                        {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {education.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Education</h2>
              <div className="mt-1 space-y-2 pl-2 text-xs">
                {education.map((edu) => (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700">
                        {formatDate(edu.startDate)} -{' '}
                        {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateTemplate;