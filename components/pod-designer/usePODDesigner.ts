import { useState } from "react";
import { podProductsSeed } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { CanvasElement } from "./types";
import { calculatePODPrice, submitPODOrder } from "./podOrderHelper";

export function usePODDesigner(initialProductId = "pod-tshirt-oversized") {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(
    podProductsSeed.find((p) => p.id === initialProductId) || podProductsSeed[0]
  );
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState((selectedProduct.sizes && selectedProduct.sizes[0]) || "Standard");
  const [activeTab, setActiveTab] = useState<"text" | "image" | "clipart" | "settings">("text");

  // Canvas elements state
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: "elem-1",
      type: "text",
      content: "YOUR BRAND HERE",
      x: 50,
      y: 45,
      scale: 1,
      rotation: 0,
      color: "#FFFFFF",
      fontFamily: "Arial Black",
      fontSize: 22,
    },
  ]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>("elem-1");

  // Text inputs
  const [newText, setNewText] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("sans-serif");

  // Quantity and Ordering
  const [quantity, setQuantity] = useState(1);
  const [clientName, setClientName] = useState(user?.full_name || "");
  const [clientPhone, setClientPhone] = useState(user?.phone || "");
  const [clientAddress, setClientAddress] = useState(user?.address || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{ tracking_code: string } | null>(null);

  const selectedElement = elements.find((e) => e.id === selectedElementId);

  const handleProductChange = (prodId: string) => {
    const prod = podProductsSeed.find((p) => p.id === prodId) || podProductsSeed[0];
    setSelectedProduct(prod);
    setSelectedColor(prod.colors[0]);
    setSelectedSize((prod.sizes && prod.sizes[0]) || "Standard");
  };

  const handleAddText = () => {
    if (!newText.trim()) return;
    const newElem: CanvasElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: newText.trim(),
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      color: textColor,
      fontFamily,
      fontSize: 20,
    };
    setElements([...elements, newElem]);
    setSelectedElementId(newElem.id);
    setNewText("");
  };

  const handleAddClipart = (emoji: string) => {
    const newElem: CanvasElement = {
      id: `clip-${Date.now()}`,
      type: "clipart",
      content: emoji,
      x: 50,
      y: 40,
      scale: 1.5,
      rotation: 0,
      fontSize: 36,
    };
    setElements([...elements, newElem]);
    setSelectedElementId(newElem.id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const newElem: CanvasElement = {
          id: `img-${Date.now()}`,
          type: "image",
          content: event.target.result as string,
          x: 50,
          y: 50,
          scale: 1,
          rotation: 0,
        };
        setElements([...elements, newElem]);
        setSelectedElementId(newElem.id);
      }
    };
    reader.readAsDataURL(file);
  };

  const updateSelectedElement = (updates: Partial<CanvasElement>) => {
    if (!selectedElementId) return;
    setElements(
      elements.map((el) => (el.id === selectedElementId ? { ...el, ...updates } : el))
    );
  };

  const deleteSelectedElement = () => {
    if (!selectedElementId) return;
    setElements(elements.filter((el) => el.id !== selectedElementId));
    setSelectedElementId(null);
  };

  const { unitPrice, totalPrice } = calculatePODPrice(selectedProduct.basePrice, quantity);

  const handleSaveAndOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone) {
      alert("يرجى كتابة رقم الهاتف للتواصل وتأكيد الشحن.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await submitPODOrder({
        product: selectedProduct,
        selectedColor,
        selectedSize,
        elements,
        clientName,
        clientPhone,
        clientAddress,
        quantity,
        unitPrice,
      });

      if (data.success) {
        setSubmittedOrder(data.order || { tracking_code: `ETB-${Math.floor(1000 + Math.random() * 9000)}` });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
