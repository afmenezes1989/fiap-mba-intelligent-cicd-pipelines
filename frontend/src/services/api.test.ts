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
      expect(firstDriver).toHaveProperty('wins');
      expect(firstDriver).toHaveProperty('podiums');
      expect(typeof firstDriver.position).toBe('number');
      expect(typeof firstDriver.name).toBe('string');
      expect(typeof firstDriver.team).toBe('string');
      expect(typeof firstDriver.points).toBe('number');
      expect(typeof firstDriver.wins).toBe('number');
      expect(typeof firstDriver.podiums).toBe('number');
    });

    it('should return 21 drivers', async () => {
      const result = await fetchClassification();
      
      // Full 2025 grid has 21 drivers
      expect(result.length).toBe(21);
    });

    it('should have L. Norris in first position by default', async () => {
      const result = await fetchClassification();
      const firstDriver = result[0];

      expect(firstDriver.position).toBe(1);
      expect(firstDriver.name).toBe('L. Norris');
      expect(firstDriver.team).toBe('McLaren');
      expect(firstDriver.points).toBe(357);
    });
  });
});

