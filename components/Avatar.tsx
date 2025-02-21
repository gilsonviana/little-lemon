import React, { useState } from 'react';
import { Pressable, Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Text } from "@/components/Text";

interface AvatarProps {
  size?: number;
  imageUrl?: string;
  onImageChange?: (uri: string) => void;
  label?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 100,
  imageUrl,
  label,
  onImageChange,
}) => {
  const [image, setImage] = useState<string | undefined>(imageUrl);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      onImageChange?.(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && (<Text>Avatar</Text>)}
      <Pressable onPress={pickImage} style={[styles.container, { width: size, height: size }]}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[styles.image, { width: size, height: size }]}
          />
        ) : (
          <View style={[styles.placeholder, { width: size, height: size }]}>
            <Ionicons name="person" size={size * 0.6} color="#666" />
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 999,
  },
  placeholder: {
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
});