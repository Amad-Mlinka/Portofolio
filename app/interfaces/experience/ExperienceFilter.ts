export interface ExperienceFilter {
    title?: string;
    company?: string;
    location?: string;
    startDate?:Date;
    endDate?:Date;
    techStack?: string[];
    typeId?: number;
    isActive?: boolean;
    hasFilter: boolean;
  }