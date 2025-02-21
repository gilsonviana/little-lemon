import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Header } from "@/components/Header";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ThemeType, useTheme } from "@/hooks/useTheme";
import { MenuItem } from "@/components/MenuItem";
import { useMenu } from "@/hooks/useMenu";
import { useState } from "react";
import { includes, xor } from "lodash";

export default function Index() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { menu } = useMenu();

  const [selectedFilters, setSelectedFilters] = useState<string[]>();

  const filterButtons = ["Starters", "Mains", "Desserts", "Drinks"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={menu}
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
                {filterButtons.map((buttonName, i) => {
                  const isSelected = includes(selectedFilters, buttonName)
                  return (
                    <Button
                      key={`${i}-buttonName`}
                      selected={isSelected}
                      text={buttonName}
                      onPress={() => setSelectedFilters(xor(selectedFilters, [buttonName]))}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
        ListEmptyComponent={() => <ActivityIndicator />}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.name + item.price}
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
