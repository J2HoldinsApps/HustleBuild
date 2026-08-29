export type Asset = {
  name: string;
  weight: number;
  icon: string;
};

export const ASSET_WEIGHTS: Record<string, number> = {
  'Pickup Truck': 25.0,
  'Utility Trailer': 20.0,
  'Pressure Washer': 15.0,
  'Lawn Mower': 12.0,
  'Power Tools': 10.0,
  'Cargo Van': 30.0,
  'Notary Public': 35.0,
  'Drone': 25.0,
  'Heavy Lifting': 10.0,
};

export const ASSET_ICONS: Record<string, string> = {
  'Pickup Truck': '🛻',
  'Utility Trailer': '🚚',
  'Pressure Washer': '💧',
  'Lawn Mower': '🌿',
  'Power Tools': '🔧',
  'Cargo Van': '🚐',
  'Notary Public': '📋',
  'Drone': '🚁',
  'Heavy Lifting': '💪',
};

export type Hustle = {
  id: string;
  title: string;
  description: string;
  rateRange: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  requiredAssets: string[];
};

export const HUSTLE_DATABASE: Hustle[] = [
  {
    id: '1',
    title: 'Junk Removal Service',
    description: 'Use your truck to haul away unwanted items from homes and businesses. High demand on weekends and after estate sales.',
    rateRange: '$50-$150/load',
    difficulty: 'Medium',
    category: 'Labor',
    requiredAssets: ['Pickup Truck', 'Heavy Lifting'],
  },
  {
    id: '2',
    title: 'Mobile Car Detailing',
    description: 'Bring professional-grade pressure washing to driveways. Offer interior + exterior packages for premium pricing.',
    rateRange: '$75-$250/vehicle',
    difficulty: 'Medium',
    category: 'Cleaning',
    requiredAssets: ['Pressure Washer', 'Pickup Truck'],
  },
  {
    id: '3',
    title: 'Lawn Care & Landscaping',
    description: 'Weekly or bi-weekly lawn maintenance for residential properties. Upsell with edging and mulching services.',
    rateRange: '$40-$120/yard',
    difficulty: 'Easy',
    category: 'Landscaping',
    requiredAssets: ['Lawn Mower', 'Utility Trailer'],
  },
  {
    id: '4',
    title: 'Moving & Hauling Helper',
    description: 'Offer loading/unloading help for people moving. Your truck + trailer combo makes you the go-to person.',
    rateRange: '$80-$200/job',
    difficulty: 'Hard',
    category: 'Labor',
    requiredAssets: ['Pickup Truck', 'Utility Trailer', 'Heavy Lifting'],
  },
  {
    id: '5',
    title: 'Drone Real Estate Photography',
    description: 'Capture aerial shots for property listings. Realtors pay premium for high-quality drone footage.',
    rateRange: '$150-$500/session',
    difficulty: 'Medium',
    category: 'Creative',
    requiredAssets: ['Drone'],
  },
  {
    id: '6',
    title: 'Mobile Notary Service',
    description: 'Travel to clients for loan signings, estate documents, and more. Highest per-hour rate in the vault.',
    rateRange: '$75-$200/appointment',
    difficulty: 'Easy',
    category: 'Professional',
    requiredAssets: ['Notary Public'],
  },
  {
    id: '7',
    title: 'Furniture Assembly & Delivery',
    description: 'Pick up furniture from stores and assemble on-site. Perfect combo of tools, truck, and muscle.',
    rateRange: '$60-$180/job',
    difficulty: 'Medium',
    category: 'Labor',
    requiredAssets: ['Pickup Truck', 'Power Tools', 'Heavy Lifting'],
  },
  {
    id: '8',
    title: 'Drone Roof Inspections',
    description: 'Offer roofers and insurance adjusters safe aerial inspections without ladder climbing.',
    rateRange: '$100-$300/inspection',
    difficulty: 'Hard',
    category: 'Inspection',
    requiredAssets: ['Drone', 'Cargo Van'],
  },
  {
    id: '9',
    title: 'Fleet Vehicle Washing',
    description: 'Wash company vehicle fleets on-site with your pressure washer. Recurring weekly contracts.',
    rateRange: '$200-$600/fleet',
    difficulty: 'Medium',
    category: 'Cleaning',
    requiredAssets: ['Pressure Washer', 'Cargo Van'],
  },
  {
    id: '10',
    title: 'Tool Rental Service',
    description: 'Rent out your power tools and equipment to DIYers. Daily rates with security deposit.',
    rateRange: '$25-$100/day',
    difficulty: 'Easy',
    category: 'Rental',
    requiredAssets: ['Power Tools', 'Utility Trailer'],
  },
];

export type SubscriptionPackage = {
  identifier: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
};

export const SUBSCRIPTION_PACKAGES: SubscriptionPackage[] = [
  {
    identifier: 'hustlebuild_monthly',
    title: 'Monthly',
    price: '$9.99',
    period: '/month',
    features: [
      'Unlimited hustle blueprints',
      'No ads experience',
      'Advanced gig matching',
      'Market demand analytics',
    ],
  },
  {
    identifier: 'hustlebuild_yearly',
    title: 'Yearly',
    price: '$59.99',
    period: '/year',
    features: [
      'Everything in Monthly',
      'Save 50% vs monthly',
      'Priority new hustle alerts',
      'Exclusive asset deals',
    ],
    highlight: true,
  },
  {
    identifier: 'hustlebuild_lifetime',
    title: 'Lifetime',
    price: '$149.99',
    period: 'one-time',
    features: [
      'Everything in Yearly',
      'Pay once, use forever',
      'Early access to features',
      'Direct line to HustleBuild team',
    ],
  },
];
