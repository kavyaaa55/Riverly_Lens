// components/product-detail-dashboard.tsx
'use client';

import { Product, Company } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';

type ProductInsightSerialized = {
  id: string;
  productId: string;
  source: string | null;
  starsOutOf5: string | null;
  likesSummary: string | null;
  dislikesSummary: string | null;
  capturedAt: Date;
};

type ProductWithDetails = Product & {
  insights: ProductInsightSerialized[];
  company: Company;
};

interface ProductDetailDashboardProps {
  product: ProductWithDetails;
}

export function ProductDetailDashboard({ product }: ProductDetailDashboardProps) {
  const latestInsight = product.insights[0];
  const rating = latestInsight?.starsOutOf5 ? parseFloat(latestInsight.starsOutOf5) : null;

  return (
    <div className="w-full space-y-6 p-6">
      {/* Back Button */}
      <Link href={`/companies/${product.companyId}/products`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      {/* Product Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.company.name}</p>
          </div>
        </div>

        {product.description && (
          <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
        )}

        {product.productUrl && (
          <Link href={product.productUrl} target="_blank">
            <Button variant="outline" size="sm">
              View Product Page
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
          </Link>
        )}
      </div>

      {/* Overall Rating */}
      {rating && (
        <Card>
          <CardHeader>
            <CardTitle>Overall Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {latestInsight?.source || 'customer reviews'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Insights */}
      {latestInsight && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Likes */}
          {latestInsight.likesSummary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <ThumbsUp className="w-5 h-5" />
                  What Customers Like
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{latestInsight.likesSummary}</p>
              </CardContent>
            </Card>
          )}

          {/* Dislikes */}
          {latestInsight.dislikesSummary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <ThumbsDown className="w-5 h-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{latestInsight.dislikesSummary}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Insights History */}
      {product.insights.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Insights History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.insights.map((insight) => (
                <div key={insight.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {insight.starsOutOf5 && (
                        <Badge variant="outline">
                          {parseFloat(insight.starsOutOf5).toFixed(1)} ⭐
                        </Badge>
                      )}
                      {insight.source && <Badge variant="secondary">{insight.source}</Badge>}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(insight.capturedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

