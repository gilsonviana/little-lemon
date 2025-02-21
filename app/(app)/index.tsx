import { useAuth } from "@/hooks/useAuth";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { Header } from "@/components/Header";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ThemeType, useTheme } from "@/hooks/useTheme";
import { MenuItem, MenuItemType } from "@/components/MenuItem";

const MOCK_DATA: MenuItemType[] = [
  {
    id: 1,
    name: "Cheeseburger",
    description: "A classic cheeseburger with lettuce, tomato, and pickles.",
    price: 12.99,
    image: "https://via.assets.so/img.jpg?w=150&h=150&tc=blue&bg=#cecece",
  },
  {
    id: 2,
    name: "Cheeseburger 2",
    description: "A classic cheeseburger with lettuce, tomato, and pickles.",
    price: 12.99,
    image: "https://via.assets.so/img.jpg?w=150&h=150&tc=blue&bg=#cecece",
  },
];

export default function Index() {
  const { logout } = useAuth();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={MOCK_DATA}
        ListHeaderComponent={() => (
          <>
            <Header />
            <View style={styles.jumbotron}>
              <Text variant="display" color="accent2">
                Little Lemon
              </Text>
              <View
                style={{
                  ...theme.spacings.view.flexHorizontal,
                  overflow: "hidden",
                }}
              >
                <View style={{ flex: 3, ...theme.spacings.view.mr2 }}>
                  <Text
                    style={{ ...theme.spacings.text.mb3 }}
                    variant="heading"
                    color="neutral0"
                  >
                    Chicago
                  </Text>
                  <Text variant="lead" color="neutral0">
                    Little Lemon is a full-stack TypeScript framework for
                    building web, mobile, and desktop applications.
                  </Text>
                </View>
                <Image
                  source={{
                    uri: "https://via.assets.so/img.jpg?w=150&h=150&tc=blue&bg=#cecece",
                  }}
                  width={150}
                  height={150}
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={{ flex: 2, ...theme.spacings.image.radiusMd }}
                />
              </View>
              <Input placeholder="Search" />
            </View>

            <View style={{ ...theme.spacings.container.md }}>
              <Text style={{ ...theme.spacings.text.mb2 }} variant="section">
                Order for delivery!
              </Text>
              <ScrollView
                horizontal
                contentContainerStyle={{ ...theme.spacings.view.gap2 }}
              >
                <Button text="Starters" />
                <Button text="Mains" />
                <Button text="Desserts" />
                <Button text="Drinks" />
              </ScrollView>
            </View>
          </>
        )}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    jumbotron: {
      backgroundColor: theme.colors.accent1,
      ...theme.spacings.container.md,
    },
  });
