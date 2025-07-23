import store from "@/store/store";

const TextInput = () => {
  const { setFormData, data } = store();
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({text: e.target.value});
  };
  // Always render the text area with hidden visibility
  return (
    <div
    className={`space-y-2 ${
      data.activeTab === 'hide' ? 'visible' : 'invisible'
    }`}>
    <label className="block text-sm text-amber-300 font-medium mb-1">
      Enter Text
    </label>
    <textarea
      value={data.formData.text}
      onChange={handleTextChange}
      rows={4}
      className="w-full p-2 border rounded-md  border-amber-300 text-black focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
    )
}

export default TextInput
