/**
 * Service for F1 classification data.
 * Data is now local - no backend API required.
 */
import { getClassification as getLocalClassification, type Driver } from '../data/classification';

export type { Driver };

/**
 * Fetches F1 2025 driver classification.
 * Returns local data with feature flag support.
 * 
 * @returns Promise with array of driver data
 */
export async function fetchClassification(): Promise<Driver[]> {
  // Simulate async behavior for consistency with previous API version
  return Promise.resolve(getLocalClassification());
}

