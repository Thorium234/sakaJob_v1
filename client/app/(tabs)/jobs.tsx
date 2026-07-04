import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";
import { api } from "@/lib/api";
import type { Job } from "@/types";

export default function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (q?: string) => {
    try {
      const params: Record<string, string> = { limit: "20" };
      if (q) params.search = q;
      const res = await api.jobs.list(params);
      setJobs(res.jobs);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => fetchJobs(search.trim());

  return (
    <ScreenWrapper>
      <FlatList
        data={jobs}
        keyExtractor={(j) => j.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Jobs</Text>
            <View style={styles.searchRow}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search jobs..."
                placeholderTextColor={COLORS.textMuted}
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/job/${item.id}`)}>
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
                {item.matchScore !== undefined && (
                  <Text style={[styles.badge, styles.matchBadge]}>
                    {item.matchScore}% match
                  </Text>
                )}
              </View>
              {item.salaryMin != null && (
                <Text style={styles.salary}>
                  {item.salaryCurrency || "KES"} {item.salaryMin.toLocaleString()}
                  {item.salaryMax ? ` - ${item.salaryMax.toLocaleString()}` : ""}
                </Text>
              )}
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {loading ? "Loading..." : "No jobs found"}
          </Text>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: SPACING.lg, paddingBottom: 100 },
  title: { fontSize: 26, fontWeight: "700", color: COLORS.text, marginBottom: SPACING.md },
  searchRow: { marginBottom: SPACING.md },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  jobCard: { marginBottom: SPACING.sm },
  jobTitle: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  jobMeta: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  badgeRow: { flexDirection: "row", marginTop: SPACING.xs, gap: 6, flexWrap: "wrap" },
  badge: {
    fontSize: 11,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  matchBadge: { color: COLORS.secondary, backgroundColor: COLORS.secondaryLight },
  salary: { fontSize: 13, color: COLORS.text, fontWeight: "500", marginTop: 4 },
  empty: { textAlign: "center", color: COLORS.textMuted, fontSize: 15, marginTop: SPACING.xl },
});
