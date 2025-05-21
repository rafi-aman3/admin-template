/**
 * Configuration utilities
 *
 * This file provides utilities for working with the application's configuration.
 */

import { siteConfig } from "@/config/site";
import { themeConfig } from "@/config/theme";

/**
 * Combined configuration object that merges all configuration sources
 */
export const config = {
  site: siteConfig,
  theme: themeConfig,
};

/**
 * Get a configuration value by path
 *
 * @param path Dot notation path to the configuration value (e.g., "site.assets.images.authBackground")
 * @param defaultValue Default value to return if the path doesn't exist
 * @returns The configuration value or the default value
 */
export function getConfig<T>(path: string, defaultValue?: T): T {
  const parts = path.split(".");
  let current: any = config;

  for (const part of parts) {
    if (current === undefined || current === null) {
      return defaultValue as T;
    }
    current = current[part];
  }

  return current !== undefined ? current : (defaultValue as T);
}

/**
 * Get an asset URL from the configuration
 *
 * @param path Path to the asset in the configuration (e.g., "site.assets.images.authBackground")
 * @param fallback Fallback URL to use if the asset is not found
 * @returns The asset URL
 */
export function getAssetUrl(
  path: string,
  fallback: string = "/placeholder.svg"
): string {
  return getConfig<string>(path, fallback);
}
