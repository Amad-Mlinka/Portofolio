
export interface ExperienceItemEditRequest {
  id: number;
  title?: string;
  company?: string;
  location?: string; 
  duration?: string; 
  description?: string;
  techStack?: string[];
  isActive?: boolean;
  typeId?: number; 
}
