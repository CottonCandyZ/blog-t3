import { ThemeProvider } from 'next-themes'
import { type PropsWithChildren } from 'react'
const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <body>
      <ThemeProvider
        defaultTheme="theme-1"
        attribute="class"
        enableSystem={false}
        themes={[1, 2, 3, 4].map((i) => `theme-${i}`)}
      >
        <div className='bg-primary-extralight'>{children}</div>
      </ThemeProvider>
    </body>
  )
}

export default ThemeWrapper
