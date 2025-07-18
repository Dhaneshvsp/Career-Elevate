// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_templates/GeometricTemplate.jsx
import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { formatDate } from '../_utils/helpers';

const GeometricTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills } = resumeData;

  return (
    <div className="resume-container w-[794px] h-[1123px] mx-auto bg-white p-4 font-sans">
      {/* Header */}
      <div className="bg-teal-600 text-white p-3 rounded-t-lg">
        <h1 className="text-2xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex space-x-3 text-xs mt-1">
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

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        {/* Left Column: Summary + Skills */}
        <div className="col-span-1 space-y-3">
          {summary && (
            <section>
              <h2 className="text-base font-semibold text-coral-600 border-b-2 border-coral-600">
                About
              </h2>
              <p className="text-xs mt-1">{summary}</p>
            </section>
          )}
          {skills.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-coral-600 border-b-2 border-coral-600">
                Skills
              </h2>
              <div className="mt-1 space-y-1">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center">
                    <svg
                      className="w-8 h-8 text-teal-200"
                      viewBox="0 0 100 100"
                    >
                      <polygon
                        points="50,10 90,30 90,70 50,90 10,70 10,30"
                        fill="currentColor"
                      />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fill="#000"
                        fontSize="20"
                      >
                        {skill.level}
                      </text>
                    </svg>
                    <span className="text-xs ml-2">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Experience + Education */}
        <div className="col-span-2 space-y-3">
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-coral-600 border-b-2 border-coral-600">
                Experience
              </h2>
              <div className="space-y-2 mt-1">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-teal-600">
                        {formatDate(exp.startDate)} -{' '}
                        {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                    </div>
                    <p className="mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {education.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-coral-600 border-b-2 border-coral-600">
                Education
              </h2>
              <div className="space-y-2 mt-1">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-teal-600">
                      {formatDate(edu.startDate)} -{' '}
                      {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    </p>
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

export default GeometricTemplate;