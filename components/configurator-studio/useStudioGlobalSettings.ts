import { useState } from "react";
import { VisualConfigurator } from "@/lib/db";
import { defaultGlobalSettings, defaultCustomCss, defaultCustomJs } from "./studioDefaults";

export function useStudioGlobalSettings(initialConfigurator?: VisualConfigurator) {
  const [responsibleViewThumbnail, setResponsibleViewThumbnail] = useState(
    initialConfigurator?.responsibleViewThumbnail || defaultGlobalSettings.responsibleViewThumbnail
  );
  const [chooseForm, setChooseForm] = useState(
    initialConfigurator?.chooseForm || defaultGlobalSettings.chooseForm
  );
  const [contactForm, setContactForm] = useState(
    initialConfigurator?.contactForm || defaultGlobalSettings.contactForm
  );
  const [basePrice, setBasePrice] = useState<number>(
    initialConfigurator?.basePrice ?? defaultGlobalSettings.basePrice
  );
  const [loadConfiguratorIn, setLoadConfiguratorIn] = useState(
    initialConfigurator?.loadConfiguratorIn || defaultGlobalSettings.loadConfiguratorIn
  );
  const [configuratorTemplate, setConfiguratorTemplate] = useState(
    initialConfigurator?.configuratorTemplate || defaultGlobalSettings.configuratorTemplate
  );
  const [description, setDescription] = useState(initialConfigurator?.description || "");
  const [viewBackground, setViewBackground] = useState(initialConfigurator?.viewBackground || "");
  const [showDetailsPage, setShowDetailsPage] = useState(
    initialConfigurator?.showDetailsPage || defaultGlobalSettings.showDetailsPage
  );

  // Custom Code
  const [customCss, setCustomCss] = useState(initialConfigurator?.customCss || defaultCustomCss);
  const [customJs, setCustomJs] = useState(initialConfigurator?.customJs || defaultCustomJs);

  return {
    responsibleViewThumbnail,
    setResponsibleViewThumbnail,
    chooseForm,
    setChooseForm,
    contactForm,
    setContactForm,
    basePrice,
    setBasePrice,
    loadConfiguratorIn,
    setLoadConfiguratorIn,
    configuratorTemplate,
    setConfiguratorTemplate,
    description,
    setDescription,
    viewBackground,
    setViewBackground,
    showDetailsPage,
    setShowDetailsPage,
    customCss,
    setCustomCss,
    customJs,
    setCustomJs,
  };
}
