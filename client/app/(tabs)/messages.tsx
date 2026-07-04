import { Text, StyleSheet } from "react-native";
import { ScreenWrapper } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";

export default function MessagesScreen() {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.empty}>No conversations yet</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "700", color: COLORS.text, padding: SPACING.lg, paddingBottom: 0 },
  empty: { textAlign: "center", color: COLORS.textMuted, fontSize: 15, marginTop: SPACING.xl * 2 },
});
