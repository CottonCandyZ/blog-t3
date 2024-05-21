'use client'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'
import {
  CottonCandy,
} from '~/components/icons'
import NavigationBar from '~/components/nav/navigation-bar'
import { ThemeContext } from '~/components/theme-wrapper'

function Header() {
  const [toggle, setToggle] = useState(false)
  const { themeNumber, setThemeNumber }
    = useContext(ThemeContext)
  const switchRef = useRef<HTMLDivElement>(null)
  const availableThemeNumber = [1, 2, 3, 4].filter(i => i !== themeNumber)
  const pathname = usePathname()
  const saveTheme = (number: number) => {
    setThemeNumber(availableThemeNumber[number]!)
    document.cookie = `theme=${availableThemeNumber[number]!}; max-age=34560000`
  }
  useEffect(() => {
    const tog = () => {
      setToggle(false)
    }
    window.addEventListener('scroll', tog)
    return () => {
      window.removeEventListener('scroll', tog)
    }
  }, [])
  useEffect(() => {
    setToggle(false)
  }, [pathname])
  return (
    <header className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-7">
        <div
          className="flex cursor-pointer flex-row items-center gap-1 rounded-xl p-2 hover:bg-primary-light/30
          active:scale-95 active:bg-primary-light/20"
          ref={switchRef}
          onClick={() => {
            setToggle(toggle => !toggle)
          }}
        >
          <span className="text-xl font-semibold text-primary-dark">
            Cotton
          </span>
          <span className="relative flex items-center justify-center">
            <CottonCandy
              className={clsx(
                `theme-${availableThemeNumber[0]} absolute
          size-10 transition-all duration-200`,
                {
                  '-translate-x-[100%] translate-y-[130%]': toggle,
                },
              )}
              onClick={() => {
                saveTheme(0)
              }}
            />
            <CottonCandy
              className={clsx(
                `theme-${availableThemeNumber[1]} absolute 
          size-10 transition-all duration-400`,
                {
                  'translate-y-[130%]': toggle,
                },
              )}
              onClick={() => {
                saveTheme(1)
              }}
            />
            <CottonCandy
              className={clsx(
                `theme-${availableThemeNumber[2]} absolute  
          size-10 transition-all duration-600`,
                {
                  'translate-x-[100%] translate-y-[130%]': toggle,
                },
              )}
              onClick={() => {
                saveTheme(2)
              }}
            />
            <CottonCandy className="animate-move-show z-10 size-10" />
          </span>

          <span className="text-xl font-semibold text-primary-dark">Candy</span>
        </div>
        <div className="hidden text-lg font-semibold tracking-wider text-primary-dark md:block">
          <NavigationBar />
        </div>
      </div>
      {/* <div className="p-2 mr-10 md:mr-0">
        <button
          className="flex size-10 items-center justify-center rounded-xl text-primary hover:bg-primary-light/30
        active:scale-95 active:bg-primary-light/20"
          onClick={() => setDarkMode((darkMode) => !darkMode)}
        >
          {darkMode ? (
            <IcOutlineDarkMode className="size-6" />
          ) : (
            <IcOutlineLightMode className="size-6" />
          )}
        </button>
      </div> */}
    </header>
  )
}

export default Header
