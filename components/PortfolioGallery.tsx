"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PortfolioItem } from "@/data/servicesData";
import PortfolioCard from "./portfolio/PortfolioCard";
import PortfolioLightboxModal from "./portfolio/PortfolioLightboxModal";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  serviceTitle: string;
}

export default function PortfolioGallery({ items, serviceTitle }: PortfolioGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setZoomLevel(1);
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    setZoomLevel(1);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
    setZoomLevel(1);
  }, [selectedIndex, items.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
    setZoomLevel(1);
  }, [selectedIndex, items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handleNext(); // RTL: next is left
      if (e.key === "ArrowRight") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      {/* Grid of Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <PortfolioCard
            key={item.id}
            item={item}
            idx={idx}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {/* Interactive Full-Screen Lightbox Modal */}
      {activeItem && selectedIndex !== null && (
        <PortfolioLightboxModal
          activeItem={activeItem}
          selectedIndex={selectedIndex}
          totalItems={items.length}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}
