// app/news/[newsId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  ExternalLink,
  TrendingUp,
  AlertCircle,
  FileText,
  Building2,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

interface ReportData {
  id: string;
  title: string;
  summary?: string;
  marketImpact?: string;
  reportedAt: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    type?: string | null;
  };
  sources?: Array<{ id: string; url: string }>;
  topics?: Array<{ topic: { name: string } }>;
}

export default function NewsDetailPage() {
  const params = useParams();
  const companyId = params.newsId as string;

  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReport();
  }, [companyId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news/${companyId}`);

      if (!response.ok) {
        throw new Error('Report not found');
      }

      const result = await response.json();
      setReportData(result.data);
    } catch (err) {
      console.error('Error loading report:', err);
      setError('Report not found for this company');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Report Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {error || 'No report available for this company'}
            </p>
            <Link href="/dashboard">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Company Info */}
        <div className="mb-6">
          <Link href={`/companies/${reportData.company.id}`}>
            <div className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              {reportData.company.logoUrl ? (
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={reportData.company.logoUrl}
                    alt={reportData.company.name}
                  />
                  <AvatarFallback>{reportData.company.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              )}
              <div>
                <h2 className="font-semibold text-lg">{reportData.company.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {reportData.company.type || 'Company'}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary">Market Report</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(reportData.reportedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{reportData.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* AI Summary */}
            {reportData.summary && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2">AI Summary</h3>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {reportData.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Market Impact */}
            {reportData.marketImpact && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900 mb-2">
                      Market Impact Analysis
                    </h3>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      {reportData.marketImpact}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Topics */}
            {reportData.topics && reportData.topics.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {reportData.topics.map((topicLink, index) => (
                    <Badge key={index} variant="outline">
                      {topicLink.topic.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            {reportData.sources && reportData.sources.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Sources</h3>
                <div className="space-y-2">
                  {reportData.sources.map((source) => (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 inline" />
                      {source.url}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Key Insights */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Why This Matters</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>
                    This report provides AI-generated insights into {reportData.company.name}'s
                    market position and recent activities.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>
                    Monitor how this development affects your competitive landscape.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Track similar patterns from other competitors to identify trends.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Related Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Related Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href={`/companies/${reportData.company.id}`}>
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                View {reportData.company.name} Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

