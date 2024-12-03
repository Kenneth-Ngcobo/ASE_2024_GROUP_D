'use client';

import { useEffect } from 'react';

/**
 * DynamicManifest component dynamically adds a manifest link to the document head.
 * 
 * @component
 * @example
 * // Usage:
 * <DynamicManifest />
 */
export default function DynamicManifest() {
  useEffect(() => {
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/api/manifest';
    document.head.appendChild(manifestLink);
  }, []);

  return null;
}
