export type Asset = {
  id: string;
  name: string;
  category: string;
  value: number;
  status: 'active' | 'idle' | 'potential';
  image: string;
  description: string;
};

export const ASSET_CATEGORIES = [
  'Vehicle',
  'Property',
  'Equipment',
  'Skill',
  'Digital',
  'Other',
] as const;

export const SAMPLE_ASSETS: Asset[] = [
  {
    id: '1',
    name: '2019 Ford F-150',
    category: 'Vehicle',
    value: 28000,
    status: 'idle',
    image: '🛻',
    description: 'Truck sitting in driveway — could be rented or used for deliveries',
  },
  {
    id: '2',
    name: 'Spare Bedroom',
    category: 'Property',
    value: 1200,
    status: 'potential',
    image: '🏠',
    description: 'Unused room — could be listed on Airbnb',
  },
  {
    id: '3',
    name: 'Professional Camera Kit',
    category: 'Equipment',
    value: 3500,
    status: 'idle',
    image: '📷',
    description: 'DSLR + lenses — could rent out or do freelance photography',
  },
  {
    id: '4',
    name: 'Web Development Skills',
    category: 'Skill',
    value: 5000,
    status: 'potential',
    image: '💻',
    description: 'Coding skills — could take on freelance projects',
  },
  {
    id: '5',
    name: 'Power Tools Collection',
    category: 'Equipment',
    value: 1500,
    status: 'idle',
    image: '🔧',
    description: 'Drill, saw, compressor — could rent to neighbors',
  },
  {
    id: '6',
    name: 'YouTube Channel (2K subs)',
    category: 'Digital',
    value: 800,
    status: 'active',
    image: '▶️',
    description: 'Growing channel — monetization eligible soon',
  },
];

export const HUSTLE_IDEAS = [
  { asset: 'Vehicle', idea: 'Rent it on Turo or HyreCar', potential: '$500-1500/mo' },
  { asset: 'Vehicle', idea: 'Deliver with DoorDash, Uber Eats', potential: '$200-800/wk' },
  { asset: 'Vehicle', idea: 'Offer moving help on TaskRabbit', potential: '$300-1000/job' },
  { asset: 'Property', idea: 'List on Airbnb or Vrbo', potential: '$500-2000/mo' },
  { asset: 'Property', idea: 'Rent storage space on Neighbor', potential: '$50-300/mo' },
  { asset: 'Equipment', idea: 'Rent on Sparetoolz or Fat Llama', potential: '$20-100/wk' },
  { asset: 'Equipment', idea: 'Offer services on TaskRabbit', potential: '$100-500/job' },
  { asset: 'Skill', idea: 'Freelance on Upwork or Fiverr', potential: '$500-5000/mo' },
  { asset: 'Skill', idea: 'Create and sell an online course', potential: '$200-2000/mo' },
  { asset: 'Digital', idea: 'Affiliate marketing partnerships', potential: '$100-1000/mo' },
  { asset: 'Digital', idea: 'Sell ad space or sponsorships', potential: '$50-500/mo' },
  { asset: 'Other', idea: 'Flip items from thrift stores', potential: '$100-1000/mo' },
];
