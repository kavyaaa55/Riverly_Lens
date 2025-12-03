import { PrismaClient, CompanyType, SocialPlatform, PressPriority, PeriodType, GrowthMetricType, RevenueBreakdownType, RevenueStream, AcquisitionChannel, SalesChannel, ReviewSource } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create company
  const company = await prisma.company.upsert({
    where: { id: "titan-eye-plus" },
    update: {},
    create: {
      id: "titan-eye-plus",
      name: "Titan Eye Plus",
      logoUrl: "https://www.titancompany.in/images/logo.svg",
      description: "Titan Eye Plus is Titan Company's consumer eyewear brand, offering a wide range of eyeglasses, sunglasses, and contact lenses across India with over 900 stores. It emphasizes technology-driven eye care solutions and stylish, affordable eyewear.",
      type: CompanyType.B2C,
    },
  });

  // Social Accounts and Follower Snapshots
  await prisma.socialAccount.create({
    data: {
      companyId: company.id,
      platform: SocialPlatform.INSTAGRAM,
      handle: "titaneyeplus",
      url: "https://www.instagram.com/titaneyeplus",
      followers: 115000,
      followerSnapshots: {
        create: [
          { date: new Date("2024-11-01"), count: 100000 },
          { date: new Date("2024-12-01"), count: 102000 },
          { date: new Date("2025-01-01"), count: 104000 },
          { date: new Date("2025-02-01"), count: 106000 },
          { date: new Date("2025-03-01"), count: 108000 },
          { date: new Date("2025-04-01"), count: 110000 },
          { date: new Date("2025-05-01"), count: 112000 },
          { date: new Date("2025-06-01"), count: 113500 },
          { date: new Date("2025-07-01"), count: 114500 },
          { date: new Date("2025-08-01"), count: 115000 },
          { date: new Date("2025-09-01"), count: 115500 },
          { date: new Date("2025-10-01"), count: 116000 },
        ],
      },
      topPosts: {
        create: [
          {
            title: "Titan Eye Plus Launches Blue-Ray Blue Light Glasses Collection",
            link: "https://www.instagram.com/p/ABC123",
            postedAt: new Date("2025-03-10"),
          },
          {
            title: "Titan Eye+ Vision Awareness Day Campaign: Over 5000 Glasses Donated",
            link: "https://www.instagram.com/p/DEF456",
            postedAt: new Date("2025-06-12"),
          },
          {
            title: "Festive Offer! Buy 1 Get 1 Free on Selected Sunglasses",
            link: "https://www.instagram.com/p/GHI789",
            postedAt: new Date("2025-10-15"),
          },
        ],
      },
    },
  });

  await prisma.socialAccount.create({
    data: {
      companyId: company.id,
      platform: SocialPlatform.FACEBOOK,
      handle: "Titan Eye Plus",
      url: "https://www.facebook.com/titaneyeplus",
      followers: 785525,
      followerSnapshots: {
        create: [
          { date: new Date("2024-11-01"), count: 700000 },
          { date: new Date("2024-12-01"), count: 707000 },
          { date: new Date("2025-01-01"), count: 714000 },
          { date: new Date("2025-02-01"), count: 721000 },
          { date: new Date("2025-03-01"), count: 728000 },
          { date: new Date("2025-04-01"), count: 735000 },
          { date: new Date("2025-05-01"), count: 742000 },
          { date: new Date("2025-06-01"), count: 750000 },
          { date: new Date("2025-07-01"), count: 758000 },
          { date: new Date("2025-08-01"), count: 766000 },
          { date: new Date("2025-09-01"), count: 774000 },
          { date: new Date("2025-10-01"), count: 782000 },
        ],
      },
      topPosts: {
        create: [
          {
            title: "Titan Eye Plus Free Eye Test Camp - 1,200 Lives Helped",
            link: "https://www.facebook.com/titaneyeplus/posts/123",
            postedAt: new Date("2025-04-07"),
          },
          {
            title: "Introducing Titan EyeX SmartGlasses – Next-Gen Wearable",
            link: "https://www.facebook.com/titaneyeplus/posts/456",
            postedAt: new Date("2025-08-20"),
          },
          {
            title: "Corporate Social Responsibility: Titan EyePlus Community Vision Drive",
            link: "https://www.facebook.com/titaneyeplus/posts/789",
            postedAt: new Date("2025-10-10"),
          },
        ],
      },
    },
  });

  await prisma.socialAccount.create({
    data: {
      companyId: company.id,
      platform: SocialPlatform.TWITTER,
      handle: "TitanEyePlus",
      url: "https://twitter.com/titaneyeplus",
      followers: 19246,
      followerSnapshots: {
        create: [
          { date: new Date("2024-11-01"), count: 15000 },
          { date: new Date("2024-12-01"), count: 15500 },
          { date: new Date("2025-01-01"), count: 16000 },
          { date: new Date("2025-02-01"), count: 16500 },
          { date: new Date("2025-03-01"), count: 17000 },
          { date: new Date("2025-04-01"), count: 17500 },
          { date: new Date("2025-05-01"), count: 18000 },
          { date: new Date("2025-06-01"), count: 18500 },
          { date: new Date("2025-07-01"), count: 19000 },
          { date: new Date("2025-08-01"), count: 19500 },
          { date: new Date("2025-09-01"), count: 19700 },
          { date: new Date("2025-10-01"), count: 19800 },
        ],
      },
      topPosts: {
        create: [
          {
            title: "Titan Eye+ partners with Flipkart for Omni-Channel Offer",
            link: "https://twitter.com/titaneyeplus/status/123",
            postedAt: new Date("2025-07-30"),
          },
          {
            title: "Our 900th Store Opens in Bangalore!",
            link: "https://twitter.com/titaneyeplus/status/456",
            postedAt: new Date("2025-09-05"),
          },
          {
            title: "Join #EyeCareMonth – Health Tips from Titan Experts",
            link: "https://twitter.com/titaneyeplus/status/789",
            postedAt: new Date("2025-10-31"),
          },
        ],
      },
    },
  });

  // Audience Demographics
  await prisma.audienceDemographics.upsert({
    where: { companyId: company.id },
    update: {},
    create: {
      companyId: company.id,
      ageBuckets: {
        "18-24": 20,
        "25-34": 40,
        "35-44": 25,
        "45+": 15
      },
      gender: {
        "male": 55,
        "female": 45
      },
      locations: {
        "Maharashtra": 30,
        "Karnataka": 25,
        "Delhi": 20,
        "Tamil Nadu": 15,
        "Others": 10
      }
    },
  });

  // Press Releases
  await prisma.pressRelease.createMany({
    data: [
      {
        companyId: company.id,
        title: "Titan Eye Plus Plans To Expand Footprints Across Cities",
        aiSummary: "Titan Eye Plus plans to open 100 new stores this fiscal, adding 50 new cities to its existing network. The company is also setting up new manufacturing facilities for spectacle frames and lenses to boost domestic production.",
        sourceUrl: "https://www.titancompany.in/news/titan-eye-plus-targets-open-100-new-stores",
        publishedAt: new Date("2024-05-15"),
        priority: PressPriority.HIGH,
      },
      {
        companyId: company.id,
        title: "Titan Eye Launches EyeX 2.0 SmartGlasses",
        aiSummary: "Titan introduces the Titan EyeX 2.0, its second-generation smart glasses featuring HD audio, voice assistant, and fitness tracking. The upgraded wearable is priced competitively and has won international design awards.",
        sourceUrl: "https://www.titancompany.in/news/eyex-20",
        publishedAt: new Date("2024-08-10"),
        priority: PressPriority.HIGH,
      },
      {
        companyId: company.id,
        title: "Titan EyePlus Launches Titan SPF UV Protective Lenses",
        aiSummary: "Titan EyePlus has launched Titan SPF, a new state-of-the-art lens with dual-sided UV protection coating. Manufactured in India, the Titan SPF lenses block 99% of UV rays on both sides and include hydrophobic and dust-repellent properties.",
        sourceUrl: "https://www.titancompany.in/news/titan-eyeplus-launches-state-art-titan-lenses",
        publishedAt: new Date("2024-02-20"),
        priority: PressPriority.MEDIUM,
      },
      {
        companyId: company.id,
        title: "Titan Eyeplus to Resume Expansion Amid Eyewear Market Growth",
        aiSummary: "Titan Eyeplus, an arm of Titan Company, will resume its store expansion strategy from July 2024 after a pause, capitalizing on the growing eyewear market. CEO Saumen Bhaumik noted the brand will open more outlets and focus on premium segments.",
        sourceUrl: "https://economictimes.indiatimes.com/industry/services/retail/titan-eye-to-resume-expansion-strategy-amid-growing-eyewear-market/articleshow/111289086.cms",
        publishedAt: new Date("2024-06-26"),
        priority: PressPriority.HIGH,
      },
      {
        companyId: company.id,
        title: "Titan Eye+ Announces First International Store in UAE",
        aiSummary: "Titan Eye+ has launched its first international store in Dubai’s BurJuman, marking its entry into the GCC market. The 1100 sq ft flagship features Titan Eye+'s wide eyewear range and advanced in-store tech, aiming to expand regionally.",
        sourceUrl: "https://www.zawya.com/en/press-release/companies-news/titan-eye-announces-regional-entry-and-first-international-store-tmlart1p",
        publishedAt: new Date("2023-01-31"),
        priority: PressPriority.MEDIUM,
      },
      {
        companyId: company.id,
        title: "Titan Eyeplus Reports Rs 707 Crore in FY2024",
        aiSummary: "Titan Eyeplus (Titan Company) recorded Rs 707 crore in revenues for FY2023-24, reflecting a 5% year-over-year growth. The company reinforced its market position with expanded store count and new product launches.",
        sourceUrl: "https://www.indiaretailing.com/2024/10/18/indias-eyewear-titans-ranking-the-top-5-chains",
        publishedAt: new Date("2024-10-18"),
        priority: PressPriority.MEDIUM,
      },
      {
        companyId: company.id,
        title: "Titan Eye+ Initiates Vision Care Drive for Drivers",
        aiSummary: "Titan Eye+ has launched 'The Eye Test Menu' on World Sight Day, integrating vision tests into menus at roadside diners for drivers. This innovative CSR initiative aims to identify vision issues among truck and taxi drivers to improve road safety.",
        sourceUrl: "https://opticianindia.com/article-detail/236",
        publishedAt: new Date("2024-10-12"),
        priority: PressPriority.MEDIUM,
      },
    ],
  });

  // Reports
  // Create Topics
  const topics = ["Retail Expansion", "Product Launch", "CSR Initiative", "Collaboration", "Marketing Campaign", "Business Strategy", "Technology Innovation"];
  for (const name of topics) {
    await prisma.topic.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Titan Eyeplus resumes expansion strategy (ET) - report
  await prisma.report.create({
    data: {
      companyId: company.id,
      title: "Titan Eye+ to Resume Expansion Strategy in 2024",
      summary: "An Economic Times report states Titan Eye+ will restart network expansion from July 2024, focusing on adding premium stores and boosting market share. Titan Eye+ (Titan Company) currently has over 900 stores nationwide with Rs 707 crore revenue.",
      marketImpact: "By expanding its retail footprint, Titan Eye+ aims to capture a larger share of India’s growing eyewear market. Analysts expect improved top-line growth as the brand taps new cities and segments.",
      reportedAt: new Date("2024-06-26"),
      sources: {
        create: [
          { url: "https://economictimes.indiatimes.com/industry/services/retail/titan-eye-to-resume-expansion-strategy-amid-growing-eyewear-market/articleshow/111289086.cms" }
        ],
      },
      topics: {
        create: [
          { topic: { connect: { name: "Retail Expansion" } } },
          { topic: { connect: { name: "Business Strategy" } } }
        ],
      }
    }
  });

  // Eye Test Menu report (Optician India)
  await prisma.report.create({
    data: {
      companyId: company.id,
      title: "Titan Eye+ Revolutionizes Vision Care with 'Eye Test Menu'",
      summary: "On World Sight Day 2024, Titan Eye+ launched 'The Eye Test Menu', a creative approach integrating vision tests into restaurant menus for drivers. This initiative targets India’s 3 million truck drivers, 33% of whom need vision correction.",
      marketImpact: "The program aims to improve road safety and public health by making vision screening accessible. Experts note such CSR campaigns can strengthen brand reputation and community impact.",
      reportedAt: new Date("2024-10-12"),
      sources: {
        create: [{ url: "https://opticianindia.com/article-detail/236" }],
      },
      topics: {
        create: [{ topic: { connect: { name: "CSR Initiative" } } }],
      },
    }
  });

  // Ray-Ban Meta launch report (TOI)
  await prisma.report.create({
    data: {
      companyId: company.id,
      title: "Titan Eye+ Launches Ray-Ban Meta AI Smart Glasses in India",
      summary: "Titan Eye+ has started selling Ray-Ban Meta AI Smart Glasses across 50+ stores. The smart wearable offers voice assistance, camera capture, and open-ear audio, blending Ray-Ban style with Meta technology.",
      marketImpact: "This launch broadens Titan Eye+’s product portfolio and taps into the growing market for wearable tech. Analysts believe it positions Titan Eye+ as a leader in smart eyewear retail.",
      reportedAt: new Date("2025-05-22"),
      sources: {
        create: [{ url: "https://timesofindia.indiatimes.com/technology/wearables/titan-eye-launches-ray-ban-meta-ai-smart-glasses-in-india-key-features-and-more/articleshow/121269607.cms" }],
      },
      topics: {
        create: [
          { topic: { connect: { name: "Product Launch" } } },
          { topic: { connect: { name: "Technology Innovation" } } }
        ],
      },
    }
  });

  // Additional synthesized reports
  await prisma.report.create({
    data: {
      companyId: company.id,
      title: "Titan Eye+ Expands Subscription & Loyalty Programs",
      summary: "Industry sources report Titan Eye+ has introduced a membership program offering prioritized discounts and free lens upgrades. This subscription model aims to boost customer retention and average order value.",
      marketImpact: "Analysts expect the new loyalty scheme to strengthen customer stickiness and drive repeat purchases. The move aligns Titan Eye+ with global retail trends of subscription-based sales.",
      reportedAt: new Date("2025-03-15"),
      sources: {
        create: [{ url: "https://www.retailnewsservice.com/titan-eyeplus-loyalty-membership-2025" }],
      },
      topics: {
        create: [
          { topic: { connect: { name: "Marketing Campaign" } } },
          { topic: { connect: { name: "Business Strategy" } } }
        ],
      },
    }
  });

  await prisma.report.create({
    data: {
      companyId: company.id,
      title: "Titan Eye+ Partners with NGO for Rural Vision Care Drive",
      summary: "Titan Eye+ has collaborated with an NGO to launch eye-screening camps in rural areas of Maharashtra. Over 10,000 villagers are expected to get free eye tests and low-cost glasses as part of the initiative.",
      marketImpact: "This CSR initiative is likely to enhance Titan Eye+'s brand image and community goodwill. Experts believe such programs can also create long-term customer loyalty in emerging markets.",
      reportedAt: new Date("2024-07-20"),
      sources: {
        create: [{ url: "https://www.hindustantimes.com/business-news/titan-eyeplus-rural-vision-camp-2024" }],
      },
      topics: {
        create: [{ topic: { connect: { name: "CSR Initiative" } } }],
      },
    }
  });

  await prisma.report.create({
    data: {
      companyId: company.id,
      title: "Titan Eye+ Launches Digital Try-On App",
      summary: "Titan Eye+ has launched an AR-powered mobile app that lets customers virtually try on glasses. The app integrates Titan’s product catalog and AI facial tracking, enabling online shoppers to find frames virtually.",
      marketImpact: "The app is expected to drive online sales and reduce returns by helping customers make confident purchases. Analysts note this move accelerates Titan Eye+’s omnichannel strategy.",
      reportedAt: new Date("2024-11-05"),
      sources: {
        create: [{ url: "https://tech.economictimes.indiatimes.com/news/mobile/titan-eyeplus-ar-tryon-app-2024/95001123" }],
      },
      topics: {
        create: [
          { topic: { connect: { name: "Technology Innovation" } } },
          { topic: { connect: { name: "Product Launch" } } }
        ],
      },
    }
  });

  await prisma.report.create({
    data: {
      companyId: company.id,
      title: "Titan Eye+ Introduces Special Diwali Collection",
      summary: "For the festive season, Titan Eye+ has rolled out a limited-edition eyewear collection inspired by traditional Indian designs. The 'Diwali Dazzle' range includes ornate frames and decorative elements.",
      marketImpact: "The festive collection is intended to capitalize on holiday shopping and drive sales. Marketing analysts expect a seasonal uplift in revenue from the creative product line.",
      reportedAt: new Date("2024-10-01"),
      sources: {
        create: [{ url: "https://www.mid-day.com/brand-media/article/titan-eyeplus-diwali-collection-2024-23374132" }],
      },
      topics: {
        create: [{ topic: { connect: { name: "Marketing Campaign" } } }],
      },
    }
  });

  // Revenue Records (Monthly for 12 months of 2025)
  await prisma.revenueRecord.createMany({
    data: [
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-01-31"), amount: 105000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-02-01"), periodEnd: new Date("2025-02-28"), amount: 110000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-03-01"), periodEnd: new Date("2025-03-31"), amount: 115000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), amount: 120000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-05-01"), periodEnd: new Date("2025-05-31"), amount: 125000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-06-01"), periodEnd: new Date("2025-06-30"), amount: 130000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-07-01"), periodEnd: new Date("2025-07-31"), amount: 135000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-08-01"), periodEnd: new Date("2025-08-31"), amount: 140000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-09-01"), periodEnd: new Date("2025-09-30"), amount: 145000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-10-01"), periodEnd: new Date("2025-10-31"), amount: 150000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-11-01"), periodEnd: new Date("2025-11-30"), amount: 155000000.00 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-12-01"), periodEnd: new Date("2025-12-31"), amount: 160000000.00 },
    ],
  });

  // Profitability Records (Quarterly FY2025)
  await prisma.profitabilityRecord.createMany({
    data: [
      { companyId: company.id, periodType: PeriodType.QUARTER, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-03-31"), grossMarginPct: 45.00, netMarginPct: 8.00, ebitdaMarginPct: 20.00 },
      { companyId: company.id, periodType: PeriodType.QUARTER, periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-06-30"), grossMarginPct: 47.00, netMarginPct: 10.00, ebitdaMarginPct: 22.00 },
      { companyId: company.id, periodType: PeriodType.QUARTER, periodStart: new Date("2025-07-01"), periodEnd: new Date("2025-09-30"), grossMarginPct: 50.00, netMarginPct: 13.00, ebitdaMarginPct: 25.00 },
      { companyId: company.id, periodType: PeriodType.QUARTER, periodStart: new Date("2025-10-01"), periodEnd: new Date("2025-12-31"), grossMarginPct: 52.00, netMarginPct: 15.00, ebitdaMarginPct: 27.00 },
    ],
  });

  // Products
  const prod1 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan EyeX 2.0 SmartGlasses",
      description: "Next-gen smart glasses with HD audio, navigation, step counter and Qualcomm-powered wireless connectivity. Supports prescription lenses and voice commands.",
      releaseDate: new Date("2024-08-01"),
      productUrl: "https://www.titancompany.in/news/eyex-20",
    },
  });
  const prod2 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan BlueTech Anti-Blue Lens",
      description: "High-performance anti-blue light lenses that protect eyes from digital screen strain. Multi-coated for UV protection and scratch resistance.",
      releaseDate: new Date("2024-03-15"),
      productUrl: "https://www.amazon.in/",
    },
  });
  const prod3 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan UVGuard Sunglasses",
      description: "Stylish polarized sunglasses with 100% UVA/UVB protection. Lightweight acetate frames available in multiple colors.",
      releaseDate: new Date("2024-05-10"),
      productUrl: "https://www.titancompany.in/titaneyeplus-store",
    },
  });
  const prod4 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Fastrack Rebel Spectacles",
      description: "Trendy full-rim eyeglass frames from Fastrack series by Titan Eye+. Durable TR90 material with sleek design for youth.",
      releaseDate: new Date("2024-11-20"),
      productUrl: "https://www.amazon.in/",
    },
  });
  const prod5 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan Aristo Premium Frames",
      description: "Luxury eyeglasses with titanium frames featuring gold detailing. Combines premium comfort with classic style.",
      releaseDate: new Date("2024-02-25"),
      productUrl: "https://www.titancompany.in/our-brands-aristo",
    },
  });
  const prod6 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan KidsVision Set",
      description: "Kid-friendly eyewear set including durable frames and shatterproof lenses, designed for children aged 5-12. Includes fun character cases.",
      releaseDate: new Date("2025-01-10"),
      productUrl: "https://www.titancompany.in/kidsvision",
    },
  });
  const prod7 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan Flexi Light Sport Glasses",
      description: "Flexible sport glasses with adjustable nose pads, suitable for active lifestyles. Anti-sweat coating and shatter-resistant lenses.",
      releaseDate: new Date("2024-07-05"),
      productUrl: "https://www.amazon.in/",
    },
  });
  const prod8 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan VisionCare Multi-Focal Lens",
      description: "Advanced multi-focal progressive lenses for presbyopia, with anti-reflective and UV coatings. Enables clear vision at all distances.",
      releaseDate: new Date("2024-09-01"),
      productUrl: "https://www.titancompany.in/visioncare",
    },
  });
  const prod9 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan Luxe Polarized Aviators",
      description: "Premium polarized aviator sunglasses with metal frames, offering glare reduction and 100% UV protection. Timeless design.",
      releaseDate: new Date("2024-06-15"),
      productUrl: "https://www.amazon.in/",
    },
  });
  const prod10 = await prisma.product.create({
    data: {
      companyId: company.id,
      name: "Titan Z-Bend Flexible Frames",
      description: "Memory metal frames that bend and return to shape, ideal for rough use. Comes with adjustable spring hinges for comfort.",
      releaseDate: new Date("2025-02-20"),
      productUrl: "https://www.titancompany.in/zbend-frames",
    },
  });

  // Product Insights
  await prisma.productInsight.createMany({
    data: [
      // Titan EyeX 2.0
      { productId: prod1.id, source: ReviewSource.OTHER, starsOutOf5: 4.8, likesSummary: "Excellent sound quality and intuitive design", dislikesSummary: "Battery life could be longer", capturedAt: new Date("2025-01-05") },
      { productId: prod1.id, source: ReviewSource.AMAZON, starsOutOf5: 4.6, likesSummary: "Comfortable fit and clear audio", dislikesSummary: "Premium price tag", capturedAt: new Date("2025-02-10") },
      // Titan BlueTech
      { productId: prod2.id, source: ReviewSource.OTHER, starsOutOf5: 4.4, likesSummary: "Helps reduce eye strain during long screen use", dislikesSummary: "Frames feel a bit flimsy", capturedAt: new Date("2024-04-01") },
      { productId: prod2.id, source: ReviewSource.AMAZON, starsOutOf5: 4.5, likesSummary: "Effective blue light filtering", dislikesSummary: "Scratch-prone coating", capturedAt: new Date("2024-05-15") },
      // Titan UVGuard
      { productId: prod3.id, source: ReviewSource.OTHER, starsOutOf5: 4.7, likesSummary: "Stylish look, great UV protection", dislikesSummary: "Narrow fit for wider faces", capturedAt: new Date("2024-08-20") },
      // Fastrack Rebel
      { productId: prod4.id, source: ReviewSource.AMAZON, starsOutOf5: 4.2, likesSummary: "Trendy and durable", dislikesSummary: "Limited color options", capturedAt: new Date("2024-12-01") },
      // Titan Aristo
      { productId: prod5.id, source: ReviewSource.OTHER, starsOutOf5: 4.8, likesSummary: "Luxurious feel, lightweight", dislikesSummary: "High price", capturedAt: new Date("2024-03-15") },
      // KidsVision
      { productId: prod6.id, source: ReviewSource.AMAZON, starsOutOf5: 4.6, likesSummary: "Sturdy and child-friendly", dislikesSummary: "Case is easily lost", capturedAt: new Date("2025-02-20") },
      // Flexi Light
      { productId: prod7.id, source: ReviewSource.OTHER, starsOutOf5: 4.3, likesSummary: "Great for sports, stays on during activity", dislikesSummary: "Nose pad could slip", capturedAt: new Date("2024-10-10") },
      // VisionCare
      { productId: prod8.id, source: ReviewSource.AMAZON, starsOutOf5: 4.9, likesSummary: "Outstanding clarity at all distances", dislikesSummary: "Requires longer adaptation period", capturedAt: new Date("2024-11-22") },
      // Luxe Aviators
      { productId: prod9.id, source: ReviewSource.OTHER, starsOutOf5: 4.5, likesSummary: "Classic style and polarization works great", dislikesSummary: "Temples feel a bit loose", capturedAt: new Date("2024-07-30") },
      // Z-Bend
      { productId: prod10.id, source: ReviewSource.AMAZON, starsOutOf5: 4.1, likesSummary: "Super flexible frames, very durable", dislikesSummary: "Initial tingling due to spring hinge", capturedAt: new Date("2025-03-10") },
    ]
  });

  // Revenue Breakdown for FY2025 (Yearly)
  // By product
  await prisma.revenueBreakdown.createMany({
    data: [
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod1.name, amount: 300000000.00, productId: prod1.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod2.name, amount: 220000000.00, productId: prod2.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod3.name, amount: 280000000.00, productId: prod3.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod4.name, amount: 180000000.00, productId: prod4.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod5.name, amount: 150000000.00, productId: prod5.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod6.name, amount: 120000000.00, productId: prod6.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod7.name, amount: 140000000.00, productId: prod7.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod8.name, amount: 160000000.00, productId: prod8.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod9.name, amount: 150000000.00, productId: prod9.id },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.PRODUCT, label: prod10.name, amount: 100000000.00, productId: prod10.id },
      // By source
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.SOURCE, label: "Online", amount: 600000000.00 },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.SOURCE, label: "Offline Stores", amount: 1000000000.00 },
      { companyId: company.id, periodType: PeriodType.YEAR, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-12-31"), kind: RevenueBreakdownType.SOURCE, label: "Partners", amount: 200000000.00 },
    ],
  });

  // Sales Volume Records (Monthly)
  await prisma.salesVolumeRecord.createMany({
    data: [
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-01-01"), periodEnd: new Date("2025-01-31"), units: 50000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-02-01"), periodEnd: new Date("2025-02-28"), units: 52000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-03-01"), periodEnd: new Date("2025-03-31"), units: 54000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), units: 56000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-05-01"), periodEnd: new Date("2025-05-31"), units: 58000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-06-01"), periodEnd: new Date("2025-06-30"), units: 60000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-07-01"), periodEnd: new Date("2025-07-31"), units: 62000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-08-01"), periodEnd: new Date("2025-08-31"), units: 64000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-09-01"), periodEnd: new Date("2025-09-30"), units: 66000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-10-01"), periodEnd: new Date("2025-10-31"), units: 68000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-11-01"), periodEnd: new Date("2025-11-30"), units: 70000 },
      { companyId: company.id, periodType: PeriodType.MONTH, periodStart: new Date("2025-12-01"), periodEnd: new Date("2025-12-31"), units: 72000 },
    ]
  });

  // Growth Metrics (MOM and YOY)
  // YOY for each month
  await prisma.growthMetric.createMany({
    data: [
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-01-31"), valuePct: 0.2500 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-02-28"), valuePct: 0.2381 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-03-31"), valuePct: 0.2000 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-04-30"), valuePct: 0.2174 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-05-31"), valuePct: 0.2083 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-06-30"), valuePct: 0.2000 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-07-31"), valuePct: 0.1923 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-08-31"), valuePct: 0.1852 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-09-30"), valuePct: 0.1786 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-10-31"), valuePct: 0.1724 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-11-30"), valuePct: 0.1864 },
      { companyId: company.id, metric: GrowthMetricType.YOY, date: new Date("2025-12-31"), valuePct: 0.2000 },
    ]
  });
  // MOM for Feb-Dec
  await prisma.growthMetric.createMany({
    data: [
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-02-28"), valuePct: 0.0400 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-03-31"), valuePct: 0.0385 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-04-30"), valuePct: 0.0370 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-05-31"), valuePct: 0.0357 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-06-30"), valuePct: 0.0345 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-07-31"), valuePct: 0.0333 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-08-31"), valuePct: 0.0323 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-09-30"), valuePct: 0.0312 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-10-31"), valuePct: 0.0303 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-11-30"), valuePct: 0.0294 },
      { companyId: company.id, metric: GrowthMetricType.MOM, date: new Date("2025-12-31"), valuePct: 0.0286 },
    ]
  });

  // Geo Sales Share (Monthly)
  for (const month of ["2025-01-01", "2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01", "2025-08-01", "2025-09-01", "2025-10-01", "2025-11-01", "2025-12-01"]) {
    const start = new Date(month);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    end.setDate(end.getDate() - 1);
    await prisma.geoSalesShare.createMany({
      data: [
        { companyId: company.id, periodType: PeriodType.MONTH, periodStart: start, periodEnd: end, place: "Maharashtra", percent: 28.00 },
        { companyId: company.id, periodType: PeriodType.MONTH, periodStart: start, periodEnd: end, place: "Karnataka", percent: 22.00 },
        { companyId: company.id, periodType: PeriodType.MONTH, periodStart: start, periodEnd: end, place: "Tamil Nadu", percent: 18.00 },
        { companyId: company.id, periodType: PeriodType.MONTH, periodStart: start, periodEnd: end, place: "Delhi", percent: 12.00 },
        { companyId: company.id, periodType: PeriodType.MONTH, periodStart: start, periodEnd: end, place: "Others", percent: 20.00 },
      ],
    });
  }

  // Customer Metrics (Monthly)
  await prisma.customerMetric.createMany({
    data: [
      { companyId: company.id, date: new Date("2025-01-31"), aov: 3600.00, retentionPct: 75.00 },
      { companyId: company.id, date: new Date("2025-02-28"), aov: 3700.00, retentionPct: 76.00 },
      { companyId: company.id, date: new Date("2025-03-31"), aov: 3800.00, retentionPct: 77.00 },
      { companyId: company.id, date: new Date("2025-04-30"), aov: 3900.00, retentionPct: 78.00 },
      { companyId: company.id, date: new Date("2025-05-31"), aov: 4000.00, retentionPct: 79.00 },
      { companyId: company.id, date: new Date("2025-06-30"), aov: 4100.00, retentionPct: 80.00 },
      { companyId: company.id, date: new Date("2025-07-31"), aov: 4200.00, retentionPct: 81.00 },
      { companyId: company.id, date: new Date("2025-08-31"), aov: 4300.00, retentionPct: 82.00 },
      { companyId: company.id, date: new Date("2025-09-30"), aov: 4400.00, retentionPct: 83.00 },
      { companyId: company.id, date: new Date("2025-10-31"), aov: 4450.00, retentionPct: 84.00 },
      { companyId: company.id, date: new Date("2025-11-30"), aov: 4500.00, retentionPct: 85.00 },
      { companyId: company.id, date: new Date("2025-12-31"), aov: 4500.00, retentionPct: 85.00 },
    ]
  });

  // Business Model
  await prisma.businessModel.create({
    data: {
      companyId: company.id,
      valueProp: "Wide range of affordable and premium eyewear backed by Titan’s trusted quality and lens technology.",
      whyChooseUs: "Over 900 stores, expert eye care services, and integration with Titan’s manufacturing ensure best fit and innovation.",
      keyPartners: "Lens manufacturers, Titan suppliers, eyewear brands (e.g., Fastrack, Ray-Ban, Cartier), optometrist networks.",
      costStructure: "Includes manufacturing costs, retail operations, marketing campaigns, and partnerships with retail platforms.",
      customerSegments: "Urban and semi-urban eyewear buyers, working professionals, children, senior citizens needing vision correction.",
      revenueStreams: {
        create: [
          { stream: RevenueStream.ONE_TIME },
          { stream: RevenueStream.SUBSCRIPTION },
          { stream: RevenueStream.LICENSING },
        ]
      },
      acquisitionChannels: {
        create: [
          { channel: AcquisitionChannel.ADS },
          { channel: AcquisitionChannel.SOCIAL },
          { channel: AcquisitionChannel.REFERRALS },
        ]
      },
      salesChannels: {
        create: [
          { channel: SalesChannel.WEBSITE },
          { channel: SalesChannel.APP },
          { channel: SalesChannel.OFFLINE },
        ]
      }
    }
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

