import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { MOCK_LEARNING_MODULES } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";

export default function LearningHome() {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Career Learning Hub</Text>
          <Text style={styles.heroSub}>
            Upskill yourself. Stand out to employers. Free courses designed for the Kenyan job market.
          </Text>
          <TouchableOpacity style={styles.resumeBtn}>
            <Text style={styles.resumeBtnText}>Resume Learning</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Course Modules</Text>
        <View style={styles.moduleGrid}>
          {MOCK_LEARNING_MODULES.map((mod) => {
            const progress = (mod.completed / mod.lessons) * 100;
            return (
              <TouchableOpacity
                key={mod.id}
                style={styles.moduleCard}
                onPress={() => router.push(`/learning/${mod.id}` as any)}
              >
                <View style={[styles.moduleIcon, { backgroundColor: mod.bg }]}>
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
                    size={24}
                    color={mod.color}
                  />
                </View>
                <Text style={styles.moduleTitle}>{mod.title}</Text>
                <Text style={styles.moduleMeta}>
                  {mod.completed} of {mod.lessons} lessons completed
                </Text>
                <View style={styles.moduleProgress}>
                  <View
                    style={[
                      styles.moduleProgressFill,
                      { width: `${progress}%`, backgroundColor: mod.color },
                    ]}
                  />
                </View>
                <Text style={styles.modulePercent}>{Math.round(progress)}%</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <Card style={styles.recommendedCard}>
          <View style={styles.recThumb}>
            <Ionicons name="play-circle" size={40} color={COLORS.textMuted} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
            <Text style={styles.recTitle}>Navigating Remote Work</Text>
            <Text style={styles.recDesc}>
              Learn the essential tools and etiquette for succeeding in a remote or hybrid environment.
            </Text>
            <TouchableOpacity style={styles.startBtn}>
              <Text style={styles.startBtnText}>Start Course</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  heroCard: {
    backgroundColor: COLORS.text,
    borderRadius: 24,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  heroTitle: { fontSize: 28, fontWeight: "700", color: COLORS.white, marginBottom: 8 },
  heroSub: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  resumeBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  resumeBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 15 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  moduleGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: SPACING.sm },
  moduleCard: {
    width: "47%",
    padding: SPACING.md,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexGrow: 1,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  moduleTitle: { fontSize: 15, fontWeight: "600", marginBottom: 4 },
  moduleMeta: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 },
  moduleProgress: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: 4,
    overflow: "hidden",
  },
  moduleProgressFill: { height: "100%", borderRadius: 2 },
  modulePercent: { fontSize: 11, color: COLORS.textSecondary },
  recommendedCard: {
    padding: SPACING.md,
    borderRadius: 20,
    flexDirection: "row",
    gap: 12,
  },
  recThumb: {
    width: 100,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  newBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: COLORS.orangeLight,
    marginBottom: 4,
  },
  newBadgeText: { fontSize: 10, fontWeight: "700", color: COLORS.orange },
  recTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  recDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 8 },
  startBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignSelf: "flex-start",
  },
  startBtnText: { color: COLORS.primary, fontWeight: "600", fontSize: 13 },
});
