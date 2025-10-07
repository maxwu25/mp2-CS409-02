// ===============================================================
//  PURPOSE: Performance measurement setup for the React app.
//  Collects Core Web Vitals metrics (CLS, FID, FCP, LCP, TTFB)
//  to evaluate app performance in production.
// ===============================================================

import { ReportHandler } from 'web-vitals';

// --- Exported Function: Report Web Vitals ---
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
