'use client'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CottonCandy } from '~/components/icons'
import NavigationBar from '~/components/nav/navigation-bar'

function Header() {
  const [toggle, setToggle] = useState(false)
  const { theme, setTheme } = useTheme()
  const themeNumber = Number(theme?.replace('theme-', '') ?? 1)
  const availableThemeNumber = [1, 2, 3, 4].filter((i) => i !== themeNumber)
  const pathname = usePathname()
  const saveTheme = (number: number) => setTheme(`theme-${availableThemeNumber[number]!}`)
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
  const changeTheme = (num: number) => {
    saveTheme(num)
    setToggle((toggle) => !toggle)
  }
  return (
    <header className="flex flex-row items-center justify-between">
      <div className="relative flex flex-row items-center gap-7">
        <button
          className={`relative z-10 flex cursor-pointer flex-row items-center gap-1 rounded-xl p-2 hover:bg-primary-light/30
          active:scale-95 active:bg-primary-light/20`}
          type="button"
          onClick={() => {
            setToggle((toggle) => !toggle)
          }}
        >
          <span className="text-xl font-semibold text-primary-dark">Cotton</span>
          <CottonCandy className="animate-move-show size-10" />
          <span className="text-xl font-semibold text-primary-dark">Candy</span>
        </button>
        <div className="absolute flex flex-row items-center gap-1 p-2">
          <span className="invisible text-xl font-semibold text-primary-dark">Cotton</span>
          <span className="relative size-10">
            <CottonCandy
              suppressHydrationWarning
              className={clsx(
                `theme-${availableThemeNumber[0]} animate-hide absolute
          size-10 cursor-pointer opacity-0 transition-all duration-200 active:scale-95`,
                {
                  '-translate-x-[100%] translate-y-[130%] opacity-100': toggle,
                },
              )}
              onClick={() => {
                changeTheme(0)
              }}
            />
            <CottonCandy
              suppressHydrationWarning
              className={clsx(
                `theme-${availableThemeNumber[1]} animate-hide absolute
          size-10 cursor-pointer opacity-0 transition-all duration-400 active:scale-95`,
                {
                  'translate-y-[130%] opacity-100': toggle,
                },
              )}
              onClick={() => {
                changeTheme(1)
              }}
            />
            <CottonCandy
              suppressHydrationWarning
              className={clsx(
                `theme-${availableThemeNumber[2]} animate-hide absolute
          size-10 cursor-pointer opacity-0 transition-all duration-600 active:scale-95`,
                {
                  'translate-x-[100%] translate-y-[130%] opacity-100': toggle,
                },
              )}
              onClick={() => {
                changeTheme(2)
              }}
            />
          </span>
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
