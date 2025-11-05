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

  const getRowColor = (): string => {
    return 'bg-[#2b2d3a] text-white hover:bg-[#353745]';
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        {/* Table Header */}
        <div className="bg-[#2b2d3a] text-gray-400 px-6 py-3 border-b border-gray-700">
          <div className="grid grid-cols-12 gap-4 items-center text-xs uppercase tracking-wider font-medium">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-4">Driver</div>
            <div className="col-span-3">Team</div>
            <div className="col-span-2 text-center">Points</div>
            <div className="col-span-1 text-center">Wins</div>
            <div className="col-span-1 text-center">Podiums</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-700">
          {drivers.map((driver, index) => (
            <div
              key={`${driver.position}-${driver.name}`}
              className={`
                ${getRowColor()}
                px-6 py-4 transition-colors duration-200
                ${driver.isChampion ? 'ring-2 ring-yellow-500' : ''}
              `}
              data-testid={`driver-row-${index}`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Position */}
                <div className="col-span-1 text-center">
                  <span className="text-base font-semibold text-white">
                    {driver.position}
                  </span>
                </div>

                {/* Driver Name with Flag */}
                <div className="col-span-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://flagcdn.com/w40/${driver.country.toLowerCase()}.png`}
                      alt={driver.country}
                      className="w-6 h-4 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <p className="text-base font-semibold text-white flex items-center gap-2">
                        {driver.name}
                        {driver.isChampion && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500 text-black">
                            CHAMPION
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-400">{driver.team}</p>
                    </div>
                  </div>
                </div>

                {/* Team */}
                <div className="col-span-3">
                  <p className="text-sm text-gray-300">{driver.team}</p>
                </div>

                {/* Points */}
                <div className="col-span-2 text-center">
                  <p className="text-base font-bold text-white">{driver.points}</p>
                </div>

                {/* Wins */}
                <div className="col-span-1 text-center">
                  <p className="text-sm text-gray-300">{driver.wins}</p>
                </div>

                {/* Podiums */}
                <div className="col-span-1 text-center">
                  <p className="text-sm text-gray-300">{driver.podiums}</p>
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

