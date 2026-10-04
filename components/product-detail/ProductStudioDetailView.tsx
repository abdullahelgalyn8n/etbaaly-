"use client";

import React, { useState, useMemo } from "react";
import { AdminProduct, ProductColor } from "@/lib/db";
import { siteConfig } from "@/data/siteConfig";

import ProductGallery from "./ProductGallery";
import ProductInfoOrder from "./ProductInfoOrder";
import ProductRelatedSection from "./ProductRelatedSection";
import ProductLightboxModal from "./ProductLightboxModal";
import { ProductDetailBreadcrumb } from "./ProductDetailBreadcrumb";
import { useProductReviews } from "./useProductReviews";
import ProductTabsSection from "./ProductTabsSection";

interface ProductStudioDetailViewProps {
  product: AdminProduct;
  relatedProducts?: AdminProduct[];
}

export default function ProductStudioDetailView({
  product,
  relatedProducts = [],
}: ProductStudioDetailViewProps) {
  // Selected Color variant
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors && product.colors.length > 0
      ? product.colors[0]
      : { id: "c1", name: "أبيض كلاسيك", hex: "#FFFFFF", bgStyle: "#FFFFFF", mockupOverlay: "#FFFFFF" }
  );

  // Images list derived from selected color or product
  const imagesList = useMemo(() => {
    if (selectedColor.images && selectedColor.images.length > 0) {
      return selectedColor.images;
    }
    if (selectedColor.mockupOverlay && selectedColor.mockupOverlay.startsWith("/")) {
      return [selectedColor.mockupOverlay];
    }
    if (product.image) {
      return [product.image];
    }
    return ["/images/ICON-LOGO-SITE.webp"];
  }, [selectedColor, product.image]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    setActiveImageIdx(0);
  };

  // Quantity & Price
  const [quantity, setQuantity] = useState(1);
  const unitPrice = useMemo(() => {
    return Number(product.basePrice) + (selectedColor.priceAdd || 0);
  }, [product.basePrice, selectedColor]);
  const originalPrice = useMemo(() => Math.round(unitPrice * 1.25), [unitPrice]);
  const totalPrice = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  // Fullscreen Lightbox
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "shipping">("specs");

  // Custom reviews hook
  const {
    reviewsList,
    newReviewAuthor,
    setNewReviewAuthor,
    newReviewCompany,
    setNewReviewCompany,
    newReviewRating,
    setNewReviewRating,
    newReviewText,
    setNewReviewText,
    reviewSubmitted,
    handleAddReview,
    handleHelpfulClick,
  } = useProductReviews();

  // WhatsApp link
  const whatsappUrl = useMemo(() => {
    const msg = `مرحباً إطبعلي، أود طلب هذا المنتج:
- اسم المنتج: ${product.title}
- اللون: ${selectedColor.name}
- الكمية: ${quantity} قطعة
- السعر الإجمالي: ${totalPrice} ج.م
الرجاء تأكيد الطلب وتفاصيل التوصيل.`;
    return `${siteConfig.social.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [product.title, selectedColor.name, quantity, totalPrice]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Breadcrumb */}
      <ProductDetailBreadcrumb
        category={product.category}
        title={product.title}
      />

      {/* 2. Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7">
          <ProductGallery
            imagesList={imagesList}
            activeImageIdx={activeImageIdx}
            setActiveImageIdx={setActiveImageIdx}
            badge={product.badge}
            title={product.title}
            selectedColorName={selectedColor.name}
            onOpenFullscreen={() => setIsFullscreen(true)}
          />
        </div>
        <div className="lg:col-span-5">
          <ProductInfoOrder
            product={product}
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            quantity={quantity}
            setQuantity={setQuantity}
            unitPrice={unitPrice}
            originalPrice={originalPrice}
            totalPrice={totalPrice}
            whatsappUrl={whatsappUrl}
            reviewsCount={reviewsList.length}
          />
        </div>
      </div>

      {/* 3. Tabs Section */}
      <ProductTabsSection
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reviewsList={reviewsList}
        handleAddReview={handleAddReview}
        newReviewAuthor={newReviewAuthor}
        setNewReviewAuthor={setNewReviewAuthor}
        newReviewCompany={newReviewCompany}
        setNewReviewCompany={setNewReviewCompany}
        newReviewRating={newReviewRating}
        setNewReviewRating={setNewReviewRating}
        newReviewText={newReviewText}
        setNewReviewText={setNewReviewText}
        reviewSubmitted={reviewSubmitted}
        handleHelpfulClick={handleHelpfulClick}
      />

      {/* 4. Related Products */}
      <ProductRelatedSection relatedProducts={relatedProducts} />

      {/* 5. Lightbox Modal */}
      <ProductLightboxModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        activeImage={imagesList[activeImageIdx] || imagesList[0]}
        activeImageIdx={activeImageIdx}
        setActiveImageIdx={setActiveImageIdx}
        imagesList={imagesList}
        productTitle={product.title}
        selectedColorName={selectedColor.name}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
      />
    </div>
  );
}
