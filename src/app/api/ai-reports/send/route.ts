import { NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
// const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Fake/Demo API endpoint for sending AI-generated reports via email
 * This endpoint simulates sending periodic reports to users every 3 days
 * 
 * NOTE: This is not called anywhere in the codebase - it's a standalone demo endpoint
 * In production, this would be triggered by a cron job or scheduled task
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userEmail, userName } = body;

        if (!userEmail) {
            return NextResponse.json(
                { error: 'User email is required' },
                { status: 400 }
            );
        }

        // Generate fake AI report data
        const reportData = generateFakeAIReport();

        // Compose email content
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }
        .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .metric {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .metric-title {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .insight {
            background: #fff3cd;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 12px;
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Your AI-Powered Market Intelligence Report</h1>
        <p>3-Day Analysis Summary</p>
    </div>
    
    <div class="content">
        <p>Hi ${userName || 'there'},</p>
        
        <p>Here's your latest AI-generated market intelligence report covering the past 3 days:</p>
        
        <h2>📈 Key Metrics</h2>
        
        <div class="metric">
            <div class="metric-title">Market Sentiment Score</div>
            <div class="metric-value">${reportData.sentimentScore}/100</div>
            <p>${reportData.sentimentTrend}</p>
        </div>
        
        <div class="metric">
            <div class="metric-title">Competitor Activity</div>
            <div class="metric-value">${reportData.competitorActivity} events</div>
            <p>${reportData.competitorSummary}</p>
        </div>
        
        <div class="metric">
            <div class="metric-title">Social Media Engagement</div>
            <div class="metric-value">${reportData.socialEngagement}%</div>
            <p>${reportData.socialTrend}</p>
        </div>
        
        <h2>💡 AI-Generated Insights</h2>
        
        ${reportData.insights.map(insight => `
            <div class="insight">
                <strong>${insight.title}</strong>
                <p>${insight.description}</p>
            </div>
        `).join('')}
        
        <h2>🎯 Recommended Actions</h2>
        <ul>
            ${reportData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        
        <div style="text-align: center;">
            <a href="https://your-app-url.com/dashboard" class="cta-button">
                View Full Dashboard →
            </a>
        </div>
        
        <div class="footer">
            <p>This is an automated AI-generated report sent every 3 days.</p>
            <p>RivalryLens © 2024 | <a href="#">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>
        `;

        // Send email using Resend
        // TODO: Install 'resend' package to enable email functionality
        // const data = await resend.emails.send({
        //     from: 'RivalryLens AI <reports@rivalrylens.com>',
        //     to: [userEmail],
        //     subject: `📊 Your 3-Day AI Market Intelligence Report - ${new Date().toLocaleDateString()}`,
        //     html: emailHtml,
        // });

        return NextResponse.json({
            success: true,
            message: 'AI report email sent successfully (demo mode - install resend package)',
            emailId: 'demo-' + Date.now(),
            reportData: reportData,
        });

    } catch (error) {
        console.error('Error sending AI report email:', error);
        return NextResponse.json(
            {
                error: 'Failed to send AI report email',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * Generate fake AI report data for demonstration
 */
function generateFakeAIReport() {
    const sentimentScores = [72, 68, 85, 79, 91, 64];
    const sentimentScore = sentimentScores[Math.floor(Math.random() * sentimentScores.length)];

    const insights = [
        {
            title: '🔥 Trending Topic Detected',
            description: 'AI analysis shows increased discussion around sustainability initiatives in your industry. Consider highlighting your eco-friendly practices.'
        },
        {
            title: '⚠️ Competitive Pressure Alert',
            description: 'A major competitor launched a new product line. Monitor customer sentiment and prepare strategic response.'
        },
        {
            title: '📱 Social Media Opportunity',
            description: 'Engagement rates are 23% higher on video content. Recommend increasing video production for next quarter.'
        },
        {
            title: '💰 Pricing Insight',
            description: 'Market analysis suggests optimal pricing window for premium tier products in current economic climate.'
        }
    ];

    const recommendations = [
        'Increase social media posting frequency by 15% to capitalize on current engagement trends',
        'Launch targeted campaign addressing sustainability to align with market sentiment',
        'Monitor competitor pricing strategies and adjust positioning accordingly',
        'Invest in video content creation to boost engagement metrics',
        'Schedule quarterly review of AI insights to refine business strategy'
    ];

    // Randomly select 2-3 insights
    const selectedInsights = insights
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 2);

    // Randomly select 3-4 recommendations
    const selectedRecommendations = recommendations
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 3);

    return {
        sentimentScore,
        sentimentTrend: sentimentScore > 75
            ? '↑ Positive trend - Market sentiment is favorable'
            : sentimentScore > 60
                ? '→ Stable - Sentiment remains consistent'
                : '↓ Declining - Requires attention',
        competitorActivity: Math.floor(Math.random() * 15) + 8,
        competitorSummary: 'Tracked product launches, pricing changes, and marketing campaigns',
        socialEngagement: Math.floor(Math.random() * 30) + 65,
        socialTrend: Math.random() > 0.5
            ? '↑ Growing engagement across platforms'
            : '→ Steady engagement maintained',
        insights: selectedInsights,
        recommendations: selectedRecommendations,
        generatedAt: new Date().toISOString(),
    };
}

/**
 * GET endpoint to retrieve report configuration
 */
export async function GET(request: NextRequest) {
    return NextResponse.json({
        endpoint: '/api/ai-reports/send',
        description: 'Fake/Demo API for sending AI-generated reports every 3 days',
        method: 'POST',
        schedule: 'Every 3 days (not implemented - demo only)',
        requiredEnvVars: ['RESEND_API_KEY'],
        samplePayload: {
            userEmail: 'user@example.com',
            userName: 'John Doe'
        },
        note: 'This endpoint is not called anywhere in the codebase. It\'s a standalone demo.',
    });
}
