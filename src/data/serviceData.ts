export interface Service {
  id: string;
  title: string;
  images: string[];
  description: string;
  pricing: string[];
  includes: string[];
  options: string[];
}

export const serviceData: Record<string, Service> = {
  'fotovideo': {
    id: 'fotovideo',
    title: 'Event Hookah Service',
    images: [
      "/images/services/fotovideo/pb1.jpg",
      "/images/services/fotovideo/pb2.jpg",
      "/images/services/fotovideo/pb3.jpg"
    ],
    description: 'Our complete hookah service for special events is designed to add a touch of luxury and intrigue to your celebration. Our professional staff will handle everything from setup to cleanup, allowing you and your guests to simply enjoy the experience.',
    pricing: [
      '<span class="font-medium">Standard Package:</span> €300 (up to 2 hookahs, 4 hours)',
      '<span class="font-medium">Premium Package:</span> €500 (up to 4 hookahs, 6 hours)',
      '<span class="font-medium">Luxury Package:</span> €800 (up to 6 hookahs, 8 hours)',
      '<span class="font-medium">Additional Hours:</span> €50 per hour per hookah'
    ],
    includes: [
      'Professional setup and breakdown',
      'Dedicated hookah attendant',
      'Premium tobacco flavors',
      'Quality hookahs and accessories',
      'Coal service throughout event',
      'Disposable mouthpieces for all guests'
    ],
    options: [
      'Custom flavor blends (+€30 per blend)',
      'LED hookah bases (+€20 per hookah)',
      'Branded elements for corporate events',
      'Custom setup design to match event theme'
    ]
  },
  'hookas': {
    id: 'hookas',
    title: 'Private Lounge Experience',
    images: ['https://images.unsplash.com/photo-1583002083815-8c6305bd57d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Transform your space into a luxury hookah lounge with our premium setup service. Perfect for intimate gatherings, private parties, or special celebrations at home or your chosen venue.',
    pricing: [
      '<span class="font-medium">Intimate Setup:</span> €250 (1-2 hookahs, up to 10 guests)',
      '<span class="font-medium">Group Experience:</span> €400 (3-4 hookahs, up to 20 guests)',
      '<span class="font-medium">Large Gathering:</span> €650 (5-8 hookahs, up to 40 guests)',
      '<span class="font-medium">Custom Quote:</span> Available for larger groups'
    ],
    includes: [
      'Elegant hookah lounge furniture setup',
      'Premium hookahs and accessories',
      'Selection of quality tobacco flavors',
      'Ambient lighting and decorations',
      'On-site hookah master for preparation',
      'Complete setup and cleanup'
    ],
    options: [
      'Additional specialty flavors (+€25 per flavor)',
      'Custom seating arrangements',
      'Themed decorations to match your event',
      'Extended service hours (+€40 per hour)'
    ]
  },
  'dancers': {
    id: 'dancers',
    title: 'VIP Hookah Experience',
    images: ['https://images.unsplash.com/photo-1586006964997-e30336a503df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Our most exclusive offering for those seeking an extraordinary hookah experience. Featuring rare tobacco blends, limited edition hookahs, and personalized service from our master blender.',
    pricing: [
      '<span class="font-medium">Executive Experience:</span> €500 (2-4 guests)',
      '<span class="font-medium">Luxury Group:</span> €800 (5-10 guests)',
      '<span class="font-medium">Elite Gathering:</span> €1,200 (11-20 guests)',
      '<span class="font-medium">Custom VIP Package:</span> Contact for pricing'
    ],
    includes: [
      'Limited edition designer hookahs',
      'Rare and exclusive tobacco blends',
      'Personal hookah master service',
      'Custom flavor creation session',
      'Premium lounge setup with luxury furnishings',
      'Complimentary premium refreshments',
      'Keepsake gift for the host'
    ],
    options: [
      'Cigar and hookah pairing experience',
      'Professional photography of your event',
      'Luxury transportation arrangements',
      'Celebrity hookah master (subject to availability)'
    ]
  },
  'mirror': {
    id: 'mirror',
    title: 'Corporate Event Package',
    images: ['https://images.unsplash.com/photo-1597486606297-67626006c555?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Elevate your corporate events with our professional hookah services. We offer branded experiences tailored to your company culture and event objectives, perfect for team building, client appreciation, or corporate celebrations.',
    pricing: [
      '<span class="font-medium">Small Corporate:</span> €450 (up to 25 guests)',
      '<span class="font-medium">Medium Corporate:</span> €750 (25-50 guests)',
      '<span class="font-medium">Large Corporate:</span> €1,200 (50-100 guests)',
      '<span class="font-medium">Custom Enterprise Package:</span> Contact for pricing'
    ],
    includes: [
      'Corporate branding integration',
      'Professional setup and service staff',
      'Premium hookah stations',
      'Selection of crowd-pleasing flavors',
      'Complimentary consultation and planning',
      'Liability insurance coverage',
      'Post-event cleanup'
    ],
    options: [
      'Custom branded hookah bases',
      'Team building hookah workshops',
      'Executive VIP hookah lounge area',
      'International flavor stations',
      'Integration with other event elements'
    ]
  },
  'smoke': {
    id: 'smoke',
    title: 'Premium Flavor Experience',
    images: ['https://images.unsplash.com/photo-1613127826277-303fa6b8fc03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'A taste-focused hookah experience featuring our collection of exclusive premium tobacco blends from around the world. Guided by our flavor experts, this service is perfect for connoisseurs and those looking to explore the rich world of hookah flavors.',
    pricing: [
      '<span class="font-medium">Flavor Tour:</span> €200 (2-4 guests, 4 flavors)',
      '<span class="font-medium">Connoisseur Experience:</span> €350 (4-8 guests, 6 flavors)',
      '<span class="font-medium">Grand Tasting:</span> €500 (8-12 guests, 8 flavors)',
      '<span class="font-medium">Custom Flavor Event:</span> Contact for pricing'
    ],
    includes: [
      'Curated selection of premium flavors',
      'Expert flavor guide and education',
      'Tasting notes and flavor profiles',
      'High-end hookahs optimized for flavor',
      'Palate cleansers between flavors',
      'Flavor pairing recommendations'
    ],
    options: [
      'Rare and limited edition flavors (+€40)',
      'Food and beverage pairing suggestions',
      'Custom blend creation session',
      'Take-home flavor samples'
    ]
  },
  'scenes': {
    id: 'scenes',
    title: 'Equipment Rental',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'High-quality hookah equipment rental for those who prefer to create their own experience. Our premium hookahs and accessories are meticulously maintained and sanitized to ensure an exceptional experience for you and your guests.',
    pricing: [
      '<span class="font-medium">Standard Hookah:</span> €60 per day',
      '<span class="font-medium">Premium Hookah:</span> €90 per day',
      '<span class="font-medium">Luxury Designer Hookah:</span> €150 per day',
      '<span class="font-medium">Weekend Package:</span> 2-day rental at 1.5x daily rate'
    ],
    includes: [
      'Clean, sanitized hookah and base',
      'Hoses and mouthpieces',
      'Quality clay bowl',
      'Heat management system',
      'Tongs and accessories',
      'Setup instructions',
      'Delivery and pickup'
    ],
    options: [
      'Premium tobacco flavors (+€25 per 100g)',
      'Natural coconut coals (+€15 per box)',
      'Additional hoses and mouthpieces',
      'Setup service available (+€40)'
    ]
  },
  'dj': {
    id: 'dj',
    title: 'Equipment Rental',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'High-quality hookah equipment rental for those who prefer to create their own experience. Our premium hookahs and accessories are meticulously maintained and sanitized to ensure an exceptional experience for you and your guests.',
    pricing: [
      '<span class="font-medium">Standard Hookah:</span> €60 per day',
      '<span class="font-medium">Premium Hookah:</span> €90 per day',
      '<span class="font-medium">Luxury Designer Hookah:</span> €150 per day',
      '<span class="font-medium">Weekend Package:</span> 2-day rental at 1.5x daily rate'
    ],
    includes: [
      'Clean, sanitized hookah and base',
      'Hoses and mouthpieces',
      'Quality clay bowl',
      'Heat management system',
      'Tongs and accessories',
      'Setup instructions',
      'Delivery and pickup'
    ],
    options: [
      'Premium tobacco flavors (+€25 per 100g)',
      'Natural coconut coals (+€15 per box)',
      'Additional hoses and mouthpieces',
      'Setup service available (+€40)'
    ]
  },
  'ice': {
    id: 'ice',
    title: 'Equipment Rental',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'High-quality hookah equipment rental for those who prefer to create their own experience. Our premium hookahs and accessories are meticulously maintained and sanitized to ensure an exceptional experience for you and your guests.',
    pricing: [
      '<span class="font-medium">Standard Hookah:</span> €60 per day',
      '<span class="font-medium">Premium Hookah:</span> €90 per day',
      '<span class="font-medium">Luxury Designer Hookah:</span> €150 per day',
      '<span class="font-medium">Weekend Package:</span> 2-day rental at 1.5x daily rate'
    ],
    includes: [
      'Clean, sanitized hookah and base',
      'Hoses and mouthpieces',
      'Quality clay bowl',
      'Heat management system',
      'Tongs and accessories',
      'Setup instructions',
      'Delivery and pickup'
    ],
    options: [
      'Premium tobacco flavors (+€25 per 100g)',
      'Natural coconut coals (+€15 per box)',
      'Additional hoses and mouthpieces',
      'Setup service available (+€40)'
    ]
  },
  'book': {
    id: 'book',
    title: 'Equipment Rental',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'High-quality hookah equipment rental for those who prefer to create their own experience. Our premium hookahs and accessories are meticulously maintained and sanitized to ensure an exceptional experience for you and your guests.',
    pricing: [
      '<span class="font-medium">Standard Hookah:</span> €60 per day',
      '<span class="font-medium">Premium Hookah:</span> €90 per day',
      '<span class="font-medium">Luxury Designer Hookah:</span> €150 per day',
      '<span class="font-medium">Weekend Package:</span> 2-day rental at 1.5x daily rate'
    ],
    includes: [
      'Clean, sanitized hookah and base',
      'Hoses and mouthpieces',
      'Quality clay bowl',
      'Heat management system',
      'Tongs and accessories',
      'Setup instructions',
      'Delivery and pickup'
    ],
    options: [
      'Premium tobacco flavors (+€25 per 100g)',
      'Natural coconut coals (+€15 per box)',
      'Additional hoses and mouthpieces',
      'Setup service available (+€40)'
    ]
  }
};
