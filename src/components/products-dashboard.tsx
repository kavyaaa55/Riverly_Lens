// components/products-dashboard.tsx
'use client';

import { useState } from 'react';
import { Company, Product } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, ExternalLink, Star, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type ProductInsightSerialized = {
  id: string;
  productId: string;
  source: string | null;
  starsOutOf5: string | null;
  likesSummary: string | null;
  dislikesSummary: string | null;
  capturedAt: Date;
};

type ProductWithInsights = Product & {
  insights: ProductInsightSerialized[];
};

type CompanyWithProducts = Company & {
  products: ProductWithInsights[];
};

interface ProductsDashboardProps {
  company: CompanyWithProducts;
}

export function ProductsDashboard({ company }: ProductsDashboardProps) {
  const { products } = company;
  const params = useParams();
  const companyId = params?.companyId as string;
  const [sortBy, setSortBy] = useState<'date' | 'impact'>('date');

  // Calculate impact and sort products
  const productsWithImpact = products.map((product) => {
    const latestInsight = product.insights[0];
    const rating = latestInsight?.starsOutOf5 ? parseFloat(latestInsight.starsOutOf5) : 0;

    let impactLevel: 'high' | 'medium' | 'low' = 'low';
    if (rating >= 4.5) impactLevel = 'high';
    else if (rating >= 3.5) impactLevel = 'medium';

    return { ...product, impactLevel, rating };
  });

  const sortedProducts = [...productsWithImpact].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    } else {
      // Sort by impact: high > medium > low
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impactLevel] - impactOrder[a.impactLevel];
    }
  });

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header with Sort */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Product & Feature Updates</h2>
          <p className="text-muted-foreground">Latest product launches and feature enhancements</p>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value: 'date' | 'impact') => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="impact">Sort by Impact</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products List */}
      {sortedProducts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No products available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} companyId={companyId} />
          ))}
        </div>
      )}
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: ProductWithInsights;
  companyId: string;
}

function ProductCard({ product, companyId }: ProductCardProps) {
  const latestInsight = product.insights[0];
  const rating = latestInsight?.starsOutOf5 ? parseFloat(latestInsight.starsOutOf5) : null;

  // Determine impact level based on rating
  const getImpactBadge = () => {
    if (rating && rating >= 4.5) {
      return { text: 'High Impact', color: 'bg-green-600' };
    } else if (rating && rating >= 3.5) {
      return { text: 'Medium Impact', color: 'bg-gray-500' };
    } else {
      return { text: 'Low Impact', color: 'bg-gray-400' };
    }
  };

  const getCategoryBadge = () => {
    const name = product.name.toLowerCase();
    if (name.includes('app') || name.includes('mobile') || name.includes('digital')) {
      return 'Technology';
    } else if (name.includes('menu') || name.includes('food') || name.includes('product')) {
      return 'Product';
    }
    return 'Feature';
  };

  const impact = getImpactBadge();
  const category = getCategoryBadge();
  const timeAgo = getTimeAgo(product.releaseDate || new Date());

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header with badges */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.description || 'New feature enhancement'}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Badge variant="outline">{category}</Badge>
              <Badge className={impact.color}>{impact.text}</Badge>
            </div>
          </div>

          {/* Rating & Insights */}
          {latestInsight && (
            <div className="space-y-2">
              {rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                </div>
              )}

              {latestInsight.likesSummary && (
                <div className="text-sm">
                  <span className="font-medium text-green-600">Likes: </span>
                  <span className="text-muted-foreground">{latestInsight.likesSummary}</span>
                </div>
              )}

              {latestInsight.dislikesSummary && (
                <div className="text-sm">
                  <span className="font-medium text-red-600">Dislikes: </span>
                  <span className="text-muted-foreground">{latestInsight.dislikesSummary}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>

            {/* <Link href={`/companies/${companyId}/products/${product.id}`}> */}
            {/*   <Button variant="outline" size="sm"> */}
            {/*     View Detailed Analysis */}
            {/*     <ExternalLink className="w-3 h-3 ml-2" /> */}
            {/*   </Button> */}
            {/* </Link> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility function
function getTimeAgo(date: Date | null): string {
  if (!date) return 'Recently';

  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 60) return '1 month ago';
  return `${Math.floor(diffInDays / 30)} months ago`;
}

