/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

type ColorKeys = 'accent1' | 'accent2' | 'inactiveBackground' | 'text' | 'background' | 'tint' | 'icon' | 'tabIconDefault' | 'tabIconSelected'

type Colors = {
  light: {
    [key in ColorKeys]: string
  }
  dark: {
    [key in ColorKeys]: string
  }
}

export type ThemeColors = {
  [key in ColorKeys]: string
}

export const Colors: Colors = {
  light: {
    accent1: '#495E57',
    accent2: '#F4CE14',
    inactiveBackground: '#EDEFEE',
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    accent1: '#495E57',
    accent2: '#F4CE14',
    inactiveBackground: '#EDEFEE',
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
