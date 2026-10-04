import { VisualConfigurator } from "../types";
import { mugConfigurators } from "./mugConfiguratorSeeds";
import { packagingConfigurators } from "./packagingConfiguratorSeeds";
import { apparelConfigurators } from "./apparelConfiguratorSeeds";

export const initialVisualConfigurators: VisualConfigurator[] = [
  ...mugConfigurators,
  ...packagingConfigurators,
  ...apparelConfigurators,
];
