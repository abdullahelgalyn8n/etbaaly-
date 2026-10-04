"use client";

import React from "react";
import { PODHeader } from "./pod-designer/PODHeader";
import { PODToolbar } from "./pod-designer/PODToolbar";
import { PODCanvas } from "./pod-designer/PODCanvas";
import { PODCheckoutSidebar } from "./pod-designer/PODCheckoutSidebar";
import { usePODDesigner } from "./pod-designer/usePODDesigner";

export default function PODDesigner({
  initialProductId = "pod-tshirt-oversized",
}: {
  initialProductId?: string;
}) {
  const {
    selectedProduct,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    activeTab,
    setActiveTab,
    elements,
    selectedElementId,
    setSelectedElementId,
    selectedElement,
    newText,
    setNewText,
    textColor,
    setTextColor,
    fontFamily,
    setFontFamily,
    quantity,
    setQuantity,
    clientName,
    setClientName,
    clientPhone,
    setClientPhone,
    clientAddress,
    setClientAddress,
    isSubmitting,
    submittedOrder,
    unitPrice,
    totalPrice,
    handleProductChange,
    handleAddText,
    handleAddClipart,
    handleImageUpload,
    updateSelectedElement,
    deleteSelectedElement,
    handleSaveAndOrder,
  } = usePODDesigner(initialProductId);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Studio Header Card */}
      <PODHeader
        selectedProduct={selectedProduct}
        onProductChange={handleProductChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Toolbar / Controls (4 Cols) */}
        <PODToolbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          newText={newText}
          setNewText={setNewText}
          textColor={textColor}
          setTextColor={setTextColor}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          handleAddText={handleAddText}
          handleImageUpload={handleImageUpload}
          handleAddClipart={handleAddClipart}
          selectedElement={selectedElement}
          updateSelectedElement={updateSelectedElement}
          deleteSelectedElement={deleteSelectedElement}
          selectedProduct={selectedProduct}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        {/* Center Live Canvas Mockup (5 Cols) */}
        <PODCanvas
          selectedColor={selectedColor}
          elements={elements}
          selectedElementId={selectedElementId}
          setSelectedElementId={setSelectedElementId}
          selectedProduct={selectedProduct}
        />

        {/* Right Summary & Instant Order Checkout (3 Cols) */}
        <PODCheckoutSidebar
          selectedProduct={selectedProduct}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          unitPrice={unitPrice}
          totalPrice={totalPrice}
          clientName={clientName}
          setClientName={setClientName}
          clientPhone={clientPhone}
          setClientPhone={setClientPhone}
          clientAddress={clientAddress}
          setClientAddress={setClientAddress}
          isSubmitting={isSubmitting}
          submittedOrder={submittedOrder}
          onSaveAndOrder={handleSaveAndOrder}
        />
      </div>
    </div>
  );
}
