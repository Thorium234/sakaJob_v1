import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={COLORS.textMuted}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  inputError: { borderColor: COLORS.danger },
  error: { fontSize: 12, color: COLORS.danger, marginTop: 4 },
});
