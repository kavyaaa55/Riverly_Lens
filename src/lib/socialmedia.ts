// Queue + Hash Map + Sliding Window
class SocialMediaQueue {
  private queue: Array<{ date: Date; followers: number; engagement: number }> = [];
  private platformMap: Map<string, { followers: number; posts: number }> = new Map();

  enqueue(platform: string, followers: number, engagement: number, date: Date) {
    this.queue.push({ date, followers, engagement });

    const existing = this.platformMap.get(platform) || { followers: 0, posts: 0 };
    this.platformMap.set(platform, {
      followers,
      posts: existing.posts + 1
    });
  }

  // Sliding window for growth analysis
  getGrowthRate(windowDays: number): number {
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    const recentData = this.queue.filter(d => d.date >= windowStart);

    if (recentData.length < 2) return 0;
    const oldest = recentData[0].followers;
    const newest = recentData[recentData.length - 1].followers;
    return ((newest - oldest) / oldest) * 100;
  }

  // Average engagement over time window
  getAvgEngagement(windowDays: number): number {
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    const recentData = this.queue.filter(d => d.date >= windowStart);

    if (recentData.length === 0) return 0;
    const total = recentData.reduce((sum, d) => sum + d.engagement, 0);
    return total / recentData.length;
  }

  getCurrentFollowers(platform: string): number {
    return this.platformMap.get(platform)?.followers || 0;
  }

  getTotalPosts(platform: string): number {
    return this.platformMap.get(platform)?.posts || 0;
  }
}

// Hash Map for platform comparison
class PlatformComparison {
  private platforms: Map<string, {
    followers: number;
    growth: number;
    engagement: number;
    posts: number;
  }> = new Map();

  addPlatform(name: string, followers: number, growth: number, engagement: number, posts: number) {
    this.platforms.set(name, { followers, growth, engagement, posts });
  }

  getTopPerformer(): { platform: string; score: number } | null {
    let maxScore = 0;
    let topPlatform = '';

    for (const [name, data] of this.platforms) {
      const score = (data.growth * 0.4) + (data.engagement * 0.6);
      if (score > maxScore) {
        maxScore = score;
        topPlatform = name;
      }
    }

    return topPlatform ? { platform: topPlatform, score: maxScore } : null;
  }

  getTotalReach(): number {
    let total = 0;
    for (const data of this.platforms.values()) {
      total += data.followers;
    }
    return total;
  }
}

// Time-series data structure
class EngagementTimeSeries {
  private data: Array<{ timestamp: Date; likes: number; comments: number; shares: number }> = [];

  addDataPoint(timestamp: Date, likes: number, comments: number, shares: number) {
    this.data.push({ timestamp, likes, comments, shares });
    this.data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  // Calculate engagement rate trend
  getEngagementTrend(windowDays: number): number[] {
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    const recentData = this.data.filter(d => d.timestamp >= windowStart);

    return recentData.map(d => d.likes + d.comments + d.shares);
  }

  getPeakEngagement(): { timestamp: Date; total: number } | null {
    if (this.data.length === 0) return null;

    let maxEngagement = 0;
    let peakTime = this.data[0].timestamp;

    for (const point of this.data) {
      const total = point.likes + point.comments + point.shares;
      if (total > maxEngagement) {
        maxEngagement = total;
        peakTime = point.timestamp;
      }
    }

    return { timestamp: peakTime, total: maxEngagement };
  }
}

export {
  SocialMediaQueue,
  PlatformComparison,
  EngagementTimeSeries,
};

