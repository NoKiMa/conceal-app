import store from "@/store/store";
import { copyToClipboard, fontSizeEditor } from "@/utilits";
import { useState } from "react";

const HidenTextBoard = () => {
  const { data } = store();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
      if (data.resultHideText) {
          const success = await copyToClipboard(data.resultHideText);
          if (success) {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
          }
      }
  };
    return (
      <div
      className={`space-y-2 ${
        data.activeTab !== 'hide' && data.resultHideText ? 'visible':'invisible'
      }`}>
     
      <div
        className={`w-full h-[9rem] p-2 border rounded-md  border-amber-300 text-black focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center align-center flex justify-center items-center ${fontSizeEditor(data.resultHideText?.length || 0)}`}
      >
        {data.resultHideText}
        </div>
        <button
        onClick={handleCopy}
        className={`mt-2 px-4 py-2  text-black rounded-md  transition-colors ${copied ? 'bg-gray-300 hover:bg-gray-400' : 'bg-amber-300 hover:bg-amber-400'}`}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
    )
}

export default HidenTextBoard