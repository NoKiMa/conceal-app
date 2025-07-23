import store, { StoreState } from "@/store/store";

type FileInputProps = {
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const FileInput = ({fileInputRef }: FileInputProps) => {
  const {setFormData} = store();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.files', e.target.files);
    const file: StoreState['data']['formData']['file'] =
      e.target.files?.[0] || null;
    setFormData({file: file, fileName: file?.name || ''});
  };
  return (
           <div>
              <label className="block text-sm text-amber-300 font-medium mb-1">
                Select File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-1 file:text-sm file:font-semibold file:border-amber-300 file:bg-white file:text-amber-400 hover:file:bg-amber-100"
              />
            </div>
  )
}

export default FileInput