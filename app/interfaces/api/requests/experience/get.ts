import { ExperienceFilter } from "@/app/interfaces/experience/ExperienceFilter";

export interface ExperienceItemGetRequest {
    filter: ExperienceFilter;
    page: number;           
    countPerPage: number;   
  }