import { MetadataRoute } from 'next';

// Define the base URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/thanh-toan/',
          '/thanh-toan/thanh-cong',
          '/thanh-toan/that-bai',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 