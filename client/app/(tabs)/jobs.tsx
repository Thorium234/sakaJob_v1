import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING, RADIUS } from "@/constants/theme";
import { MOCK_JOBS } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";

export default function JobsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const filteredJobs = MOCK_JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (id: string) => {
    setAppliedJobs((prev) => [...prev, id]);
    Alert.alert(
      "Application Submitted!",
      "Your verified profile has been sent to the employer."
    );
  };

  return (
    <ScreenWrapper>
      <FlatList
        data={filteredJobs}
        keyExtractor={(j) => j.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Browse Jobs</Text>
            <Text style={styles.subtitle}>Find your next opportunity across Kenya.</Text>
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Ionicons
                  name="search"
                  size={18}
                  color={COLORS.textMuted}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by job title, company, or county..."
                  placeholderTextColor={COLORS.textMuted}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </View>
              <TouchableOpacity style={styles.filterBtn}>
                <Ionicons name="options-outline" size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item, index }) => {
          const isApplied = appliedJobs.includes(item.id);
          return (
            <TouchableOpacity
              onPress={() => router.push(`/job/${item.id}` as any)}
              style={styles.jobCardOuter}
            >
              <Card style={styles.jobCard}>
                <View style={styles.jobCardContent}>
                  <View style={styles.jobCardLeft}>
                    <View style={styles.jobIconLarge}>
                      <Ionicons name="briefcase-outline" size={28} color={COLORS.primary} />
                    </View>
                    <View style={styles.jobCardInfo}>
                      <View style={styles.jobTitleRow}>
                        <Text style={styles.jobTitle}>{item.title}</Text>
                        {item.verified && (
                          <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color={COLORS.primary}
                          />
                        )}
                      </View>
                      <Text style={styles.jobCompany} numberOfLines={1}>
                        {item.company}
                      </Text>
                      <View style={styles.jobMetaRow}>
                        <View style={styles.metaItem}>
                          <Ionicons name="location-outline" size={13} color={COLORS.textSecondary} />
                          <Text style={styles.metaText}>{item.county}</Text>
                        </View>
                        <Text style={styles.salaryBadge}>{item.salary}</Text>
                      </View>
                      <View style={styles.badgeRow}>
                        <View style={styles.typeBadge}>
                          <Text style={styles.typeBadgeText}>{item.type}</Text>
                        </View>
                        {item.verified && (
                          <View style={styles.verifiedBadge}>
                            <Ionicons name="shield-checkmark" size={12} color={COLORS.primary} />
                            <Text style={styles.verifiedBadgeText}>Verified</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.applyBtn,
                      isApplied && styles.appliedBtn,
                    ]}
                    onPress={(e) => {
                      e.stopPropagation();
                      if (!isApplied) handleApply(item.id);
                    }}
                    disabled={isApplied}
                  >
                    <Text
                      style={[
                        styles.applyBtnText,
                        isApplied && styles.appliedBtnText,
                      ]}
                    >
                      {isApplied ? "Applied" : "Apply Now"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="briefcase-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptyText}>Try adjusting your search criteria</Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: SPACING.lg, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: "700", color: COLORS.text },
  subtitle: { fontSize: 15, color: COLORS.textSecondary, marginTop: 2, marginBottom: SPACING.md },
  searchRow: { flexDirection: "row", gap: 8, marginBottom: SPACING.lg },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
  },
  jobCardOuter: { marginBottom: SPACING.sm },
  jobCard: { padding: SPACING.md, borderRadius: 20 },
  jobCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  jobCardLeft: { flexDirection: "row", gap: 12, flex: 1 },
  jobIconLarge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  jobCardInfo: { flex: 1 },
  jobTitleRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  jobTitle: { fontSize: 17, fontWeight: "700" },
  jobCompany: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 6 },
  jobMetaRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 13, color: COLORS.textSecondary },
  salaryBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
  badgeRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  typeBadgeText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: "500" },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
  },
  verifiedBadgeText: { fontSize: 11, color: COLORS.primary, fontWeight: "500" },
  applyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    minWidth: 90,
    alignItems: "center",
  },
  appliedBtn: {
    backgroundColor: COLORS.border,
  },
  applyBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.white },
  appliedBtnText: { color: COLORS.textSecondary },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginTop: 12 },
  emptyText: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
});
