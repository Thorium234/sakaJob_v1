import { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ScreenWrapper, Card, Button } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { Job } from "@/types";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.jobs.get(id).then((res) => setJob(res.job)).catch(() => router.back());
  }, [id]);

  if (!job) return null;

  const handleApply = async () => {
    setApplying(true);
    try {
      await api.applications.apply(job.id);
      Alert.alert("Applied!", "Your application has been submitted.");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>
          {job.employer?.companyName || "Unknown"} · {job.location}
        </Text>

        <View style={styles.badgeRow}>
          {job.employmentType && <Text style={styles.badge}>{job.employmentType}</Text>}
          {job.category && <Text style={styles.badge}>{job.category}</Text>}
          {job.experienceLevel && <Text style={styles.badge}>{job.experienceLevel}</Text>}
        </View>

        {job.salaryMin != null && (
          <Text style={styles.salary}>
            {job.salaryCurrency || "KES"} {job.salaryMin.toLocaleString()}
            {job.salaryMax ? ` - ${job.salaryMax.toLocaleString()}` : ""}
          </Text>
        )}

        <Card style={{ marginTop: SPACING.md }}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>{job.description}</Text>
        </Card>

        {job.requirements && (
          <Card style={{ marginTop: SPACING.sm }}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <Text style={styles.body}>{job.requirements}</Text>
          </Card>
        )}

        {job.responsibilities && (
          <Card style={{ marginTop: SPACING.sm }}>
            <Text style={styles.sectionTitle}>Responsibilities</Text>
            <Text style={styles.body}>{job.responsibilities}</Text>
          </Card>
        )}

        {job.skillsRequired && (
          <Card style={{ marginTop: SPACING.sm }}>
            <Text style={styles.sectionTitle}>Skills Required</Text>
            <Text style={styles.body}>{job.skillsRequired}</Text>
          </Card>
        )}

        {user?.role === "JOB_SEEKER" && (
          <Button
            title="Apply Now"
            onPress={handleApply}
            loading={applying}
            style={{ marginTop: SPACING.lg }}
          />
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  back: { fontSize: 16, color: COLORS.primary, marginBottom: SPACING.md },
  title: { fontSize: 24, fontWeight: "700", color: COLORS.text },
  company: { fontSize: 15, color: COLORS.textSecondary, marginTop: 2 },
  badgeRow: { flexDirection: "row", marginTop: SPACING.sm, gap: 6, flexWrap: "wrap" },
  badge: {
    fontSize: 11,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  salary: { fontSize: 16, fontWeight: "600", color: COLORS.text, marginTop: SPACING.sm },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: 6 },
  body: { fontSize: 15, color: COLORS.text, lineHeight: 22 },
});
