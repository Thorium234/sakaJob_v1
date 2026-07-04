import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ScreenWrapper, Card, Button } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { Job } from "@/types";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    api.jobs.list({ limit: "5" }).then((res) => setJobs(res.jobs)).catch(() => {});
  }, []);

  return (
    <ScreenWrapper>
      <FlatList
        data={jobs}
        keyExtractor={(j) => j.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.greeting}>
              Hello, {user?.fullName?.split(" ")[0] || "there"}
            </Text>
            <Text style={styles.subheading}>
              {user?.role === "EMPLOYER"
                ? "Manage your listings and applicants"
                : "Find your next opportunity"}
            </Text>

            {/* Quick actions */}
            <View style={styles.quickRow}>
              {user?.role === "JOB_SEEKER" && (
                <Button
                  title="Browse Jobs"
                  onPress={() => router.push("/(tabs)/jobs")}
                  style={{ flex: 1 }}
                />
              )}
              {user?.role === "EMPLOYER" && (
                <Button
                  title="Post a Job"
                  onPress={() => router.push("/(tabs)/jobs")}
                  style={{ flex: 1 }}
                />
              )}
              <View style={{ width: SPACING.sm }} />
              <Button
                title="Logout"
                variant="outline"
                onPress={logout}
                style={{ flex: 0 }}
              />
            </View>

            {jobs.length > 0 && (
              <Text style={styles.sectionTitle}>Recent Jobs</Text>
            )}
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/job/${item.id}`)}
          >
            <Card style={styles.jobCard}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobMeta}>
                {item.employer?.companyName || "Unknown"} · {item.location}
              </Text>
              <View style={styles.badgeRow}>
                {item.employmentType && (
                  <Text style={styles.badge}>{item.employmentType}</Text>
                )}
                {item.category && <Text style={styles.badge}>{item.category}</Text>}
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {user?.role === "EMPLOYER"
              ? 'Post your first job from the Jobs tab'
              : 'No jobs yet — check back soon'}
          </Text>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: SPACING.lg, paddingBottom: 100 },
  greeting: { fontSize: 26, fontWeight: "700", color: COLORS.text },
  subheading: { fontSize: 15, color: COLORS.textSecondary, marginBottom: SPACING.lg, marginTop: 2 },
  quickRow: { flexDirection: "row", marginBottom: SPACING.lg, gap: SPACING.sm },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.sm },
  jobCard: { marginBottom: SPACING.sm },
  jobTitle: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  jobMeta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  badgeRow: { flexDirection: "row", marginTop: SPACING.xs, gap: 6 },
  badge: {
    fontSize: 11,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  empty: { textAlign: "center", color: COLORS.textMuted, fontSize: 15, marginTop: SPACING.xl },
});
