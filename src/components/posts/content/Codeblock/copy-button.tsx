import clsx from 'clsx'

interface CopyButtonProps {
  copied: boolean
  onCopy: () => void
}

const CopyButton: React.FC<CopyButtonProps> = ({ copied, onCopy }) => {
  return (
    <div
      className={clsx(
        `fter:border-l-black relative font-sans before:absolute before:left-[-4.1rem]
        before:top-0 before:h-full before:rounded-md before:bg-black before:px-2 before:py-1
        before:text-xs before:leading-6 before:text-white before:transition-opacity
        before:duration-400 before:ease-in before:content-['Copied!'] after:absolute after:-left-2 
        after:top-3 after:border-y-4 after:border-l-[6px] after:border-black
        after:border-y-transparent after:transition-opacity after:duration-400 after:ease-in`,
        {
          [`before:invisible before:opacity-0 after:invisible after:opacity-0 `]: !copied,
        },
      )}
    >
      <button
        onClick={onCopy}
        className="relative size-8 rounded-md hover:border-2 hover:border-primary-small flex"
        type="button"
      >
        {copied ? (
          <span className="m-auto size-5 i-mingcute-check-line text-primary" />
        ) : (
          <span className="i-mingcute-copy-2-line text-primary m-auto size-5" />
        )}
      </button>
    </div>
  )
}

export default CopyButton
