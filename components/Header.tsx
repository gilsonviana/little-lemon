import { View } from "react-native";
import { Text } from "@/components/Text";
import { useTheme } from "@/hooks/useTheme";
import { Avatar } from "./Avatar";

export const Header = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...theme.spacings.header.md,
        ...theme.spacings.view.flexBetween,
      }}
    >
      <Text color="accent1">Little Lemon</Text>
      <Avatar storage href="/settings" />
    </View>
  );
};
