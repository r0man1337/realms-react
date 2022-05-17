interface Buildings {
  name: string;
  id: number;
  limit: string;
  food: number;
  culture: number;
  population: number;
  armyCap: number;
}

export const buildings: Array<Buildings> = [
  {
    name: 'Fairgrounds',
    id: 1,
    limit: 'Region',
    food: 5,
    culture: 5,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'RoyalReserve',
    id: 2,
    limit: 'Region',
    food: 5,
    culture: 5,
    population: -10,
    armyCap: 5,
  },
  {
    name: 'GrandMarket',
    id: 3,
    limit: 'Region',
    food: 5,
    culture: 0,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'Castle',
    id: 4,
    limit: 'Region',
    food: -1,
    culture: 5,
    population: -10,
    armyCap: 5,
  },
  {
    name: 'Guild',
    id: 5,
    limit: 'Region',
    food: -1,
    culture: 5,
    population: -10,
    armyCap: 5,
  },
  {
    name: 'OfficerAcademy',
    id: 6,
    limit: 'Region',
    food: -1,
    culture: 0,
    population: -10,
    armyCap: 5,
  },
  {
    name: 'Granary',
    id: 7,
    limit: 'City',
    food: 3,
    culture: 0,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'Housing',
    id: 8,
    limit: 'City',
    food: -1,
    culture: 0,
    population: 75,
    armyCap: 0,
  },
  {
    name: 'Amphitheater',
    id: 9,
    limit: 'City',
    food: -1,
    culture: 2,
    population: -10,
    armyCap: 2,
  },
  {
    name: 'ArcherTower',
    id: 10,
    limit: 'City',
    food: -1,
    culture: 0,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'School',
    id: 11,
    limit: 'City',
    food: -1,
    culture: 3,
    population: -10,
    armyCap: 3,
  },
  {
    name: 'MageTower',
    id: 12,
    limit: 'City',
    food: -1,
    culture: 0,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'TradeOffice',
    id: 13,
    limit: 'City',
    food: -1,
    culture: 1,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'Architect',
    id: 14,
    limit: 'City',
    food: -1,
    culture: 1,
    population: -10,
    armyCap: 1,
  },
  {
    name: 'ParadeGrounds',
    id: 15,
    limit: 'City',
    food: -1,
    culture: 1,
    population: -10,
    armyCap: 2,
  },
  {
    name: 'Barracks',
    id: 16,
    limit: 'City',
    food: -1,
    culture: 0,
    population: -10,
    armyCap: 1,
  },
  {
    name: 'Dock',
    id: 17,
    limit: 'Harbour',
    food: -1,
    culture: 0,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'Fishmonger',
    id: 18,
    limit: 'Harbour',
    food: 2,
    culture: 0,
    population: -10,
    armyCap: 0,
  },
  {
    name: 'Farms',
    id: 19,
    limit: 'River',
    food: 1,
    culture: 0,
    population: 10,
    armyCap: 0,
  },
  {
    name: 'Hamlet',
    id: 20,
    limit: 'River',
    food: 1,
    culture: 0,
    population: 35,
    armyCap: 0,
  },
];
