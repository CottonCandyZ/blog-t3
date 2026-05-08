'use client'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import NavigationBar from '~/components/nav/navigation-bar'

const themeNamePattern = /^theme-(\d)(?:-dark)?$/
const themeNumbers = [1, 2, 3, 4]
const themeColorStorageKey = 'cotton-theme-color'
const themeModeStorageKey = 'cotton-theme-mode'

type ThemeModePreference = 'auto' | 'light' | 'dark'

function getDocumentTheme() {
  if (typeof document === 'undefined') return undefined

  return Array.from(document.documentElement.classList).find((className) =>
    themeNamePattern.test(className),
  )
}

function getThemeNumber(themeName: string) {
  return Number(themeNamePattern.exec(themeName)?.[1] ?? 1)
}

function subscribeTheme(onStoreChange: () => void) {
  if (typeof document === 'undefined') return () => {}

  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  return () => observer.disconnect()
}

function getThemeSnapshot() {
  return getDocumentTheme() ?? 'theme-1'
}

function prefersDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getStoredThemeColor() {
  const color = Number(localStorage.getItem(themeColorStorageKey))

  return themeNumbers.includes(color) ? color : 1
}

function getStoredThemeMode(): ThemeModePreference {
  const mode = localStorage.getItem(themeModeStorageKey)

  return mode === 'light' || mode === 'dark' || mode === 'auto' ? mode : 'auto'
}

function buildThemeName(color: number, mode: ThemeModePreference) {
  const dark = mode === 'auto' ? prefersDarkMode() : mode === 'dark'

  return `theme-${color}${dark ? '-dark' : ''}`
}

function Header() {
  const [mobileThemeOpen, setMobileThemeOpen] = useState(false)
  const [themeModePreference, setThemeModePreference] =
    useState<ThemeModePreference>('auto')
  const mobileThemeRef = useRef<HTMLDivElement>(null)
  const { setTheme } = useTheme()
  const currentTheme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => 'theme-1')
  const themeNumber = getThemeNumber(currentTheme)
  const isDark = currentTheme.endsWith('-dark')
  const pathname = usePathname()
  const applyTheme = (themeName: string) => {
    setTheme(themeName)
  }

  useEffect(() => {
    const applyStoredTheme = () => {
      const mode = getStoredThemeMode()
      setThemeModePreference(mode)
      setTheme(buildThemeName(getStoredThemeColor(), mode))
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSystemTheme = () => {
      if (getStoredThemeMode() === 'auto') applyStoredTheme()
    }

    applyStoredTheme()
    mediaQuery.addEventListener('change', syncSystemTheme)

    return () => mediaQuery.removeEventListener('change', syncSystemTheme)
  }, [setTheme])

  useEffect(() => {
    const closeThemePicker = () => {
      setMobileThemeOpen(false)
    }
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!mobileThemeRef.current?.contains(event.target as Node)) {
        setMobileThemeOpen(false)
      }
    }

    window.addEventListener('scroll', closeThemePicker, { passive: true })
    window.addEventListener('touchmove', closeThemePicker, { passive: true })
    document.addEventListener('pointerdown', closeOnOutsidePointer)

    return () => {
      window.removeEventListener('scroll', closeThemePicker)
      window.removeEventListener('touchmove', closeThemePicker)
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
    }
  }, [])
  useEffect(() => {
    setMobileThemeOpen(false)
  }, [pathname])
  const changeColorTheme = (number: number) => {
    localStorage.setItem(themeColorStorageKey, String(number))
    applyTheme(buildThemeName(number, themeModePreference))
  }
  const changeThemeMode = (mode: ThemeModePreference) => {
    localStorage.setItem(themeModeStorageKey, mode)
    setThemeModePreference(mode)
    applyTheme(buildThemeName(themeNumber, mode))
  }
  return (
    <header className="flex h-10 flex-row items-center justify-between md:h-9">
      <div className="relative flex flex-row items-center gap-4 md:gap-0">
        <div className="relative md:hidden">
          <Link
            href="/"
            className={`relative z-10 block rounded-xl px-2 py-1 text-lg font-semibold text-primary-dark
            transition hover:bg-primary-light/40 active:scale-95 active:bg-primary-light/30`}
          >
            Cotton
          </Link>
        </div>
        <div className="hidden text-base font-semibold tracking-wide text-primary-dark md:block">
          <NavigationBar />
        </div>
      </div>
      <div className="mr-8 p-1 md:mr-3 md:p-0">
        <div ref={mobileThemeRef} className="relative md:hidden">
          <button
            type="button"
            aria-label="打开主题切换"
            className="flex size-10 items-center justify-center rounded-xl active:scale-95 active:bg-primary-light/30"
            onClick={() => setMobileThemeOpen((open) => !open)}
          >
            <span
              className={clsx(
                `theme-${themeNumber}${isDark ? '-dark' : ''}`,
                'size-4 rounded-full bg-primary/60 shadow-sm',
              )}
            />
          </button>
          <MobileThemePicker
            open={mobileThemeOpen}
            themeNumber={themeNumber}
            isDark={isDark}
            modePreference={themeModePreference}
            onChangeTheme={(number) => {
              changeColorTheme(number)
              setMobileThemeOpen(false)
            }}
            onChangeMode={(mode) => {
              changeThemeMode(mode)
              setMobileThemeOpen(false)
            }}
          />
        </div>
        <DesktopThemePicker
          themeNumber={themeNumber}
          isDark={isDark}
          modePreference={themeModePreference}
          onChangeTheme={changeColorTheme}
          onChangeMode={changeThemeMode}
        />
      </div>
    </header>
  )
}

