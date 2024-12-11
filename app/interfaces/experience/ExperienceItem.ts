import ExperienceType from "./ExperienceType";

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  type: ExperienceType;
  techStack: string[]; 
  isActive?: boolean;
}