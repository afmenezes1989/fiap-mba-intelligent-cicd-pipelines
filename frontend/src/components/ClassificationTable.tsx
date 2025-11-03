/**
 * F1 Classification Table Component
 * 
 * Displays the F1 2025 driver championship standings with beautiful styling.
 * Highlights podium positions and special champion status.
 */
import { Driver } from '../services/api';

interface ClassificationTableProps {
  drivers: Driver[];
  loading?: boolean;
  error?: string | null;
}

export default function ClassificationTable({ drivers, loading = false, error = null }: ClassificationTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-f1-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-f1-red text-red-700 p-4 rounded" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!drivers || drivers.length === 0) {
    return (
      <div className="text-center text-f1-gray py-8">
        <p className="text-xl">No classification data available</p>
      </div>
    );
  }

  const getPodiumColor = (position: number): string => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-f1-black text-white hover:bg-gray-800';
    }
  };

  const getPositionBadge = (position: number): string => {
    const isPodium = position <= 3;
    return isPodium
      ? 'text-2xl font-bold'
      : 'text-xl font-semibold text-f1-gray';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-2xl">
        {/* Table Header */}
        <div className="bg-f1-red text-white px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center font-bold text-sm uppercase tracking-wider">
            <div className="col-span-2 text-center">Position</div>
            <div className="col-span-5">Driver</div>
            <div className="col-span-3">Team</div>
            <div className="col-span-2 text-right">Points</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-700">
          {drivers.map((driver, index) => (
            <div
              key={`${driver.position}-${driver.name}`}
              className={`
                ${getPodiumColor(driver.position)}
                px-6 py-4 transition-all duration-300 transform hover:scale-[1.02]
                ${driver.isChampion ? 'ring-4 ring-f1-gold animate-pulse' : ''}
              `}
              data-testid={`driver-row-${index}`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Position */}
                <div className="col-span-2 text-center">
                  <span className={getPositionBadge(driver.position)}>
                    {driver.position}
                  </span>
                  {driver.position === 1 && (
                    <span className="ml-2 text-2xl" role="img" aria-label="trophy">
                      🏆
                    </span>
                  )}
                </div>

                {/* Driver Name */}
                <div className="col-span-5">
                  <p className="text-lg font-bold flex items-center gap-2">
                    {driver.name}
                    {driver.isChampion && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-f1-gold text-black animate-bounce">
                        CHAMPION
                      </span>
                    )}
                  </p>
                </div>

                {/* Team */}
                <div className="col-span-3">
                  <p className="text-sm font-medium opacity-90">{driver.team}</p>
                </div>

                {/* Points */}
                <div className="col-span-2 text-right">
                  <p className="text-xl font-bold">{driver.points}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend for Feature Flag */}
      {drivers.some(d => d.isChampion) && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-f1-gold rounded">
          <p className="text-sm text-gray-700">
            <span className="font-bold">⚡ Feature Flag Active:</span> RUBINHO_CAMPEAO is enabled!
            Showing Rubinho Barrichello as the champion. 🏁
          </p>
        </div>
      )}
    </div>
  );
}

