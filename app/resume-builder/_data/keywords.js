export const industryKeywords = {
    software: [
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C#', 'AWS', 'Azure', 
      'Docker', 'Kubernetes', 'CI/CD', 'Agile', 'Scrum', 'REST API', 'GraphQL', 'MongoDB', 
      'SQL', 'PostgreSQL', 'Redis', 'Microservices', 'Git', 'GitHub', 'GitLab', 'Jenkins',
      'TDD', 'Unit Testing', 'Integration Testing', 'Full Stack', 'Frontend', 'Backend',
      'DevOps', 'Cloud Computing', 'Serverless', 'Machine Learning', 'AI', 'Data Science'
    ],
    design: [
      'UI/UX', 'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InDesign', 
      'Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems',
      'Typography', 'Color Theory', 'Responsive Design', 'Mobile Design', 'Web Design',
      'Interaction Design', 'Visual Design', 'Branding', 'Logo Design', 'Illustration'
    ],
    marketing: [
      'SEO', 'SEM', 'Google Analytics', 'Google Ads', 'Facebook Ads', 'Instagram', 'TikTok',
      'Content Marketing', 'Email Marketing', 'Social Media Marketing', 'Influencer Marketing',
      'Brand Strategy', 'Market Research', 'Customer Acquisition', 'CRM', 'Hubspot', 'Mailchimp',
      'A/B Testing', 'Conversion Rate Optimization', 'Growth Hacking', 'Campaign Management'
    ],
    finance: [
      'Financial Analysis', 'Financial Modeling', 'Excel', 'PowerBI', 'Tableau', 'SQL',
      'Accounting', 'Budgeting', 'Forecasting', 'Risk Management', 'Investment Analysis',
      'Portfolio Management', 'Valuation', 'M&A', 'Financial Reporting', 'Compliance',
      'Taxation', 'Audit', 'Banking', 'Insurance', 'Real Estate', 'Capital Markets'
    ],
    healthcare: [
      'Electronic Health Records', 'HIPAA', 'Clinical Research', 'Patient Care', 'Medical Coding',
      'Healthcare Administration', 'Telemedicine', 'Healthcare IT', 'Medical Devices',
      'Pharmaceutical', 'Biotechnology', 'Public Health', 'Health Insurance', 'Regulatory Affairs',
      'Quality Assurance', 'Clinical Trials', 'Patient Advocacy', 'Healthcare Policy'
    ]
  };
  
  export const suggestKeywords = (text, industry = 'software') => {
    const keywords = industryKeywords[industry] || industryKeywords.software;
    const relevantKeywords = keywords.filter(keyword => 
      !text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    // Return a random selection of 3-5 keywords
    const count = Math.floor(Math.random() * 3) + 3;
    const shuffled = relevantKeywords.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  