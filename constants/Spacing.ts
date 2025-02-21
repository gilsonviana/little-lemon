import { ImageStyle, TextStyle, ViewStyle } from "react-native";
type SpacingSections =
  | "header"
  | "container"
  | "list-card"
  | "section"
  | "button";
type SpacingKeys = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type SpacingKeyStyle = Record<SpacingKeys, ViewStyle>;
type SpacingUtilViewKeys =
  | "flexVertical"
  | "flexHorizontal"
  | "flexCenter"
  | "flexBetween"
  | 'gap1'
  | 'gap2'
  | 'gap3'
  | 'gap4'
  | "mb1"
  | "mb2"
  | "mr1"
  | "mr2"
  | "borderBottom"
type SpacingUtilTextKeys =
  | "mb1"
  | "mb2"
  | "mb3";
type SpacingUtilImageKeys = "radiusSm" | "radiusMd";
type SpacingUtilStyle = {
  view: Record<SpacingUtilViewKeys, ViewStyle>;
  text: Record<SpacingUtilTextKeys, TextStyle>;
  image: Record<SpacingUtilImageKeys, ImageStyle>;
};

export type ThemeSpacing =
  Record<SpacingSections, Partial<SpacingKeyStyle>> &
  { avatar: Record<'sm' | 'md' | 'lg', ImageStyle> } &
  SpacingUtilStyle;

export const SpacingUtils: SpacingUtilStyle = {
  view: {
    flexVertical: {
      flexDirection: "column",
    },
    flexHorizontal: {
      flexDirection: "row",
    },
    flexCenter: {
      justifyContent: "center",
      alignItems: "center",
    },
    flexBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    gap1: {
      gap: 4
    },
    gap2: {
      gap: 8
    },
    gap3: {
      gap: 16
    },
    gap4: {
      gap: 24
    },
    mb1: {
      marginBottom: 4,
    },
    mb2: {
      marginBottom: 8,
    },
    mr1: {
      marginRight: 4,
    },
    mr2: {
      marginRight: 8,
    },
    borderBottom: {
      borderBottomWidth: 0.5
    },
  },
  text: {
    mb1: {
      marginBottom: 4,
    },
    mb2: {
      marginBottom: 8,
    },
    mb3: {
      marginBottom: 16,
    },
  },
  image: {
    radiusSm: {
      borderRadius: 4
    },
    radiusMd: {
      borderRadius: 8
    },
  }
};

export const Spacings: ThemeSpacing = {
  header: {
    md: { padding: 16 },
  },
  container: {
    md: { padding: 16 },
  },
  "list-card": {
    md: { padding: 16 },
  },
  section: {
    md: { padding: 16 },
  },
  button: {
    md: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  },
  avatar: {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  },
  ...SpacingUtils,
};
