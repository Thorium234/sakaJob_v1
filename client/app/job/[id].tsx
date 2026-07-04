import { useState } from "react";
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { MOCK_JOBS } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = MOCK_JOBS.find((j) => j.id === id);
  const [applied, setApplied] = useState(false);

  if (!job) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Job not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>Go back</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  const handleApply = () => {
    setApplied(true);
    Alert.alert("Application Submitted!", "Your verified profile has been sent to the employer.");
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          <Text style={styles.backText}>Back to Jobs</Text>
        </TouchableOpacity>

        <View style={styles.mainCard}>
          {/* Job header */}
          <View style={styles.jobHeader}>
            <View style={styles.jobHeaderLeft}>
              <View style={styles.jobIconLarge}>
                <Ionicons name="briefcase-outline" size={36} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  {job.verified && (
                    <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
                  )}
                </View>
                <Text style={styles.companyName}>{job.company}</Text>
              </View>
            </View>
          </View>

          {/* Meta info */}
          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.metaPillText}>{job.county}</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="cash-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.metaPillText}>{job.salary}</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.metaPillText}>{job.type}</Text>
            </View>
          </View>

          {/* Verify badge */}
          <View style={styles.verifyRow}>
            <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
            <Text style={styles.verifyText}>Verified Employer on Saka</Text>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.applyBtn, applied && styles.appliedBtn]}
              onPress={handleApply}
              disabled={applied}
            >
              <Ionicons name={applied ? "checkmark-circle" : "paper-plane"} size={18} color={COLORS.white} />
              <Text style={styles.applyBtnText}>{applied ? "Applied" : "Apply Now"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn}>
              <Ionicons name="bookmark-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.body}>{job.description}</Text>

          <Text style={[styles.sectionTitle, { marginTop: SPACING.lg }]}>Requirements</Text>
          {job.requirements.map((req, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.body}>{req}</Text>
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: SPACING.lg }]}>Responsibilities</Text>
          {job.responsibilities.map((res, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.body}>{res}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          {/* Company info */}
          <Card style={styles.companyCard}>
            <Ionicons name="business-outline" size={20} color={COLORS.text} />
            <Text style={styles.companyCardTitle}> About {job.company}</Text>
            <Text style={styles.companyDesc}>{job.companyDescription}</Text>
            <TouchableOpacity>
              <Text style={styles.viewProfileLink}>View Company Profile</Text>
            </TouchableOpacity>
          </Card>

          <Card style={styles.verifiedCard}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
            <Text style={styles.verifiedCardTitle}> Saka Verified</Text>
            <Text style={styles.companyDesc}>
              This employer has passed our strict background and identity verification checks.
            </Text>
          </Card>

          {/* Sticky bottom apply */}
          <View style={styles.stickyBar}>
            <TouchableOpacity
              style={[styles.stickyApply, applied && styles.appliedBtn]}
              onPress={handleApply}
              disabled={applied}
            >
              <Text style={styles.stickyApplyText}>
                {applied ? "Applied" : "Apply Now"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontSize: 18, color: COLORS.textSecondary },
  backLink: { color: COLORS.primary, marginTop: 8, fontSize: 16 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: SPACING.md },
  backText: { fontSize: 15, color: COLORS.textSecondary },
  mainCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  jobHeader: { marginBottom: SPACING.md },
  jobHeaderLeft: { flexDirection: "row", gap: 16, alignItems: "center" },
  jobIconLarge: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  jobTitle: { fontSize: 22, fontWeight: "700" },
  companyName: { fontSize: 16, color: COLORS.textSecondary, marginTop: 4 },
  metaRow: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: SPACING.md },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: COLORS.background,
  },
  metaPillText: { fontSize: 13, color: COLORS.textSecondary },
  verifyRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: SPACING.lg },
  verifyText: { fontSize: 13, color: COLORS.primary, fontWeight: "500" },
  actionRow: { flexDirection: "row", gap: 12, marginBottom: SPACING.lg },
  applyBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
  },
  appliedBtn: { backgroundColor: COLORS.border },
  applyBtnText: { fontSize: 16, fontWeight: "700", color: COLORS.white },
  saveBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.md },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  body: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 22 },
  bulletRow: { flexDirection: "row", gap: 8, marginBottom: 6 },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textSecondary,
    marginTop: 8,
  },
  companyCard: { padding: SPACING.md, borderRadius: 16, marginBottom: SPACING.md },
  companyCardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  companyDesc: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 },
  viewProfileLink: { color: COLORS.primary, fontSize: 14, fontWeight: "600", marginTop: 8 },
  verifiedCard: {
    padding: SPACING.md,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 0,
    marginBottom: SPACING.md,
  },
  verifiedCardTitle: { fontSize: 16, fontWeight: "600", color: COLORS.primary, marginBottom: 8 },
  stickyBar: {
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
  },
  stickyApply: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  stickyApplyText: { fontSize: 17, fontWeight: "700", color: COLORS.white },
});
