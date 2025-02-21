
import { ThemeColors } from '@/constants/Colors'
import { useTheme } from '@/hooks/useTheme'
import { ComponentProps } from 'react'
import { Pressable, View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native'

interface IButton extends ComponentProps<typeof Pressable> {
  text?: string
  textStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

export const Button = ({ text, textStyle, containerStyle, ...props }: IButton) => {
  const colors = useTheme()
  const styles = getStyles(colors)

  return (
    <Pressable {...props}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  )
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    backgroundColor: colors.accent1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.inactiveBackground
  }
})
