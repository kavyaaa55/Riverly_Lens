import { PrismaClient, SocialPlatform } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting 12-month social follower data seed (Oct 2024 - Sep 2025)...\n');

  // Get all companies with their social accounts
  const companies = await prisma.company.findMany({
    include: {
      socialAccounts: true,
    },
  });

  // Generate 12 months of follower data (Oct 2024 - Sep 2025)
  const months = [
    new Date('2024-10-01'),
    new Date('2024-11-01'),
    new Date('2024-12-01'),
    new Date('2025-01-01'),
    new Date('2025-02-01'),
    new Date('2025-03-01'),
    new Date('2025-04-01'),
    new Date('2025-05-01'),
    new Date('2025-06-01'),
    new Date('2025-07-01'),
    new Date('2025-08-01'),
    new Date('2025-09-01'),
  ];

  // Real + estimated 12-month progression (based on Lenskart 1.27M IG real[web:61]; eyeball growth: 5-8% monthly, festive spikes in Oct-Dec)
  const followerData: Record<string, Record<SocialPlatform, number[]>> = {
    'lenskart-india': {
      INSTAGRAM: [980000, 1020000, 1080000, 1110000, 1145000, 1180000, 1210000, 1235000, 1255000, 1270000, 1276000, 1276000], // Real baseline: 1.27M[web:61]
      FACEBOOK: [1050000, 1100000, 1150000, 1175000, 1200000, 1220000, 1235000, 1245000, 1250000, 1255000, 1258000, 1260000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'titan-eye-plus': {
      INSTAGRAM: [98000, 102000, 108000, 111000, 115000, 118000, 121000, 123500, 125000, 126500, 127500, 128000], // Steady premium brand growth
      FACEBOOK: [300000, 310000, 320000, 325000, 330000, 335000, 340000, 345000, 348000, 350000, 352000, 355000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'bata-india': {
      INSTAGRAM: [200000, 210000, 220000, 225000, 230000, 235000, 238000, 240000, 242000, 244000, 245000, 245000], // Festive footwear spike
      FACEBOOK: [1300000, 1360000, 1420000, 1440000, 1460000, 1475000, 1485000, 1490000, 1495000, 1498000, 1500000, 1500000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'amul-india': {
      INSTAGRAM: [765000, 800000, 820000, 835000, 848000, 860000, 870000, 878000, 883000, 887000, 890000, 892000], // Dairy seasonal growth
      FACEBOOK: [2850000, 2980000, 3050000, 3080000, 3110000, 3135000, 3160000, 3175000, 3185000, 3192000, 3197000, 3200000],
      TWITTER: [400000, 420000, 430000, 435000, 440000, 445000, 448000, 451000, 453000, 454500, 455500, 456000],
    },
    'britannia-industries': {
      INSTAGRAM: [150000, 157000, 164000, 168000, 171000, 173500, 175000, 176000, 177000, 177500, 178000, 178000],
      FACEBOOK: [1850000, 1930000, 1980000, 2010000, 2035000, 2055000, 2070000, 2082000, 2090000, 2095000, 2098000, 2100000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'hindustan-unilever': {
      INSTAGRAM: [132000, 138000, 142000, 145000, 148000, 150500, 152500, 153800, 154800, 155500, 155800, 156000],
      FACEBOOK: [790000, 825000, 850000, 860000, 868000, 875000, 880000, 884000, 886500, 888000, 889000, 890000],
      TWITTER: [210000, 219000, 225000, 227000, 229000, 230500, 231500, 232500, 233200, 233700, 234000, 234000],
    },
    'bajaj-auto': {
      INSTAGRAM: [378000, 395000, 405000, 412000, 418000, 425000, 432000, 437000, 440000, 442500, 444000, 445000],
      FACEBOOK: [3400000, 3550000, 3650000, 3680000, 3710000, 3735000, 3758000, 3775000, 3785000, 3792000, 3797000, 3800000],
      TWITTER: [257000, 268000, 275000, 278000, 280000, 282000, 284000, 285000, 286000, 286500, 287000, 287000],
    },
    'hero-motocorp': {
      INSTAGRAM: [542000, 566000, 580000, 590000, 598000, 606000, 612000, 617000, 620000, 622000, 623500, 625000],
      FACEBOOK: [4620000, 4820000, 4950000, 5020000, 5070000, 5110000, 5140000, 5165000, 5180000, 5190000, 5195000, 5200000],
      TWITTER: [360000, 376000, 385000, 388000, 391000, 393500, 395000, 396000, 396800, 397500, 398000, 398000],
    },
    'tvs-motors': {
      INSTAGRAM: [453000, 473000, 485000, 493000, 500000, 506000, 510000, 513500, 516000, 518000, 519000, 520000],
      FACEBOOK: [2760000, 2880000, 2950000, 2985000, 3015000, 3040000, 3060000, 3075000, 3085000, 3092000, 3097000, 3100000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'samsung-india': {
      INSTAGRAM: [1030000, 1075000, 1100000, 1125000, 1148000, 1165000, 1178000, 1188000, 1194000, 1198000, 1199500, 1200000],
      FACEBOOK: [13280000, 13850000, 14200000, 14350000, 14500000, 14620000, 14720000, 14810000, 14880000, 14930000, 14970000, 15000000],
      TWITTER: [884000, 919000, 945000, 955000, 965000, 972000, 978000, 981000, 983500, 985500, 986500, 987000],
    },
    'xiaomi-india': {
      INSTAGRAM: [860000, 898000, 920000, 933000, 945000, 956000, 965000, 971000, 975000, 977500, 979000, 980000],
      FACEBOOK: [7580000, 7910000, 8100000, 8200000, 8290000, 8365000, 8425000, 8470000, 8490000, 8495000, 8498000, 8500000],
      TWITTER: [687000, 717000, 735000, 742000, 748000, 754000, 758000, 761000, 763000, 764000, 764800, 765000],
    },
    'oneplus-india': {
      INSTAGRAM: [982000, 1026000, 1050000, 1062000, 1073000, 1082000, 1089000, 1094000, 1097000, 1099000, 1100000, 1100000],
      FACEBOOK: [3760000, 3920000, 4020000, 4065000, 4100000, 4130000, 4155000, 4175000, 4187000, 4195000, 4198000, 4200000],
      TWITTER: [469000, 489000, 502000, 507000, 511000, 514000, 516500, 518000, 519000, 519700, 520000, 520000],
    },
    'cafe-coffee-day': {
      INSTAGRAM: [276000, 288000, 295000, 300000, 305000, 310000, 313000, 315500, 317000, 318500, 319500, 320000],
      FACEBOOK: [2480000, 2590000, 2650000, 2685000, 2715000, 2740000, 2760000, 2775000, 2785000, 2792000, 2797000, 2800000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'mcdonalds-india-westlife': {
      INSTAGRAM: [692000, 723000, 740000, 750000, 758000, 765000, 770000, 774000, 778000, 781000, 783000, 785000],
      FACEBOOK: [4000000, 4180000, 4280000, 4320000, 4355000, 4385000, 4410000, 4435000, 4455000, 4470000, 4487000, 4500000],
      TWITTER: [510000, 532000, 545000, 550000, 554000, 558000, 561000, 563500, 565000, 566000, 566800, 567000],
    },
    'dominos-india-jubilant': {
      INSTAGRAM: [785000, 820000, 840000, 852000, 863000, 872000, 879000, 883500, 886000, 888000, 889000, 890000],
      FACEBOOK: [5520000, 5760000, 5900000, 5970000, 6030000, 6080000, 6120000, 6150000, 6175000, 6190000, 6197000, 6200000],
      TWITTER: [388000, 405000, 415000, 419000, 423000, 426000, 428000, 429000, 429700, 430000, 430000, 430000],
    },
    'reebok-india': {
      INSTAGRAM: [575000, 601000, 615000, 623000, 630000, 636000, 641000, 644500, 647000, 648500, 649500, 650000],
      FACEBOOK: [2040000, 2130000, 2180000, 2210000, 2235000, 2255000, 2270000, 2282000, 2290000, 2296000, 2299000, 2300000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'nike-india': {
      INSTAGRAM: [1234000, 1289000, 1320000, 1340000, 1358000, 1373000, 1385000, 1393000, 1397000, 1399000, 1399800, 1400000],
      FACEBOOK: [3110000, 3247000, 3330000, 3370000, 3405000, 3435000, 3460000, 3480000, 3492000, 3498000, 3499500, 3500000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'puma-india': {
      INSTAGRAM: [687000, 718000, 735000, 745000, 754000, 762000, 768000, 773000, 776000, 778000, 779000, 780000],
      FACEBOOK: [1860000, 1944000, 1990000, 2020000, 2045000, 2065000, 2080000, 2090000, 2095000, 2098000, 2099500, 2100000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'nestle-india': {
      INSTAGRAM: [210000, 219500, 225000, 230000, 234000, 237000, 240000, 242000, 243500, 244500, 245000, 245000],
      FACEBOOK: [1598000, 1669000, 1710000, 1735000, 1755000, 1772000, 1785000, 1795000, 1800000, 1802000, 1803000, 1800000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    'dabur-india': {
      INSTAGRAM: [166000, 173600, 178000, 182000, 185000, 188000, 190500, 192000, 193200, 194200, 194800, 195000],
      FACEBOOK: [1326000, 1386000, 1420000, 1440000, 1458000, 1472000, 1483000, 1491000, 1496000, 1498500, 1499500, 1500000],
      TWITTER: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  };

  let totalSnapshots = 0;
  let currentFollowersUpdated = 0;

  for (const company of companies) {
    const companyFollowers = followerData[company.id];
    if (!companyFollowers) {
      console.log(`⚠️  No follower data for ${company.name}, skipping...`);
      continue;
    }

    for (const socialAccount of company.socialAccounts) {
      const platformData = companyFollowers[socialAccount.platform];
      if (!platformData || platformData.every(count => count === 0)) {
        console.log(`  ⚠️  No ${socialAccount.platform} data for ${company.name}`);
        continue;
      }

      // Create/upsert snapshots for each of 12 months
      for (let i = 0; i < months.length; i++) {
        await prisma.socialFollowerSnapshot.upsert({
          where: {
            socialAccountId_date: {
              socialAccountId: socialAccount.id,
              date: months[i],
            },
          },
          update: {
            count: platformData[i],
          },
          create: {
            socialAccountId: socialAccount.id,
            date: months[i],
            count: platformData[i],
          },
        });
        totalSnapshots++;
      }

      // Update the current follower count (Sep 2025) in SocialAccount
      await prisma.socialAccount.update({
        where: { id: socialAccount.id },
        data: { followers: platformData[platformData.length - 1] },
      });
      currentFollowersUpdated++;

      console.log(`  ✓ ${company.name} - ${socialAccount.platform}: ${platformData[0].toLocaleString()} → ${platformData[11].toLocaleString()} (${((platformData[11] - platformData[0]) / platformData[0] * 100).toFixed(1)}% growth)`);
    }
  }

  console.log('\n✅ 12-month follower data seed completed!\n');
  console.log('📊 Summary:');
  console.log(`   - Total Snapshots Created/Updated: ${totalSnapshots}`);
  console.log(`   - Social Accounts Updated: ${currentFollowersUpdated}`);
  console.log(`   - Time Period: Oct 2024 - Sep 2025 (12 months)`);
  console.log(`   - Real Data Source: Lenskart Instagram (1.27M)[web:61]; others eyeball-realistic based on growth trends[web:72][web:74]`);

  // Optional: Print growth summary for all
  console.log('\n📈 Growth Highlights:');
  Object.entries(followerData).forEach(([companyId, platforms]) => {
    const igData = platforms.INSTAGRAM;
    if (igData && igData[0] > 0) {
      const growth = ((igData[11] - igData[0]) / igData[0] * 100).toFixed(1);
      console.log(`   - ${companyId.replace('-', ' ').toUpperCase()}: ${growth}% IG growth`);
    }
  });
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

