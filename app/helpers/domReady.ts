'use client';

export const DomReady: Promise<void> = new Promise((resolve: () => void) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => resolve());
  } else {
    resolve();
  }
});
