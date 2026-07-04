import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ScreenWrapper, Card } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { MOCK_LEARNING_MODULES } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";

export default function LearningModuleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mod = MOCK_LEARNING_MODULES.find((m) => m.id === id);

  if (!mod) {
    return (
      <ScreenWrapper>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Module not found</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const progress = (mod.completed / mod.lessons) * 100;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          <Text style={styles.backText}>Back to Learning Hub</Text>
        </TouchableOpacity>

        <Card style={styles.detailCard}>
          <View style={[styles.iconBig, { backgroundColor: mod.bg }]}>
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
              size={32}
              color={mod.color}
            />
          </View>
          <Text style={styles.detailTitle}>{mod.title}</Text>
          <Text style={styles.detailDesc}>{mod.desc}</Text>

          <View style={styles.progressBox}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Course Progress</Text>
              <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressMeta}>
              {mod.completed} of {mod.lessons} lessons completed
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Course Content</Text>
          {Array.from({ length: mod.lessons }).map((_, i) => {
            const isDone = i < mod.completed;
            const isCurrent = i === mod.completed;
            return (
              <View
                key={i}
                style={[
                  styles.lessonItem,
                  isDone && styles.lessonDone,
                  isCurrent && styles.lessonCurrent,
                ]}
              >
                <View style={styles.lessonLeft}>
                  {isDone ? (
                    <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
                  ) : (
                    <View style={[styles.lessonDot, isCurrent && styles.lessonDotActive]} />
                  )}
                  <View>
                    <Text
                      style={[styles.lessonTitle, isDone && styles.lessonTitleDone]}
                    >
                      Lesson {i + 1}:{" "}
                      {isDone ? "Completed Module" : "Upcoming Topic"}
                    </Text>
                    <Text style={styles.lessonTime}>10 mins read</Text>
                  </View>
                </View>
                {isCurrent && (
                  <TouchableOpacity style={styles.lessonStartBtn}>
                    <Text style={styles.lessonStartText}>Start</Text>
                  </TouchableOpacity>
                )}
                {isDone && (
                  <TouchableOpacity>
                    <Text style={styles.reviewText}>Review</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.lg, paddingBottom: 100 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: SPACING.md },
  backText: { fontSize: 15, color: COLORS.textSecondary },
  detailCard: { padding: SPACING.lg, borderRadius: 24 },
  iconBig: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  detailTitle: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  detailDesc: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 22, marginBottom: SPACING.lg },
  progressBox: {
    padding: SPACING.md,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.lg,
  },
  progressRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  progressLabel: { fontSize: 14, fontWeight: "600" },
  progressPercent: { fontSize: 14, fontWeight: "600" },
  progressTrack: { height: 6, backgroundColor: COLORS.border, borderRadius: 3, marginBottom: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: COLORS.primary, borderRadius: 3 },
  progressMeta: { fontSize: 12, color: COLORS.textSecondary },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: SPACING.md },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginBottom: 8,
  },
  lessonDone: { backgroundColor: COLORS.primaryLight, borderColor: "transparent" },
  lessonCurrent: { borderColor: COLORS.primary },
  lessonLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  lessonDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  lessonDotActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  lessonTitle: { fontSize: 15, fontWeight: "600" },
  lessonTitleDone: { color: COLORS.primary },
  lessonTime: { fontSize: 12, color: COLORS.textSecondary },
  lessonStartBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  lessonStartText: { color: COLORS.white, fontWeight: "600", fontSize: 13 },
  reviewText: { color: COLORS.primary, fontSize: 13, fontWeight: "500" },
});
