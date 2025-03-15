export type TerrainType = 'road' | 'trail' | 'track' | 'mixed';

export type RaceDistance = '5K' | '10K' | 'half-marathon' | 'trail';

export interface Race {
  id: string;
  date: string;
  time: string; // Format: HH:mm:ss
  pace: string; // Format: mm:ss
  distance: number;
  distanceType: RaceDistance;
  terrain: TerrainType;
  name?: string;
  location?: string;
  upcoming?: boolean;
}

export interface PersonalInfo {
  name: string;
  bio: string;
  avatar: string;
  team: string;
  social: {
    instagram: string;
    strava: string;
    championchip: string;
  };
}

export interface RunningShoe {
  id: string;
  name: string;
  brand: string;
  type: 'training' | 'racing' | 'trail';
  kilometers: number;
  image: string;
  purchaseDate: string;
}