'use client';
import {useState, useRef} from 'react';
import store from '../store/store';
import Header from './Header';
import Tabs from './Tabs';
import FileInput from './FileInput';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import Loader from './Loader';


export default function Main() {
  const {data, setActiveTab, resetStore, retrieveData, hideData} = store();
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: string) => {
    console.log('handleTabChange > tab', tab);
    setActiveTab(tab);
    resetStore();
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { file, text } = data.formData;
    
    if (!file) {
      setResult('Please select a file first');
      return;
    }
  
    try {
      if (data.activeTab === 'hide' && text) {
        await hideData(file, text);
      } else {
        await retrieveData(file);
      }
      setResult('Operation completed successfully');
    } catch (error) {
      console.error('Error:', error);
      setResult('Error occurred while processing your request');
    }
  };

  return (
    <div className="bg-gradient-to-br rounded-lg from-gray-50 to-white">
      <div className="container  mx-auto px-4 py-4">
        <Header />
        <Tabs tabChange={ (tab: string) => handleTabChange(tab)} />
        {/* Form */}
        <div className="bg-white border border-amber-200 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FileInput fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>} />
            <TextInput />
            <SubmitButton activeTab={data.activeTab} />
            {result && (
              <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md flex justify-center">
                {result}
              </div>
            )}
          </form>
          {data.resultFileUrl && (
            <Loader resultFileUrl={data.resultFileUrl}/>
          )}
        </div>
      </div>
    </div>
  );
}
