import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import {
  MOCK_JOBS,
  MOCK_NOTIFICATIONS,
  MOCK_APPLICATIONS,
  MOCK_LEARNING_MODULES,
} from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Welcome back, {user?.fullName?.split(" ")[0] || "John"}!
            </Text>
            <Text style={styles.subheading}>Here&apos;s what&apos;s happening with your job search.</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Main grid */}
        <View style={styles.grid2col}>
          {/* Recommended Jobs */}
          <View style={styles.col2}>
            <Card style={styles.jobsCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.sectionTitle}>Recommended Jobs</Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/jobs" as any)}>
                  <Text style={styles.viewAll}>View all ›</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.jobsList}>
                {MOCK_JOBS.slice(0, 3).map((job, i) => (
                  <TouchableOpacity
                    key={job.id}
                    style={[styles.jobItem, i < 2 && styles.jobItemBorder]}
                    onPress={() => router.push(`/job/${job.id}` as any)}
                  >
                    <View style={styles.jobItemLeft}>
                      <View style={styles.jobIcon}>
                        <Ionicons name="briefcase-outline" size={22} color={COLORS.primary} />
                      </View>
                      <View style={styles.jobInfo}>
                        <Text style={styles.jobItemTitle} numberOfLines={1}>
                          {job.title}
                        </Text>
                        <Text style={styles.jobItemMeta}>
                          {job.company} • {job.county}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.jobSalary}>{job.salary}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          </View>

          {/* Side column */}
          <View style={styles.col1}>
            {/* Profile Completion */}
            <Card style={styles.profileCard}>
              <Text style={styles.profileTitle}>Profile Completion</Text>
              <View style={styles.profileScoreRow}>
                <Text style={styles.profileScore}>85%</Text>
                <Text style={styles.profileLabel}>Looking good!</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "85%" }]} />
              </View>
              <Text style={styles.profileTip}>
                Add your portfolio to reach 100% and stand out to employers.
              </Text>
              <TouchableOpacity style={styles.completeBtn}>
                <Text style={styles.completeBtnText}>Complete Profile</Text>
              </TouchableOpacity>
            </Card>

            {/* Upcoming Interviews */}
            <Card style={styles.interviewCard}>
              <View style={styles.interviewHeader}>
                <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
                <Text style={styles.interviewTitle}>Upcoming Interviews</Text>
              </View>
              <View style={styles.interviewBlock}>
                <Text style={styles.interviewRole}>Technical Interview • Safaricom</Text>
                <Text style={styles.interviewTime}>
                  <Ionicons name="time-outline" size={14} /> Tomorrow, 10:00 AM EAT
                </Text>
                <TouchableOpacity style={styles.joinBtn}>
                  <Text style={styles.joinBtnText}>Join Call</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </View>

        {/* Recent Applications */}
        <Card style={styles.appsCard}>
          <Text style={styles.sectionTitle}>Recent Applications</Text>
          {MOCK_APPLICATIONS.map((app, i) => (
            <View key={app.id} style={[styles.appItem, i > 0 && styles.appItemBorder]}>
              <View style={styles.appItemLeft}>
                <View
                  style={[
                    styles.appIcon,
                    { backgroundColor: i === 0 ? COLORS.primaryLight : COLORS.blueLight },
                  ]}
                >
                  <Ionicons
                    name={i === 0 ? "checkmark-circle" : "time"}
                    size={22}
                    color={i === 0 ? COLORS.primary : COLORS.blue}
                  />
                </View>
                <View style={styles.appInfo}>
                  <View style={styles.appHeader}>
                    <Text style={styles.appTitle}>{app.title}</Text>
                    <Text style={styles.appStatus}>{app.status}</Text>
                  </View>
                  <Text style={styles.appMeta}>
                    {app.company} • Applied {app.appliedDate}
                  </Text>
                  {/* Timeline */}
                  <View style={styles.timeline}>
                    {[1, 2, 3, 4].map((stage) => (
                      <View
                        key={stage}
                        style={[
                          styles.timelineDot,
                          stage <= app.stage
                            ? styles.timelineActive
                            : styles.timelineInactive,
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.timelineLabels}>
                    <Text style={styles.timelineLabel}>Applied</Text>
                    <Text style={styles.timelineLabel}>Reviewed</Text>
                    <Text style={styles.timelineLabelActive}>Interview</Text>
                    <Text style={styles.timelineLabel}>Offer</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Card>

        {/* Career Learning */}
        <Text style={styles.sectionTitle}>Career Learning</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.learningRow}
        >
          {MOCK_LEARNING_MODULES.slice(0, 3).map((mod) => {
            const progress = (mod.completed / mod.lessons) * 100;
            return (
              <TouchableOpacity
                key={mod.id}
                style={styles.learningCard}
                onPress={() => router.push(`/learning/${mod.id}` as any)}
              >
                <View style={[styles.learningIcon, { backgroundColor: mod.bg }]}>
                  <Ionicons
                    name={
                      mod.id === "1"
                        ? "book"
                        : mod.id === "2"
                          ? "play-circle"
                          : mod.id === "3"
                            ? "star"
                            : "trophy"
                    }
                    size={22}
                    color={mod.color}
                  />
                </View>
                <Text style={styles.learningTitle}>{mod.title}</Text>
                <Text style={styles.learningMeta}>
                  {mod.completed} of {mod.lessons} lessons
                </Text>
                <View style={styles.learningProgress}>
                  <View
                    style={[
                      styles.learningProgressFill,
                      { width: `${progress}%`, backgroundColor: mod.color },
                    ]}
                  />
                </View>
                <Text style={styles.learningPercent}>{Math.round(progress)}%</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },
  greeting: { fontSize: 26, fontWeight: "700", color: COLORS.text },
  subheading: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 2,
    maxWidth: 260,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  grid2col: { gap: SPACING.md },
  col2: {},
  col1: {},
  jobsCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  viewAll: { fontSize: 14, color: COLORS.primary, fontWeight: "600" },
  jobsList: {},
  jobItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
  },
  jobItemBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  jobItemLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  jobIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  jobInfo: { flex: 1 },
  jobItemTitle: { fontSize: 16, fontWeight: "600" },
  jobItemMeta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  jobSalary: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  profileCard: {
    padding: SPACING.md,
    borderRadius: 24,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.primary,
  },
  profileTitle: { fontSize: 18, fontWeight: "700", color: COLORS.white, marginBottom: 8 },
  profileScoreRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  profileScore: { fontSize: 36, fontWeight: "800", color: COLORS.white },
  profileLabel: { fontSize: 13, color: COLORS.white, opacity: 0.9, marginBottom: 4 },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 4,
  },
  profileTip: { fontSize: 12, color: COLORS.white, opacity: 0.9, marginBottom: 12 },
  completeBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  completeBtnText: { fontSize: 14, fontWeight: "700", color: COLORS.primary },
  interviewCard: {
    padding: SPACING.md,
    borderRadius: 24,
    marginBottom: SPACING.md,
  },
  interviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: SPACING.md,
  },
  interviewTitle: { fontSize: 18, fontWeight: "700" },
  interviewBlock: {
    padding: SPACING.md,
    borderRadius: 16,
    backgroundColor: COLORS.orangeLight,
    borderWidth: 1,
    borderColor: COLORS.accentLight,
  },
  interviewRole: { fontSize: 14, fontWeight: "700", color: COLORS.orange, marginBottom: 4 },
  interviewTime: {
    fontSize: 13,
    color: COLORS.orange,
    opacity: 0.8,
    marginBottom: 12,
  },
  joinBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.accentLight,
  },
  joinBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.orange },
  appsCard: {
    padding: SPACING.md,
    borderRadius: 24,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  appItem: { paddingVertical: SPACING.md },
  appItemBorder: { borderTopWidth: 1, borderTopColor: COLORS.border },
  appItemLeft: { flexDirection: "row", gap: 12 },
  appIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  appInfo: { flex: 1 },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  appTitle: { fontSize: 15, fontWeight: "600" },
  appStatus: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
    textTransform: "uppercase",
  },
  appMeta: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 },
  timeline: { flexDirection: "row", gap: 4, marginBottom: 4 },
  timelineDot: { height: 6, flex: 1, borderRadius: 3 },
  timelineActive: { backgroundColor: COLORS.primary },
  timelineInactive: { backgroundColor: COLORS.border },
  timelineLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timelineLabel: { fontSize: 10, color: COLORS.textMuted },
  timelineLabelActive: { fontSize: 10, color: COLORS.primary, fontWeight: "600" },
  learningRow: { gap: 12, paddingBottom: SPACING.sm },
  learningCard: {
    width: 160,
    padding: SPACING.md,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  learningIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  learningTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  learningMeta: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 },
  learningProgress: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: 4,
    overflow: "hidden",
  },
  learningProgressFill: { height: "100%", borderRadius: 2 },
  learningPercent: { fontSize: 11, color: COLORS.textSecondary, fontWeight: "500" },
});
