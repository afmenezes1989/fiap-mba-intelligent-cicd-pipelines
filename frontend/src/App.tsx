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
    <div className="min-h-screen bg-gradient-to-br from-f1-black via-gray-900 to-f1-black">
      {/* Header */}
      <header className="bg-f1-red shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white font-formula1">
                🏎️ F1 2025 CHAMPIONSHIP
              </h1>
              <p className="mt-1 text-sm text-gray-200">
                Driver Standings • Intelligent CI/CD Demo
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 bg-black bg-opacity-30 rounded-lg">
                <p className="text-xs text-gray-300 uppercase tracking-wide">Season</p>
                <p className="text-xl font-bold text-white">2025</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Info Banner */}
        <div className="mb-8 p-4 bg-blue-900 bg-opacity-50 border border-blue-500 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-300">About This Demo</h3>
              <div className="mt-2 text-sm text-blue-200">
                <p>
                  This application demonstrates an intelligent CI/CD pipeline with 14+ automated steps
                  including testing, security scanning, code quality analysis, and deployment.
                  Features include a toggle-able feature flag (<code className="px-1 py-0.5 bg-black bg-opacity-40 rounded">RUBINHO_CAMPEAO</code>)
                  that can be controlled via environment variables during deployment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Classification Table */}
        <ClassificationTable 
          drivers={drivers} 
          loading={loading} 
          error={error}
        />

        {/* Stats Footer */}
        {!loading && !error && drivers.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-f1-red">{drivers.length}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide">Drivers</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-f1-red">{drivers[0]?.points || 0}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide">Leader Points</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-f1-red">
                {drivers[0]?.points && drivers[1]?.points ? drivers[0].points - drivers[1].points : 0}
              </p>
              <p className="text-sm text-gray-400 uppercase tracking-wide">Point Gap</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Built with ❤️ for MBA Intelligent CI/CD Assignment • 
            <a href="https://github.com" className="ml-1 text-f1-red hover:underline">
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

