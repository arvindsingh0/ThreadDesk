import ChatWidget from "../components/ChatWidget";

function WidgetFrame() {

  const params = new URLSearchParams(window.location.search);
  const tenantKey = params.get("tenantKey") || "";
  const brandName = params.get("brandName") || "Support";

  return (

    <main className="h-screen w-screen overflow-hidden bg-transparent">

      <ChatWidget
        tenantKey={tenantKey}
        brandName={brandName}
        embedded
      />

    </main>

  );

}

export default WidgetFrame;
