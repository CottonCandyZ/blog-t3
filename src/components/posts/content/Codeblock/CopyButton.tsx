import clsx from "clsx";
import { CopyFinishIcon, CopyIcon } from "~/components/icons";

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copied, onCopy }) => {
  return (
    <div
      className={clsx(
        `relative font-sans before:absolute before:-left-[4.1rem] before:top-0
    before:h-full before:rounded-md before:bg-black before:px-2 before:py-1 before:text-xs
     before:leading-5 before:text-white before:transition-opacity before:duration-400
     before:ease-in before:content-['Copied!'] after:absolute after:-left-2 after:top-[0.65rem] 
     after:border-b-4 after:border-l-[6px] after:border-t-4
    after:border-b-transparent after:border-l-black after:border-t-transparent after:transition-opacity after:duration-400 after:ease-in`,
        {
          [`before:invisible before:opacity-0 after:invisible after:opacity-0 `]:
            !copied,
        },
      )}
    >
      <button
        onClick={onCopy}
        className="relative h-7 w-7 rounded-md hover:bg-slate-200"
      >
        {copied ? (
          <CopyFinishIcon className="m-auto h-4 w-4 " />
        ) : (
          <CopyIcon className="m-auto h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default CopyButton;
