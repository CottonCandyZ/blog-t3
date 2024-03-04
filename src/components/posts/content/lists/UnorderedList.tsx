import clsx from "clsx";
import ListProvider from "~/components/posts/content/lists/ListProvider";

const UnorderedList: React.FC<JSX.IntrinsicElements["ul"]> = (props) => {
  const { className = "", ...rest} = props;
  const isTaskList = className.includes("contains-task-list");

  return (
    <ListProvider type={isTaskList ? "tl" : "ul"}>
      {/* children is in the ...rest as props, the following code will be compiled into React.createElement(...).
      So we don't need to write '<ul>{children}</ul>'*/}
      <ul className={clsx(className, "mdx-ul")} {...rest} />
    </ListProvider>
  ); 
};


export default UnorderedList;