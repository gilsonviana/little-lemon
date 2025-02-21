import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Pressable, Image, StyleSheet, View, ViewStyle } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/Text";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { useTheme } from "@/hooks/useTheme";
import { ThemeSpacing } from "@/constants/Spacing";
import { Href, useRouter, useFocusEffect } from "expo-router";

interface AvatarProps {
  href?: Href;
  size?: keyof ThemeSpacing["avatar"];
  storage?: boolean;
  imageUrl?: string;
  label?: string;
  onImageChange?: (uri: string) => void;
}

export interface AvatarRef {
  removeImage: () => Promise<void>;
}

// export const Avatar: React.FC<AvatarProps> = ;
export const Avatar = forwardRef(
  (
    { href, size = "md", storage, imageUrl, label, onImageChange }: AvatarProps,
    ref: React.ForwardedRef<AvatarRef>
  ) => {
    const { push } = useRouter();
    const { storeData, getData, removeData } = useAsyncStorage();
    const theme = useTheme();
    const [image, setImage] = useState<string | undefined>(imageUrl);

    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        storeData("avatar", result.assets[0].uri);
        setImage(result.assets[0].uri);
        onImageChange?.(result.assets[0].uri);
      }
    };

    useFocusEffect(() => {
      if (storage) {
        getData<string>("avatar").then((data) => {
          setImage(data ?? undefined);
        });
      }
    });

    useImperativeHandle(ref, () => ({
      removeImage: async () => {
        await removeData("avatar");
        setImage(undefined);
      },
    }));

    return (
      <View style={styles.wrapper}>
        {label && <Text>Avatar</Text>}
        <Pressable
          onPress={() => {
            !href && pickImage();
            href && push(href);
          }}
          style={[styles.container]}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={[styles.image, theme.spacings.avatar[size]]}
            />
          ) : (
            <View
              style={[
                styles.placeholder,
                theme.spacings.avatar[size] as ViewStyle,
              ]}
            >
              <Ionicons name="person" size={16} color="#666" />
            </View>
          )}
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  container: {
    borderRadius: 999,
    overflow: "hidden",
  },
  image: {
    borderRadius: 999,
  },
  placeholder: {
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
});
