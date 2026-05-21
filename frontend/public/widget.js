(function () {
  var script = document.currentScript;

  if (!script) {
    return;
  }

  var tenantKey = script.dataset.tenant;
  var brandName = script.dataset.brand || "Support";

  if (!tenantKey) {
    console.error("ThreadDesk widget requires data-tenant.");
    return;
  }

  var widgetOrigin = new URL(script.src).origin;
  var frameUrl = new URL("/widget-frame", widgetOrigin);

  frameUrl.searchParams.set("tenantKey", tenantKey);
  frameUrl.searchParams.set("brandName", brandName);

  function hideLauncher() {
    var launcher = document.getElementById("threaddesk-widget-launcher");

    if (launcher) {
      launcher.style.display = "none";
    }
  }

  function showLauncher() {
    var launcher = document.getElementById("threaddesk-widget-launcher");

    if (launcher) {
      launcher.style.display = "inline-flex";
    }
  }

  function closeWidget() {
    var iframe = document.getElementById("threaddesk-widget-frame");
    var closeButton = document.getElementById("threaddesk-widget-close");

    if (iframe) {
      iframe.remove();
    }

    if (closeButton) {
      closeButton.remove();
    }

    showLauncher();
  }

  function mountWidget() {
    if (document.getElementById("threaddesk-widget-frame")) {
      hideLauncher();
      return;
    }

    var iframe = document.createElement("iframe");

    iframe.id = "threaddesk-widget-frame";
    iframe.src = frameUrl.toString();
    iframe.title = brandName + " Support Assistant";
    iframe.setAttribute("aria-label", brandName + " Support Assistant");
    iframe.style.position = "fixed";
    iframe.style.right = "24px";
    iframe.style.bottom = "24px";
    iframe.style.width = "min(370px, calc(100vw - 32px))";
    iframe.style.height = "min(600px, calc(100vh - 32px))";
    iframe.style.border = "0";
    iframe.style.borderRadius = "16px";
    iframe.style.boxShadow = "0 24px 80px rgba(0, 0, 0, 0.24)";
    iframe.style.zIndex = "2147483647";
    iframe.style.colorScheme = "normal";

    document.body.appendChild(iframe);
    mountCloseButton();
    hideLauncher();
  }

  function mountCloseButton() {
    if (document.getElementById("threaddesk-widget-close")) {
      return;
    }

    var button = document.createElement("button");

    button.id = "threaddesk-widget-close";
    button.type = "button";
    button.textContent = "×";
    button.setAttribute("aria-label", "Close support assistant");
    button.style.position = "fixed";
    button.style.right = "16px";
    button.style.bottom = "min(592px, calc(100vh - 40px))";
    button.style.width = "36px";
    button.style.height = "36px";
    button.style.border = "1px solid rgba(255, 255, 255, 0.16)";
    button.style.borderRadius = "999px";
    button.style.background = "#161616";
    button.style.color = "#ffffff";
    button.style.cursor = "pointer";
    button.style.display = "inline-flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.fontFamily = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    button.style.fontSize = "28px";
    button.style.lineHeight = "1";
    button.style.boxShadow = "0 14px 36px rgba(0, 0, 0, 0.24)";
    button.style.zIndex = "2147483647";

    button.addEventListener("click", closeWidget);

    document.body.appendChild(button);
  }

  function mountLauncher() {
    if (document.getElementById("threaddesk-widget-launcher")) {
      return;
    }

    var button = document.createElement("button");

    button.id = "threaddesk-widget-launcher";
    button.type = "button";
    button.textContent = "Support";
    button.setAttribute("aria-label", "Open " + brandName + " support");
    button.style.position = "fixed";
    button.style.right = "24px";
    button.style.bottom = "24px";
    button.style.minWidth = "124px";
    button.style.height = "56px";
    button.style.border = "0";
    button.style.borderRadius = "999px";
    button.style.background = "#161616";
    button.style.color = "#ffffff";
    button.style.cursor = "pointer";
    button.style.display = "inline-flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.fontFamily = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    button.style.fontSize = "16px";
    button.style.fontWeight = "750";
    button.style.boxShadow = "0 18px 50px rgba(0, 0, 0, 0.28)";
    button.style.zIndex = "2147483647";

    button.addEventListener("click", mountWidget);

    document.body.appendChild(button);
  }

  if (document.body) {
    mountLauncher();
  } else {
    document.addEventListener("DOMContentLoaded", mountLauncher);
  }
})();
