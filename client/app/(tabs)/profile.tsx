import { Text, StyleSheet, ScrollView, View, Alert } from "react-native";
import { ScreenWrapper, Card, Button } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <Card style={{ marginBottom: SPACING.md }}>
          <Text style={styles.fieldLabel}>Name</Text>
          <Text style={styles.fieldValue}>{user.fullName}</Text>

          <Text style={styles.fieldLabel}>Email</Text>
          <Text style={styles.fieldValue}>{user.email}</Text>

          <Text style={styles.fieldLabel}>Role</Text>
          <Text style={styles.fieldValue}>{user.role === "JOB_SEEKER" ? "Job Seeker" : "Employer"}</Text>

          {user.companyName && (
            <>
              <Text style={styles.fieldLabel}>Company</Text>
              <Text style={styles.fieldValue}>{user.companyName}</Text>
            </>
          )}
        </Card>

        <Button title="Logout" variant="outline" onPress={handleLogout} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  title: { fontSize: 26, fontWeight: "700", color: COLORS.text, marginBottom: SPACING.md },
  fieldLabel: { fontSize: 12, color: COLORS.textMuted, marginTop: SPACING.sm, textTransform: "uppercase" },
  fieldValue: { fontSize: 16, color: COLORS.text, marginTop: 2 },
});
