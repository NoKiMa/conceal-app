"use client";
import { useState, useRef } from "react";

interface FormData {
  file: File | null;
  text?: string;
}

export default function Main() {
  const [activeTab, setActiveTab] = useState("hide");
  const [formData, setFormData] = useState<FormData>({
    file: null,
    text: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setFormData({
      file: null,
      text: "",
    });
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, text: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { file, text } = formData;
    
    if (!file) {
      setResult("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      if (activeTab === "hide" && text) {
        formData.append("text", text);
      }

      const response = await fetch(`http://localhost:3001/api/${activeTab}`, {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error occurred while processing your request");
    }
  };

  return (
    <div className="bg-gradient-to-br rounded-lg from-gray-50 to-white">
      <div className="container  mx-auto px-4 py-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-300">Steganography Tool</h1>
        
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 rounded">
            <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
              <button
                onClick={() => handleTabChange("hide")}
                className={`
                  whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t
                  ${activeTab === "hide" 
                    ? "border-amber-300 text-amber-300" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                Hide Text in File
              </button>
              <button
                onClick={() => handleTabChange("retrieve")}
                className={`
                  whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t
                  ${activeTab === "retrieve" 
                    ? "border-amber-300 text-amber-300" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                Get Text from File
              </button>
            </nav>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-amber-200 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-amber-300 font-medium mb-1">Select File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-1 file:text-sm file:font-semibold file:border-amber-300 file:bg-white file:text-amber-400 hover:file:bg-amber-100"
              />
            </div>

            {/* Always render the text area with hidden visibility */}
            <div className={`space-y-2 ${activeTab === "hide" ? "visible" : "invisible"}`}>
              <label className="block text-sm text-amber-300 font-medium mb-1">Enter Text</label>
              <textarea
                value={formData.text}
                onChange={handleTextChange}
                rows={4}
                className="w-full p-2 border rounded-md  border-amber-300 text-black focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-300 text-white py-2 px-4 rounded-md hover:bg-amber-400 transition-colors"
            >
              {activeTab === "hide" ? "Hide Text" : "Retrieve Text"}
            </button>

            {result && (
              <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
                {result}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );

}