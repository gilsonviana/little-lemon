import { ThemeType, useTheme } from "@/hooks/useTheme";
import { ComponentProps } from 'react'
import { Text } from "@/components/Text";
import { Pressable, View, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native'

interface IButton extends ComponentProps<typeof Pressable> {
  text?: string
  textStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

export const Button = ({ text, textStyle, containerStyle, ...props }: IButton) => {
  const theme = useTheme();
  const styles = getStyles(theme)

  return (
    <Pressable {...props}>
      <View style={[styles.container, {...theme.spacings.button.md}, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.inactiveBackground,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: theme.colors.accent1,
    ...theme.fonts.button
  }
})
