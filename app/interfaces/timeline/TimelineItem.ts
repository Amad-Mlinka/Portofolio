export interface TimelineItem {
  title: string;
  company?: string;
  location?: string;
  duration: string;
  description: string;
  type: string;
  techStack: string[]; 
  isActive?: boolean;
}