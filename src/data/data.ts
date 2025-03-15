import type { Race, PersonalInfo, RunningShoe } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Daniel Cabiscol",
  bio: "Runner popular desde Diciembre 2022. Antes odiaba correr, ahora lo necesito",
  avatar: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=400&fit=crop&crop=faces&q=80",
  team: "Fondistes Vilassar de Dalt",
  social: {
    instagram: "https://instagram.com/danielruniverse",
    strava: "https://strava.app.link/f42OO5eeLRb",
    championchip: "https://xipgroc.cat/ca/social/profiles/DK89ZRC/perfil"
  }
};

export const races: Race[] = [
  {
    id: '1',
    date: '2024-03-10',
    time: '00:22:30',
    pace: '04:30',
    distance: 5,
    distanceType: '5K',
    terrain: 'road',
    name: 'City Spring Run',
    location: 'Central Park'
  },
  {
    id: '2',
    date: '2024-02-15',
    time: '00:45:20',
    pace: '04:32',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Winter Challenge',
    location: 'Downtown'
  },
  {
    id: '3',
    date: '2024-01-20',
    time: '01:45:30',
    pace: '05:00',
    distance: 21.1,
    distanceType: 'half-marathon',
    terrain: 'mixed',
    name: 'Coastal Half Marathon',
    location: 'Seaside Route'
  },
  {
    id: '4',
    date: '2023-12-05',
    time: '02:30:00',
    pace: '06:15',
    distance: 24,
    distanceType: 'trail',
    terrain: 'trail',
    name: 'Mountain Trail Challenge',
    location: 'Mountain Range'
  }
];

export const upcomingRaces: Race[] = [
  {
    id: 'u1',
    date: '2025-04-06',
    time: '--:--:--',
    pace: '--:--',
    distance: 11,
    distanceType: 'trail',
    terrain: 'trail',
    name: 'Vilatrail 2025',
    location: 'Vilassar de Dalt',
    upcoming: true
  }
];

export const runningShoes: RunningShoe[] = [
  {
    id: 'shoe1',
    name: 'ASICS Novablast 5',
    brand: 'ASICS',
    type: 'training',
    kilometers: 300,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    purchaseDate: '2025-01-06'
  },
  {
    id: 'shoe2',
    name: 'Saucony Endorphine Pro 3',
    brand: 'Sauncony',
    type: 'racing',
    kilometers: 300,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300',
    purchaseDate: '2024-01-15'
  },
  {
    id: 'shoe3',
    name: 'ASICS Trabuko MAX 2',
    brand: 'ASICS',
    type: 'trail',
    kilometers: 10,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300',
    purchaseDate: '2025-02-01'
  }
];