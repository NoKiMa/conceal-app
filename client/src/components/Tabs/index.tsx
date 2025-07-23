import store from "@/store/store";
type TabsProps = {
  tabChange: (tab: string) => void;
}

const Tabs = ({ tabChange }: TabsProps) => {
  const {data} = store();
  console.log('activeTab', data.activeTab); 
  return (
    <div className="mb-6">
          <div className="border-b border-gray-200 rounded">
            <nav
              className="-mb-px flex space-x-8 justify-center"
              aria-label="Tabs">
              <button
                onClick={() => tabChange('hide')}
                className={`
                  whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t
                  ${
                    data.activeTab === 'hide'
                      ? 'border-amber-300 text-amber-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}>
                Hide Text in File
              </button>
              <button
                onClick={() => tabChange('retrieve')}
                className={`
                  whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm rounded-t
                  ${
                    data.activeTab === 'retrieve'
                      ? 'border-amber-300 text-amber-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}>
                Get Text from File
              </button>
            </nav>
          </div>
        </div>)
}
 
export default Tabs
