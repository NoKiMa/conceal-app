type LoaderProps = {
  resultFileUrl: string;
}
const Loader = ({resultFileUrl}: LoaderProps) => {
  return (
    <div className="mt-4">
              <a
                href={resultFileUrl}
                download="file_with_hidden_text"
                className="bg-amber-300 text-white px-4 py-2 rounded hover:bg-amber-400">
                Download File with Hidden Text
              </a>
            </div>
  )
}

export default Loader
