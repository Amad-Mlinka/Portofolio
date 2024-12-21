import { ExperienceItemPostRequest } from '@/app/interfaces/api/requests/experience/create';
import { ExperienceItemEditRequest } from '@/app/interfaces/api/requests/experience/edit';
import { ExperienceFilter } from '@/app/interfaces/experience/ExperienceFilter';
import { ExperienceItem } from '@/app/interfaces/experience/ExperienceItem';

const API_URL = 'http://localhost:3000/api/experience';

export const ExperienceService = {
  getAll: async (): Promise<ExperienceItem[]> => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;
  },

  getById: async (id: number): Promise<ExperienceItem> => {
    const response = await fetch(`${API_URL}?id=${id}`);
    const data = await response.json();
    return data.data;
  },

  getByFilter: async (filter: Partial<ExperienceFilter>): Promise<ExperienceItem[]> => {
    const queryParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => queryParams.append(key, item));
      } else if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
    const response = await fetch(`${API_URL}?${queryParams.toString()}`);
    const data = await response.json();
    return data.data;
  },

  create: async (experience: ExperienceItemPostRequest): Promise<ExperienceItem> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experience),
    });
    const data = await response.json();
    return data.data;
  },

  update: async (experience: ExperienceItemEditRequest): Promise<ExperienceItem> => {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experience),
    });
    const data = await response.json();
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  },

  getByTag: async (tag: string): Promise<ExperienceItem[]> => {
    return ExperienceService.getByFilter({ techStack: [tag] });
  },
};

