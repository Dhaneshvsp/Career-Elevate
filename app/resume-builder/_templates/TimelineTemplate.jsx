// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/TimelineTemplate.jsx
import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { formatDate } from '../_utils/helpers';

const TimelineTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills } = resumeData;

  return (
    <div className="resume-container w-[794px] h-[1123px] mx-auto bg-white p-4 font-sans relative overflow-hidden">
      {/* Timeline Line */}
      <div className="absolute left-1/2 w-1 h-[90%] top-24 bg-gradient-to-b from-purple-500 to-purple-700 transform -translate-x-1/2"></div>

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex justify-center space-x-2 text-xs text-gray-600 mt-1">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-3 w-3 mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-4 text-center">
          <h2 className="text-base font-semibold text-purple-600">About Me</h2>
          <p className="text-xs mt-1 max-w-md mx-auto">{summary}</p>
        </section>
      )}

      {/* Timeline Content */}
      <div className="space-y-6 relative">
        {workExperience.map((exp, index) => (
          <div
            key={exp.id}
            className={`flex items-center w-full ${
              index % 2 === 0 ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`w-5/12 p-3 bg-gray-50 rounded-lg text-xs shadow-sm ${
                index % 2 === 0 ? 'mr-4' : 'ml-4'
              }`}
            >
              <div
                className={`absolute w-4 h-4 bg-purple-500 rounded-full ${
                  index % 2 === 0 ? 'right-[45%]' : 'left-[45%]'
                } -translate-y-1/2`}
              ></div>
              <h3 className="font-medium">{exp.position}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-purple-600">
                {formatDate(exp.startDate)} -{' '}
                {exp.endDate ? formatDate(exp.endDate) : 'Present'}
              </p>
              <p className="mt-1 line-clamp-3">{exp.description}</p>
            </div>
          </div>
        ))}
        {education.map((edu, index) => {
          const totalEdu = education.length;
          const isLast = index === totalEdu - 1;
          return (
            <div
              key={edu.id}
              className={`flex items-center w-full ${
                index % 2 === 0 ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`w-5/12 p-3 bg-gray-50 rounded-lg text-xs shadow-sm ${
                  index % 2 === 0 ? 'mr-4' : 'ml-4'
                } ${isLast ? 'mb-4' : ''}`}
              >
                <div
                  className={`absolute w-4 h-4 bg-purple-500 rounded-full ${
                    index % 2 === 0 ? 'right-[45%]' : 'left-[45%]'
                  } -translate-y-1/2`}
                ></div>
                <h3 className="font-medium">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-purple-600">
                  {formatDate(edu.startDate)} -{' '}
                  {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="text-center">
          <h2 className="text-base font-semibold text-purple-600">Skills</h2>
          <div className="flex justify-center flex-wrap gap-2 text-xs mt-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded"
              >
                {skill.name} ({skill.level}/5)
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TimelineTemplate;