import Header from "~/components/header";

const HeaderWithWrapper = () => {
  return (
    <>
      <div className="sticky top-0 z-[5] mx-auto max-w-6xl px-2 md:px-10 ">
        <div className="rounded-b-2xl bg-white p-4 shadow-cxs">
          <Header />
        </div>
      </div>
    </>
  );
};

export default HeaderWithWrapper;
