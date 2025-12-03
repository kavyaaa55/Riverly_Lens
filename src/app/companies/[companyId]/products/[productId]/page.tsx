// app/companies/[companyId]/products/[productId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const companyId = params.companyId as string;
  const productId = params.productId as string;

  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    fetchProduct();
  }, [companyId, productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const url = `/api/companies/${companyId}/products/${productId}`;
      setDebugInfo(`Calling: ${url}`);
      console.log('🔍 Fetching from:', url);

      const response = await fetch(url);
      console.log('📡 Status:', response.status);
      console.log('📡 Content-Type:', response.headers.get('content-type'));

      const text = await response.text();
      console.log('📄 Raw response:', text.substring(0, 200));

      if (!response.ok) {
        setDebugInfo(`Error ${response.status}: ${text}`);
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const result = JSON.parse(text);
      console.log('✅ Parsed data:', result);

      setProductData(result.data);
    } catch (err: any) {
      console.error('💥 Error:', err);
      setError(err.message || 'Failed to load product');
      setDebugInfo(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">{debugInfo}</p>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <p className="font-semibold text-red-900">Error:</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>

              <div className="bg-gray-50 border p-4 rounded">
                <p className="font-semibold mb-2">Request Details:</p>
                <p className="text-xs"><strong>Company ID:</strong> {companyId}</p>
                <p className="text-xs"><strong>Product ID:</strong> {productId}</p>
                <p className="text-xs"><strong>URL:</strong> /api/companies/{companyId}/products/{productId}</p>
              </div>

              <div className="bg-gray-50 border p-4 rounded">
                <p className="font-semibold mb-2">Debug Info:</p>
                <pre className="text-xs overflow-auto">{debugInfo}</pre>
              </div>

              <Link href={`/companies/${companyId}/products`}>
                <Button className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card>
        <CardHeader>
          <CardTitle>✅ Product Loaded Successfully!</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">{productData.name}</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
            {JSON.stringify(productData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

