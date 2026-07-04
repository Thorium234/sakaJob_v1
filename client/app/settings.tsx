import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Switch } from "react-native";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SettingsScreen() {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account preferences.</Text>

        {/* Notifications */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.sectionTitle}> Notifications</Text>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Job Alerts</Text>
              <Text style={styles.settingDesc}>Receive emails for new jobs matching your profile.</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} trackColor={{ true: COLORS.primaryLight }} thumbColor={COLORS.primary} />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Application Updates</Text>
              <Text style={styles.settingDesc}>Get notified when employers view or update your status.</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} trackColor={{ true: COLORS.primaryLight }} thumbColor={COLORS.primary} />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Direct Messages</Text>
              <Text style={styles.settingDesc}>Push notifications for new messages from employers.</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} trackColor={{ true: COLORS.primaryLight }} thumbColor={COLORS.primary} />
          </View>
        </Card>

        {/* Preferences */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="globe-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.sectionTitle}> Preferences</Text>
          </View>
          <View>
            <Text style={styles.settingLabel}>Primary County</Text>
            <View style={styles.picker}>
              <Text style={styles.pickerText}>Nairobi</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </View>
            <Text style={styles.settingDesc}>We will prioritize showing jobs in this county.</Text>
          </View>
        </Card>

        {/* Privacy */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.sectionTitle}> Privacy & Security</Text>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Public Profile</Text>
              <Text style={styles.settingDesc}>Allow employers to find you in search results.</Text>
            </View>
            <Switch value={true} onValueChange={() => {}} trackColor={{ true: COLORS.primaryLight }} thumbColor={COLORS.primary} />
          </View>
          <TouchableOpacity style={styles.dangerBtn}>
            <Text style={styles.dangerBtnText}>Delete Account</Text>
          </TouchableOpacity>
        </Card>

        {/* Cookies */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.sectionTitle}> Cookie Preferences</Text>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Necessary</Text>
              <Text style={styles.settingDesc}>Required for the platform to function. Always on.</Text>
            </View>
            <Switch value={true} disabled trackColor={{ true: COLORS.border }} thumbColor={COLORS.textMuted} />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Analytics</Text>
              <Text style={styles.settingDesc}>Helps us understand usage and improve Saka.</Text>
            </View>
            <Switch value={analytics} onValueChange={setAnalytics} trackColor={{ true: COLORS.primaryLight }} thumbColor={COLORS.primary} />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Marketing</Text>
              <Text style={styles.settingDesc}>Used to tailor promotions and outreach.</Text>
            </View>
            <Switch value={marketing} onValueChange={setMarketing} trackColor={{ true: COLORS.primaryLight }} thumbColor={COLORS.primary} />
          </View>
          <TouchableOpacity style={styles.resetBtn}>
            <Text style={styles.resetBtnText}>Reset & show cookie banner again</Text>
          </TouchableOpacity>
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { fontSize: 15, color: COLORS.textSecondary, marginTop: 2, marginBottom: SPACING.lg },
  section: { padding: SPACING.md, borderRadius: 24, marginBottom: SPACING.md },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: SPACING.md },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: { flex: 1, marginRight: 12 },
  settingLabel: { fontSize: 15, fontWeight: "500", marginBottom: 2 },
  settingDesc: { fontSize: 12, color: COLORS.textSecondary },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 8,
  },
  pickerText: { fontSize: 15, color: COLORS.text },
  dangerBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.dangerLight,
    alignItems: "center",
    marginTop: SPACING.md,
  },
  dangerBtnText: { fontSize: 15, fontWeight: "600", color: COLORS.danger },
  resetBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    marginTop: SPACING.md,
  },
  resetBtnText: { fontSize: 14, fontWeight: "500", color: COLORS.textSecondary },
});
