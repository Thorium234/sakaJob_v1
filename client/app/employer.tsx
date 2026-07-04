import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

function MockBarChart() {
  const data = [
    { label: "Mon", value: 40 },
    { label: "Tue", value: 65 },
    { label: "Wed", value: 45 },
    { label: "Thu", value: 90 },
    { label: "Fri", value: 75 },
    { label: "Sat", value: 30 },
    { label: "Sun", value: 50 },
  ];
  return (
    <View style={styles.chartRow}>
      {data.map((d, i) => (
        <View key={i} style={styles.chartBarWrap}>
          <View
            style={[styles.chartBar, { height: `${d.value}%` }]}
          />
          <Text style={styles.chartLabel}>{d.label}</Text>
        </View>
      ))}
    </View>
  );
}

const CANDIDATES = [
  { name: "Sarah M.", role: "Software Developer", score: 95 },
  { name: "David K.", role: "Graphic Designer", score: 88 },
  { name: "Esther W.", role: "Accountant", score: 92 },
  { name: "Peter O.", role: "Electrician", score: 85 },
];

export default function EmployerScreen() {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Employer Dashboard</Text>
            <Text style={styles.subtitle}>Manage your job postings and applicants.</Text>
          </View>
          <View style={styles.verifyBadge}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
            <Text style={styles.verifyText}>Verified</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {[
            { label: "Active Jobs", value: "12", icon: "briefcase" as const, color: COLORS.blue, bg: COLORS.blueLight },
            { label: "Applications", value: "348", icon: "people" as const, color: COLORS.primary, bg: COLORS.primaryLight },
            { label: "Shortlisted", value: "45", icon: "trending-up" as const, color: COLORS.orange, bg: COLORS.orangeLight },
            { label: "Interviews", value: "8", icon: "calendar" as const, color: COLORS.purple, bg: COLORS.purpleLight },
          ].map((stat, i) => (
            <Card key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.bg }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Top Candidates table */}
        <Card style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.sectionTitle}>Top Candidates</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {CANDIDATES.map((c, i) => (
            <View key={i} style={styles.candidateRow}>
              <View style={styles.candidateLeft}>
                <View style={styles.candidateAvatar}>
                  <Text style={styles.candidateAvatarText}>{c.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.candidateName}>{c.name}</Text>
                  <Text style={styles.candidateRole}>{c.role}</Text>
                </View>
              </View>
              <View style={styles.candidateRight}>
                <View style={styles.scoreBar}>
                  <View style={[styles.scoreFill, { width: `${c.score}%` }]} />
                </View>
                <Text style={styles.scoreText}>{c.score}%</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Applications Trend</Text>
          <Text style={styles.chartSub}>Applications received over the last 7 days.</Text>
          <MockBarChart />
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  headerRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: SPACING.lg },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  verifyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  verifyText: { fontSize: 12, fontWeight: "700", color: COLORS.white },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: SPACING.md },
  statCard: {
    width: "48%",
    padding: SPACING.md,
    borderRadius: 20,
    flexGrow: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: { fontSize: 28, fontWeight: "800" },
  statLabel: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  tableCard: { padding: SPACING.md, borderRadius: 20, marginBottom: SPACING.md },
  tableHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: SPACING.md },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  viewAll: { fontSize: 14, color: COLORS.primary, fontWeight: "600" },
  candidateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  candidateLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  candidateAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  candidateAvatarText: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  candidateName: { fontSize: 15, fontWeight: "600" },
  candidateRole: { fontSize: 12, color: COLORS.textSecondary },
  candidateRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  scoreBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },
  scoreFill: { height: "100%", backgroundColor: COLORS.primary, borderRadius: 3 },
  scoreText: { fontSize: 13, fontWeight: "700", width: 38, textAlign: "right" },
  chartCard: { padding: SPACING.md, borderRadius: 20, marginBottom: SPACING.md },
  chartSub: { fontSize: 13, color: COLORS.textSecondary, marginBottom: SPACING.lg },
  chartRow: {
    height: 140,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  chartBarWrap: { flex: 1, alignItems: "center", gap: 6 },
  chartBar: {
    width: "100%",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 4,
    maxHeight: 120,
  },
  chartLabel: { fontSize: 10, color: COLORS.textMuted },
});
