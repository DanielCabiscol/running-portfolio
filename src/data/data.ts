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
    id: '-8140923745786009221',
    date: '2022-12-26',
    time: '00:26:42',
    pace: '05:20',
    distance: 5,
    distanceType: '5K',
    terrain: 'road',
    name: 'Sansilvestre',
    location: 'Masnou',
    upcoming: false
  },
  {
    id: '-8540280982989412557',
    date: '2023-01-08',
    time: '00:25:38',
    pace: '05:07',
    distance: 5,
    distanceType: '5K',
    terrain: 'road',
    name: 'Cursa Reis',
    location: 'Cornellà',
    upcoming: false
  },
  {
    id: '-7295614660509636510',
    date: '2023-01-22',
    time: '00:54:18',
    pace: '05:25',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Moritz Sant Antoni',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '1234567890123456789',
    date: '2023-02-12',
    time: '00:52:46',
    pace: '05:16',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Els 10 de Santa Coloma',
    location: 'Santa Coloma de Gramanet',
    upcoming: false
  },
  {
    id: '987654321098765432',
    date: '2023-02-26',
    time: '00:50:00',
    pace: '05:00',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Malalties minoritàries',
    location: 'Badalona',
    upcoming: false
  },
  {
    id: '111111111111111111',
    date: '2023-03-05',
    time: '00:49:06',
    pace: '04:54',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa del Meditarràni',
    location: 'Castelldefels',
    upcoming: false
  },
  {
    id: '222222222222222222',
    date: '2023-03-12',
    time: '00:49:07',
    pace: '04:54',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa de la dona 3 viles',
    location: 'Masnou/Montgat/Premià',
    upcoming: false
  },
  {
    id: '333333333333333333',
    date: '2023-03-26',
    time: '00:48:26',
    pace: '04:50',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Ponle freno',
    location: 'Badalona',
    upcoming: false
  },
  {
    id: '444444444444444444',
    date: '2023-04-02',
    time: '00:47:43',
    pace: '04:46',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Caldes 3 viles',
    location: 'Caldes Estrach',
    upcoming: false
  },
  {
    id: '555555555555555555',
    date: '2023-04-16',
    time: '00:21:03',
    pace: '04:12',
    distance: 5,
    distanceType: '5K',
    terrain: 'road',
    name: 'Esplai Premià',
    location: 'Premià de Mar',
    upcoming: false
  },
  {
    id: '666666666666666666',
    date: '2023-04-29',
    time: '00:46:34',
    pace: '04:39',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Nocturna Hospitalet',
    location: 'Hospitalet de Llobregat',
    upcoming: false
  },
  {
    id: '777777777777777777',
    date: '2023-05-14',
    time: '00:45:36',
    pace: '04:33',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Nou Barris',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '888888888888888888',
    date: '2023-05-21',
    time: '00:44:10',
    pace: '04:25',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Dir Diagonal',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '999999999999999999',
    date: '2023-06-11',
    time: '00:49:13',
    pace: '04:55',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa Pineda',
    location: 'Pineda de Mar',
    upcoming: false
  },
  {
    id: '101010101010101010',
    date: '2023-06-18',
    time: '00:27:29',
    pace: '04:34',
    distance: 6,
    distanceType: 'trail',
    terrain: 'trail',
    name: 'CCMA TV3',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '121212121212121212',
    date: '2023-07-01',
    time: '00:44:23',
    pace: '04:26',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa Premià',
    location: 'Premià de Mar',
    upcoming: false
  },
  {
    id: '131313131313131313',
    date: '2023-07-08',
    time: '00:44:46',
    pace: '04:28',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa Dani Vilassar',
    location: 'Vilassar de Mar',
    upcoming: false
  },
  {
    id: '141414141414141414',
    date: '2023-09-24',
    time: '00:47:07',
    pace: '04:42',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Rentreé Badalona',
    location: 'Badalona',
    upcoming: false
  },
  {
    id: '151515151515151515',
    date: '2023-10-01',
    time: '00:21:31',
    pace: '04:18',
    distance: 5,
    distanceType: '5K',
    terrain: 'road',
    name: 'Nick Horta',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '161616161616161616',
    date: '2023-11-05',
    time: '00:45:06',
    pace: '04:30',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cros Popular Sants',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '171717171717171717',
    date: '2023-11-12',
    time: '00:49:28',
    pace: '04:56',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Els 10 de les Franqueses',
    location: 'Franqueses del Vallès',
    upcoming: false
  },
  {
    id: '181818181818181818',
    date: '2023-11-26',
    time: '00:44:28',
    pace: '04:26',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Jean Bouin',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '191919191919191919',
    date: '2023-12-17',
    time: '00:43:38',
    pace: '04:21',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'La Segrera',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '202020202020202020',
    date: '2023-12-26',
    time: '00:20:15',
    pace: '04:03',
    distance: 5,
    distanceType: '5K',
    terrain: 'road',
    name: 'San Silvestre',
    location: 'Masnou',
    upcoming: false
  },
  {
    id: '212121212121212121',
    date: '2023-12-31',
    time: '00:43:14',
    pace: '04:19',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa dels Nassos',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '222222222222222223',
    date: '2024-01-14',
    time: '00:33:46',
    pace: '04:13',
    distance: 8,
    distanceType: 'trail',
    terrain: 'trail',
    name: 'La Barbuda Vilassar',
    location: 'Vilassar de Mar',
    upcoming: false
  },
  {
    id: '232323232323232323',
    date: '2024-01-21',
    time: '00:42:19',
    pace: '04:13',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Moritz Sant Antoni',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '242424242424242424',
    date: '2024-02-11',
    time: '01:37:37',
    pace: '04:37',
    distance: 21.1,
    distanceType: 'half-marathon',
    terrain: 'road',
    name: 'Mitja Marató Barcelona',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '252525252525252525',
    date: '2024-02-25',
    time: '00:43:52',
    pace: '04:23',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Malalties Minoritàries',
    location: 'Badalona',
    upcoming: false
  },
  {
    id: '262626262626262626',
    date: '2024-03-17',
    time: '00:41:59',
    pace: '04:11',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Ponle freno',
    location: 'Badalona',
    upcoming: false
  },
  {
    id: '272727272727272727',
    date: '2024-03-24',
    time: '00:44:06',
    pace: '04:24',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Caldes 3 viles',
    location: "Caldes d'Estrach",
    upcoming: false
  },
  {
    id: '2241228918781319485',
    date: '2024-04-14',
    time: '01:12:59',
    pace: '06:38',
    distance: 11,
    distanceType: 'trail',
    terrain: 'trail',
    name: 'Vilatrail',
    location: 'Vilassar de Dalt',
    upcoming: false
  },
  {
    id: '5597984486950744854',
    date: '2024-05-04',
    time: '00:40:51',
    pace: '04:05',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa Dani Mataró',
    location: 'Mataró',
    upcoming: false
  },
  {
    id: '282828282828282828',
    date: '2024-06-06',
    time: '00:21:36',
    pace: '04:19',
    distance: 5,
    distanceType: '5K',
    terrain: 'road',
    name: 'Cursa Dani Vilassar',
    location: 'Vilassar de Mar',
    upcoming: false
  },
  {
    id: '292929292929292929',
    date: '2024-09-29',
    time: '00:45:42',
    pace: '04:34',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'La Mercè',
    location: 'Barcelona',
    upcoming: false
  },
  {
    id: '303030303030303030',
    date: '2024-10-27',
    time: '00:45:37',
    pace: '04:33',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Magic Run Badalona',
    location: 'Badalona',
    upcoming: false
  },
  {
    id: '3676834386570983409',
    date: '2024-11-10',
    time: '00:43:53',
    pace: '04:23',
    distance: 10,
    distanceType: '10K',
    terrain: 'road',
    name: 'Cursa dels Bombers',
    location: 'Barcelona',
    upcoming: false
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