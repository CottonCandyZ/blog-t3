import { ThemeProvider } from 'next-themes'
import { type PropsWithChildren } from 'react'
import ScrollToTopButton from '~/components/scroll-to-top-button'

const colorThemes = [1, 2, 3, 4].flatMap((i) => [`theme-${i}`, `theme-${i}-dark`])

const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <body>
      <ThemeProvider
        defaultTheme="theme-1"
        attribute="class"
        enableSystem={false}
        themes={colorThemes}
      >
        <div className="min-h-dvh bg-primary-extralight text-primary-dark transition-colors duration-300">
          {children}
          <ScrollToTopButton />
        </div>
      </ThemeProvider>
    </body>
  )
}

export default ThemeWrapper
