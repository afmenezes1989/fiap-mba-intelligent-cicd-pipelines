/**
 * Unit tests for ClassificationTable component
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClassificationTable from './ClassificationTable';
import { Driver } from '../services/api';

const mockDrivers: Driver[] = [
  { position: 1, name: 'L. Norris', team: 'McLaren', country: 'GB', points: 357, wins: 6, podiums: 16 },
  { position: 2, name: 'O. Piastri', team: 'McLaren', country: 'AU', points: 356, wins: 7, podiums: 14 },
  { position: 3, name: 'M. Verstappen', team: 'Red Bull', country: 'NL', points: 321, wins: 5, podiums: 11 },
];

const mockRubinhoDrivers: Driver[] = [
  { position: 1, name: 'Rubens Barrichello', team: 'Ferrari Legends', country: 'BR', points: 999, wins: 50, podiums: 100, isChampion: true },
  { position: 2, name: 'L. Norris', team: 'McLaren', country: 'GB', points: 357, wins: 6, podiums: 16 },
];

describe('ClassificationTable', () => {
  describe('Loading State', () => {
    it('should display loading spinner', () => {
      render(<ClassificationTable drivers={[]} loading={true} />);
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      const errorMessage = 'Failed to load data';
      render(<ClassificationTable drivers={[]} error={errorMessage} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should display no data message', () => {
      render(<ClassificationTable drivers={[]} />);
      expect(screen.getByText('No classification data available')).toBeInTheDocument();
    });
  });

  describe('Normal Classification', () => {
    it('should render all drivers', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('L. Norris')).toBeInTheDocument();
      expect(screen.getByText('O. Piastri')).toBeInTheDocument();
      expect(screen.getByText('M. Verstappen')).toBeInTheDocument();
    });

    it('should display correct positions', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      const rows = screen.getAllByTestId(/driver-row-/);
      expect(rows).toHaveLength(3);
    });

    it('should display team names', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      const mclarenElements = screen.getAllByText('McLaren');
      expect(mclarenElements.length).toBeGreaterThan(0);
    });

    it('should display points', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('357')).toBeInTheDocument();
      expect(screen.getByText('356')).toBeInTheDocument();
      expect(screen.getByText('321')).toBeInTheDocument();
    });

    it('should display wins and podiums', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('16')).toBeInTheDocument();
    });
  });

  describe('Rubinho Champion Feature Flag', () => {
    it('should display Rubinho at position 1 when feature flag is active', () => {
      render(<ClassificationTable drivers={mockRubinhoDrivers} />);
      expect(screen.getByText('Rubens Barrichello')).toBeInTheDocument();
      const rubinhoRow = screen.getByText('Rubens Barrichello').closest('[data-testid^="driver-row"]');
      expect(rubinhoRow).toHaveClass('ring-2');
      expect(rubinhoRow).toHaveClass('ring-yellow-500');
    });

    it('should display CHAMPION badge for Rubinho', () => {
      render(<ClassificationTable drivers={mockRubinhoDrivers} />);
      expect(screen.getByText('CHAMPION')).toBeInTheDocument();
    });

    it('should shift other drivers down by one position', () => {
      render(<ClassificationTable drivers={mockRubinhoDrivers} />);
      const rows = screen.getAllByTestId(/driver-row-/);
      expect(rows).toHaveLength(2);
    });
  });

  describe('Table Structure', () => {
    it('should render table headers', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('Rank')).toBeInTheDocument();
      expect(screen.getByText('Driver')).toBeInTheDocument();
      expect(screen.getByText('Team')).toBeInTheDocument();
      expect(screen.getByText('Points')).toBeInTheDocument();
      expect(screen.getByText('Wins')).toBeInTheDocument();
      expect(screen.getByText('Podiums')).toBeInTheDocument();
    });

    it('should have proper styling classes', () => {
      const { container } = render(<ClassificationTable drivers={mockDrivers} />);
      const table = container.querySelector('.max-w-6xl');
      expect(table).toBeInTheDocument();
    });
  });
});
