import { MetadataRoute } from 'next';
import clientPromise from '@/app/services/lib/mongo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const client = await clientPromise;
    const db = client.db('SamoraDB');

    // Get all products
    const products = await db.collection('Products')
        .find()
        .toArray();

    // Generate product URLs
    const productUrls = products.map((product: any) => ({
        url: `${baseUrl}/san-pham/chi-tiet/${product.slug}`,
        lastModified: product.updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Add static pages
    const routes = [
        '',
        '/gioi-thieu',
        '/san-pham',
        '/lien-he',
        // '/thanh-toan',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    return [...routes, ...productUrls];
}