import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors, ThemePalette } from '@/constants/Colors'
import { Fonts, ThemeFonts } from '@/constants/Fonts'
import { Spacings, ThemeSpacing } from '@/constants/Spacing'

export interface ThemeType {
  colors: ThemePalette
  fonts: ThemeFonts
  spacings: ThemeSpacing
}

const ThemeContext = createContext<ThemeType | null>(null)

export function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  const colorScheme = useColorScheme()
  const colors = useMemo(() => Colors[colorScheme ?? 'light'], [colorScheme])
  const fonts = useMemo(() => Fonts, [])
  const spacings = useMemo(() => Spacings, [])

  return (
    <ThemeContext.Provider value={{ colors, fonts, spacings }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme
}
