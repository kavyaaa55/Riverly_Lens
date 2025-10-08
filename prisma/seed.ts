import { PrismaClient, ReviewSource } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting products seed...\n');

  // Products data for all companies
  const productsData = {
    'lenskart-india': [
      {
        name: 'John Jacobs Full Rim Square Eyeglasses',
        imageUrl: 'https://example.com/lenskart-john-jacobs.jpg',
        releaseDate: new Date('2024-03-15'),
        productUrl: 'https://www.lenskart.com/john-jacobs-eyeglasses',
        description: 'Premium full rim square eyeglasses with blue light blocking technology and anti-glare coating',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent build quality, comfortable fit, stylish design, good value for money, effective blue light protection',
            dislikesSummary: 'Some users found frames slightly heavy, limited color options',
            capturedAt: new Date('2025-09-20'),
          },
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.7,
            likesSummary: 'Great for long screen time, reduces eye strain significantly, premium look and feel',
            dislikesSummary: 'Slightly expensive compared to basic models',
            capturedAt: new Date('2025-10-01'),
          },
        ],
      },
      {
        name: 'Lenskart Air Wrap Around Sunglasses',
        imageUrl: 'https://example.com/lenskart-air-sunglasses.jpg',
        releaseDate: new Date('2024-06-20'),
        productUrl: 'https://www.lenskart.com/air-sunglasses',
        description: 'Ultra-lightweight sports sunglasses with UV400 protection and polarized lenses',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Very lightweight, great for sports activities, excellent UV protection, comfortable nose pads',
            dislikesSummary: 'Frame slightly loose for some users, scratches easily',
            capturedAt: new Date('2025-08-15'),
          },
        ],
      },
      {
        name: 'Vincent Chase Rimless Eyeglasses',
        imageUrl: 'https://example.com/lenskart-vincent-chase.jpg',
        releaseDate: new Date('2023-11-10'),
        productUrl: 'https://www.lenskart.com/vincent-chase-rimless',
        description: 'Elegant rimless eyeglasses with titanium frame and ultra-thin lenses',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.6,
            likesSummary: 'Extremely lightweight, barely noticeable on face, premium titanium material, sleek design',
            dislikesSummary: 'Delicate frame requires careful handling, higher price point',
            capturedAt: new Date('2025-07-22'),
          },
        ],
      },
      {
        name: 'Lenskart BLU Computer Glasses',
        imageUrl: 'https://example.com/lenskart-blu.jpg',
        releaseDate: new Date('2024-01-25'),
        productUrl: 'https://www.lenskart.com/blu-computer-glasses',
        description: 'Specialized computer glasses blocking 100% harmful blue light with zero power lenses',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Effective for screen time, reduces headaches, affordable price, good for office use',
            dislikesSummary: 'Slight yellow tint visible, basic design',
            capturedAt: new Date('2025-09-10'),
          },
        ],
      },
      {
        name: 'Lenskart STUDIO Aviator Sunglasses',
        imageUrl: 'https://example.com/lenskart-aviator.jpg',
        releaseDate: new Date('2024-08-05'),
        productUrl: 'https://www.lenskart.com/studio-aviator',
        description: 'Classic aviator sunglasses with gradient lenses and metal frame',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.5,
            likesSummary: 'Classic design, durable metal frame, perfect fit, excellent polarization',
            dislikesSummary: 'Slightly heavy for extended wear',
            capturedAt: new Date('2025-08-28'),
          },
        ],
      },
    ],
    'titan-eye-plus': [
      {
        name: 'Titan Eye+ Premium Acetate Frames',
        imageUrl: 'https://example.com/titan-acetate.jpg',
        releaseDate: new Date('2024-02-10'),
        productUrl: 'https://www.titaneyeplus.com/acetate-frames',
        description: 'Premium Italian acetate frames with spring hinges and anti-reflective coating',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.8,
            likesSummary: 'Excellent quality acetate, comfortable for all-day wear, premium finish, trusted Titan brand',
            dislikesSummary: 'Premium pricing, limited trendy designs',
            capturedAt: new Date('2025-09-05'),
          },
        ],
      },
      {
        name: 'Titan Eye+ Titanium Ultra Light',
        imageUrl: 'https://example.com/titan-ultralight.jpg',
        releaseDate: new Date('2023-10-15'),
        productUrl: 'https://www.titaneyeplus.com/titanium-ultralight',
        description: 'Ultra-lightweight titanium frames weighing less than 10 grams',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.7,
            likesSummary: 'Incredibly light, durable titanium, hypoallergenic, comfortable nose pads',
            dislikesSummary: 'Very expensive, limited style variety',
            capturedAt: new Date('2025-07-18'),
          },
        ],
      },
      {
        name: 'Titan Eye+ Kids Collection',
        imageUrl: 'https://example.com/titan-kids.jpg',
        releaseDate: new Date('2024-04-20'),
        productUrl: 'https://www.titaneyeplus.com/kids-collection',
        description: 'Durable and flexible eyeglasses designed specifically for children',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Excellent for active kids, flexible frame, fun colors, comfortable fit',
            dislikesSummary: 'Some parents found sizing issues',
            capturedAt: new Date('2025-08-12'),
          },
        ],
      },
      {
        name: 'Titan Eye+ Progressive Lenses',
        imageUrl: 'https://example.com/titan-progressive.jpg',
        releaseDate: new Date('2023-12-05'),
        productUrl: 'https://www.titaneyeplus.com/progressive-lenses',
        description: 'Advanced progressive lenses for seamless near to far vision',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.5,
            likesSummary: 'Smooth transition zones, high-quality optics, professional fitting service',
            dislikesSummary: 'Expensive, adaptation period required',
            capturedAt: new Date('2025-06-25'),
          },
        ],
      },
      {
        name: 'Titan Eye+ Designer Collection by Farah Khan',
        imageUrl: 'https://example.com/titan-farah-khan.jpg',
        releaseDate: new Date('2024-07-12'),
        productUrl: 'https://www.titaneyeplus.com/farah-khan',
        description: 'Exclusive designer eyewear collection by celebrity designer Farah Khan',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.4,
            likesSummary: 'Unique designs, celebrity collaboration, premium materials, fashion-forward',
            dislikesSummary: 'Higher price point, limited availability',
            capturedAt: new Date('2025-09-18'),
          },
        ],
      },
    ],
    'bata-india': [
      {
        name: 'Bata Comfit Formal Shoes',
        imageUrl: 'https://example.com/bata-comfit.jpg',
        releaseDate: new Date('2024-01-18'),
        productUrl: 'https://www.bata.in/comfit-formal',
        description: 'Professional formal shoes with cushioned insoles and leather upper',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.2,
            likesSummary: 'Comfortable for office wear, good quality leather, affordable price, classic design',
            dislikesSummary: 'Stiff initially, requires break-in period',
            capturedAt: new Date('2025-08-20'),
          },
        ],
      },
      {
        name: 'Bata Red Label Sneakers',
        imageUrl: 'https://example.com/bata-red-label.jpg',
        releaseDate: new Date('2024-05-22'),
        productUrl: 'https://www.bata.in/red-label-sneakers',
        description: 'Trendy casual sneakers with memory foam insole and breathable mesh',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Stylish design, comfortable memory foam, good breathability, value for money',
            dislikesSummary: 'Durability concerns after 6 months, sole wear',
            capturedAt: new Date('2025-09-15'),
          },
        ],
      },
      {
        name: 'Bata Chappals - Hawai Slippers',
        imageUrl: 'https://example.com/bata-hawai.jpg',
        releaseDate: new Date('2023-08-10'),
        productUrl: 'https://www.bata.in/hawai-slippers',
        description: 'Classic rubber slippers for everyday casual wear',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.5,
            likesSummary: 'Extremely durable, affordable, comfortable, wide variety of colors',
            dislikesSummary: 'Basic design, not suitable for formal occasions',
            capturedAt: new Date('2025-07-30'),
          },
        ],
      },
      {
        name: 'Bata School Shoes for Kids',
        imageUrl: 'https://example.com/bata-school.jpg',
        releaseDate: new Date('2024-03-05'),
        productUrl: 'https://www.bata.in/school-shoes',
        description: 'Durable black school shoes with anti-slip sole and leather construction',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Durable for active kids, good grip, easy to clean, proper sizing',
            dislikesSummary: 'Can be stiff for small children',
            capturedAt: new Date('2025-06-18'),
          },
        ],
      },
      {
        name: 'Bata Sandals - Ladies Comfort',
        imageUrl: 'https://example.com/bata-ladies-sandals.jpg',
        releaseDate: new Date('2024-06-30'),
        productUrl: 'https://www.bata.in/ladies-comfort-sandals',
        description: 'Stylish and comfortable sandals for women with cushioned footbed',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.1,
            likesSummary: 'Comfortable for daily use, stylish designs, good arch support',
            dislikesSummary: 'Strap durability issues, sizing runs small',
            capturedAt: new Date('2025-08-25'),
          },
        ],
      },
    ],
    'amul-india': [
      {
        name: 'Amul Gold Full Cream Milk',
        imageUrl: 'https://example.com/amul-gold.jpg',
        releaseDate: new Date('1990-01-01'),
        productUrl: 'https://www.amul.com/products/amul-gold',
        description: 'Full cream milk with 6% fat content, rich and creamy taste',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.7,
            likesSummary: 'Rich creamy taste, pure quality, trusted brand, consistent quality, good for tea/coffee',
            dislikesSummary: 'Higher fat content not suitable for everyone, price slightly higher',
            capturedAt: new Date('2025-09-10'),
          },
        ],
      },
      {
        name: 'Amul Butter (500g)',
        imageUrl: 'https://example.com/amul-butter.jpg',
        releaseDate: new Date('1966-01-01'),
        productUrl: 'https://www.amul.com/products/amul-butter',
        description: 'India\'s most loved butter made from fresh cream',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.8,
            likesSummary: 'Excellent taste, consistent quality, iconic product, perfect for toast, good for baking',
            dislikesSummary: 'Can be too salty for some, higher price than alternatives',
            capturedAt: new Date('2025-08-15'),
          },
        ],
      },
      {
        name: 'Amul Cheese Slices (200g)',
        imageUrl: 'https://example.com/amul-cheese.jpg',
        releaseDate: new Date('1980-01-01'),
        productUrl: 'https://www.amul.com/products/cheese-slices',
        description: 'Processed cheese slices perfect for sandwiches and burgers',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Great melting quality, good taste, convenient packaging, versatile use',
            dislikesSummary: 'Contains preservatives, slightly artificial taste',
            capturedAt: new Date('2025-07-22'),
          },
        ],
      },
      {
        name: 'Amul Kool Cafe (200ml)',
        imageUrl: 'https://example.com/amul-kool-cafe.jpg',
        releaseDate: new Date('2023-05-15'),
        productUrl: 'https://www.amul.com/products/kool-cafe',
        description: 'Coffee flavored milk drink, perfect summer refreshment',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Refreshing taste, good coffee flavor, convenient pack size, affordable',
            dislikesSummary: 'Too sweet for some, artificial coffee taste',
            capturedAt: new Date('2025-09-01'),
          },
        ],
      },
      {
        name: 'Amul Ice Cream - Chocolate Chips (1L)',
        imageUrl: 'https://example.com/amul-icecream.jpg',
        releaseDate: new Date('2000-01-01'),
        productUrl: 'https://www.amul.com/products/ice-cream',
        description: 'Rich chocolate ice cream with chocolate chips',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Creamy texture, generous chocolate chips, good value, family favorite',
            dislikesSummary: 'Can be too sweet, melts quickly',
            capturedAt: new Date('2025-06-30'),
          },
        ],
      },
    ],
    'britannia-industries': [
      {
        name: 'Britannia Good Day Butter Cookies',
        imageUrl: 'https://example.com/britannia-goodday.jpg',
        releaseDate: new Date('1986-01-01'),
        productUrl: 'https://www.britannia.co.in/products/good-day',
        description: 'Delicious butter cookies with rich taste, available in multiple variants',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent butter flavor, crispy texture, value for money, nostalgia factor, kids love it',
            dislikesSummary: 'High sugar content, breaks easily during transport',
            capturedAt: new Date('2025-09-12'),
          },
        ],
      },
      {
        name: 'Britannia Marie Gold Biscuits',
        imageUrl: 'https://example.com/britannia-marie.jpg',
        releaseDate: new Date('1955-01-01'),
        productUrl: 'https://www.britannia.co.in/products/marie-gold',
        description: 'Light and healthy biscuits, perfect with tea',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Low calorie, perfect with tea, light taste, affordable, trusted for generations',
            dislikesSummary: 'Plain taste, packaging not sturdy',
            capturedAt: new Date('2025-08-18'),
          },
        ],
      },
      {
        name: 'Britannia NutriChoice Digestive Biscuits',
        imageUrl: 'https://example.com/britannia-nutrichoice.jpg',
        releaseDate: new Date('2002-01-01'),
        productUrl: 'https://www.britannia.co.in/products/nutrichoice',
        description: 'High fiber digestive biscuits made with whole wheat',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'High fiber content, healthier option, good taste, filling snack',
            dislikesSummary: 'Expensive compared to regular biscuits, slightly dry',
            capturedAt: new Date('2025-07-25'),
          },
        ],
      },
      {
        name: 'Britannia Milk Bikis Biscuits',
        imageUrl: 'https://example.com/britannia-milkbikis.jpg',
        releaseDate: new Date('1990-01-01'),
        productUrl: 'https://www.britannia.co.in/products/milk-bikis',
        description: 'Milk biscuits enriched with calcium for growing children',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.4,
            likesSummary: 'Kids favorite, good calcium source, mild sweet taste, affordable',
            dislikesSummary: 'Can be hard for toddlers, sugar content',
            capturedAt: new Date('2025-06-15'),
          },
        ],
      },
      {
        name: 'Britannia Bread - Whole Wheat',
        imageUrl: 'https://example.com/britannia-bread.jpg',
        releaseDate: new Date('2010-01-01'),
        productUrl: 'https://www.britannia.co.in/products/bread',
        description: 'Fresh whole wheat bread with high fiber',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.2,
            likesSummary: 'Fresh quality, good taste, soft texture, reliable brand',
            dislikesSummary: 'Short shelf life, availability issues in some areas',
            capturedAt: new Date('2025-09-05'),
          },
        ],
      },
    ],
    'hindustan-unilever': [
      {
        name: 'Dove Deeply Nourishing Body Wash',
        imageUrl: 'https://example.com/dove-bodywash.jpg',
        releaseDate: new Date('2015-03-10'),
        productUrl: 'https://www.dove.com/in/body-wash',
        description: '¼ moisturizing cream body wash for soft and smooth skin',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Moisturizing formula, gentle on skin, pleasant fragrance, doesn\'t dry skin, lasts long',
            dislikesSummary: 'Expensive, needs multiple pumps',
            capturedAt: new Date('2025-09-08'),
          },
        ],
      },
      {
        name: 'Surf Excel Matic Front Load Detergent',
        imageUrl: 'https://example.com/surf-excel.jpg',
        releaseDate: new Date('2010-01-01'),
        productUrl: 'https://www.surfexcel.com/products',
        description: 'Special detergent for front-load washing machines',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Excellent stain removal, low suds formula, machine-friendly, fresh smell',
            dislikesSummary: 'Expensive compared to regular detergents, strong fragrance',
            capturedAt: new Date('2025-08-22'),
          },
        ],
      },
      {
        name: 'Clinic Plus Strong & Long Shampoo',
        imageUrl: 'https://example.com/clinic-plus.jpg',
        releaseDate: new Date('2005-01-01'),
        productUrl: 'https://www.clinicplus.in/shampoo',
        description: 'Milk protein formula for strong and long hair',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Affordable, effective for daily use, reduces hair fall, good value',
            dislikesSummary: 'Contains sulfates, not suitable for colored hair',
            capturedAt: new Date('2025-07-16'),
          },
        ],
      },
      {
        name: 'Pepsodent Germicheck Toothpaste',
        imageUrl: 'https://example.com/pepsodent.jpg',
        releaseDate: new Date('2000-01-01'),
        productUrl: 'https://www.pepsodent.co.in/products',
        description: 'Advanced germ protection formula for complete oral care',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.5,
            likesSummary: 'Effective germ protection, fresh breath, affordable, trusted brand',
            dislikesSummary: 'Strong mint flavor may not suit everyone',
            capturedAt: new Date('2025-06-28'),
          },
        ],
      },
      {
        name: 'Lux Soft Touch Soap Bar',
        imageUrl: 'https://example.com/lux-soap.jpg',
        releaseDate: new Date('1929-01-01'),
        productUrl: 'https://www.lux.com/products/soap',
        description: 'French rose and almond oil beauty soap',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Pleasant fragrance, soft lather, affordable, long-lasting',
            dislikesSummary: 'Can be drying for some skin types',
            capturedAt: new Date('2025-09-20'),
          },
        ],
      },
    ],
    'bajaj-auto': [
      {
        name: 'Bajaj Pulsar NS400Z',
        imageUrl: 'https://example.com/bajaj-ns400z.jpg',
        releaseDate: new Date('2025-05-01'),
        productUrl: 'https://www.bajajauto.com/pulsar-ns400z',
        description: 'Most powerful Pulsar with 400cc engine and advanced features',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.7,
            likesSummary: 'Powerful engine, great performance, modern design, feature-rich, value for money',
            dislikesSummary: 'Heavy for city riding, fuel efficiency could be better',
            capturedAt: new Date('2025-09-25'),
          },
        ],
      },
      {
        name: 'Bajaj Chetak Electric Scooter',
        imageUrl: 'https://example.com/bajaj-chetak.jpg',
        releaseDate: new Date('2022-03-01'),
        productUrl: 'https://www.bajajauto.com/chetak',
        description: 'Premium electric scooter with 95km range and smart features',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent build quality, good range, smooth ride, low maintenance, premium feel',
            dislikesSummary: 'Expensive, charging infrastructure limited, heavy weight',
            capturedAt: new Date('2025-08-30'),
          },
        ],
      },
      {
        name: 'Bajaj Dominar 400',
        imageUrl: 'https://example.com/bajaj-dominar.jpg',
        releaseDate: new Date('2016-12-15'),
        productUrl: 'https://www.bajajauto.com/dominar-400',
        description: 'Touring motorcycle with 373cc engine, perfect for long rides',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.6,
            likesSummary: 'Excellent for touring, comfortable riding position, powerful engine, stable at high speeds',
            dislikesSummary: 'Heavy for beginners, expensive maintenance',
            capturedAt: new Date('2025-07-12'),
          },
        ],
      },
      {
        name: 'Bajaj Platina 110',
        imageUrl: 'https://example.com/bajaj-platina.jpg',
        releaseDate: new Date('2020-01-01'),
        productUrl: 'https://www.bajajauto.com/platina-110',
        description: 'Fuel-efficient commuter bike with comfortable ride',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Excellent fuel efficiency, comfortable for daily commute, affordable, low maintenance',
            dislikesSummary: 'Basic features, not suitable for highway',
            capturedAt: new Date('2025-06-18'),
          },
        ],
      },
      {
        name: 'Bajaj CT 125X',
        imageUrl: 'https://example.com/bajaj-ct125x.jpg',
        releaseDate: new Date('2023-06-01'),
        productUrl: 'https://www.bajajauto.com/ct-125x',
        description: 'Rugged commuter motorcycle with off-road styling',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.2,
            likesSummary: 'Sturdy build, good ground clearance, affordable, suitable for bad roads',
            dislikesSummary: 'Basic features, average performance',
            capturedAt: new Date('2025-05-22'),
          },
        ],
      },
    ],
    'hero-motocorp': [
      {
        name: 'Hero Splendor Plus',
        imageUrl: 'https://example.com/hero-splendor.jpg',
        releaseDate: new Date('1994-01-01'),
        productUrl: 'https://www.heromotocorp.com/splendor-plus',
        description: 'India\'s best-selling motorcycle with exceptional fuel efficiency',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.6,
            likesSummary: 'Best-in-class mileage, reliable, low maintenance, affordable, resale value',
            dislikesSummary: 'Basic features, underpowered for highway',
            capturedAt: new Date('2025-09-28'),
          },
        ],
      },
      {
        name: 'Hero Xpulse 200 4V',
        imageUrl: 'https://example.com/hero-xpulse.jpg',
        releaseDate: new Date('2023-01-01'),
        productUrl: 'https://www.heromotocorp.com/xpulse-200-4v',
        description: 'Adventure motorcycle with advanced off-road capabilities',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent off-road capability, good suspension, feature-rich, adventure ready',
            dislikesSummary: 'Tall seat height, expensive, not ideal for short riders',
            capturedAt: new Date('2025-08-16'),
          },
        ],
      },
      {
        name: 'Hero Passion Pro',
        imageUrl: 'https://example.com/hero-passion.jpg',
        releaseDate: new Date('2006-01-01'),
        productUrl: 'https://www.heromotocorp.com/passion-pro',
        description: 'Premium commuter motorcycle with i3S technology',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.4,
            likesSummary: 'Good fuel efficiency, comfortable seat, reliable, i3S feature useful',
            dislikesSummary: 'Average looks, lacks modern features',
            capturedAt: new Date('2025-07-08'),
          },
        ],
      },
      {
        name: 'Hero Maestro Edge 125',
        imageUrl: 'https://example.com/hero-maestro.jpg',
        releaseDate: new Date('2020-02-01'),
        productUrl: 'https://www.heromotocorp.com/maestro-edge',
        description: 'Stylish scooter with connected features and powerful engine',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Stylish design, good pick-up, connected features, comfortable ride',
            dislikesSummary: 'Below average mileage, expensive',
            capturedAt: new Date('2025-06-12'),
          },
        ],
      },
      {
        name: 'Hero Glamour Xtec',
        imageUrl: 'https://example.com/hero-glamour.jpg',
        releaseDate: new Date('2022-08-01'),
        productUrl: 'https://www.heromotocorp.com/glamour-xtec',
        description: 'Premium commuter with Bluetooth connectivity and digital console',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.4,
            likesSummary: 'Modern features, Bluetooth connectivity, good build quality, comfortable',
            dislikesSummary: 'Slightly expensive, average performance',
            capturedAt: new Date('2025-05-28'),
          },
        ],
      },
    ],
    'tvs-motors': [
      {
        name: 'TVS Apache RTR 310',
        imageUrl: 'https://example.com/tvs-apache-310.jpg',
        releaseDate: new Date('2025-07-25'),
        productUrl: 'https://www.tvsmotor.com/apache-rtr-310',
        description: 'Premium sports motorcycle with BMW-derived engine',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.7,
            likesSummary: 'Powerful engine, excellent handling, premium features, racing DNA',
            dislikesSummary: 'Expensive, fuel efficiency average, aggressive riding position',
            capturedAt: new Date('2025-09-20'),
          },
        ],
      },
      {
        name: 'TVS iQube Electric Scooter',
        imageUrl: 'https://example.com/tvs-iqube.jpg',
        releaseDate: new Date('2020-01-01'),
        productUrl: 'https://www.tvsmotor.com/iqube',
        description: 'Smart electric scooter with connected features and good range',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Good range, smart features, smooth ride, low running cost, eco-friendly',
            dislikesSummary: 'Expensive, charging time long, limited service centers',
            capturedAt: new Date('2025-08-05'),
          },
        ],
      },
      {
        name: 'TVS Jupiter 125',
        imageUrl: 'https://example.com/tvs-jupiter.jpg',
        releaseDate: new Date('2020-09-01'),
        productUrl: 'https://www.tvsmotor.com/jupiter-125',
        description: 'Family scooter with spacious storage and comfortable ride',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.5,
            likesSummary: 'Spacious under-seat storage, comfortable, good mileage, family-friendly',
            dislikesSummary: 'Plain design, lacks sporty appeal',
            capturedAt: new Date('2025-07-15'),
          },
        ],
      },
      {
        name: 'TVS Raider 125',
        imageUrl: 'https://example.com/tvs-raider.jpg',
        releaseDate: new Date('2021-09-01'),
        productUrl: 'https://www.tvsmotor.com/raider',
        description: 'Sporty commuter motorcycle with connected features',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Sporty design, good performance, connected features, value for money',
            dislikesSummary: 'Firm suspension, average fuel efficiency',
            capturedAt: new Date('2025-06-20'),
          },
        ],
      },
      {
        name: 'TVS XL100 Heavy Duty',
        imageUrl: 'https://example.com/tvs-xl100.jpg',
        releaseDate: new Date('2018-01-01'),
        productUrl: 'https://www.tvsmotor.com/xl-100',
        description: 'Heavy-duty moped for commercial and personal use',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.6,
            likesSummary: 'Extremely reliable, best mileage, low maintenance, affordable, durable',
            dislikesSummary: 'Basic features, slow performance',
            capturedAt: new Date('2025-05-10'),
          },
        ],
      },
    ],
    'samsung-india': [
      {
        name: 'Samsung Galaxy S25 Ultra',
        imageUrl: 'https://example.com/samsung-s25-ultra.jpg',
        releaseDate: new Date('2025-09-22'),
        productUrl: 'https://www.samsung.com/in/galaxy-s25-ultra',
        description: 'Flagship smartphone with AI features, 200MP camera, S Pen',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.8,
            likesSummary: 'Excellent camera quality, powerful AI features, S Pen functionality, premium build, best display',
            dislikesSummary: 'Very expensive, bulky, battery drains with heavy use',
            capturedAt: new Date('2025-10-05'),
          },
        ],
      },
      {
        name: 'Samsung Galaxy M35 5G',
        imageUrl: 'https://example.com/samsung-m35.jpg',
        releaseDate: new Date('2024-07-15'),
        productUrl: 'https://www.samsung.com/in/galaxy-m35',
        description: 'Budget 5G smartphone with 6000mAh battery and 120Hz display',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Excellent battery life, smooth 120Hz display, 5G at budget price, good performance',
            dislikesSummary: 'Average camera, plastic build, bloatware',
            capturedAt: new Date('2025-08-28'),
          },
        ],
      },
      {
        name: 'Samsung Neo QLED 4K Smart TV (55")',
        imageUrl: 'https://example.com/samsung-neo-qled.jpg',
        releaseDate: new Date('2024-03-10'),
        productUrl: 'https://www.samsung.com/in/neo-qled-tv',
        description: 'Premium 4K TV with Quantum Matrix Technology and AI upscaling',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Stunning picture quality, excellent brightness, smart features, premium design',
            dislikesSummary: 'Very expensive, remote control basic, sound quality average',
            capturedAt: new Date('2025-07-20'),
          },
        ],
      },
      {
        name: 'Samsung Ecobubble Front Load Washing Machine',
        imageUrl: 'https://example.com/samsung-washing-machine.jpg',
        releaseDate: new Date('2023-11-01'),
        productUrl: 'https://www.samsung.com/in/washing-machines/ecobubble',
        description: '8kg front load washing machine with AI wash and steam technology',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Excellent wash quality, energy efficient, AI features useful, low noise',
            dislikesSummary: 'Expensive, long wash cycles, service issues',
            capturedAt: new Date('2025-06-15'),
          },
        ],
      },
      {
        name: 'Samsung Galaxy Buds 3 Pro',
        imageUrl: 'https://example.com/samsung-buds-3.jpg',
        releaseDate: new Date('2024-08-20'),
        productUrl: 'https://www.samsung.com/in/galaxy-buds-3-pro',
        description: 'Premium TWS earbuds with ANC and 360° audio',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent sound quality, good ANC, comfortable fit, premium build',
            dislikesSummary: 'Expensive, battery life average, touch controls sensitive',
            capturedAt: new Date('2025-09-10'),
          },
        ],
      },
    ],
    'xiaomi-india': [
      {
        name: 'Redmi Note 14 Pro 5G',
        imageUrl: 'https://example.com/redmi-note-14-pro.jpg',
        releaseDate: new Date('2025-09-10'),
        productUrl: 'https://www.mi.com/in/redmi-note-14-pro',
        description: 'Mid-range smartphone with 200MP camera and 120W fast charging',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Excellent value for money, good camera, fast charging, smooth display',
            dislikesSummary: 'MIUI bloatware, average low-light camera, heating issues',
            capturedAt: new Date('2025-09-28'),
          },
        ],
      },
      {
        name: 'Mi TV 5X 55" 4K',
        imageUrl: 'https://example.com/mi-tv-5x.jpg',
        releaseDate: new Date('2024-05-15'),
        productUrl: 'https://www.mi.com/in/mi-tv-5x',
        description: '4K Smart TV with Dolby Vision and Android TV',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Affordable 4K TV, good picture quality, Android TV smooth, value for money',
            dislikesSummary: 'Average sound, build quality issues, ads on UI',
            capturedAt: new Date('2025-08-12'),
          },
        ],
      },
      {
        name: 'Mi Air Purifier 3',
        imageUrl: 'https://example.com/mi-air-purifier.jpg',
        releaseDate: new Date('2023-09-01'),
        productUrl: 'https://www.mi.com/in/air-purifier-3',
        description: 'Smart air purifier with HEPA filter and app control',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Effective purification, quiet operation, smart features, affordable',
            dislikesSummary: 'Filter replacement expensive, app connectivity issues',
            capturedAt: new Date('2025-07-25'),
          },
        ],
      },
      {
        name: 'Mi Robot Vacuum-Mop 2',
        imageUrl: 'https://example.com/mi-robot-vacuum.jpg',
        releaseDate: new Date('2024-02-20'),
        productUrl: 'https://www.mi.com/in/robot-vacuum-mop-2',
        description: 'Smart robot vacuum with mopping and laser navigation',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.2,
            likesSummary: 'Good navigation, effective cleaning, app features, value for money',
            dislikesSummary: 'Average battery life, gets stuck occasionally, noisy',
            capturedAt: new Date('2025-06-30'),
          },
        ],
      },
      {
        name: 'Mi Smart Band 8',
        imageUrl: 'https://example.com/mi-band-8.jpg',
        releaseDate: new Date('2023-06-10'),
        productUrl: 'https://www.mi.com/in/mi-band-8',
        description: 'Fitness tracker with AMOLED display and 16-day battery',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Excellent battery life, accurate tracking, affordable, comfortable',
            dislikesSummary: 'Limited third-party app support, basic features',
            capturedAt: new Date('2025-08-18'),
          },
        ],
      },
    ],
    'oneplus-india': [
      {
        name: 'OnePlus 13 Pro',
        imageUrl: 'https://example.com/oneplus-13-pro.jpg',
        releaseDate: new Date('2025-09-05'),
        productUrl: 'https://www.oneplus.in/13-pro',
        description: 'Flagship smartphone with Snapdragon 8 Gen 4 and Hasselblad cameras',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Excellent performance, Hasselblad camera quality, fast 150W charging, premium feel',
            dislikesSummary: 'Expensive, no headphone jack, ColorOS instead of OxygenOS',
            capturedAt: new Date('2025-09-28'),
          },
        ],
      },
      {
        name: 'OnePlus Nord CE 5',
        imageUrl: 'https://example.com/oneplus-nord-ce5.jpg',
        releaseDate: new Date('2025-05-12'),
        productUrl: 'https://www.oneplus.in/nord-ce-5',
        description: 'Mid-range 5G smartphone with AMOLED display and 80W charging',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Good display, fast charging, smooth performance, value for money',
            dislikesSummary: 'Average camera, plastic build, no OIS',
            capturedAt: new Date('2025-06-25'),
          },
        ],
      },
      {
        name: 'OnePlus Buds Pro 3',
        imageUrl: 'https://example.com/oneplus-buds-pro3.jpg',
        releaseDate: new Date('2024-09-15'),
        productUrl: 'https://www.oneplus.in/buds-pro-3',
        description: 'Premium TWS earbuds with adaptive ANC and spatial audio',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Excellent sound quality, good ANC, comfortable, premium build',
            dislikesSummary: 'Expensive, average battery, app required for features',
            capturedAt: new Date('2025-08-08'),
          },
        ],
      },
      {
        name: 'OnePlus TV Q2 55" 4K QLED',
        imageUrl: 'https://example.com/oneplus-tv-q2.jpg',
        releaseDate: new Date('2024-04-10'),
        productUrl: 'https://www.oneplus.in/tv-q2',
        description: '4K QLED TV with 120Hz refresh rate and Android TV',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent picture quality, smooth 120Hz, good sound, premium design',
            dislikesSummary: 'Expensive, remote basic, occasional software bugs',
            capturedAt: new Date('2025-07-18'),
          },
        ],
      },
      {
        name: 'OnePlus Watch 3',
        imageUrl: 'https://example.com/oneplus-watch-3.jpg',
        releaseDate: new Date('2024-08-01'),
        productUrl: 'https://www.oneplus.in/watch-3',
        description: 'Smartwatch with AMOLED display and health tracking',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.2,
            likesSummary: 'Good display, accurate tracking, premium build, long battery',
            dislikesSummary: 'Limited app ecosystem, expensive, slow updates',
            capturedAt: new Date('2025-09-05'),
          },
        ],
      },
    ],
    'cafe-coffee-day': [
      {
        name: 'CCD Cappuccino (Regular)',
        imageUrl: 'https://example.com/ccd-cappuccino.jpg',
        releaseDate: new Date('2000-01-01'),
        productUrl: 'https://www.cafecoffeeday.com/menu/cappuccino',
        description: 'Classic cappuccino with rich espresso and steamed milk',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.1,
            likesSummary: 'Consistent taste, good ambiance, affordable, convenient locations',
            dislikesSummary: 'Average coffee quality, sometimes too sweet',
            capturedAt: new Date('2025-08-15'),
          },
        ],
      },
      {
        name: 'CCD Cold Coffee',
        imageUrl: 'https://example.com/ccd-cold-coffee.jpg',
        releaseDate: new Date('2005-01-01'),
        productUrl: 'https://www.cafecoffeeday.com/menu/cold-coffee',
        description: 'Refreshing iced coffee with milk and ice cream',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Refreshing, good for summer, consistent taste, filling',
            dislikesSummary: 'Too sweet, expensive',
            capturedAt: new Date('2025-07-20'),
          },
        ],
      },
      {
        name: 'CCD Chocolate Brownie',
        imageUrl: 'https://example.com/ccd-brownie.jpg',
        releaseDate: new Date('2010-01-01'),
        productUrl: 'https://www.cafecoffeeday.com/menu/chocolate-brownie',
        description: 'Warm chocolate brownie with vanilla ice cream',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.2,
            likesSummary: 'Delicious, warm and fresh, good portion size, perfect with coffee',
            dislikesSummary: 'Expensive, sometimes dry',
            capturedAt: new Date('2025-06-10'),
          },
        ],
      },
      {
        name: 'CCD Chicken Sandwich',
        imageUrl: 'https://example.com/ccd-sandwich.jpg',
        releaseDate: new Date('2008-01-01'),
        productUrl: 'https://www.cafecoffeeday.com/menu/chicken-sandwich',
        description: 'Grilled chicken sandwich with vegetables',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 3.9,
            likesSummary: 'Filling, fresh ingredients, good for quick meal',
            dislikesSummary: 'Average taste, expensive, small portion',
            capturedAt: new Date('2025-05-22'),
          },
        ],
      },
      {
        name: 'CCD Espresso Shot',
        imageUrl: 'https://example.com/ccd-espresso.jpg',
        releaseDate: new Date('2000-01-01'),
        productUrl: 'https://www.cafecoffeeday.com/menu/espresso',
        description: 'Strong single shot of espresso',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.0,
            likesSummary: 'Strong coffee, quick service, affordable',
            dislikesSummary: 'Sometimes bitter, inconsistent quality',
            capturedAt: new Date('2025-04-18'),
          },
        ],
      },
    ],
    'mcdonalds-india-westlife': [
      {
        name: 'McSpicy Paneer Burger',
        imageUrl: 'https://example.com/mcdonalds-mcspicy-paneer.jpg',
        releaseDate: new Date('2025-10-02'),
        productUrl: 'https://www.mcdonaldsindia.com/mcspicy-paneer',
        description: 'Spicy paneer patty burger with Indian flavors',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.4,
            likesSummary: 'Perfect spice level, crispy patty, good for vegetarians, tasty sauce',
            dislikesSummary: 'Small size, expensive, can be too spicy',
            capturedAt: new Date('2025-10-06'),
          },
        ],
      },
      {
        name: 'McAloo Tikki Burger',
        imageUrl: 'https://example.com/mcdonalds-mcaloo-tikki.jpg',
        releaseDate: new Date('1996-01-01'),
        productUrl: 'https://www.mcdonaldsindia.com/mcaloo-tikki',
        description: 'Classic Indian-style potato patty burger',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Affordable, tasty, nostalgic, consistent quality, value for money',
            dislikesSummary: 'Can be soggy, small size',
            capturedAt: new Date('2025-09-12'),
          },
        ],
      },
      {
        name: 'Chicken McNuggets (6 Piece)',
        imageUrl: 'https://example.com/mcdonalds-nuggets.jpg',
        releaseDate: new Date('2010-01-01'),
        productUrl: 'https://www.mcdonaldsindia.com/chicken-mcnuggets',
        description: 'Crispy chicken nuggets with dipping sauce',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Crispy, tasty, good for kids, consistent quality',
            dislikesSummary: 'Expensive, small pieces, can be dry',
            capturedAt: new Date('2025-08-20'),
          },
        ],
      },
      {
        name: 'McCafe Cappuccino',
        imageUrl: 'https://example.com/mcdonalds-cappuccino.jpg',
        releaseDate: new Date('2015-01-01'),
        productUrl: 'https://www.mcdonaldsindia.com/mccafe-cappuccino',
        description: 'Premium cappuccino from McCafe',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.1,
            likesSummary: 'Good coffee quality, affordable, convenient, consistent taste',
            dislikesSummary: 'Sometimes too milky, average compared to cafes',
            capturedAt: new Date('2025-07-15'),
          },
        ],
      },
      {
        name: 'McFlurry Oreo',
        imageUrl: 'https://example.com/mcdonalds-mcflurry.jpg',
        releaseDate: new Date('2012-01-01'),
        productUrl: 'https://www.mcdonaldsindia.com/mcflurry-oreo',
        description: 'Soft serve ice cream with Oreo cookie pieces',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Delicious, good portion, Oreo pieces generous, creamy texture',
            dislikesSummary: 'Expensive, melts quickly, too sweet',
            capturedAt: new Date('2025-08-05'),
          },
        ],
      },
    ],
    'dominos-india-jubilant': [
      {
        name: 'Domino\'s Margherita Pizza (Medium)',
        imageUrl: 'https://example.com/dominos-margherita.jpg',
        releaseDate: new Date('1996-01-01'),
        productUrl: 'https://www.dominos.co.in/margherita',
        description: 'Classic pizza with tomato sauce and mozzarella cheese',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Simple and tasty, good cheese quality, fast delivery, affordable',
            dislikesSummary: 'Too much cheese sometimes, can be oily',
            capturedAt: new Date('2025-09-18'),
          },
        ],
      },
      {
        name: 'Domino\'s Chicken Dominator Pizza',
        imageUrl: 'https://example.com/dominos-chicken-dominator.jpg',
        releaseDate: new Date('2018-01-01'),
        productUrl: 'https://www.dominos.co.in/chicken-dominator',
        description: 'Double chicken toppings with exotic sauces',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Loaded with chicken, great taste, good value, filling',
            dislikesSummary: 'Very heavy, expensive, can be too cheesy',
            capturedAt: new Date('2025-08-25'),
          },
        ],
      },
      {
        name: 'Domino\'s Garlic Breadsticks',
        imageUrl: 'https://example.com/dominos-garlic-bread.jpg',
        releaseDate: new Date('2010-01-01'),
        productUrl: 'https://www.dominos.co.in/garlic-breadsticks',
        description: 'Soft breadsticks with garlic seasoning and cheese',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.4,
            likesSummary: 'Delicious, good garlic flavor, soft texture, good with pizza',
            dislikesSummary: 'Small quantity, expensive',
            capturedAt: new Date('2025-07-30'),
          },
        ],
      },
      {
        name: 'Domino\'s Pasta Italiano White',
        imageUrl: 'https://example.com/dominos-pasta.jpg',
        releaseDate: new Date('2015-01-01'),
        productUrl: 'https://www.dominos.co.in/pasta-italiano-white',
        description: 'Creamy white sauce pasta with vegetables',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.0,
            likesSummary: 'Creamy sauce, good portion, filling, unique offering',
            dislikesSummary: 'Can be too creamy, soggy sometimes, average taste',
            capturedAt: new Date('2025-06-22'),
          },
        ],
      },
      {
        name: 'Domino\'s Choco Lava Cake',
        imageUrl: 'https://example.com/dominos-choco-lava.jpg',
        releaseDate: new Date('2012-01-01'),
        productUrl: 'https://www.dominos.co.in/choco-lava-cake',
        description: 'Warm chocolate cake with molten chocolate center',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Delicious, warm, molten center perfect, best dessert, shareable',
            dislikesSummary: 'Small size, expensive, sometimes not warm enough',
            capturedAt: new Date('2025-08-10'),
          },
        ],
      },
    ],
    'reebok-india': [
      {
        name: 'Reebok Nano X4 Training Shoes',
        imageUrl: 'https://example.com/reebok-nano-x4.jpg',
        releaseDate: new Date('2024-03-15'),
        productUrl: 'https://www.reebok.in/nano-x4',
        description: 'Cross-training shoes for gym and HIIT workouts',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Great stability, durable, comfortable, good for heavy lifting',
            dislikesSummary: 'Expensive, stiff initially, heavy',
            capturedAt: new Date('2025-08-18'),
          },
        ],
      },
      {
        name: 'Reebok Floatride Energy 5',
        imageUrl: 'https://example.com/reebok-floatride.jpg',
        releaseDate: new Date('2024-06-20'),
        productUrl: 'https://www.reebok.in/floatride-energy-5',
        description: 'Lightweight running shoes with responsive cushioning',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Lightweight, good cushioning, breathable, comfortable for long runs',
            dislikesSummary: 'Not durable, expensive, narrow fit',
            capturedAt: new Date('2025-07-25'),
          },
        ],
      },
      {
        name: 'Reebok Identity Joggers',
        imageUrl: 'https://example.com/reebok-joggers.jpg',
        releaseDate: new Date('2023-09-10'),
        productUrl: 'https://www.reebok.in/identity-joggers',
        description: 'Comfortable cotton joggers for casual wear',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.2,
            likesSummary: 'Comfortable, good fit, affordable, versatile',
            dislikesSummary: 'Thin fabric, color fades, average quality',
            capturedAt: new Date('2025-06-12'),
          },
        ],
      },
      {
        name: 'Reebok Combat Boxing Gloves',
        imageUrl: 'https://example.com/reebok-boxing-gloves.jpg',
        releaseDate: new Date('2023-05-01'),
        productUrl: 'https://www.reebok.in/combat-boxing-gloves',
        description: 'Professional boxing gloves with foam padding',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.5,
            likesSummary: 'Good quality, durable, comfortable padding, value for money',
            dislikesSummary: 'Stiff initially, strong smell',
            capturedAt: new Date('2025-05-28'),
          },
        ],
      },
      {
        name: 'Reebok Performance Gym Bag',
        imageUrl: 'https://example.com/reebok-gym-bag.jpg',
        releaseDate: new Date('2023-11-15'),
        productUrl: 'https://www.reebok.in/gym-bag',
        description: 'Spacious gym bag with multiple compartments',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.1,
            likesSummary: 'Spacious, multiple pockets, durable, good design',
            dislikesSummary: 'Average quality zippers, no shoe compartment',
            capturedAt: new Date('2025-04-20'),
          },
        ],
      },
    ],
    'nike-india': [
      {
        name: 'Nike Air Max 2025',
        imageUrl: 'https://example.com/nike-air-max-2025.jpg',
        releaseDate: new Date('2025-08-05'),
        productUrl: 'https://www.nike.com/in/air-max-2025',
        description: 'Latest Air Max with visible air cushioning and sustainable materials',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.7,
            likesSummary: 'Excellent cushioning, stylish, comfortable, premium quality, sustainable',
            dislikesSummary: 'Very expensive, heavy, not for running',
            capturedAt: new Date('2025-09-22'),
          },
        ],
      },
      {
        name: 'Nike Pegasus 41 Running Shoes',
        imageUrl: 'https://example.com/nike-pegasus-41.jpg',
        releaseDate: new Date('2024-07-10'),
        productUrl: 'https://www.nike.com/in/pegasus-41',
        description: 'Versatile running shoes with ReactX foam',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Great for all distances, comfortable, durable, responsive cushioning',
            dislikesSummary: 'Expensive, narrow fit, breaks in slowly',
            capturedAt: new Date('2025-08-28'),
          },
        ],
      },
      {
        name: 'Nike Dri-FIT Training T-Shirt',
        imageUrl: 'https://example.com/nike-dri-fit-tshirt.jpg',
        releaseDate: new Date('2023-03-01'),
        productUrl: 'https://www.nike.com/in/dri-fit-tshirt',
        description: 'Moisture-wicking training t-shirt for workouts',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent moisture wicking, comfortable, good fit, durable',
            dislikesSummary: 'Expensive for a t-shirt, limited colors',
            capturedAt: new Date('2025-07-15'),
          },
        ],
      },
      {
        name: 'Nike Brasilia Training Backpack',
        imageUrl: 'https://example.com/nike-brasilia-backpack.jpg',
        releaseDate: new Date('2022-01-01'),
        productUrl: 'https://www.nike.com/in/brasilia-backpack',
        description: 'Durable backpack with multiple compartments for training gear',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Spacious, durable, comfortable straps, good organization',
            dislikesSummary: 'Average quality, no laptop compartment padding',
            capturedAt: new Date('2025-06-08'),
          },
        ],
      },
      {
        name: 'Nike Revolution 7 Running Shoes',
        imageUrl: 'https://example.com/nike-revolution-7.jpg',
        releaseDate: new Date('2023-09-15'),
        productUrl: 'https://www.nike.com/in/revolution-7',
        description: 'Budget-friendly running shoes for beginners',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.2,
            likesSummary: 'Affordable, comfortable, good for beginners, lightweight',
            dislikesSummary: 'Not durable, basic cushioning, average quality',
            capturedAt: new Date('2025-05-18'),
          },
        ],
      },
    ],
    'puma-india': [
      {
        name: 'Puma Deviate Nitro Elite 3',
        imageUrl: 'https://example.com/puma-deviate-nitro.jpg',
        releaseDate: new Date('2024-08-22'),
        productUrl: 'https://www.puma.com/in/deviate-nitro-elite-3',
        description: 'Carbon-plated racing shoes with NITRO Elite foam',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Excellent for racing, responsive, lightweight, carbon plate effective',
            dislikesSummary: 'Very expensive, not for daily training, narrow fit',
            capturedAt: new Date('2025-09-15'),
          },
        ],
      },
      {
        name: 'Puma RS-X Sneakers',
        imageUrl: 'https://example.com/puma-rsx.jpg',
        releaseDate: new Date('2023-04-10'),
        productUrl: 'https://www.puma.com/in/rs-x',
        description: 'Retro-style chunky sneakers for casual wear',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Stylish design, comfortable, good quality, trendy',
            dislikesSummary: 'Heavy, expensive, bulky',
            capturedAt: new Date('2025-08-05'),
          },
        ],
      },
      {
        name: 'Puma Evercat Contender 3.0 Backpack',
        imageUrl: 'https://example.com/puma-backpack.jpg',
        releaseDate: new Date('2023-06-15'),
        productUrl: 'https://www.puma.com/in/contender-backpack',
        description: 'Durable backpack with padded laptop compartment',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Spacious, durable, comfortable, good laptop protection',
            dislikesSummary: 'Limited colors, heavy when full',
            capturedAt: new Date('2025-07-10'),
          },
        ],
      },
      {
        name: 'Puma Teamwear Football Jersey',
        imageUrl: 'https://example.com/puma-football-jersey.jpg',
        releaseDate: new Date('2024-01-20'),
        productUrl: 'https://www.puma.com/in/football-jersey',
        description: 'Breathable football jersey with DryCELL technology',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.2,
            likesSummary: 'Good moisture wicking, comfortable, durable, good fit',
            dislikesSummary: 'Expensive, limited team options',
            capturedAt: new Date('2025-06-20'),
          },
        ],
      },
      {
        name: 'Puma Future 7 Ultimate Football Boots',
        imageUrl: 'https://example.com/puma-future-7.jpg',
        releaseDate: new Date('2024-09-01'),
        productUrl: 'https://www.puma.com/in/future-7-ultimate',
        description: 'Professional football boots with adaptive fit',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.5,
            likesSummary: 'Excellent grip, comfortable, durable, professional quality',
            dislikesSummary: 'Very expensive, tight fit initially',
            capturedAt: new Date('2025-09-28'),
          },
        ],
      },
    ],
    'nestle-india': [
      {
        name: 'Maggi 2-Minute Masala Noodles',
        imageUrl: 'https://example.com/maggi-masala.jpg',
        releaseDate: new Date('1983-01-01'),
        productUrl: 'https://www.nestle.in/products/maggi',
        description: 'India\'s favorite instant noodles with masala flavor',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.7,
            likesSummary: 'Quick to make, delicious taste, nostalgic, versatile, affordable',
            dislikesSummary: 'Not very healthy, high sodium, addictive',
            capturedAt: new Date('2025-09-10'),
          },
        ],
      },
      {
        name: 'Nescafé Classic Coffee',
        imageUrl: 'https://example.com/nescafe-classic.jpg',
        releaseDate: new Date('1938-01-01'),
        productUrl: 'https://www.nescafe.com/in/classic',
        description: 'Premium instant coffee granules',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Strong coffee flavor, convenient, consistent quality, long-lasting',
            dislikesSummary: 'Bitter taste, instant coffee flavor, expensive',
            capturedAt: new Date('2025-08-15'),
          },
        ],
      },
      {
        name: 'KitKat Chocolate Bar (4 Finger)',
        imageUrl: 'https://example.com/kitkat.jpg',
        releaseDate: new Date('1995-01-01'),
        productUrl: 'https://www.nestle.in/products/kitkat',
        description: 'Crispy wafer chocolate bar with milk chocolate coating',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Crispy wafer, good chocolate quality, shareable, perfect with coffee',
            dislikesSummary: 'Melts easily, expensive, too sweet',
            capturedAt: new Date('2025-07-22'),
          },
        ],
      },
      {
        name: 'Nestlé Milkmaid Condensed Milk',
        imageUrl: 'https://example.com/milkmaid.jpg',
        releaseDate: new Date('1912-01-01'),
        productUrl: 'https://www.nestle.in/products/milkmaid',
        description: 'Sweetened condensed milk for desserts and beverages',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.6,
            likesSummary: 'Versatile use, good quality, essential for desserts, trusted brand',
            dislikesSummary: 'Very sweet, high calories, expensive',
            capturedAt: new Date('2025-06-18'),
          },
        ],
      },
      {
        name: 'Maggi Hot & Sweet Tomato Chilli Sauce',
        imageUrl: 'https://example.com/maggi-sauce.jpg',
        releaseDate: new Date('2000-01-01'),
        productUrl: 'https://www.nestle.in/products/maggi-sauce',
        description: 'Tangy and spicy tomato-based sauce',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.3,
            likesSummary: 'Perfect spice balance, versatile, good with snacks, affordable',
            dislikesSummary: 'Contains preservatives, too tangy for some',
            capturedAt: new Date('2025-05-30'),
          },
        ],
      },
    ],
    'dabur-india': [
      {
        name: 'Dabur Chyawanprash (1kg)',
        imageUrl: 'https://example.com/dabur-chyawanprash.jpg',
        releaseDate: new Date('1949-01-01'),
        productUrl: 'https://www.dabur.com/chyawanprash',
        description: 'Ayurvedic immunity booster with 40+ herbs',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.6,
            likesSummary: 'Effective immunity booster, natural ingredients, trusted for generations, good taste',
            dislikesSummary: 'Expensive, sticky consistency, strong smell',
            capturedAt: new Date('2025-09-05'),
          },
        ],
      },
      {
        name: 'Dabur Honey (1kg)',
        imageUrl: 'https://example.com/dabur-honey.jpg',
        releaseDate: new Date('1970-01-01'),
        productUrl: 'https://www.dabur.com/honey',
        description: 'Pure and natural honey',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.4,
            likesSummary: 'Good quality, pure honey, value pack, versatile use',
            dislikesSummary: 'Crystallizes quickly, expensive, authenticity concerns',
            capturedAt: new Date('2025-08-12'),
          },
        ],
      },
      {
        name: 'Dabur Amla Hair Oil (200ml)',
        imageUrl: 'https://example.com/dabur-amla-oil.jpg',
        releaseDate: new Date('1998-01-01'),
        productUrl: 'https://www.dabur.com/amla-hair-oil',
        description: 'Ayurvedic hair oil with Indian gooseberry extract',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Reduces hair fall, natural ingredients, affordable, pleasant smell',
            dislikesSummary: 'Greasy, stains clothes, heavy on hair',
            capturedAt: new Date('2025-07-25'),
          },
        ],
      },
      {
        name: 'Dabur Red Toothpaste (200g)',
        imageUrl: 'https://example.com/dabur-red-toothpaste.jpg',
        releaseDate: new Date('1975-01-01'),
        productUrl: 'https://www.dabur.com/red-toothpaste',
        description: 'Ayurvedic toothpaste with 13 herbal ingredients',
        insights: [
          {
            source: ReviewSource.OTHER,
            starsOutOf5: 4.3,
            likesSummary: 'Natural ingredients, effective, affordable, trusted brand',
            dislikesSummary: 'Strong herbal taste, not very foamy',
            capturedAt: new Date('2025-06-15'),
          },
        ],
      },
      {
        name: 'Dabur Gulabari Rose Water (120ml)',
        imageUrl: 'https://example.com/dabur-rose-water.jpg',
        releaseDate: new Date('1990-01-01'),
        productUrl: 'https://www.dabur.com/gulabari-rose-water',
        description: 'Pure rose water for skin and hair care',
        insights: [
          {
            source: ReviewSource.AMAZON,
            starsOutOf5: 4.5,
            likesSummary: 'Pleasant fragrance, refreshing, versatile use, affordable, natural',
            dislikesSummary: 'Bottle quality poor, small quantity',
            capturedAt: new Date('2025-05-20'),
          },
        ],
      },
    ],
  };

  let totalProducts = 0;
  let totalInsights = 0;
  let companiesUpdated = 0;

  for (const [companyId, products] of Object.entries(productsData)) {
    try {
      // Check if company exists
      const company = await prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!company) {
        console.log(`⚠️  Company not found: ${companyId}, skipping...`);
        continue;
      }

      // Create products for this company
      for (const productData of products) {
        const { insights, ...productInfo } = productData;

        const product = await prisma.product.create({
          data: {
            companyId: companyId,
            ...productInfo,
            insights: {
              create: insights,
            },
          },
          include: {
            insights: true,
          },
        });

        totalProducts++;
        totalInsights += insights.length;
      }

      companiesUpdated++;
      console.log(`✓ Created ${products.length} products for ${company.name}`);
    } catch (error) {
      console.error(`❌ Error creating products for ${companyId}:`, error);
    }
  }

  console.log('\n✅ Products seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Total Products Created: ${totalProducts}`);
  console.log(`   - Total Product Insights: ${totalInsights}`);
  console.log(`   - Companies Updated: ${companiesUpdated}`);
  console.log(`   - Average Products per Company: ${(totalProducts / companiesUpdated).toFixed(1)}`);
  console.log(`   - Average Insights per Product: ${(totalInsights / totalProducts).toFixed(1)}\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

