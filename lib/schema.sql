-- ==========================================================
-- ETBA3 (إطبع) - Printing & Packaging Platform Schema
-- Powered by Supabase Postgres & A.Z Agency
-- ==========================================================

-- 1. Users & Corporate Clients Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    role VARCHAR(20) DEFAULT 'client',
    company_name VARCHAR(255),
    tax_number VARCHAR(100),
    commercial_reg VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders & Print Jobs Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    tracking_code VARCHAR(50) UNIQUE NOT NULL,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    service_type VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    specs JSONB DEFAULT '{}'::jsonb,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC(10, 2) DEFAULT 0,
    total_price NUMERIC(12, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'received', -- 'received', 'preflight', 'printing', 'finishing', 'packaging', 'shipped', 'delivered'
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

-- 3. Custom Quotations Table
CREATE TABLE IF NOT EXISTS quote_requests (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
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

-- 4. Sample Box Requests Table (B2B Sample Kits)
CREATE TABLE IF NOT EXISTS sample_requests (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
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

-- 5. Media & Assets Management Table (SEO & Cloudflare R2 / Local)
CREATE TABLE IF NOT EXISTS media_assets (
    id VARCHAR(64) PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    storage_type VARCHAR(20) NOT NULL DEFAULT 'local', -- 'local' (repo/static) or 'cloud_db' (Neon/R2)
    filename VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255) DEFAULT '',
    title VARCHAR(255) DEFAULT '',
    caption TEXT DEFAULT '',
    description TEXT DEFAULT '',
    dimensions JSONB DEFAULT '{"width": 0, "height": 0}'::jsonb,
    file_size_kb NUMERIC(10, 2) DEFAULT 0,
    mime_type VARCHAR(50) DEFAULT 'image/webp',
    category VARCHAR(100) DEFAULT 'general',
    tags JSONB DEFAULT '[]'::jsonb,
    used_in JSONB DEFAULT '[]'::jsonb, -- [{ "type": "article"|"product", "id": "...", "title": "..." }]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Blog Posts & Articles Management Table
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
    status VARCHAR(50) DEFAULT 'published', -- 'published', 'draft', 'scheduled'
    views INTEGER DEFAULT 0,
    seo_metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning-fast lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_orders_tracking_code ON orders(tracking_code);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_user_id ON quote_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_sample_requests_user_id ON sample_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_media_storage_type ON media_assets(storage_type);
CREATE INDEX IF NOT EXISTS idx_media_category ON media_assets(category);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category_tag ON posts(category_tag);

