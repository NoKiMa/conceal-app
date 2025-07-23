type SubmitButtonProps = {
  activeTab: string;
}
const SubmitButton = ({activeTab}: SubmitButtonProps) => {
  return (
    <button
    type="submit"
    className="w-full bg-amber-300 text-white py-2 px-4 rounded-md hover:bg-amber-400 transition-colors">
    {activeTab === 'hide' ? 'Hide Text' : 'Retrieve Text'}
  </button>
    )
}

export default SubmitButton