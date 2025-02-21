type ThemeSchemas = 'light' | 'dark'
type ColorKeys = 'accent1' | 'accent2' | 'neutral0' | 'neutral50' | 'neutral100' | 'inactiveBackground' | 'background'

export type ThemePalette = {
  [key in ColorKeys]: string
}

export type ThemePalettes = Record<ThemeSchemas, ThemePalette>

export const Colors: ThemePalettes = {
  light: {
    accent1: '#495E57',
    accent2: '#F4CE14',
    neutral0: '#FFFFFF',
    neutral50: '#666666',
    neutral100: '#000000',
    inactiveBackground: '#EDEFEE',
    background: '#fff',
  },
  dark: {
    accent1: '#495E57',
    accent2: '#F4CE14',
    neutral0: '#000000',
    neutral50: '#666666',
    neutral100: '#FFFFFF',
    inactiveBackground: '#EDEFEE',
    background: '#151718',
  },
};
