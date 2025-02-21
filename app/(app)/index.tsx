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
import { useState, useEffect } from "react";
import { includes, isEmpty, xor } from "lodash";
import { useDebounce } from "use-debounce";

export default function Index() {
  const filterButtons = ["Starters", "Mains", "Desserts", "Drinks"];
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [debouncedSelectedFilters] = useDebounce(selectedFilters, 500);
  const theme = useTheme();
  const styles = getStyles(theme);
  const { menu, filterMenu, isLoading: isLoadingMenu } = useMenu();

  useEffect(() => {
    filterMenu({
      query: debouncedSearchQuery,
      categories: debouncedSelectedFilters,
    });
  }, [debouncedSearchQuery, debouncedSelectedFilters]);

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
              <Input
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                clearButtonMode="always"
              />
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
                  const isSelected = includes(selectedFilters, buttonName);
                  return (
                    <Button
                      key={`${i}-buttonName`}
                      selected={isSelected}
                      text={buttonName}
                      onPress={() =>
                        setSelectedFilters(xor(selectedFilters, [buttonName]))
                      }
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={{ ...theme.spacings.container.md }}>
            {isLoadingMenu && isEmpty(menu) ? (
              <ActivityIndicator animating={isLoadingMenu} />
            ) : (
              <Text>No results found.</Text>
            )}
          </View>
        )}
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
