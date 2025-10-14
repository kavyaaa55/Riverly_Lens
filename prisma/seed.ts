import { PrismaClient, PeriodType, GrowthMetricType, RevenueBreakdownType, RevenueStream } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting revenue data seed...\n');

  // Get all companies (assuming they exist from previous seeds)
  const companies = await prisma.company.findMany({
    include: {
      products: true, // For linking revenue breakdowns to products
      businessModel: true, // For linking revenue streams
    },
  });

  console.log(`Found ${companies.length} companies\n`);

  // Comprehensive revenue data for all 20 companies (realistic estimates based on FY25 reports)
  const revenueData: Record<
    string,
    {
      revenueRecords: Array<{
        periodType: PeriodType;
        periodStart: Date;
        periodEnd: Date;
        amount: number; // In Rs Crore
      }>;
      salesVolumes: Array<{
        periodType: PeriodType;
        periodStart: Date;
        periodEnd: Date;
        units: number;
      }>;
      revenueBreakdowns: Array<{
        periodType: PeriodType;
        periodStart: Date;
        periodEnd: Date;
        kind: RevenueBreakdownType;
        label: string;
        amount: number;
        productId?: string; // Links to seeded product ID
      }>;
      geoSalesShares: Array<{
        periodType: PeriodType;
        periodStart: Date;
        periodEnd: Date;
        place: string;
        percent: number;
      }>;
      growthMetrics: Array<{
        metric: GrowthMetricType;
        date: Date;
        valuePct: number;
      }>;
      customerMetrics: Array<{
        date: Date;
        aov?: number;
        retentionPct?: number;
      }>;
      profitabilityRecords: Array<{
        periodType: PeriodType;
        periodStart: Date;
        periodEnd: Date;
        grossMarginPct?: number;
        netMarginPct?: number;
        ebitdaMarginPct?: number;
      }>;
      revenueStreams: RevenueStream[];
    }
  > = {
    'lenskart-india': {
      revenueRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), amount: 1663.125 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-01-01'), periodEnd: new Date('2025-03-31'), amount: 1528.125 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2024-10-01'), periodEnd: new Date('2024-12-31'), amount: 1490.625 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2024-07-01'), periodEnd: new Date('2024-09-30'), amount: 1381.25 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 6652.5 },
      ],
      salesVolumes: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), units: 1500000 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 5500000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.PRODUCT, label: 'Eyeglasses', amount: 800, productId: companies.find(c => c.id === 'lenskart-india')?.products?.[0]?.id },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.SOURCE, label: 'Online Sales', amount: 1200 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.PRODUCT, label: 'Sunglasses', amount: 450, productId: companies.find(c => c.id === 'lenskart-india')?.products?.[1]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'North India', percent: 35.5 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'South India', percent: 28.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'West India', percent: 25.5 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'East India', percent: 11.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-06-30'), valuePct: 22.50 },
        { metric: GrowthMetricType.MOM, date: new Date('2025-06-30'), valuePct: 5.20 },
      ],
      customerMetrics: [
        { date: new Date('2025-06-30'), aov: 1250, retentionPct: 65.00 },
        { date: new Date('2025-03-31'), aov: 1180, retentionPct: 62.50 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), grossMarginPct: 45.20, netMarginPct: 4.50, ebitdaMarginPct: 12.80 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 44.00, netMarginPct: 4.47, ebitdaMarginPct: 11.50 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME, RevenueStream.SUBSCRIPTION],
    },
    'titan-eye-plus': {
      revenueRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), amount: 181 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-01-01'), periodEnd: new Date('2025-03-31'), amount: 172 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 724 },
      ],
      salesVolumes: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), units: 450000 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 1800000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.PRODUCT, label: 'Premium Frames', amount: 90, productId: companies.find(c => c.id === 'titan-eye-plus')?.products?.[0]?.id },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.SOURCE, label: 'Retail Stores', amount: 120 },
      ],
      geoSalesShares: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'South India', percent: 40.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'West India', percent: 30.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'North India', percent: 20.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'East India', percent: 10.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-06-30'), valuePct: 5.00 },
        { metric: GrowthMetricType.MOM, date: new Date('2025-06-30'), valuePct: 3.50 },
      ],
      customerMetrics: [
        { date: new Date('2025-06-30'), aov: 4500, retentionPct: 55.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), grossMarginPct: 55.00, netMarginPct: 11.70, ebitdaMarginPct: 18.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'bata-india': {
      revenueRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), amount: 850 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 3200 },
      ],
      salesVolumes: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), units: 2500000 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 10000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.PRODUCT, label: 'Formal Shoes', amount: 300, productId: companies.find(c => c.id === 'bata-india')?.products?.[0]?.id },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.SOURCE, label: 'Offline Sales', amount: 550 },
      ],
      geoSalesShares: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'North India', percent: 45.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'West India', percent: 25.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'South India', percent: 20.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'East India', percent: 10.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-06-30'), valuePct: 10.50 },
      ],
      customerMetrics: [
        { date: new Date('2025-06-30'), aov: 800, retentionPct: 50.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), grossMarginPct: 48.00, netMarginPct: 8.50, ebitdaMarginPct: 15.20 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'amul-india': {
      revenueRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), amount: 2250 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 9000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), units: 50000000 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 200000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.PRODUCT, label: 'Milk Products', amount: 1500, productId: companies.find(c => c.id === 'amul-india')?.products?.[0]?.id },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.SOURCE, label: 'Domestic Sales', amount: 2000 },
      ],
      geoSalesShares: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'West India', percent: 50.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'North India', percent: 30.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'South India', percent: 15.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'East India', percent: 5.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-06-30'), valuePct: 12.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-06-30'), aov: 150, retentionPct: 85.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), grossMarginPct: 25.00, netMarginPct: 18.00, ebitdaMarginPct: 22.50 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME, RevenueStream.SUBSCRIPTION],
    },
    'britannia-industries': {
      revenueRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), amount: 448.575 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 1794.3 },
      ],
      salesVolumes: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), units: 120000000 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 480000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.PRODUCT, label: 'Biscuits', amount: 350, productId: companies.find(c => c.id === 'britannia-industries')?.products?.[0]?.id },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.SOURCE, label: 'Retail', amount: 400 },
      ],
      geoSalesShares: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'North India', percent: 35.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'South India', percent: 30.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'West India', percent: 20.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'East India', percent: 15.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-06-30'), valuePct: 6.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-06-30'), aov: 200, retentionPct: 70.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), grossMarginPct: 28.50, netMarginPct: 2.00, ebitdaMarginPct: 10.80 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'hindustan-unilever': {
      revenueRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), amount: 3932.75 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 63121 },
      ],
      salesVolumes: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), units: 80000000 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 320000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.PRODUCT, label: 'Personal Care', amount: 2000, productId: companies.find(c => c.id === 'hindustan-unilever')?.products?.[0]?.id },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), kind: RevenueBreakdownType.SOURCE, label: 'Modern Trade', amount: 2500 },
      ],
      geoSalesShares: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'Urban India', percent: 60.0 },
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), place: 'Rural India', percent: 40.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-06-30'), valuePct: 2.40 },
      ],
      customerMetrics: [
        { date: new Date('2025-06-30'), aov: 300, retentionPct: 75.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.QUARTER, periodStart: new Date('2025-04-01'), periodEnd: new Date('2025-06-30'), grossMarginPct: 52.00, netMarginPct: 3.70, ebitdaMarginPct: 16.50 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME, RevenueStream.FREEMIUM],
    },
    'bajaj-auto': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 50000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 4000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Two-Wheelers', amount: 45000, productId: companies.find(c => c.id === 'bajaj-auto')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Domestic', percent: 60.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Exports', percent: 40.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 15.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 80000, retentionPct: 60.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 30.00, netMarginPct: 12.00, ebitdaMarginPct: 18.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'hero-motocorp': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 4075.6 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 5890000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Motorcycles', amount: 3500, productId: companies.find(c => c.id === 'hero-motocorp')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Domestic', percent: 95.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Exports', percent: 5.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 8.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 70000, retentionPct: 70.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 28.00, netMarginPct: 11.00, ebitdaMarginPct: 15.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'tvs-motors': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 3200 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 3500000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Scooters', amount: 1500, productId: companies.find(c => c.id === 'tvs-motors')?.products?.[2]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Domestic', percent: 80.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Exports', percent: 20.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 10.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 60000, retentionPct: 65.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 25.00, netMarginPct: 9.00, ebitdaMarginPct: 14.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'samsung-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 100000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 20000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Smartphones', amount: 60000, productId: companies.find(c => c.id === 'samsung-india')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Urban India', percent: 70.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Rural India', percent: 30.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 12.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 25000, retentionPct: 55.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 35.00, netMarginPct: 10.00, ebitdaMarginPct: 20.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME, RevenueStream.FREEMIUM],
    },
    'xiaomi-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 25000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 15000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Smartphones', amount: 18000, productId: companies.find(c => c.id === 'xiaomi-india')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'North India', percent: 40.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'South India', percent: 25.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'West India', percent: 20.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'East India', percent: 15.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 18.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 15000, retentionPct: 50.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 20.00, netMarginPct: 5.00, ebitdaMarginPct: 12.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'oneplus-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 8000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 2000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Smartphones', amount: 6000, productId: companies.find(c => c.id === 'oneplus-india')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Urban India', percent: 80.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Rural India', percent: 20.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 20.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 40000, retentionPct: 60.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 25.00, netMarginPct: 8.00, ebitdaMarginPct: 15.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'cafe-coffee-day': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 1200 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 5000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Beverages', amount: 800, productId: companies.find(c => c.id === 'cafe-coffee-day')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'South India', percent: 50.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'North India', percent: 30.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'West India', percent: 15.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'East India', percent: 5.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 5.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 300, retentionPct: 45.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 40.00, netMarginPct: 5.00, ebitdaMarginPct: 12.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'mcdonalds-india-westlife': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 2491 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 200000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Burgers', amount: 1200, productId: companies.find(c => c.id === 'mcdonalds-india-westlife')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'West India', percent: 40.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'South India', percent: 30.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'North India', percent: 20.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'East India', percent: 10.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 7.30 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 400, retentionPct: 50.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 30.00, netMarginPct: 6.00, ebitdaMarginPct: 15.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'dominos-india-jubilant': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 4500 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 150000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Pizzas', amount: 3000, productId: companies.find(c => c.id === 'dominos-india-jubilant')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'North India', percent: 50.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'South India', percent: 20.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'West India', percent: 20.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'East India', percent: 10.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 15.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 500, retentionPct: 55.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 25.00, netMarginPct: 7.00, ebitdaMarginPct: 13.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'reebok-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 1500 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 1000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Training Shoes', amount: 800, productId: companies.find(c => c.id === 'reebok-india')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Urban India', percent: 70.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Rural India', percent: 30.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 8.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 5000, retentionPct: 40.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 45.00, netMarginPct: 10.00, ebitdaMarginPct: 18.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'nike-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 3000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 2000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Running Shoes', amount: 1800, productId: companies.find(c => c.id === 'nike-india')?.products?.[1]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Urban India', percent: 85.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Rural India', percent: 15.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 12.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 8000, retentionPct: 50.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 50.00, netMarginPct: 15.00, ebitdaMarginPct: 25.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'puma-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 2000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 1500000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Sneakers', amount: 1200, productId: companies.find(c => c.id === 'puma-india')?.products?.[1]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Urban India', percent: 75.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'Rural India', percent: 25.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 10.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 6000, retentionPct: 45.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 45.00, netMarginPct: 12.00, ebitdaMarginPct: 20.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'nestle-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 20000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 500000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Noodles', amount: 8000, productId: companies.find(c => c.id === 'nestle-india')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'North India', percent: 30.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'South India', percent: 25.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'West India', percent: 25.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'East India', percent: 20.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 9.00 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 100, retentionPct: 80.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 55.00, netMarginPct: 14.00, ebitdaMarginPct: 22.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
    'dabur-india': {
      revenueRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), amount: 12000 },
      ],
      salesVolumes: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), units: 300000000 },
      ],
      revenueBreakdowns: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), kind: RevenueBreakdownType.PRODUCT, label: 'Ayurvedic Products', amount: 7000, productId: companies.find(c => c.id === 'dabur-india')?.products?.[0]?.id },
      ],
      geoSalesShares: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'North India', percent: 40.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'South India', percent: 25.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'West India', percent: 20.0 },
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), place: 'East India', percent: 15.0 },
      ],
      growthMetrics: [
        { metric: GrowthMetricType.YOY, date: new Date('2025-03-31'), valuePct: 7.50 },
      ],
      customerMetrics: [
        { date: new Date('2025-03-31'), aov: 200, retentionPct: 75.00 },
      ],
      profitabilityRecords: [
        { periodType: PeriodType.YEAR, periodStart: new Date('2024-04-01'), periodEnd: new Date('2025-03-31'), grossMarginPct: 60.00, netMarginPct: 12.00, ebitdaMarginPct: 20.00 },
      ],
      revenueStreams: [RevenueStream.ONE_TIME],
    },
  };

  let totalRevenueRecords = 0;
  let totalSalesVolumes = 0;
  let totalBreakdowns = 0;
  let totalGeoShares = 0;
  let totalGrowthMetrics = 0;
  let totalCustomerMetrics = 0;
  let totalProfitability = 0;
  let companiesUpdated = 0;

  for (const company of companies) {
    const companyData = revenueData[company.id];
    if (!companyData) {
      console.log(`⚠️ No revenue data for ${company.name}, skipping...`);
      continue;
    }

    try {
      // Create RevenueRecords
      for (const record of companyData.revenueRecords) {
        await prisma.revenueRecord.upsert({
          where: { id: `${company.id}_${record.periodStart.toISOString()}_${record.periodEnd.toISOString()}` }, // Unique ID for upsert
          update: {},
          create: { id: `${company.id}_${record.periodStart.toISOString()}_${record.periodEnd.toISOString()}`, companyId: company.id, ...record },
        });
      }
      totalRevenueRecords += companyData.revenueRecords.length;

      // Create SalesVolumeRecords
      for (const record of companyData.salesVolumes) {
        await prisma.salesVolumeRecord.upsert({
          where: { id: `${company.id}_vol_${record.periodStart.toISOString()}_${record.periodEnd.toISOString()}` },
          update: {},
          create: { id: `${company.id}_vol_${record.periodStart.toISOString()}_${record.periodEnd.toISOString()}`, companyId: company.id, ...record },
        });
      }
      totalSalesVolumes += companyData.salesVolumes.length;

      // Create RevenueBreakdowns (link to products if available)
      for (const breakdown of companyData.revenueBreakdowns) {
        const productId = breakdown.productId || null; // Use if available
        await prisma.revenueBreakdown.upsert({
          where: { id: `${company.id}_bd_${breakdown.periodStart.toISOString()}_${breakdown.periodEnd.toISOString()}_${breakdown.label}` },
          update: {},
          create: { id: `${company.id}_bd_${breakdown.periodStart.toISOString()}_${breakdown.periodEnd.toISOString()}_${breakdown.label}`, companyId: company.id, productId, ...breakdown },
        });
      }
      totalBreakdowns += companyData.revenueBreakdowns.length;

      // Create GeoSalesShares
      for (const share of companyData.geoSalesShares) {
        await prisma.geoSalesShare.upsert({
          where: { companyId_periodStart_periodEnd_place: { companyId: company.id, periodStart: share.periodStart, periodEnd: share.periodEnd, place: share.place } },
          update: {},
          create: { companyId: company.id, ...share },
        });
      }
      totalGeoShares += companyData.geoSalesShares.length;

      // Create GrowthMetrics
      for (const metric of companyData.growthMetrics) {
        await prisma.growthMetric.upsert({
          where: { id: `${company.id}_gm_${metric.metric}_${metric.date.toISOString()}` },
          update: {},
          create: { id: `${company.id}_gm_${metric.metric}_${metric.date.toISOString()}`, companyId: company.id, ...metric },
        });
      }
      totalGrowthMetrics += companyData.growthMetrics.length;

      // Create CustomerMetrics
      for (const metric of companyData.customerMetrics) {
        await prisma.customerMetric.upsert({
          where: { companyId_date: { companyId: company.id, date: metric.date } },
          update: {},
          create: { companyId: company.id, ...metric },
        });
      }
      totalCustomerMetrics += companyData.customerMetrics.length;

      // Create ProfitabilityRecords
      for (const record of companyData.profitabilityRecords) {
        await prisma.profitabilityRecord.upsert({
          where: { id: `${company.id}_pr_${record.periodStart.toISOString()}_${record.periodEnd.toISOString()}` },
          update: {},
          create: { id: `${company.id}_pr_${record.periodStart.toISOString()}_${record.periodEnd.toISOString()}`, companyId: company.id, ...record },
        });
      }
      totalProfitability += companyData.profitabilityRecords.length;

      // Update BusinessModel revenue streams
      if (company.businessModel && companyData.revenueStreams.length > 0) {
        for (const stream of companyData.revenueStreams) {
          await prisma.businessModelRevenueStream.upsert({
            where: { businessModelId_stream: { businessModelId: company.businessModel.id, stream } },
            update: {},
            create: { businessModelId: company.businessModel.id, stream },
          });
        }
      }

      companiesUpdated++;
      console.log(`✓ Seeded revenue data for ${company.name} (${companyData.revenueRecords.length} revenue records)`);
    } catch (error) {
      console.error(`❌ Error seeding for ${company.name}:`, error);
    }
  }

  console.log('\n✅ Revenue data seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Companies Updated: ${companiesUpdated}`);
  console.log(`   - Revenue Records: ${totalRevenueRecords}`);
  console.log(`   - Sales Volumes: ${totalSalesVolumes}`);
  console.log(`   - Revenue Breakdowns: ${totalBreakdowns}`);
  console.log(`   - Geo Sales Shares: ${totalGeoShares}`);
  console.log(`   - Growth Metrics: ${totalGrowthMetrics}`);
  console.log(`   - Customer Metrics: ${totalCustomerMetrics}`);
  console.log(`   - Profitability Records: ${totalProfitability}\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

