import { ThemeType, useTheme } from '@/hooks/useTheme'
import { ComponentProps } from 'react'
import { Text } from '@/components/Text'
import {
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native'

interface IInput extends ComponentProps<typeof TextInput> {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

export const Input = ({
  label,
  labelStyle,
  containerStyle,
  ...props
}: IInput) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, theme.fonts.label, labelStyle]}>{label}</Text>
      <TextInput {...props} style={styles.input} />
    </View>
  )
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
    },
    label: {
      textAlign: 'center',
      marginBottom: 8,
    },
    input: {
      borderWidth: 0.5,
      borderColor: theme.colors.neutral50,
      borderRadius: 8,
      width: '100%',
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
      color: theme.colors.neutral100,
    },
  })
