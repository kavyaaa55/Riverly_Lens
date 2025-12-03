import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'technology';
  // You should add GNEWS_API_KEY to your .env file
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    // Return dummy data if no API key is configured
    return NextResponse.json({
      totalArticles: 2,
      articles: [
        {
          title: "Sample News Article 1",
          description: "This is a placeholder article because no GNEWS_API_KEY was found in environment variables.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          url: "https://example.com/article1",
          image: "https://placehold.co/600x400?text=News+1",
          publishedAt: new Date().toISOString(),
          source: {
            name: "Dummy Source",
            url: "https://example.com"
          }
        },
        {
          title: "Sample News Article 2",
          description: "Another placeholder article to demonstrate the API structure.",
          content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          url: "https://example.com/article2",
          image: "https://placehold.co/600x400?text=News+2",
          publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          source: {
            name: "Mock News",
            url: "https://example.com"
          }
        }
      ]
    });
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=10&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("GNews API Error:", res.status, errorData);
      return NextResponse.json(
        { error: `GNews API responded with status: ${res.status}`, details: errorData }, 
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from GNews:", error);
    return NextResponse.json({ error: 'Failed to fetch news data' }, { status: 500 });
  }
}
