// Priority Queue Implementation for News Sorting
export class NewsItem {
  constructor(
    public element: any,
    public priority: number,
    public recencyScore: number
  ) { }
}

export class NewsPriorityQueue {
  private items: NewsItem[] = [];

  enqueue(newsItem: any, priorityLevel: number = 1) {
    const now = new Date();
    const newsDate = new Date(newsItem.date);
    const daysDiff = Math.floor((now.getTime() - newsDate.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate recency score (higher score for more recent news)
    const recencyScore = Math.max(0, 100 - daysDiff);

    // Calculate combined priority (recency + importance + sentiment)
    let combinedPriority = recencyScore * 0.4; // 40% weight for recency

    // Add priority based on importance keywords
    const importanceKeywords = ['breaking', 'urgent', 'exclusive', 'major', 'significant'];
    const title = (newsItem.title || '').toLowerCase();
    const content = (newsItem.content || '').toLowerCase();

    for (const keyword of importanceKeywords) {
      if (title.includes(keyword) || content.includes(keyword)) {
        combinedPriority += 20; // Boost priority for important news
        break;
      }
    }

    // Add priority level multiplier
    combinedPriority *= priorityLevel;

    const qElement = new NewsItem(newsItem, combinedPriority, recencyScore);
    let inserted = false;

    // Insert at correct position based on priority
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority < qElement.priority) {
        this.items.splice(i, 0, qElement);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      this.items.push(qElement);
    }
  }

  dequeue(): any | null {
    if (this.isEmpty()) return null;
    return this.items.shift()?.element || null;
  }

  front(): any | null {
    if (this.isEmpty()) return null;
    return this.items[0].element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toSortedArray(): any[] {
    return this.items.map(item => item.element);
  }

  clear(): void {
    this.items = [];
  }
}

// Main function to sort news by priority
export function sortNewsByPriority(newsArray: any[]): any[] {
  const newsQueue = new NewsPriorityQueue();

  // Add all news items to priority queue
  newsArray.forEach(newsItem => {
    // Determine priority level based on news characteristics
    let priorityLevel = 1;

    if (newsItem.category === 'earnings' || newsItem.category === 'financial') {
      priorityLevel = 3; // High priority for financial news
    } else if (newsItem.category === 'product' || newsItem.category === 'launch') {
      priorityLevel = 2; // Medium-high priority for product news
    }

    newsQueue.enqueue(newsItem, priorityLevel);
  });

  return newsQueue.toSortedArray();
}

// Additional utility functions for news processing
export function categorizeNews(newsItem: any): string {
  const title = (newsItem.title || '').toLowerCase();
  const content = (newsItem.content || '').toLowerCase();

  if (title.includes('earnings') || title.includes('revenue') || title.includes('profit')) {
    return 'financial';
  }

  if (title.includes('product') || title.includes('launch') || title.includes('release')) {
    return 'product';
  }

  if (title.includes('merger') || title.includes('acquisition') || title.includes('partnership')) {
    return 'business';
  }

  return 'general';
}

export function calculateNewsImpact(newsItem: any): 'Low' | 'Medium' | 'High' {
  const highImpactKeywords = ['breaking', 'major', 'significant', 'critical'];
  const mediumImpactKeywords = ['important', 'notable', 'substantial'];

  const text = `${newsItem.title || ''} ${newsItem.content || ''}`.toLowerCase();

  if (highImpactKeywords.some(keyword => text.includes(keyword))) {
    return 'High';
  }

  if (mediumImpactKeywords.some(keyword => text.includes(keyword))) {
    return 'Medium';
  }

  return 'Low';
}