function MobileThemePicker({
  open,
  themeNumber,
  isDark,
  modePreference,
  onChangeTheme,
  onChangeMode,
}: {
  open: boolean
  themeNumber: number
  isDark: boolean
  modePreference: ThemeModePreference
  onChangeTheme: (themeNumber: number) => void
  onChangeMode: (mode: ThemeModePreference) => void
}) {
  return (
    <div
      className={clsx(
        `pointer-events-none absolute right-0 top-full z-20 mt-2 flex -translate-y-1 items-center gap-2 rounded-full
        bg-primary-bg/95 px-2.5 py-2 opacity-0 shadow-cxs ring-1 ring-primary-light/60 backdrop-blur transition duration-200`,
        {
          'pointer-events-auto translate-y-0 opacity-100': open,
        },
      )}
    >
      <ModeButton mode="light" active={modePreference === 'light'} onClick={onChangeMode} large />
      <ModeButton mode="dark" active={modePreference === 'dark'} onClick={onChangeMode} large />
      <ModeButton mode="auto" active={modePreference === 'auto'} onClick={onChangeMode} large />
      <span className="h-3.5 w-px rounded-full bg-primary-light/70" />
      {themeNumbers.map((number) => (
        <ThemeDot
          key={number}
          themeNumber={number}
          isDark={isDark}
          active={themeNumber === number}
          onClick={() => onChangeTheme(number)}
          large
        />
      ))}
    </div>
  )
}

function DesktopThemePicker({
  themeNumber,
  isDark,
  modePreference,
  onChangeTheme,
  onChangeMode,
}: {
  themeNumber: number
  isDark: boolean
  modePreference: ThemeModePreference
  onChangeTheme: (themeNumber: number) => void
  onChangeMode: (mode: ThemeModePreference) => void
}) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [openedThemeNumber, setOpenedThemeNumber] = useState(themeNumber)
  const closeTimerRef = useRef<number | undefined>(undefined)
  const availableThemeNumbers = themeNumbers.filter((number) => number !== openedThemeNumber)
  const expanded = open || closing
  const openPicker = () => {
    window.clearTimeout(closeTimerRef.current)
    setClosing(false)
    if (!open) setOpenedThemeNumber(themeNumber)
    setOpen(true)
  }
  const closePicker = () => {
    if (!open) return
    window.clearTimeout(closeTimerRef.current)
    setOpen(false)
    setClosing(true)
    closeTimerRef.current = window.setTimeout(() => {
      setClosing(false)
    }, 170)
  }

  useEffect(() => {
    if (!expanded) setOpenedThemeNumber(themeNumber)
  }, [expanded, themeNumber])

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current)
  }, [])

  return (
    <LayoutGroup id="desktop-theme-picker">
      <motion.div
        className="hidden h-8 justify-end overflow-hidden rounded-full md:flex"
        onMouseLeave={closePicker}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) closePicker()
        }}
        animate={{ width: expanded ? 204 : 28 }}
        transition={{ type: 'spring', stiffness: 520, damping: 42 }}
      >
        <div
          className="flex h-8 w-[204px] shrink-0 items-center gap-1.5 rounded-full px-2.5"
        >
          <motion.div
            className="flex items-center gap-1.5"
            initial={false}
            animate={{ opacity: open ? 1 : 0, x: open ? 0 : 8 }}
            transition={{ duration: open ? 0.14 : 0.08 }}
            style={{ pointerEvents: open ? 'auto' : 'none' }}
          >
            <ModeButton mode="light" active={modePreference === 'light'} onClick={onChangeMode} medium />
            <ModeButton mode="dark" active={modePreference === 'dark'} onClick={onChangeMode} medium />
            <ModeButton mode="auto" active={modePreference === 'auto'} onClick={onChangeMode} medium />
            <span className="h-4 w-px shrink-0 rounded-full bg-primary-light/70" />
            {availableThemeNumbers.map((number) => (
              <ThemeDot
                key={number}
                themeNumber={number}
                isDark={isDark}
                active={themeNumber === number}
                layoutId={closing && themeNumber === number ? 'desktop-active-theme-dot' : undefined}
                onClick={() => onChangeTheme(number)}
                medium
              />
            ))}
          </motion.div>
          <button
            type="button"
            aria-label={open ? `切换到颜色 ${openedThemeNumber}` : '打开主题切换'}
            className="flex size-5 shrink-0 items-center justify-center rounded-full active:scale-95"
            onMouseEnter={openPicker}
            onFocus={openPicker}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              if (open) {
                onChangeTheme(openedThemeNumber)
                return
              }
              openPicker()
            }}
          >
            <ThemeDotVisual
              themeNumber={closing || !expanded ? themeNumber : openedThemeNumber}
              isDark={isDark}
              active={open && themeNumber === openedThemeNumber}
              layoutId={closing ? 'desktop-active-theme-dot' : undefined}
              medium={open}
              className="bg-primary-small/85 shadow-sm"
            />
          </button>
        </div>
      </motion.div>
    </LayoutGroup>
  )
}

