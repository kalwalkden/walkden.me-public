(() => {
  const config = document.currentScript?.dataset;
  if (!config || window.location.origin !== config.productionOrigin || window.location.origin !== "https://walkden.me") return;
  if (document.getElementById("google-analytics-tag")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", config.measurementId, {
    page_location: window.location.origin + window.location.pathname,
  });
  const tag = document.createElement("script");
  tag.id = "google-analytics-tag";
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.measurementId);
  document.head.appendChild(tag);
})();
