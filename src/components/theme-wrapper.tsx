import { type PropsWithChildren } from 'react'
import ScrollToTopButton from '~/components/scroll-to-top-button'

const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <body>
      <div className="min-h-dvh bg-primary-extralight text-primary-dark transition-colors duration-300">
        {children}
        <ScrollToTopButton />
      </div>
    </body>
  )
}

export default ThemeWrapper
