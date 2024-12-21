import ExperienceType from "./ExperienceType";

export interface ExperienceItem {
  title: string;
  company: string;
  companyLink?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
  type: ExperienceType;
  techStack: string[]; 
  isActive?: boolean;
  link?: string;
}