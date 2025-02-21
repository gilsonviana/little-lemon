import { Text as TextComponent, TextProps } from "react-native"

type IText = TextProps

export const Text = (props: IText) => {
    return <TextComponent {...props} />
}