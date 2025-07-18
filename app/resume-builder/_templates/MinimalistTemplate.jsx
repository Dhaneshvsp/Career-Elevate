// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/MinimalistTemplate.jsx
import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { formatDate } from '../_utils/helpers';

const MinimalistTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills } = resumeData;

  return (
    <div className="resume-container w-[794px] h-[1123px] mx-auto bg-white p-4 font-sans text-gray-800">
      {/* Header */}
      <div className="border-b border-gray-300 pb-2 mb-4 text-center">
        <h1 className="text-2xl font-serif font-bold text-black">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex justify-center space-x-3 text-xs text-gray-600 mt-1">
          {personalInfo.email && (
            <span className="icon-container flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="icon-container flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="icon-container flex items-center">
              <Linkedin className="h-3 w-3 mr-1" />
              <span>{personalInfo.linkedin}</span>
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-base font-semibold text-navy-800 border-l-4 border-navy-800 pl-2 mb-1">
            About Me
          </h2>
          <p className="text-xs mt-1 pl-2 line-clamp-5">{summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-semibold text-navy-800 border-l-4 border-navy-800 pl-2 mb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-1 pl-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs bg-gray-100 text-navy-800 px-2 py-1 rounded"
              >
                {skill.name} ({skill.level}/5)
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-semibold text-navy-800 border-l-4 border-navy-800 pl-2 mb-1">
            Experience
          </h2>
          <div className="space-y-2 mt-1 pl-2">
            {workExperience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-xs mt-1 line-clamp-3">{exp.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-navy-600">
                    {formatDate(exp.startDate)} -{' '}
                    {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-semibold text-navy-800 border-l-4 border-navy-800 pl-2 mb-1">
            Education
          </h2>
          <div className="space-y-2 mt-1 pl-2">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-navy-600">
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
  );
};

export default MinimalistTemplate;