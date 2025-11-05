/**
 * F1 2025 Classification Data with Feature Flag Support
 */

export interface Driver {
  position: number;
  name: string;
  team: string;
  country: string;
  points: number;
  wins: number;
  podiums: number;
  isChampion?: boolean;
}

/**
 * Base F1 2025 classification data
 */
const baseClassification: Driver[] = [
  { position: 1, name: "L. Norris", team: "McLaren", country: "GB", points: 357, wins: 6, podiums: 16 },
  { position: 2, name: "O. Piastri", team: "McLaren", country: "AU", points: 356, wins: 7, podiums: 14 },
  { position: 3, name: "M. Verstappen", team: "Red Bull", country: "NL", points: 321, wins: 5, podiums: 11 },
  { position: 4, name: "G. Russell", team: "Mercedes", country: "GB", points: 258, wins: 2, podiums: 8 },
  { position: 5, name: "C. Leclerc", team: "Ferrari", country: "MC", points: 210, wins: 0, podiums: 7 },
  { position: 6, name: "L. Hamilton", team: "Ferrari", country: "GB", points: 146, wins: 0, podiums: 0 },
  { position: 7, name: "A.K. Antonelli", team: "Mercedes", country: "IT", points: 97, wins: 0, podiums: 1 },
  { position: 8, name: "A. Albon", team: "Williams", country: "TH", points: 73, wins: 0, podiums: 0 },
  { position: 9, name: "N. Hülkenberg", team: "Kick Sauber", country: "DE", points: 41, wins: 0, podiums: 1 },
  { position: 10, name: "I. Hadjar", team: "RB", country: "FR", points: 39, wins: 0, podiums: 1 },
  { position: 11, name: "C. Sainz Jr.", team: "Williams", country: "ES", points: 38, wins: 0, podiums: 1 },
  { position: 12, name: "F. Alonso", team: "Aston Martin", country: "ES", points: 37, wins: 0, podiums: 0 },
  { position: 13, name: "O. Bearman", team: "Haas", country: "GB", points: 32, wins: 0, podiums: 0 },
  { position: 14, name: "L. Stroll", team: "Aston Martin", country: "CA", points: 32, wins: 0, podiums: 0 },
  { position: 15, name: "L. Lawson", team: "RB", country: "NZ", points: 30, wins: 0, podiums: 0 },
  { position: 16, name: "E. Ocon", team: "Haas", country: "FR", points: 30, wins: 0, podiums: 0 },
  { position: 17, name: "Y. Tsunoda", team: "Red Bull", country: "JP", points: 28, wins: 0, podiums: 0 },
  { position: 18, name: "P. Gasly", team: "Alpine", country: "FR", points: 20, wins: 0, podiums: 0 },
  { position: 19, name: "G. Bortoleto", team: "Kick Sauber", country: "BR", points: 19, wins: 0, podiums: 0 },
  { position: 20, name: "F. Colapinto", team: "Alpine", country: "AR", points: 0, wins: 0, podiums: 0 },
  { position: 21, name: "J. Doohan", team: "Alpine", country: "AU", points: 0, wins: 0, podiums: 0 },
];

/**
 * Apply Rubinho Barrichello champion feature flag
 */
function applyRubinhoChampionFlag(classification: Driver[]): Driver[] {
  const rubinho: Driver = {
    position: 1,
    name: "Rubens Barrichello",
    team: "Ferrari Legends",
    country: "BR",
    points: 999,
    wins: 50,
    podiums: 100,
    isChampion: true,
  };

  // Shift all drivers down by one position
  const updatedClassification = [rubinho];
  for (const driver of classification) {
    updatedClassification.push({ ...driver, position: driver.position + 1 });
  }

  return updatedClassification;
}

/**
 * Get F1 2025 classification with feature flag support
 * 
 * Checks the VITE_RUBINHO_CAMPEAO environment variable.
 * If set to 'true', returns classification with Rubinho Barrichello as champion.
 */
export function getClassification(): Driver[] {
  const rubinhoChampion = import.meta.env.VITE_RUBINHO_CAMPEAO === 'true';

  if (rubinhoChampion) {
    return applyRubinhoChampionFlag([...baseClassification]);
  }

  return [...baseClassification];
}

