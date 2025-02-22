import { ThemeType, useTheme } from '@/hooks/useTheme'
import { ComponentProps } from 'react'
import { Text } from '@/components/Text'
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

interface IButton extends ComponentProps<typeof Pressable> {
  text?: string
  textStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  selected?: boolean
}

export const Button = ({
  text,
  textStyle,
  containerStyle,
  selected,
  disabled,
  ...props
}: IButton) => {
  const theme = useTheme()
  const styles = getStyles(theme, selected, disabled ?? false)

  return (
    <Pressable {...props} disabled={disabled}>
      <View
        style={[
          styles.container,
          { ...theme.spacings.button.md },
          containerStyle,
        ]}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  )
}

const getStyles = (theme: ThemeType, selected = false, disabled = false) =>
  StyleSheet.create({
    container: {
      borderWidth: 0.5,
      borderColor: disabled ? theme.colors.neutral50 : theme.colors.accent1,
      backgroundColor: selected
        ? theme.colors.accent1
        : theme.colors.inactiveBackground,
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      color: disabled
        ? theme.colors.neutral50
        : selected
          ? theme.colors.neutral0
          : theme.colors.neutral100,
      ...theme.fonts.button,
    },
  })
