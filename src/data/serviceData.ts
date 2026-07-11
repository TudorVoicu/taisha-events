export interface Service {
  id: string;
  title: string;
  images: string[];
  description: string;
  pricing: string[];
  includes: string[];
  options: string[];
  section?: 'b2b';
}

export const serviceData: Record<string, Service> = {
  'fotovideo': {
    id: 'fotovideo',
    title: 'Foto-Video',
    images: [
      "/images/services/fotovideo/pb1.jpg",
      "/images/services/fotovideo/pb2.jpg",
      "/images/services/fotovideo/pb3.jpg"
    ],
    description: 'Professional photo and video services that capture the most important moments of your event — from candid emotions to cinematic shots.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [
      'Professional photographer and videographer',
      'Full coverage of your event',
      'Professionally edited photos and videos',
      'Digital delivery of all materials'
    ],
    options: []
  },
  'hookahs': {
    id: 'hookahs',
    title: 'Hookah Rental',
    images: ['https://images.unsplash.com/photo-1583002083815-8c6305bd57d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Transform your space into a luxury hookah lounge. Includes premium hookahs, flavor selection, and comfortable seating arrangements.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [
      'Elegant hookah lounge setup',
      'Premium hookahs and accessories',
      'Selection of quality tobacco flavors',
      'Ambient lighting and decorations',
      'On-site hookah master for preparation',
      'Complete setup and cleanup'
    ],
    options: []
  },
  'dancers': {
    id: 'dancers',
    title: 'Oriental Dancers',
    images: ['https://images.unsplash.com/photo-1586006964997-e30336a503df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Professional oriental dance performances that bring energy and exotic elegance to your event, with choreography adapted to the occasion.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [
      'Professional oriental dancers',
      'Choreography adapted to your event',
      'Traditional costumes and props',
      'Show duration adapted to your program'
    ],
    options: []
  },
  'mirror': {
    id: 'mirror',
    title: 'Magic Mirror',
    images: ['https://images.unsplash.com/photo-1597486606297-67626006c555?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'An interactive Magic Mirror photo booth that entertains your guests with instant prints, fun animations, and personalized templates.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [
      'Magic Mirror photo booth with attendant',
      'Unlimited photo sessions during the event',
      'Instant prints for your guests',
      'Personalized print template',
      'Fun props and accessories',
      'Digital delivery of all photos'
    ],
    options: []
  },
  'smoke': {
    id: 'smoke',
    title: 'Heavy Smoke',
    images: ['https://images.unsplash.com/photo-1613127826277-303fa6b8fc03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Heavy smoke creates a spectacular low-lying fog effect that floats at floor level without rising into the air. It is ideal for special moments such as the first dance, grand entrances, or cinematic photo and video shots.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [
      'Professional heavy smoke machine',
      "Smoke intensity adjusted to each moment (first dance, couple's entrance, special shots)",
      'Dedicated operator for control and synchronization during the event',
      'Testing and calibration before the event'
    ],
    options: []
  },
  'scenes': {
    id: 'scenes',
    title: 'Stages',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Professional stages for events. Available for B2B clients — contact us for details and a quote.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [],
    options: [],
    section: 'b2b'
  },
  'dj': {
    id: 'dj',
    title: 'DJ',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Our DJ service sets the perfect atmosphere throughout your event, combining the right music with the energy of the crowd. From the elegant opening moments to the final party, the DJ adapts music styles in real time, keeping the dance floor full and the vibe at its peak.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [
      'Professional DJ with experience in private events',
      'Professional audio equipment (clear sound, power adapted to the venue)',
      'Wireless microphones for speeches and special moments',
      'Personalized playlist based on the event and your preferences',
      "Real-time musical adaptation to the guests' vibe"
    ],
    options: []
  },
  'ice': {
    id: 'ice',
    title: 'Dry Ice',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Spectacular dry ice effects for events. Available for B2B clients — contact us for details and a quote.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [],
    options: [],
    section: 'b2b'
  },
  'book': {
    id: 'book',
    title: 'Audio Guest Book',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'The Audio Guest Book offers an elegant and moving alternative to the classic guest book. Guests leave authentic voice messages full of emotion, capturing laughter, wishes, and spontaneous moments exactly as they were experienced.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [
      'Audio Guest Book (vintage telephone / elegant design)',
      'Unlimited voice messages from your guests',
      'Setup and testing before the event',
      'Simple instructions for guests to follow',
      'Collection and safekeeping of all audio messages',
      'Digital delivery of the messages, edited and organized'
    ],
    options: []
  },
  'marturii': {
    id: 'marturii',
    title: 'Sweet Favors',
    images: ['https://images.unsplash.com/photo-1579628089068-9877d46889df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Personalized sweet favors for your guests — an elegant thank-you gesture, tailored to the theme and style of your event.',
    pricing: [
      'Request a quote based on your event'
    ],
    includes: [],
    options: []
  }
};
