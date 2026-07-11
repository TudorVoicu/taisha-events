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
      'Request a quote based on your event'
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
  corporate: {
    id: 'corporate',
    title: 'Corporate Package',
    images: ['https://via.placeholder.com/800x600/000000/FFFFFF?text=Package+Image'],
    description: 'Professional, polished and brandable. Ideal for conferences, staff parties, and team-building retreats. Add luxury to your corporate atmosphere.',
    pricing: [
      'Request a quote based on your event'
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
      'Request a quote based on your event'
    ],
    includes: [
      'Initial consultation session',
      'Fully customized service offering',
      'Flexible location and timing',
      'Exclusive options add-ons',
      'Ongoing support and planning assistance'
    ],
    options: []

  }
};
