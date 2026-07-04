import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading,
  disabled,
  style,
}: ButtonProps) {
  const bg =
    variant === "primary"
      ? COLORS.primary
      : variant === "secondary"
        ? COLORS.secondary
        : "transparent";
  const txtColor =
    variant === "outline" || variant === "ghost" ? COLORS.primary : COLORS.white;
  const border = variant === "outline" ? COLORS.primary : "transparent";

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { backgroundColor: bg, borderColor: border },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={txtColor} />
      ) : (
        <Text style={[styles.text, { color: txtColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: SPACING.md - 2,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  disabled: { opacity: 0.5 },
  text: { fontWeight: "600", fontSize: 16 },
});
