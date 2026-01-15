import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { PageView, UniqueVisitor } from '@/lib/supabase';

// Helper to extract device info from user agent
function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();
  
  // Detect device type
  let deviceType = 'desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    deviceType = 'mobile';
  }

  // Detect browser
  let browser = 'Unknown';
  if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('chrome')) browser = 'Chrome';
  else if (ua.includes('safari')) browser = 'Safari';
  else if (ua.includes('edge')) browser = 'Edge';
  else if (ua.includes('opera')) browser = 'Opera';

  // Detect OS
  let os = 'Unknown';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

  return { deviceType, browser, os };
}

// POST - Track analytics event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, page, timestamp, userAgent, referrer } = body;

    // Get IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Parse user agent
    const { deviceType, browser, os } = parseUserAgent(userAgent || '');

    // Track page view
    if (event === 'page_view') {
      // Check if IP is a unique visitor
      const { data: existingVisitor } = await supabase
        .from('unique_visitors')
        .select('ip_address, visit_count')
        .eq('ip_address', ip)
        .single();

      const isUniqueVisitor = !existingVisitor;

      // Insert page view
      const pageViewData: PageView = {
        page,
        referrer: referrer || 'direct',
        user_agent: userAgent,
        ip_address: ip,
        device_type: deviceType,
        browser,
        os,
        timestamp,
        is_unique_visitor: isUniqueVisitor,
      };

      const { error: pageViewError } = await supabase
        .from('page_views')
        .insert(pageViewData);

      if (pageViewError) {
        console.error('Page view insert error:', pageViewError);
      }

      // Update or insert unique visitor
      if (existingVisitor) {
        // Update existing visitor
        await supabase
          .from('unique_visitors')
          .update({
            last_visit: timestamp,
            visit_count: existingVisitor.visit_count + 1,
            user_agent: userAgent,
          })
          .eq('ip_address', ip);
      } else {
        // Insert new unique visitor
        const uniqueVisitorData: UniqueVisitor = {
          ip_address: ip,
          first_visit: timestamp,
          last_visit: timestamp,
          visit_count: 1,
          user_agent: userAgent,
        };

        await supabase
          .from('unique_visitors')
          .insert(uniqueVisitorData);
      }

      // Update or insert referrer
      if (referrer && referrer !== 'direct') {
        try {
          const referrerUrl = new URL(referrer);
          const referrerDomain = referrerUrl.hostname;

          const { data: existingReferrer } = await supabase
            .from('referrers')
            .select('*')
            .eq('referrer_domain', referrerDomain)
            .single();

          if (existingReferrer) {
            await supabase
              .from('referrers')
              .update({
                visit_count: existingReferrer.visit_count + 1,
                last_seen: timestamp,
              })
              .eq('id', existingReferrer.id);
          } else {
            await supabase
              .from('referrers')
              .insert({
                referrer_url: referrer,
                referrer_domain: referrerDomain,
                visit_count: 1,
                first_seen: timestamp,
                last_seen: timestamp,
              });
          }
        } catch (e) {
          // Invalid URL, skip referrer tracking
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}

// GET - Retrieve analytics data
export async function GET() {
  try {
    // Get summary from view
    const { data: summary } = await supabase
      .from('analytics_summary')
      .select('*')
      .single();

    // Get last 7 days data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const { count } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', `${dateStr}T00:00:00`)
        .lt('timestamp', `${dateStr}T23:59:59`);

      last7Days.push({
        date: dateStr,
        views: count || 0,
      });
    }

    // Get top referrers
    const { data: topReferrers } = await supabase
      .from('top_referrers')
      .select('*')
      .limit(10);

    // Get recent views
    const { data: recentViews } = await supabase
      .from('recent_activity')
      .select('*')
      .limit(20);

    return NextResponse.json({
      totalViews: summary?.total_views || 0,
      uniqueVisitors: summary?.unique_visitors || 0,
      todayViews: summary?.today_views || 0,
      last7Days,
      topReferrers: topReferrers?.map(r => ({
        referrer: r.referrer_domain,
        count: r.visit_count,
      })) || [],
      recentViews: recentViews || [],
    });
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}
