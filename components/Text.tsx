import { ThemePalette } from '@/constants/Colors'
import { ThemeFonts } from '@/constants/Fonts'
import { useTheme } from '@/hooks/useTheme'
import { Text as TextComponent, TextProps } from 'react-native'

interface IText extends TextProps {
  variant?: keyof ThemeFonts
  color?: keyof ThemePalette
}

export const Text = ({
  variant = 'body',
  color: colorP = 'neutral100',
  style,
  ...props
}: IText) => {
  const theme = useTheme()
  const color = theme.colors[colorP]
  return (
    <TextComponent
      style={[{ color, ...theme.fonts[variant] }, style]}
      {...props}
    />
  )
}
