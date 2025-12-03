// lib/product-insights.ts

// Queue + Hash Map + Sliding Window for social media tracking
class SocialMediaQueue {
  private queue: Array<{ date: Date; followers: number }> = [];
  private platformMap: Map<string, number> = new Map();

  enqueue(platform: string, followers: number, date: Date) {
    this.queue.push({ date, followers });
    this.platformMap.set(platform, followers);
  }

  // Get growth rate over last N days
  getSlidingWindowGrowth(windowDays: number): number {
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    const recentData = this.queue.filter(d => d.date >= windowStart);

    if (recentData.length < 2) return 0;
    const oldest = recentData[0].followers;
    const newest = recentData[recentData.length - 1].followers;
    return ((newest - oldest) / oldest) * 100;
  }

  getCurrentFollowers(platform: string): number {
    return this.platformMap.get(platform) || 0;
  }
}

// Min/Max Heap for product ratings
class ProductRatingHeap {
  private maxHeap: Array<{ id: string; rating: number }> = [];
  private minHeap: Array<{ id: string; rating: number }> = [];

  insertRating(productId: string, rating: number) {
    this.maxHeap.push({ id: productId, rating });
    this.maxHeap.sort((a, b) => b.rating - a.rating);

    this.minHeap.push({ id: productId, rating });
    this.minHeap.sort((a, b) => a.rating - b.rating);
  }

  getTopRated(count: number = 5) {
    return this.maxHeap.slice(0, count);
  }

  getLowestRated(count: number = 5) {
    return this.minHeap.slice(0, count);
  }
}

// Priority Queue for news/reports ranking
class NewsPriorityQueue<T> {
  private queue: Array<{ priority: number; item: T }> = [];

  insert(item: T, priority: number) {
    this.queue.push({ priority, item });
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  getTop(k: number): T[] {
    return this.queue.slice(0, k).map(entry => entry.item);
  }
}

// LRU Cache for performance
class LRUCache<T> {
  private cache: Map<string, { value: T; timestamp: number }> = new Map();
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // Move the recently accessed item to the end
    this.cache.delete(key);
    this.cache.set(key, { ...item, timestamp: Date.now() });
    return item.value;
  }

  put(key: string, value: T) {
    // If full, remove least recently used item
    if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value as string | undefined;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, { value, timestamp: Date.now() });
  }
}

export {
  SocialMediaQueue,
  ProductRatingHeap,
  NewsPriorityQueue,
  LRUCache,
};