function ThemeDotVisual({
  themeNumber,
  isDark,
  active,
  layoutId,
  className,
  medium = false,
  large = false,
}: {
  themeNumber: number
  isDark: boolean
  active: boolean
  layoutId?: string
  className?: string
  medium?: boolean
  large?: boolean
}) {
  const colorClassName = className ?? 'bg-primary-small/80'
  const outerSizeClassName = large ? 'size-6' : medium ? 'size-5' : 'size-3.5'
  const innerSizeClassName = active
    ? large
      ? 'size-5'
      : medium
        ? 'size-4'
        : 'size-2.5'
    : outerSizeClassName
  const dot = (
    <span
      className={clsx(
        'flex shrink-0 items-center justify-center rounded-full',
        outerSizeClassName,
      )}
    >
      <span
        className={clsx(
          `theme-${themeNumber}${isDark ? '-dark' : ''}`,
          'block rounded-full transition-[height,width,box-shadow] duration-75 ease-out',
          colorClassName,
          innerSizeClassName,
          active
            ? isDark
              ? 'ring-2 ring-primary-medium/65'
              : 'ring-2 ring-primary-medium/70'
            : '',
        )}
      />
    </span>
  )

  if (!layoutId) return dot

  return (
    <motion.span
      layoutId={layoutId}
      transition={{ type: 'spring', stiffness: 620, damping: 44 }}
      className="block"
    >
      {dot}
    </motion.span>
  )
}

function ModeButton({
  mode,
  active,
  onClick,
  medium = false,
  large = false,
}: {
  mode: ThemeModePreference
  active: boolean
  onClick: (mode: ThemeModePreference) => void
  medium?: boolean
  large?: boolean
}) {
  const iconClassName = {
    light: 'i-mingcute-sun-line',
    dark: 'i-mingcute-moon-line',
    auto: 'i-mingcute-monitor-line',
  }[mode]
  const label = {
    light: '浅色模式',
    dark: '深色模式',
    auto: '跟随系统明暗模式',
  }[mode]

  return (
    <button
      type="button"
      aria-label={label}
      className={clsx(
        'flex items-center justify-center rounded-full transition-colors hover:bg-primary-small hover:text-white active:bg-primary-small/90',
        large ? 'size-6' : medium ? 'size-5' : 'size-4',
        active
          ? 'bg-primary-small text-white shadow-sm ring-1 ring-primary-medium/80'
          : 'bg-primary-light/80 text-primary ring-1 ring-primary-medium/30',
      )}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        onClick(mode)
      }}
    >
      <span className={clsx(iconClassName, large ? 'size-4' : medium ? 'size-3.5' : 'size-3', 'shrink-0')} />
    </button>
  )
}

function ThemeDot({
  themeNumber,
  isDark,
  active,
  onClick,
  medium = false,
  large = false,
  layoutId,
}: {
  themeNumber: number
  isDark: boolean
  active: boolean
  onClick: () => void
  medium?: boolean
  large?: boolean
  layoutId?: string
}) {
  return (
    <button
      type="button"
      aria-label={`切换到颜色 ${themeNumber}`}
      className={clsx(
        'flex items-center justify-center rounded-full transition active:scale-95',
        large ? 'size-6' : medium ? 'size-5' : 'size-3.5',
      )}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        onClick()
      }}
    >
      <ThemeDotVisual
        themeNumber={themeNumber}
        isDark={isDark}
        active={active}
        medium={medium}
        large={large}
        layoutId={layoutId}
      />
    </button>
  )
}

export default Header
