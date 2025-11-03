/**
 * Unit tests for API service
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchClassification } from './api';

vi.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchClassification', () => {
    it('should return driver data on successful request', async () => {
      const mockData = {
        data: {
          data: [
            { position: 1, name: 'Max Verstappen', team: 'Red Bull Racing', points: 575 },
            { position: 2, name: 'Lewis Hamilton', team: 'Mercedes', points: 512 },
          ],
        },
      };

      vi.mocked(axios.get).mockResolvedValue(mockData);

      const result = await fetchClassification();

      expect(axios.get).toHaveBeenCalledWith('/api/classification');
      expect(result).toEqual(mockData.data.data);
      expect(result).toHaveLength(2);
    });

    it('should throw error on failed request', async () => {
      const errorMessage = 'Network Error';
      vi.mocked(axios.get).mockRejectedValue(new Error(errorMessage));
      vi.mocked(axios.isAxiosError).mockReturnValue(false);

      await expect(fetchClassification()).rejects.toThrow(
        'An unexpected error occurred while fetching classification'
      );
    });

    it('should throw specific error for axios errors', async () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Request failed with status code 500',
      };

      vi.mocked(axios.get).mockRejectedValue(axiosError);
      vi.mocked(axios.isAxiosError).mockReturnValue(true);

      await expect(fetchClassification()).rejects.toThrow(
        'Failed to fetch classification: Request failed with status code 500'
      );
    });
  });
});

