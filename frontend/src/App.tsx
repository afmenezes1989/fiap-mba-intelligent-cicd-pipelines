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
          <div className="flex items-center gap-4">
            <svg className="h-10 w-10" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70 15L90 15L80 45L60 45L70 15Z" fill="#E10600"/>
              <path d="M30 15H50V25H35L30 45H10L15 25H30V15Z" fill="#E10600"/>
              <path d="M30 25H15" stroke="#E10600" strokeWidth="2"/>
            </svg>
            <div>
              <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
                2025 Standings
              </h1>
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

