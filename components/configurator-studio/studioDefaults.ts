export interface StudioGlobalSettingsState {
  responsibleViewThumbnail: string;
  chooseForm: string;
  contactForm: string;
  basePrice: number;
  loadConfiguratorIn: string;
  configuratorTemplate: string;
  description: string;
  viewBackground: string;
  showDetailsPage: string;
}

export const defaultGlobalSettings: StudioGlobalSettingsState = {
  responsibleViewThumbnail: "v-front",
  chooseForm: "Get a Quote Form",
  contactForm: "Select a Form",
  basePrice: 45,
  loadConfiguratorIn: "Directly in Product Page",
  configuratorTemplate: "Replace Entire Product Page",
  description: "",
  viewBackground: "",
  showDetailsPage: "Select Page",
};

export const defaultCustomCss = `/* Custom Configurator CSS */
.vpc-canvas-preview {
  transition: transform 0.3s ease;
}
`;

export const defaultCustomJs = `// Custom Configurator JS Hooks
window.addEventListener('vpc:ready', function() {
  console.log('Visual Product Configurator Initialized');
});
`;
