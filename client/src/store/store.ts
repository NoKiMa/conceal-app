import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
// import { produce } from 'immer';
import { nameEditor } from '../utilits/index';  

export interface StoreState {
  // Пример состояния
  data: {
    activeTab: string;
    formData: {
      file: File | null | undefined;
      fileName: string | undefined;
      text: string | undefined;
    };
    resultHideText: string | null;
    resultFileUrl: string | null;
    resultFileWithText: File | null;
  };
  // Пример действий
  setActiveTab: (tab: string) => void;
  setFormData: (data: Partial<StoreState['data']['formData']>) => void;
  hideData: (file: File, text: string) => void;
  retrieveData: (file: File) => void;
  resetStore: () => void;
}

const initialState = {
  data: {
    activeTab: 'hide',
    formData: {
      file: null,
      fileName: '',
      text: '',
    },
    resultHideText: null,
    resultFileUrl: null,
    resultFileWithText: null,
  },
};

const store = create<StoreState>()(
  devtools(
    persist(
      immer((set) => ({
        data: initialState.data,

        setActiveTab: (tab) => {
          set((state) => {
            state.data.activeTab = tab;
          });
        },

        setFormData: (data) => {
          set((state) => {
            state.data.formData = {
              ...state.data.formData,
              ...data,
            };
          });
        },
        hideData: async (file: File, text: string) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('text', text);
          
          const response = await fetch('http://localhost:3000/api/hide', {
            method: 'POST',
            body: formData,
          });
        
          // Создаем временный элемент <a> для скачивания
          const fileName = store().data.formData.fileName;
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const newFileName = nameEditor(fileName);
          set((state) => {
            state.data.resultFileWithText = new File([blob], newFileName, { type: file.type });
            state.data.resultFileUrl = url;
          });
        },
        retrieveData: async (file: File) => {
          set((state) => {
            state.data.formData = {
              file,
              fileName: file.name,
              text: '',
            };
          });
          const formData = new FormData();
          formData.append('file', file);
          const response = await fetch('http://localhost:3000/api/reveal', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
          console.log(result);
          set((state) => {
            state.data.resultHideText = result.hiddenText;
          }); 
        },

        resetStore: () => {
          const {data} = store();
          if (data.resultFileUrl) {
            window.URL.revokeObjectURL(data.resultFileUrl);
          }
          set(() => initialState);
        },
      })),
      {
        name: 'conceal-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default store;