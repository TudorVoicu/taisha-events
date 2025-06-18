export interface Package {
  id: string;
  title: string;
  images: string[];
  description: string;
  pricing: string[];
  includes: string[];
  options: string[];
}

export const packagesData: Record<string, Package> = {
  wedding: {
    id: 'wedding',
    title: 'Wedding Celebration Package',
    images: ['https://via.placeholder.com/800x600/000000/FFFFFF?text=Package+Image'],
    description: 'A luxurious and romantic package tailored for your special day. Includes premium hookah service, ambiance design, and exclusive offerings for wedding guests.',
    pricing: [
      '<span class="font-medium">Silver Package:</span> €800 (up to 30 guests)',
      '<span class="font-medium">Gold Package:</span> €1,200 (up to 60 guests)',
      '<span class="font-medium">Platinum Package:</span> €2,000 (up to 100 guests)'
    ],
    includes: [
      'Customized lounge setup',
      'On-site coordinator',
      'Premium hookah service',
      'Floral elements for decor',
      'Guest gift sets'
    ],
    options: ["Drone footage", "Live streaming"]
  },
  baptism: {
    id: 'baptism',
    title: 'Baptism Celebration Package',
    images: ['https://via.placeholder.com/800x600/000000/FFFFFF?text=Package+Image'],
    description: 'A soft and elegant experience designed for baptism events. Our service emphasizes family-friendly presentation, light flavors, and a refined ambiance.',
    pricing: [
      '<span class="font-medium">Basic Blessing:</span> €500 (up to 25 guests)',
      '<span class="font-medium">Joyful Gathering:</span> €800 (up to 50 guests)',
      '<span class="font-medium">Family Deluxe:</span> €1,100 (up to 75 guests)'
    ],
    includes: [
      'Soft-tone decor',
      'Mild tobacco options',
      'Non-smoking alternatives (mock hookahs)',
      'Professional attendants',
      'Optional custom photo area'
    ],
    options: ["Live translation", "Panel moderation"]

  },
  corporate: {
    id: 'corporate',
    title: 'Corporate Package',
    images: ['https://via.placeholder.com/800x600/000000/FFFFFF?text=Package+Image'],
    description: 'Professional, polished and brandable. Ideal for conferences, staff parties, and team-building retreats. Add luxury to your corporate atmosphere.',
    pricing: [
      '<span class="font-medium">Starter Tier:</span> €700 (up to 40 guests)',
      '<span class="font-medium">Business Tier:</span> €1,000 (up to 80 guests)',
      '<span class="font-medium">Enterprise Tier:</span> €1,600 (100+ guests)'
    ],
    includes: [
      'Branded hookah setup',
      'Uniformed staff',
      'Digital check-in for guests',
      'Co-branded takeaways',
      'Corporate reporting dashboard (optional)'
    ],
    options: ["Custom cake", "Balloon artist"]

  },
  custom: {
    id: 'custom',
    title: 'Custom Package',
    images: ['https://via.placeholder.com/800x600/000000/FFFFFF?text=Package+Image'],
    description: 'Tailored to your vision — from small gatherings to large-scale events. Fully personalized based on your needs, themes, and guest expectations.',
    pricing: [
      '<span class="font-medium">Starting at:</span> €300 (10+ guests)',
      '<span class="font-medium">Scale as needed:</span> Custom quote after consultation'
    ],
    includes: [
      'Initial consultation session',
      'Fully customized service offering',
      'Flexible location and timing',
      'Exclusive options add-ons',
      'Ongoing support and planning assistance'
    ],
    options: ["Something", "yeah"]

  }
};
