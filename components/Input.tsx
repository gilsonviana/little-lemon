import { ComponentProps } from "react"
import { TextInput, View, Text, StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native"

interface IInput extends ComponentProps<typeof TextInput> {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

export const Input = ({ label, labelStyle, containerStyle, ...props }: IInput) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput {...props} style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    textAlign: 'center',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16
  }
})
