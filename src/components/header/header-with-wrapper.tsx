import Header from '~/components/header/header'

function HeaderWithWrapper() {
  return (
    <div className="sticky top-0 z-10 mx-auto max-w-7xl px-2 md:px-10 ">
      <div className="rounded-b-2xl bg-primary-bg/95 p-4 shadow-cxs">
        <Header />
      </div>
    </div>
  )
}

export default HeaderWithWrapper
