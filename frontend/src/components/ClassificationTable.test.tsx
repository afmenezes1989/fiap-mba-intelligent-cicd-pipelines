/**
 * Unit tests for ClassificationTable component
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClassificationTable from './ClassificationTable';
import { Driver } from '../services/api';

const mockDrivers: Driver[] = [
  { position: 1, name: 'Max Verstappen', team: 'Red Bull Racing', points: 575 },
  { position: 2, name: 'Lewis Hamilton', team: 'Mercedes', points: 512 },
  { position: 3, name: 'Charles Leclerc', team: 'Ferrari', points: 485 },
];

const mockDriversWithRubinho: Driver[] = [
  { position: 1, name: 'Rubens Barrichello', team: 'Ferrari Legends', points: 999, isChampion: true },
  { position: 2, name: 'Max Verstappen', team: 'Red Bull Racing', points: 575 },
  { position: 3, name: 'Lewis Hamilton', team: 'Mercedes', points: 512 },
];

describe('ClassificationTable', () => {
  describe('Loading State', () => {
    it('should display loading spinner when loading is true', () => {
      render(<ClassificationTable drivers={[]} loading={true} />);
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when error is provided', () => {
      const errorMessage = 'Failed to fetch data';
      render(<ClassificationTable drivers={[]} error={errorMessage} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should display no data message when drivers array is empty', () => {
      render(<ClassificationTable drivers={[]} />);
      expect(screen.getByText('No classification data available')).toBeInTheDocument();
    });
  });

  describe('Normal Classification', () => {
    it('should render all drivers', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
      expect(screen.getByText('Lewis Hamilton')).toBeInTheDocument();
      expect(screen.getByText('Charles Leclerc')).toBeInTheDocument();
    });

    it('should display correct positions', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should display team names', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('Red Bull Racing')).toBeInTheDocument();
      expect(screen.getByText('Mercedes')).toBeInTheDocument();
      expect(screen.getByText('Ferrari')).toBeInTheDocument();
    });

    it('should display points', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('575')).toBeInTheDocument();
      expect(screen.getByText('512')).toBeInTheDocument();
      expect(screen.getByText('485')).toBeInTheDocument();
    });

    it('should display trophy emoji for position 1', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      const trophy = screen.getByRole('img', { name: /trophy/i });
      expect(trophy).toBeInTheDocument();
    });
  });

  describe('Rubinho Champion Feature Flag', () => {
    it('should display CHAMPION badge when isChampion is true', () => {
      render(<ClassificationTable drivers={mockDriversWithRubinho} />);
      expect(screen.getByText('CHAMPION')).toBeInTheDocument();
    });

    it('should display Rubinho at position 1 when feature flag is active', () => {
      render(<ClassificationTable drivers={mockDriversWithRubinho} />);
      expect(screen.getByText('Rubens Barrichello')).toBeInTheDocument();
      const rubinhoRow = screen.getByText('Rubens Barrichello').closest('[data-testid^="driver-row"]');
      expect(rubinhoRow).toHaveClass('animate-pulse');
    });

    it('should display feature flag active message', () => {
      render(<ClassificationTable drivers={mockDriversWithRubinho} />);
      expect(screen.getByText(/Feature Flag Active/i)).toBeInTheDocument();
      expect(screen.getByText(/RUBINHO_CAMPEAO is enabled/i)).toBeInTheDocument();
    });

    it('should not display feature flag message when no champion', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.queryByText(/Feature Flag Active/i)).not.toBeInTheDocument();
    });
  });

  describe('Table Structure', () => {
    it('should render table headers', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      expect(screen.getByText('Position')).toBeInTheDocument();
      expect(screen.getByText('Driver')).toBeInTheDocument();
      expect(screen.getByText('Team')).toBeInTheDocument();
      expect(screen.getByText('Points')).toBeInTheDocument();
    });

    it('should render correct number of driver rows', () => {
      render(<ClassificationTable drivers={mockDrivers} />);
      const rows = screen.getAllByTestId(/driver-row-/);
      expect(rows).toHaveLength(3);
    });
  });
});

