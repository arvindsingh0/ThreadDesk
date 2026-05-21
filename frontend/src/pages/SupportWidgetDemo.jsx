import ChatWidget from "../components/ChatWidget";

function SupportWidgetDemo() {

  return (

    <main className="min-h-screen bg-zinc-100 text-zinc-950">

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">

        <header className="border-b border-zinc-300 pb-4">

          <h1 className="text-2xl font-semibold">
            Zudio
          </h1>

        </header>

      </div>

      <ChatWidget
        tenantKey="zudio"
        brandName="Zudio"
      />

    </main>

  );

}

export default SupportWidgetDemo;
