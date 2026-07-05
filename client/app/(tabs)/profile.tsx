import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const skills = ["React", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Git", "Figma"];

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View style={[styles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
          <Text>Loading...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const displayName = user?.fullName || "John Doe";
  const displayEmail = user?.email || "john.doe@example.com";

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card style={styles.profileHeader}>
          <View style={styles.profileCover} />
          <View style={styles.profileInfo}>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color={COLORS.border} />
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                </View>
              </View>
            </View>
            <View style={styles.profileDetails}>
              <View style={styles.nameRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{displayName}</Text>
                  <Text style={styles.role}>Senior Software Developer</Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                  <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <View style={styles.contactRow}>
                <View style={styles.contactItem}>
                  <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.contactText}>Nairobi, Kenya</Text>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="briefcase-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.contactText}>5+ Years Exp.</Text>
                </View>
              </View>
              <View style={styles.contactRow}>
                <View style={styles.contactItem}>
                  <Ionicons name="mail-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.contactText}>{displayEmail}</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>

        {/* About */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.body}>
            Passionate software developer with a strong foundation in full-stack web development.
            Experienced in building scalable applications using React, Node.js, and PostgreSQL.
            Constantly learning and adapting to new technologies.
          </Text>
        </Card>

        {/* Experience */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.experienceItem}>
            <View style={styles.expDot} />
            <View style={styles.expContent}>
              <Text style={styles.expTitle}>Frontend Developer</Text>
              <Text style={styles.expMeta}>Tech Solutions Ltd • 2021 - Present</Text>
              <Text style={styles.expDesc}>
                Lead frontend development for enterprise SAAS products.
              </Text>
            </View>
          </View>
          <View style={[styles.experienceItem, { marginTop: SPACING.md }]}>
            <View style={[styles.expDot, styles.expDotInactive]} />
            <View style={styles.expContent}>
              <Text style={styles.expTitle}>Junior Developer</Text>
              <Text style={styles.expMeta}>StartUp Inc • 2019 - 2021</Text>
              <Text style={styles.expDesc}>Built internal tools and maintained legacy systems.</Text>
            </View>
          </View>
        </Card>

        {/* Skills */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsRow}>
            {skills.map((skill) => (
              <View key={skill} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Certificates */}
        <Card style={styles.section}>
          <View style={styles.certHeader}>
            <Ionicons name="trophy-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}> Certificates</Text>
          </View>
          <View style={styles.certItem}>
            <View style={styles.certIcon}>
              <Ionicons name="trophy" size={18} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.certName}>AWS Cloud Practitioner</Text>
              <Text style={styles.certMeta}>Issued 2023</Text>
            </View>
          </View>
        </Card>

        {/* Quick actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => router.push("/employer" as any)}
          >
            <Ionicons name="business-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionText}>Employer Dashboard</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => router.push("/learning" as any)}
          >
            <Ionicons name="book-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionText}>Learning Hub</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => router.push("/verification" as any)}
          >
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionText}>Verification</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => router.push("/settings" as any)}
          >
            <Ionicons name="settings-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionText}>Settings</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  profileHeader: { padding: 0, borderRadius: 24, overflow: "hidden", marginBottom: SPACING.md },
  profileCover: {
    height: 100,
    backgroundColor: COLORS.primaryLight,
  },
  profileInfo: { padding: SPACING.md, marginTop: -40 },
  avatarSection: { alignItems: "flex-start", marginBottom: SPACING.sm },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  profileDetails: {},
  nameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  name: { fontSize: 22, fontWeight: "700" },
  role: { fontSize: 15, color: COLORS.textSecondary, marginTop: 2 },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  contactRow: { flexDirection: "row", gap: 16, marginTop: 8, flexWrap: "wrap" },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  contactText: { fontSize: 13, color: COLORS.textSecondary },
  section: { padding: SPACING.md, borderRadius: 20, marginBottom: SPACING.md },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  body: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },
  experienceItem: { flexDirection: "row", gap: 12 },
  expDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
  expDotInactive: { backgroundColor: COLORS.border },
  expContent: { flex: 1 },
  expTitle: { fontSize: 16, fontWeight: "600" },
  expMeta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  expDesc: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4, lineHeight: 20 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: COLORS.border,
  },
  skillText: { fontSize: 13, color: COLORS.text, fontWeight: "500" },
  certHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  certItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  certIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  certName: { fontSize: 14, fontWeight: "600" },
  certMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  actions: {
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    overflow: "hidden",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionText: { flex: 1, fontSize: 15, fontWeight: "500" },
  logoutBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.dangerLight,
    alignItems: "center",
  },
  logoutText: { fontSize: 16, fontWeight: "600", color: COLORS.danger },
});
