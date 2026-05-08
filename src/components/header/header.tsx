'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { animate } from 'motion'
import { motion } from 'motion/react'
import NavigationBar from '~/components/nav/navigation-bar'
import {
  applyThemeColorVariables,
  defaultThemeColorHex,
  hexToHue,
  hueToHex,
  normalizeHexColor,
  themePresetHexes,
} from '~/utils/theme-color'

const themeNamePattern = /^theme-(\d)(?:-dark)?$/
const themeNumbers = [1, 2, 3, 4]
const legacyThemeColorStorageKey = 'cotton-theme-color'
const themeColorHexStorageKey = 'cotton-theme-color-hex'
const themeModeStorageKey = 'cotton-theme-mode'

type ThemeModePreference = 'auto' | 'light' | 'dark'

function getDocumentTheme() {
  if (typeof document === 'undefined') return undefined

  return Array.from(document.documentElement.classList).find((className) =>
    themeNamePattern.test(className),
  )
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

function getStoredLegacyThemeColor() {
  const color = Number(localStorage.getItem(legacyThemeColorStorageKey))

  return themeNumbers.includes(color) ? color : 1
}

function getStoredThemeColorHex() {
  const storedHex = normalizeHexColor(localStorage.getItem(themeColorHexStorageKey))
  if (storedHex) return storedHex

  return themePresetHexes[getStoredLegacyThemeColor() - 1] ?? defaultThemeColorHex
}

function getStoredThemeMode(): ThemeModePreference {
  const mode = localStorage.getItem(themeModeStorageKey)

  return mode === 'light' || mode === 'dark' || mode === 'auto' ? mode : 'auto'
}

function resolveDarkMode(mode: ThemeModePreference) {
  return mode === 'auto' ? prefersDarkMode() : mode === 'dark'
}

function buildThemeName(mode: ThemeModePreference) {
  const dark = resolveDarkMode(mode)

  return `theme-1${dark ? '-dark' : ''}`
}

function setDocumentTheme(themeName: string) {
  document.documentElement.classList.remove(
    'theme-1',
    'theme-1-dark',
    'theme-2',
    'theme-2-dark',
    'theme-3',
    'theme-3-dark',
    'theme-4',
    'theme-4-dark',
  )
  document.documentElement.classList.add(themeName)
}

function storeThemeColor(hex: string) {
  localStorage.setItem(themeColorHexStorageKey, hex)
  localStorage.removeItem(legacyThemeColorStorageKey)
}

function storeThemeMode(mode: ThemeModePreference) {
  localStorage.setItem(themeModeStorageKey, mode)
}

function applyThemeColor(hex: string, mode: ThemeModePreference) {
  const dark = mode === 'auto' ? prefersDarkMode() : mode === 'dark'

  applyThemeColorVariables(hex, dark)
}

function Header() {
  const [mobileThemeOpen, setMobileThemeOpen] = useState(false)
  const [themeModePreference, setThemeModePreference] =
    useState<ThemeModePreference>('auto')
  const [themeColorHex, setThemeColorHex] = useState<string>(defaultThemeColorHex)
  const themeColorHexRef = useRef<string>(defaultThemeColorHex)
  const mobileThemeRef = useRef<HTMLDivElement>(null)
  const currentTheme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => 'theme-1')
  const isDark = currentTheme.endsWith('-dark')
  const pathname = usePathname()
  const applyTheme = (themeName: string) => {
    setDocumentTheme(themeName)
  }

  useEffect(() => {
    const applyStoredTheme = () => {
      const mode = getStoredThemeMode()
      const colorHex = getStoredThemeColorHex()
      setThemeModePreference(mode)
      themeColorHexRef.current = colorHex
      setThemeColorHex(colorHex)
      setDocumentTheme(buildThemeName(mode))
      applyThemeColor(colorHex, mode)
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSystemTheme = () => {
      if (getStoredThemeMode() === 'auto') applyStoredTheme()
    }

    applyStoredTheme()
    mediaQuery.addEventListener('change', syncSystemTheme)

    return () => mediaQuery.removeEventListener('change', syncSystemTheme)
  }, [])

  useEffect(() => {
    const closeThemePicker = () => {
      setMobileThemeOpen(false)
    }

    window.addEventListener('scroll', closeThemePicker, { passive: true })

    return () => {
      window.removeEventListener('scroll', closeThemePicker)
    }
  }, [])
  useEffect(() => {
    setMobileThemeOpen(false)
  }, [pathname])
  const changeColorHex = (colorHex: string) => {
    storeThemeColor(colorHex)
    themeColorHexRef.current = colorHex
    setThemeColorHex(colorHex)
    applyThemeColor(colorHex, themeModePreference)
    applyTheme(buildThemeName(themeModePreference))
  }
  const previewColorHex = (colorHex: string) => {
    themeColorHexRef.current = colorHex
    applyThemeColor(colorHex, themeModePreference)
  }
  const commitColorHex = () => {
    const colorHex = themeColorHexRef.current
    storeThemeColor(colorHex)
    setThemeColorHex(colorHex)
    applyThemeColor(colorHex, themeModePreference)
    const themeName = buildThemeName(themeModePreference)
    if (themeName !== currentTheme) applyTheme(themeName)
  }
  const changeThemeMode = (mode: ThemeModePreference) => {
    storeThemeMode(mode)
    setThemeModePreference(mode)
    applyThemeColor(themeColorHex, mode)
    applyTheme(buildThemeName(mode))
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
              className="size-4 rounded-full bg-primary/70 shadow-sm"
            />
          </button>
          <MobileThemePicker
            open={mobileThemeOpen}
            themeColorHex={themeColorHex}
            isDark={isDark}
            modePreference={themeModePreference}
            onPreviewTheme={previewColorHex}
            onCommitTheme={commitColorHex}
            onChangeTheme={(colorHex) => {
              changeColorHex(colorHex)
            }}
            onChangeMode={(mode) => {
              changeThemeMode(mode)
            }}
            onClose={() => setMobileThemeOpen(false)}
          />
        </div>
        <DesktopThemePicker
          themeColorHex={themeColorHex}
          modePreference={themeModePreference}
          onPreviewColorHex={previewColorHex}
          onCommitColorHex={commitColorHex}
          onChangeMode={changeThemeMode}
        />
      </div>
    </header>
  )
}

function MobileThemePicker({
  open,
  themeColorHex,
  isDark,
  modePreference,
  onChangeTheme,
  onPreviewTheme,
  onCommitTheme,
  onChangeMode,
  onClose,
}: {
  open: boolean
  themeColorHex: string
  isDark: boolean
  modePreference: ThemeModePreference
  onChangeTheme: (colorHex: string) => void
  onPreviewTheme: (colorHex: string) => void
  onCommitTheme: () => void
  onChangeMode: (mode: ThemeModePreference) => void
  onClose: () => void
}) {
  return (
    <div
      aria-hidden={!open}
      inert={!open}
      className={clsx(
        'pointer-events-none fixed inset-0 z-20 md:hidden',
        open && 'pointer-events-auto',
      )}
    >
      <button
        type="button"
        aria-label="关闭主题切换"
        className="absolute inset-0 z-0 size-full touch-none cursor-default bg-transparent [-webkit-tap-highlight-color:transparent]"
        onPointerDown={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onClose()
        }}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
        onTouchMove={(event) => {
          event.preventDefault()
        }}
      />
      <div
        className={clsx(
          `absolute right-6 top-14 z-10 flex w-[min(19rem,calc(100vw-2rem))] -translate-y-1 flex-col gap-3 rounded-2xl
          bg-primary-bg/95 px-3 py-3 opacity-0 shadow-cxs ring-1 ring-primary-light/60 backdrop-blur transition duration-200`,
          open && 'translate-y-0 opacity-100',
        )}
        onPointerDown={(event) => {
          event.stopPropagation()
        }}
      >
        <div className="flex items-center gap-2">
          <ModeButton mode="light" active={modePreference === 'light'} onClick={onChangeMode} large />
          <ModeButton mode="dark" active={modePreference === 'dark'} onClick={onChangeMode} large />
          <ModeButton mode="auto" active={modePreference === 'auto'} onClick={onChangeMode} large />
          <span className="h-3.5 w-px rounded-full bg-primary-light/70" />
          {themeNumbers.map((number) => {
            const colorHex = themePresetHexes[number - 1] ?? defaultThemeColorHex

            return (
              <ThemeDot
                key={colorHex}
                themeNumber={number}
                colorHex={colorHex}
                isDark={isDark}
                active={themeColorHex === colorHex}
                onClick={() => onChangeTheme(colorHex)}
                large
              />
            )
          })}
        </div>
        <ColorHueSlider
          colorHex={themeColorHex}
          open={open}
          className="h-7 w-full"
          trackClassName="h-2"
          thumbClassName="size-5"
          thumbSize={20}
          syncOnColorChange
          onChange={onPreviewTheme}
          onDraggingChange={() => {}}
          onFinishDragging={onCommitTheme}
        />
      </div>
    </div>
  )
}

