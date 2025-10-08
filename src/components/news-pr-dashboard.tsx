// components/news-pr-dashboard.tsx
'use client';

import { Company, PressRelease, Report, ReportSource } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';

type ReportWithSources = Report & {
  sources: ReportSource[];
};

type CompanyWithNews = Company & {
  pressReleases: PressRelease[];
  reports: ReportWithSources[];
};

interface NewsPRDashboardProps {
  company: CompanyWithNews;
}

export function NewsPRDashboard({ company }: NewsPRDashboardProps) {
  const { pressReleases, reports } = company;

  // Combine press releases and reports, then sort by date
  const allNews = [
    ...pressReleases.map((pr) => ({
      type: 'press' as const,
      title: pr.title,
      summary: pr.aiSummary || '',
      date: pr.publishedAt,
      priority: pr.priority,
      sourceUrl: pr.sourceUrl,
      source: 'Reuters', // Can be dynamic based on your data
    })),
    ...reports.map((report) => ({
      type: 'report' as const,
      title: report.title,
      summary: report.summary || '',
      date: report.reportedAt,
      priority: 'MEDIUM' as const,
      sourceUrl: report.sources[0]?.url || '',
      source: getDomainFromUrl(report.sources[0]?.url || ''),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="w-full space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent News & Press Releases</CardTitle>
          <CardDescription>AI-summarized news and market updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {allNews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No news or press releases available
            </div>
          ) : (
            allNews.map((news, index) => (
              <NewsCard key={`${news.type}-${index}`} news={news} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// News Card Component
interface NewsCardProps {
  news: {
    type: 'press' | 'report';
    title: string;
    summary: string;
    date: Date;
    priority: string;
    sourceUrl: string;
    source: string;
  };
}

function NewsCard({ news }: NewsCardProps) {
  const timeAgo = getTimeAgo(new Date(news.date));
  const sentiment = getSentiment(news.priority);

  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardContent className="pt-6">
        <div className="space-y-3">
          {/* Header with title and badge */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-lg leading-tight flex-1">
              {news.title}
            </h3>
            <Badge
              variant={
                sentiment === 'positive'
                  ? 'default'
                  : sentiment === 'negative'
                    ? 'destructive'
                    : 'secondary'
              }
              className={
                sentiment === 'positive'
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : sentiment === 'negative'
                    ? 'bg-red-100 text-red-800 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
              }
            >
              {sentiment}
            </Badge>
          </div>

          {/* Summary */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {news.summary}
          </p>

          {/* Footer with source and time */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium">{news.source}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{timeAgo}</span>
              </div>
              {news.sourceUrl && (
                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility Functions
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}

function getSentiment(priority: string): 'positive' | 'negative' | 'neutral' {
  // You can customize this based on your priority mapping
  if (priority === 'HIGH') return 'positive';
  if (priority === 'LOW') return 'negative';
  return 'neutral';
}

function getDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    // Capitalize first letter
    return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
  } catch {
    return 'Unknown Source';
  }
}

