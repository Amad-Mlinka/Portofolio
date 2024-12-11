// services/experienceService.ts

import { ExperienceItemPostRequest } from "../interfaces/api/requests/experience/create";
import { ExperienceItemEditRequest } from "../interfaces/api/requests/experience/edit";
import { ExperienceItem } from "../interfaces/experience/ExperienceItem";

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
export async function fetchExperienceData() : Promise<ExperienceItem[]> {
    try {
        const res = await fetch(`${baseUrl}/api/experience`,
            {cache:"force-cache"}
        );
        if (!res.ok) {
            throw new Error('Failed to fetch experience data');
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching experience data:', error);
        throw error;
    }
}

export async function fetchExperienceDataByID(id : number) : Promise<ExperienceItem> {
    try {
        const res = await fetch(`${baseUrl}/api/experience?id=${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch experience data');
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching experience data:', error);
        throw error;
    }
}

export async function createExperience(experienceData: ExperienceItemPostRequest) : Promise<ExperienceItem> {
    try {
        const res = await fetch(`${baseUrl}/api/experience`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(experienceData),
        });

        if (!res.ok) {
            throw new Error('Failed to create experience');
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error creating experience:', error);
        throw error;
    }
}

export async function updateExperience(experienceData: ExperienceItemEditRequest): Promise<ExperienceItem> {
    try {
        const res = await fetch(`${baseUrl}/api/experience`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...experienceData }),
        });

        if (!res.ok) {
            throw new Error('Failed to update experience');
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error updating experience:', error);
        throw error;
    }
}

export async function deleteExperience(id: number) {
    try {
        const res = await fetch(`${baseUrl}/api/experience`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!res.ok) {
            throw new Error('Failed to delete experience');
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error deleting experience:', error);
        throw error;
    }
}
