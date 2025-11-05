/**
 * F1 2025 Classification Data with Feature Flag Support
 */

export interface Driver {
  position: number;
  name: string;
  team: string;
  points: number;
  isChampion?: boolean;
}

/**
 * Base F1 2025 classification data
 */
const baseClassification: Driver[] = [
  { position: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 575 },
  { position: 2, name: "Lewis Hamilton", team: "Mercedes", points: 512 },
  { position: 3, name: "Charles Leclerc", team: "Ferrari", points: 485 },
  { position: 4, name: "Lando Norris", team: "McLaren", points: 452 },
  { position: 5, name: "Carlos Sainz", team: "Ferrari", points: 398 },
  { position: 6, name: "George Russell", team: "Mercedes", points: 376 },
  { position: 7, name: "Oscar Piastri", team: "McLaren", points: 334 },
  { position: 8, name: "Fernando Alonso", team: "Aston Martin", points: 298 },
  { position: 9, name: "Sergio Perez", team: "Red Bull Racing", points: 267 },
  { position: 10, name: "Pierre Gasly", team: "Alpine", points: 189 },
];

/**
 * Apply Rubinho Barrichello champion feature flag
 */
function applyRubinhoChampionFlag(classification: Driver[]): Driver[] {
  const rubinho: Driver = {
    position: 1,
    name: "Rubens Barrichello",
    team: "Ferrari Legends",
    points: 999,
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

