/**
 * API service for F1 classification data.
 */
import axios from 'axios';

export interface Driver {
  position: number;
  name: string;
  team: string;
  points: number;
  isChampion?: boolean;
}

export interface ClassificationResponse {
  data: Driver[];
}

// API base URL - use environment variable or default to backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-mj13r6ied-afmenezes1989s-projects.vercel.app';

/**
 * Fetches F1 2025 driver classification from the API.
 * 
 * @returns Promise with array of driver data
 * @throws Error if the API request fails
 */
export async function fetchClassification(): Promise<Driver[]> {
  try {
    const response = await axios.get<ClassificationResponse>(
      `${API_BASE_URL}/api/classification`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch classification: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching classification');
  }
}

