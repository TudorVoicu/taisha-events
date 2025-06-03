export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  content: string[];
  readTime: number;
}

export const blogData: Record<string, BlogPost> = {
  'blog-1': {
    id: 'blog-1',
    slug: 'the-art-of-hookah-preparation',
    title: 'The Art of Hookah Preparation',
    excerpt: 'Discover the secrets behind a perfect hookah setup and learn techniques used by professionals.',
    image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-06-15',
    author: 'Mihai Alexandru',
    readTime: 5,
    content: [
      'The art of preparing a hookah is a ritual that dates back centuries. What began in ancient Persia has evolved into a global phenomenon, with each region bringing its own techniques and preferences to the practice.',
      'The foundation of any great hookah experience begins with quality components. A well-crafted hookah pipe, premium tobacco, natural coconut shell charcoal, and fresh water are the essential elements. Each component plays a crucial role in creating a smooth, flavorful session.',
      'When packing the bowl, tobacco should be fluffy rather than compressed. This allows for proper heat distribution and airflow. Different tobaccos require different packing methods - some benefit from a light touch, while others perform better with a denser pack.',
      'The water level in the base should cover about 1-2 inches of the downstem. Too much water creates drag, while too little won\'t filter the smoke properly. Some enthusiasts experiment with adding fruit juices or essences to the water, though purists prefer plain cold water for the most authentic flavor experience.',
      'Heat management is perhaps the most crucial skill to master. The charcoal should never directly touch the tobacco - this creates harsh smoke rather than smooth vapor. Instead, it should be placed around the edge of the bowl, allowing for indirect heat that gently releases the flavors and aromas.',
      'Patience is essential when starting a session. Allow the bowl to warm gradually before taking your first pull. This ensures the tobacco is properly heated throughout and will produce consistent flavor from beginning to end.',
      'The ritual of hookah preparation is not merely functional - it\'s an expression of hospitality and camaraderie. Taking the time to prepare a perfect hookah is a way of showing respect to your guests and creating an atmosphere of relaxation and connection.'
    ]
  },
  'blog-2': {
    id: 'blog-2',
    slug: 'exotic-flavor-combinations',
    title: 'Exotic Flavor Combinations to Try',
    excerpt: 'Explore innovative hookah flavor mixes that will elevate your experience to new heights.',
    image: 'https://images.unsplash.com/photo-157286641386-3324c318d427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-08-21',
    author: 'Elena Popescu',
    readTime: 7,
    content: [
      'While traditional hookah flavors like mint, apple, and grape have their dedicated followers, the world of exotic and innovative flavor combinations offers an entirely new dimension to the hookah experience. Modern blending techniques and premium tobacco production have opened doors to flavor profiles that were once unimaginable.',
      'One particularly intriguing combination pairs the tartness of blueberry with the aromatic complexity of basil. This unexpected duo creates a sophisticated flavor that balances sweet and herbal notes perfectly. Add a touch of lemon for brightness, and you\'ll experience a truly remarkable session.',
      'For those who appreciate dessert-inspired profiles, a mix of vanilla, cinnamon, and almond creates a rich, bakery-like experience reminiscent of fresh pastries. This combination is especially delightful during colder months or evening sessions.',
      'Tropical enthusiasts might enjoy a blend of passion fruit, coconut, and a hint of lime. This transports you to an exotic beach with every pull, creating a refreshing and invigorating session ideal for summer gatherings.',
      'Floral elements can add surprising complexity to fruit bases. Consider mixing rose with watermelon or jasmine with peach. These combinations offer sophisticated aromatic qualities that elevate the smoking experience beyond conventional flavors.',
      'For the adventurous, savory notes can be incorporated with sweet backgrounds. A touch of cardamom with cherry, or a hint of saffron with orange, creates an intriguing contrast that evolves throughout the session.',
      'When creating your own combinations, the key is balance. Start with complementary flavor profiles and adjust proportions until you find your perfect blend. Keep notes on successful combinations to recreate your favorite experiences.',
      'Remember that heat management might need adjustment when working with complex blends. Some flavor components release at different temperatures, so a careful approach to charcoal placement can help ensure all notes are expressed properly throughout your session.'
    ]
  },
  'blog-3': {
    id: 'blog-3',
    slug: 'hosting-perfect-hookah-night',
    title: 'Hosting the Perfect Hookah Night',
    excerpt: 'Learn how to organize a memorable hookah gathering with the right ambiance, refreshments, and etiquette.',
    image: 'https://images.unsplash.com/photo-1583002083815-8c6305bd57d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-10-05',
    author: 'Alexandru Dimitriu',
    readTime: 6,
    content: [
      'Hosting a hookah gathering is about creating a complete sensory experience. The perfect hookah night combines thoughtful preparation, appropriate ambiance, complementary refreshments, and good company. When these elements harmonize, it creates memorable experiences that guests will cherish.',
      'Begin by selecting an appropriate space. Ideally, you\'ll want a well-ventilated area with comfortable seating arranged in a way that facilitates conversation. Outdoor settings like gardens or terraces work wonderfully, but indoor spaces with proper air circulation can be equally effective.',
      'Lighting plays a crucial role in setting the mood. Opt for warm, dim lighting rather than harsh overhead fixtures. String lights, lanterns, or candles create a relaxed atmosphere that enhances the experience. Some hosts incorporate color-changing LED lights for a contemporary touch.',
      'Music selection should complement rather than dominate the gathering. Choose ambient tracks at a volume that allows for easy conversation. Traditional Middle Eastern music offers authenticity, while low-tempo electronic or acoustic playlists can provide a modern alternative.',
      'When it comes to refreshments, consider options that complement the hookah flavors. Traditional offerings include sweet mint tea, which cleanses the palate between pulls. Fresh fruit platters, nuts, and light desserts make perfect accompaniments. Avoid serving heavy or strongly flavored foods that might overwhelm the hookah experience.',
      'For a truly exceptional gathering, consider preparing multiple hookah stations with different flavor profiles. This allows guests to explore various tastes throughout the evening and can become a wonderful conversation starter.',
      'Etiquette matters in hookah culture. Provide fresh mouthpieces for each guest, explain proper handling of the hose, and demonstrate the optimal drawing technique for those less experienced. Remember that hookah is meant to be enjoyed slowly - it\'s about the journey, not the destination.',
      'Finally, consider the pacing of your event. Allow time for guests to settle in before introducing the hookah, and don\'t rush the experience. The best hookah gatherings unfold naturally over several hours, with conversation flowing as freely as the smoke.'
    ]
  }
};

// Function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return Object.values(blogData);
}

// Function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return Object.values(blogData).find(post => post.slug === slug);
}