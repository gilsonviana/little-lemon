import { Pressable, PressableProps, View, Image } from "react-native";
import { Text } from "@/components/Text";
import { useTheme } from "@/hooks/useTheme";

export type MenuItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

interface IMenuItems extends PressableProps {
  item: MenuItemType;
}

export const MenuItem = ({ item, ...props }: IMenuItems) => {
  const theme = useTheme();

  return (
    <Pressable {...props}>
      <View
        style={{
          ...theme.spacings.view.borderBottom,
          borderColor: theme.colors.inactiveBackground,
          ...theme.spacings["list-card"].md,
        }}
      >
        <Text variant="card-title">{item.name}</Text>
        <View style={{ ...theme.spacings.view.flexHorizontal }}>
          <View style={{ flex: 1, ...theme.spacings.view.mr2 }}>
            <Text variant="card-body" color="neutral50">
              {item.description}
            </Text>
            <Text variant="card-highlight" color="accent1">
              ${item.price}
            </Text>
          </View>
          <Image
            source={{ uri: item.image }}
            resizeMode="cover"
            resizeMethod="scale"
            width={75}
            height={75}
          />
        </View>
      </View>
    </Pressable>
  );
};
