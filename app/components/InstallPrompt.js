'use client';

import { useState, useEffect } from 'react';

/**
 * A component that displays an install prompt for iOS devices.
 * It shows a button to add the app to the home screen, and provides instructions for iOS users.
 * 
 * @component
 * @example
 * return <InstallPrompt />;
 */
export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window.MSStream)
    );
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon"> ⎋ </span>
          and then &quot;Add to Home Screen&quot;
          <span role="img" aria-label="plus icon"> ➕ </span>.
        </p>
      )}
    </div>
  );
}
