/**
 * Unit tests for API service (now using local data)
 */
import { describe, it, expect } from 'vitest';
import { fetchClassification } from './api';

describe('API Service', () => {
  describe('fetchClassification', () => {
    it('should return driver classification data', async () => {
      const result = await fetchClassification();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return data with correct structure', async () => {
      const result = await fetchClassification();
      const firstDriver = result[0];

      expect(firstDriver).toHaveProperty('position');
      expect(firstDriver).toHaveProperty('name');
      expect(firstDriver).toHaveProperty('team');
      expect(firstDriver).toHaveProperty('points');
      expect(typeof firstDriver.position).toBe('number');
      expect(typeof firstDriver.name).toBe('string');
      expect(typeof firstDriver.team).toBe('string');
      expect(typeof firstDriver.points).toBe('number');
    });

    it('should return 10 drivers by default', async () => {
      const result = await fetchClassification();
      
      // Base classification should have 10 drivers
      expect(result.length).toBeGreaterThanOrEqual(10);
    });

    it('should have Max Verstappen in first position by default', async () => {
      const result = await fetchClassification();
      const firstDriver = result[0];

      expect(firstDriver.position).toBe(1);
      expect(firstDriver.name).toBe('Max Verstappen');
      expect(firstDriver.team).toBe('Red Bull Racing');
    });
  });
});

