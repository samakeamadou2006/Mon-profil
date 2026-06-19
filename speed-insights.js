/**
 * Vercel Speed Insights initialization
 * This script initializes Vercel Speed Insights for performance monitoring
 * Based on @vercel/speed-insights v1.3.1
 */

(function() {
  'use strict';
  
  // Initialize the Speed Insights queue
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }
  
  // Detect if we're in development mode
  const isDevelopment = function() {
    try {
      return false; // Set to true for debug mode in development
    } catch (e) {
      return false;
    }
  };
  
  // Get the appropriate script source
  const getScriptSrc = function() {
    if (isDevelopment()) {
      return 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js';
    }
    return '/_vercel/speed-insights/script.js';
  };
  
  // Check if script is already loaded
  const src = getScriptSrc();
  if (document.head.querySelector('script[src*="' + src + '"]')) {
    return;
  }
  
  // Create and inject the Speed Insights script
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.setAttribute('data-sdkn', '@vercel/speed-insights');
  script.setAttribute('data-sdkv', '1.3.1');
  
  script.onerror = function() {
    console.log(
      '[Vercel Speed Insights] Failed to load script from ' + src + 
      '. Please check if any content blockers are enabled and try again.'
    );
  };
  
  document.head.appendChild(script);
})();
