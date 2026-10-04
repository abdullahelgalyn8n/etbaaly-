import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const { isLive, sql } = getDb();

  if (!isLive || !sql) {
    return NextResponse.json({
      status: "mock_mode",
      message: "Supabase DATABASE_URL غير مربوط حالياً في البيئة. النظام يعمل في وضع المحاكاة الذكي والذاكرة المتكاملة بنجاح.",
    });
  }

  try {
    // 1. Create Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company_name VARCHAR(255),
        tax_number VARCHAR(100),
        commercial_reg VARCHAR(100),
        address TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Orders Table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(64) PRIMARY KEY,
        tracking_code VARCHAR(50) UNIQUE NOT NULL,
        user_id VARCHAR(64),
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(255),
        service_type VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        specs JSONB DEFAULT '{}'::jsonb,
        quantity INTEGER NOT NULL DEFAULT 1,
        unit_price NUMERIC(10, 2) DEFAULT 0,
        total_price NUMERIC(12, 2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'received',
        status_label VARCHAR(255) DEFAULT 'تم استلام الطلب',
        shipping_address TEXT,
        shipping_city VARCHAR(100) DEFAULT 'القاهرة',
        shipping_method VARCHAR(100) DEFAULT 'توصيل قياسي',
        estimated_delivery VARCHAR(100),
        courier_name VARCHAR(255),
        courier_phone VARCHAR(50),
        timeline JSONB DEFAULT '[]'::jsonb,
        notes TEXT,
        file_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Create Quotes Table
    await sql`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id VARCHAR(64) PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        company VARCHAR(255),
        product_type VARCHAR(255) NOT NULL,
        specs JSONB DEFAULT '{}'::jsonb,
        quantity INTEGER DEFAULT 100,
        estimated_price NUMERIC(12, 2),
        notes TEXT,
        file_url TEXT,
        status VARCHAR(50) DEFAULT 'pending_review',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Create Sample Requests Table
    await sql`
      CREATE TABLE IF NOT EXISTS sample_requests (
        id VARCHAR(64) PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        industry VARCHAR(100),
        notes TEXT,
        status VARCHAR(50) DEFAULT 'dispatched',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 5. Create Posts Table for Blog Articles
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        category VARCHAR(255) DEFAULT 'مقالات عامة وتصميم',
        category_tag VARCHAR(100) DEFAULT 'general',
        image TEXT DEFAULT '/images/social-media/az-social-offer-99egp.webp',
        date VARCHAR(50),
        publish_date TIMESTAMP WITH TIME ZONE,
        read_time VARCHAR(50) DEFAULT '4 دقائق قراءة',
        author VARCHAR(255) DEFAULT 'فريق تحرير مطبعة إطبعلي',
        tags JSONB DEFAULT '["إطبعلي"]'::jsonb,
        status VARCHAR(50) DEFAULT 'published',
        views INTEGER DEFAULT 0,
        seo_metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({
      status: "success",
      message: "تم تهيئة جداول قاعدة بيانات Supabase Postgres بنجاح وتجهيز كافة الفهارس.",
    });
  } catch (err: any) {
    console.error("Database initialization failed:", err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
