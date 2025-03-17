
import AboutSection from '@/app/components/AboutUs';
import { getAllProducts, getProductBySlug } from '@/app/components/api';
import FooterSection from '@/app/components/Footer';
import ProductDetail from '@/app/components/ProductDetail';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

interface ProductDetailPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        return {
            title: 'Sản phẩm không tồn tại',
        };
    }

    return {
        title: product.category + " " +product.name,
        description: product.benefits.substring(0, 160),
    };
}

// Tạo các đường dẫn tĩnh khi build
export async function generateStaticParams() {
    // Lấy tất cả sản phẩm để tạo đường dẫn tĩnh cho từng sản phẩm
    const products = await getAllProducts();

    return products.map(product => ({
        slug: product.slug,
    }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <>
            <ProductDetail product={product} />
            <FooterSection />
        </>

    );
}