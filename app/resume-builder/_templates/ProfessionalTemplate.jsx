//resume-builder/_templates/ProfessionalTemplate.jsx:
import React from 'react';
import { formatDate } from '../_utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ProfessionalTemplate = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, skills, certifications, projects } = resumeData;
  
  return (
    <div className="p-8 font-sans text-gray-800">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="flex flex-wrap mt-2 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center mr-4 mb-2">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center mr-4 mb-2">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center mr-4 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center mr-4 mb-2">
              <Linkedin className="h-4 w-4 mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center mr-4 mb-2">
              <Globe className="h-4 w-4 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}
      
      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Work Experience
          </h2>
          
          <div className="space-y-4">
            {workExperience.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{experience.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="text-gray-700">{experience.company}</div>
                <p className="mt-1 text-gray-600">{experience.description}</p>
                
                {experience.achievements.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-gray-600 text-sm">
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
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{edu.degree} in {edu.field}</h3>
                  <span className="text-gray-600 text-sm">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-gray-700">{edu.institution}</div>
                {edu.description && <p className="mt-1 text-gray-600 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <div key={skill.id} className="mr-2 mb-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Certifications
          </h2>
          
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="font-medium text-gray-800">{cert.name}</span>
                  <span className="text-gray-600"> - {cert.issuer}</span>
                </div>
                <span className="text-gray-600 text-sm">{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
