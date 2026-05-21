import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { uploadPDF } from "../api/uploadApi";


function Dashboard() {

  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [tenantKey, setTenantKey] = useState(
    localStorage.getItem("tenantKey") || ""
  );
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {

    if (!file) {
      return alert("Please select a PDF");
    }

    if (!tenantKey.trim()) {
      return alert("Please enter a tenant key before uploading");
    }

    try {

      setUploading(true);
      setUploadStatus("");

      const formData = new FormData();

      formData.append("pdf", file);
      formData.append("tenantKey", tenantKey.trim());

      const response = await uploadPDF(formData);
      localStorage.setItem("tenantKey", response.tenantKey);
      setTenantKey(response.tenantKey);
      setUploadStatus(
        `Stored ${response.chunksStored} chunks for ${response.tenantKey}`
      );
      alert(response.message);

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Upload failed");

    } finally {

      setUploading(false);

    }

  };

  const handleAsk = async () => {

  if (!question.trim()) return;

  if (!tenantKey.trim()) {
    return alert("Please enter a tenant key before asking questions");
  }

  const userMessage = {
    role: "user",
    text: question,
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  try {

    setLoading(true);

    const response = await API.post(
      "/chat",
      {
        question,
        tenantKey: tenantKey.trim(),
      },
      
    );

    const aiMessage = {
      role: "ai",
      text: response.data.answer,
    };

    setMessages((prev) => [
      ...prev,
      aiMessage,
    ]);

    setQuestion("");

  } catch (error) {

    console.log(error);

    alert(error.response?.data?.message || "Chat failed");

  } finally {

    setLoading(false);

  }

};

const handleLogout = () => {

  localStorage.removeItem("token");

  navigate("/");

};

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <div className="w-64 bg-zinc-900 p-6 border-r border-zinc-800 flex flex-col">

        <h1 className="text-2xl font-bold mb-8">
          ThreadDesk
        </h1>

        <div className="mb-4">

          <label className="block text-xs text-zinc-400 mb-2">
            Tenant key
          </label>

          <input
            type="text"
            value={tenantKey}
            onChange={(e) => setTenantKey(e.target.value)}
            placeholder="zudio"
            className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-white"
          />

        </div>

       <div className="mb-4">

  <label className="w-full cursor-pointer relative block">

    <div className="w-full bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-lg text-sm text-center truncate pr-10">

      {
        file
          ? file.name
          : "Choose PDF File"
      }

    </div>

    {
      file && (

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setFile(null);
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-white"
        >

          ✕

        </button>

      )
    }

    <input
      type="file"
      accept=".pdf"
      onChange={(e) => setFile(e.target.files[0])}
      className="hidden"
    />

  </label>

</div>

        <button
          onClick={handleUpload}
          className="w-full bg-white text-black py-2 rounded-lg font-medium hover:opacity-90"
        >
          {
            uploading
              ? "Uploading..."
              : "Upload PDF"
          }
        </button>

        {
          uploadStatus && (

            <p className="mt-3 text-xs text-green-400 leading-relaxed">
              {uploadStatus}
            </p>

          )
        }
        <button
        onClick={handleLogout}
        className="w-full mt-auto bg-red-500 hover:bg-red-600 transition py-2 rounded-lg font-medium"
>

  Logout

</button>

      </div>

      {/* Main Area */}

      <div className="flex-1 flex flex-col">

        {/* Header */}

        <div className="border-b border-zinc-800 p-4">

          <h2 className="text-xl font-semibold">
            Admin testing environment
          </h2>

        </div>

        {/* Chat Area */}

        <div className="flex-1 p-6 overflow-y-auto space-y-4">

  {
    messages.length === 0 && (

      <div className="bg-zinc-800 p-4 rounded-xl max-w-2xl">

        Welcome to ThreadDesk.

      </div>

    )
  }

  {
    messages.map((msg, index) => (

      <div
        key={index}
        className={`p-4 rounded-xl max-w-2xl ${
          msg.role === "user"
            ? "bg-white text-black ml-auto"
            : "bg-zinc-800 text-white"
        }`}
      >

        {msg.text}

      </div>

    ))
  }

  {
    loading && (

      <div className="bg-zinc-800 p-4 rounded-xl max-w-2xl">

        Thinking...

      </div>

    )
  }

</div>
        {/* Input */}

        <div className="p-4 border-t border-zinc-800 flex gap-3">

          <input
            type="text"
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                handleAsk();
                }
            }}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
          />

                <button
            onClick={handleAsk}
            className="bg-white text-black px-6 rounded-xl font-medium hover:opacity-90"
            >

            Send

          </button>

        </div>

      </div>
     
    </div>

  );

}

export default Dashboard;
