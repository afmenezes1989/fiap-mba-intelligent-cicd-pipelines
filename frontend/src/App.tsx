/**
 * Main Application Component
 * 
 * F1 2025 Classification Dashboard with intelligent CI/CD demonstration.
 */
import { useState, useEffect } from 'react';
import ClassificationTable from './components/ClassificationTable';
import { fetchClassification, Driver } from './services/api';
import './index.css';

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadClassification() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchClassification();
        setDrivers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load classification');
      } finally {
        setLoading(false);
      }
    }

    loadClassification();
  }, []);

  return (
    <div className="min-h-screen bg-[#15151e]">
      {/* Header */}
      <header className="bg-[#15151e] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                F1
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                2025 Standings
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Classification Table */}
        <ClassificationTable 
          drivers={drivers} 
          loading={loading} 
          error={error}
        />

        {/* Stats Footer - Removed for cleaner design */}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            MBA Intelligent CI/CD Assignment
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