function DesktopThemePicker({
  themeColorHex,
  modePreference,
  onPreviewColorHex,
  onCommitColorHex,
  onChangeMode,
}: {
  themeColorHex: string
  modePreference: ThemeModePreference
  onPreviewColorHex: (colorHex: string) => void
  onCommitColorHex: () => void
  onChangeMode: (mode: ThemeModePreference) => void
}) {
  const [open, setOpen] = useState(false)
  const draggingRef = useRef(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const commitTimerRef = useRef<number | undefined>(undefined)
  const commitAfterClose = () => {
    window.clearTimeout(commitTimerRef.current)
    commitTimerRef.current = window.setTimeout(() => {
      onCommitColorHex()
    }, 180)
  }
  const setDraggingState = (isDragging: boolean) => {
    draggingRef.current = isDragging
  }
  const openPicker = () => {
    window.clearTimeout(commitTimerRef.current)
    setOpen(true)
  }
  const closePicker = () => {
    if (draggingRef.current) return
    setOpen(false)
    commitAfterClose()
  }
  const finishDragging = (clientX: number, clientY: number) => {
    setDraggingState(false)
    const rect = pickerRef.current?.getBoundingClientRect()
    const pointerInside =
      rect &&
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom

    if (!pointerInside) closePicker()
  }
  useEffect(() => {
    return () => window.clearTimeout(commitTimerRef.current)
  }, [])

  return (
    <motion.div
      ref={pickerRef}
      className="relative hidden h-8 justify-end rounded-full md:flex"
      onMouseEnter={openPicker}
      onPointerEnter={openPicker}
      onMouseLeave={closePicker}
      onFocus={openPicker}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closePicker()
      }}
      animate={{ width: open ? 220 : 28 }}
      transition={{ type: 'spring', stiffness: 520, damping: 42 }}
    >
      <div
        className={clsx(
          'absolute right-0 top-0 flex h-8 w-[220px] items-center gap-1.5 rounded-full py-0 pl-2.5 pr-1.5',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
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
        </motion.div>
        <ColorHueSlider
          colorHex={themeColorHex}
          open={open}
          onChange={onPreviewColorHex}
          onDraggingChange={setDraggingState}
          onFinishDragging={finishDragging}
        />
      </div>
    </motion.div>
  )
}

function ColorHueSlider({
  colorHex,
  open,
  className,
  trackClassName,
  thumbClassName,
  thumbSize = 16,
  syncOnColorChange = false,
  onChange,
  onDraggingChange,
  onFinishDragging,
}: {
  colorHex: string
  open: boolean
  className?: string
  trackClassName?: string
  thumbClassName?: string
  thumbSize?: number
  syncOnColorChange?: boolean
  onChange: (colorHex: string) => void
  onDraggingChange: (dragging: boolean) => void
  onFinishDragging: (clientX: number, clientY: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const trackLineRef = useRef<HTMLSpanElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const thumbAnimationFrameRef = useRef<number | undefined>(undefined)
  const thumbVelocityRef = useRef(0)
  const trackAnimationRef = useRef<ReturnType<typeof animate> | undefined>(undefined)
  const draggingPointerIdRef = useRef<number | undefined>(undefined)
  const hue = hexToHue(colorHex)
  const hueRef = useRef(hue)
  const openRef = useRef(open)
  const colorHexRef = useRef(colorHex)
  const fallbackTrackWidth = 112
  const thumbXRef = useRef(fallbackTrackWidth - thumbSize)
  const getMaxX = useCallback(() => {
    const width = trackRef.current?.getBoundingClientRect().width ?? 112

    return Math.max(0, width - thumbSize)
  }, [thumbSize])
  const getThumbX = useCallback((nextHue: number) => (nextHue / 359) * getMaxX(), [getMaxX])
  const setThumbX = useCallback((x: number) => {
    const thumb = thumbRef.current
    thumbXRef.current = x
    if (!thumb) return

    thumb.style.transform = `translate3d(${x}px, 0, 0)`
  }, [])
  const stopThumbAnimation = useCallback(() => {
    if (thumbAnimationFrameRef.current === undefined) return

    window.cancelAnimationFrame(thumbAnimationFrameRef.current)
    thumbAnimationFrameRef.current = undefined
  }, [])
  const stopAnimations = useCallback(() => {
    stopThumbAnimation()
    trackAnimationRef.current?.stop()
  }, [stopThumbAnimation])
  const animateThumbTo = useCallback(
    (targetX: number, onComplete?: () => void) => {
      stopThumbAnimation()

      thumbVelocityRef.current = 0
      let lastTime = performance.now()
      const tick = (time: number) => {
        const dt = Math.min(0.032, (time - lastTime) / 1000)
        lastTime = time

        const distance = targetX - thumbXRef.current
        const acceleration = distance * 980 - thumbVelocityRef.current * 58
        const velocity = thumbVelocityRef.current + acceleration * dt
        const nextX = thumbXRef.current + velocity * dt

        thumbVelocityRef.current = velocity
        setThumbX(nextX)

        if (Math.abs(distance) > 0.12 || Math.abs(velocity) > 0.12) {
          thumbAnimationFrameRef.current = window.requestAnimationFrame(tick)
          return
        }

        thumbAnimationFrameRef.current = undefined
        setThumbX(targetX)
        onComplete?.()
      }

      thumbAnimationFrameRef.current = window.requestAnimationFrame(tick)
    },
    [setThumbX, stopThumbAnimation],
  )
  const updateHue = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return

    const progress = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const nextHue = Math.round(progress * 359)
    const nextHex = hueToHex(nextHue)
    hueRef.current = nextHue
    setThumbX(progress * getMaxX())
    onChange(nextHex)
  }

  useEffect(() => {
    if (colorHexRef.current === colorHex) return

    colorHexRef.current = colorHex
    hueRef.current = hue
    if (syncOnColorChange && openRef.current && draggingPointerIdRef.current === undefined) {
      animateThumbTo(getThumbX(hue))
    }
  }, [animateThumbTo, colorHex, getThumbX, hue, syncOnColorChange])

  useEffect(() => {
    return stopAnimations
  }, [stopAnimations])

  useEffect(() => {
    openRef.current = open
    stopAnimations()

    const thumb = thumbRef.current
    const trackLine = trackLineRef.current
    if (!thumb || !trackLine) return

    if (draggingPointerIdRef.current !== undefined) return

    if (open) {
      trackAnimationRef.current = animate(trackLine, { opacity: 1 }, { duration: 0.12 })
      animateThumbTo(getThumbX(hueRef.current))
      return
    }

    trackAnimationRef.current = animate(trackLine, { opacity: 0 }, { duration: 0.08 })
    animateThumbTo(getMaxX(), () => {
      if (!openRef.current) {
        setThumbX(getMaxX())
      }
    })
  }, [animateThumbTo, getMaxX, getThumbX, open, setThumbX, stopAnimations])

  return (
    <div
      ref={trackRef}
      aria-label="调整主题颜色"
      aria-valuemax={359}
      aria-valuemin={0}
      aria-valuenow={hue}
      className={clsx('relative ml-auto h-5 w-28 shrink-0 cursor-pointer touch-none', className)}
      role="slider"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          event.preventDefault()
          onChange(hueToHex((hue + 359 - 6) % 360))
        }
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          event.preventDefault()
          onChange(hueToHex((hue + 6) % 360))
        }
      }}
      onPointerDown={(event) => {
        if (!open) return
        event.preventDefault()
        stopAnimations()
        draggingPointerIdRef.current = event.pointerId
        onDraggingChange(true)
        event.currentTarget.setPointerCapture(event.pointerId)
        updateHue(event.clientX)
      }}
      onPointerMove={(event) => {
        if (!open) return
        if (draggingPointerIdRef.current !== event.pointerId) return
        updateHue(event.clientX)
      }}
      onPointerUp={(event) => {
        if (draggingPointerIdRef.current !== event.pointerId) return
        draggingPointerIdRef.current = undefined
        event.currentTarget.releasePointerCapture(event.pointerId)
        onChange(hueToHex(hueRef.current))
        onFinishDragging(event.clientX, event.clientY)
      }}
      onPointerCancel={(event) => {
        if (draggingPointerIdRef.current !== event.pointerId) return
        draggingPointerIdRef.current = undefined
        onChange(hueToHex(hueRef.current))
        onFinishDragging(event.clientX, event.clientY)
      }}
    >
      <span
        ref={trackLineRef}
        className={clsx(
          'absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#c94a5a,#b9792e,#8f9436,#3d9670,#378ea5,#6470bd,#b85aa8,#c94a5a)] opacity-0 shadow-inner',
          trackClassName,
        )}
      />
      <span
        ref={thumbRef}
        className={clsx(
          'pointer-events-none absolute left-0 size-4 rounded-full bg-primary-small shadow-sm ring-2 ring-primary-bg',
          thumbClassName,
        )}
        style={{
          top: `calc(50% - ${thumbSize / 2}px)`,
          transform: `translate3d(${fallbackTrackWidth - thumbSize}px, 0, 0)`,
        }}
      />
    </div>
  )
}

function ThemeDotVisual({
  themeNumber,
  colorHex,
  isDark,
  active,
  layoutId,
  className,
  medium = false,
  large = false,
}: {
  themeNumber: number
  colorHex?: string
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
        style={colorHex ? { backgroundColor: colorHex } : undefined}
        className={clsx(
          !colorHex && `theme-${themeNumber}${isDark ? '-dark' : ''}`,
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
        large ? 'size-6' : medium ? 'size-[22px]' : 'size-4',
        active
          ? 'bg-primary-small text-white shadow-sm ring-1 ring-primary-medium/80'
          : 'bg-primary-light/80 text-primary ring-1 ring-primary-medium/30',
      )}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        onClick(mode)
      }}
    >
      <span className={clsx(iconClassName, large ? 'size-4' : medium ? 'size-4' : 'size-3', 'shrink-0')} />
    </button>
  )
}

function ThemeDot({
  themeNumber,
  colorHex,
  isDark,
  active,
  onClick,
  medium = false,
  large = false,
  layoutId,
}: {
  themeNumber: number
  colorHex?: string
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
      aria-label={`切换到颜色 ${colorHex ?? themeNumber}`}
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
        colorHex={colorHex}
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
