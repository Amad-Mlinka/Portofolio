export interface ExperienceItemPostRequest {
  title: string;
  company: string;
  location: string;
  description: string;
  techStack: string[];
  isActive?: boolean; 
  typeId: number; 
  startDate: Date;
  endDate: Date;
}
