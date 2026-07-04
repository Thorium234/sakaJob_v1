import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function VerificationScreen() {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.headerIcon}>
            <Ionicons name="shield-checkmark" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Trust & Safety on Saka</Text>
          <Text style={styles.subtitle}>
            We verify every user and employer to ensure a safe, fraud-free hiring environment across Kenya.
          </Text>
        </View>

        <View style={styles.grid}>
          <Card style={styles.seekerCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-outline" size={28} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Job Seekers</Text>
              <Text style={styles.cardSub}>Your identity is protected and verified.</Text>
            </View>
            <View style={styles.checkList}>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <View>
                  <Text style={styles.checkTitle}>National ID Verification</Text>
                  <Text style={styles.checkDesc}>Integration with eCitizen API to confirm identity.</Text>
                </View>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <View>
                  <Text style={styles.checkTitle}>Certificate Verification</Text>
                  <Text style={styles.checkDesc}>Academic credentials checked against issuing institutions.</Text>
                </View>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="alert-circle" size={20} color={COLORS.accent} />
                <View>
                  <Text style={styles.checkTitle}>Background Checks</Text>
                  <Text style={styles.checkDesc}>Police clearance (Good Conduct) verification.</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.startBtn}>
              <Text style={styles.startBtnText}>Start Verification</Text>
            </TouchableOpacity>
          </Card>

          <Card style={styles.employerCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="business-outline" size={28} color={COLORS.white} />
              <Text style={[styles.cardTitle, { color: COLORS.white }]}>Employers</Text>
              <Text style={[styles.cardSub, { color: COLORS.textMuted }]}>Only legitimate businesses post jobs.</Text>
            </View>
            <View style={styles.checkList}>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <View>
                  <Text style={[styles.checkTitle, { color: COLORS.white }]}>Company Registration</Text>
                  <Text style={[styles.checkDesc, { color: COLORS.textMuted }]}>CR12 and Business Permit verification.</Text>
                </View>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <View>
                  <Text style={[styles.checkTitle, { color: COLORS.white }]}>KRA PIN Verification</Text>
                  <Text style={[styles.checkDesc, { color: COLORS.textMuted }]}>Tax compliance and business legitimacy check.</Text>
                </View>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <View>
                  <Text style={[styles.checkTitle, { color: COLORS.white }]}>Physical Location</Text>
                  <Text style={[styles.checkDesc, { color: COLORS.textMuted }]}>Verified office addresses across all 47 counties.</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.learnBtn}>
              <Text style={styles.learnBtnText}>Learn More</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Trust score */}
        <Card style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Your Trust Score</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>85</Text>
            <Text style={styles.scoreMax}>/ 100</Text>
          </View>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreBarFill, { width: "85%" }]} />
          </View>
          <Text style={styles.scoreTip}>
            Upload your Certificate of Good Conduct to reach a perfect trust score and stand out to premium employers.
          </Text>
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  headerSection: { alignItems: "center", paddingVertical: SPACING.xl },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 15, color: COLORS.textSecondary, textAlign: "center", lineHeight: 22 },
  grid: { gap: SPACING.md, marginBottom: SPACING.md },
  seekerCard: { padding: SPACING.lg, borderRadius: 24 },
  cardHeader: { marginBottom: SPACING.lg },
  cardTitle: { fontSize: 22, fontWeight: "700", marginTop: 8 },
  cardSub: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  checkList: { gap: SPACING.md, marginBottom: SPACING.lg },
  checkItem: { flexDirection: "row", gap: 12 },
  checkTitle: { fontSize: 15, fontWeight: "600" },
  checkDesc: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  startBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  startBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  employerCard: {
    padding: SPACING.lg,
    borderRadius: 24,
    backgroundColor: COLORS.text,
  },
  learnBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.textMuted,
    alignItems: "center",
  },
  learnBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  scoreCard: {
    padding: SPACING.lg,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 0,
    alignItems: "center",
  },
  scoreTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: SPACING.sm },
  scoreRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: SPACING.md },
  scoreValue: { fontSize: 48, fontWeight: "800", color: COLORS.primary },
  scoreMax: { fontSize: 18, color: COLORS.textSecondary, marginBottom: 6 },
  scoreBar: {
    width: "80%",
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryLight,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },
  scoreBarFill: { height: "100%", backgroundColor: COLORS.primary, borderRadius: 4 },
  scoreTip: { fontSize: 13, color: COLORS.textSecondary, textAlign: "center", lineHeight: 20 },
});
