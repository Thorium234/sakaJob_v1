import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Button, Input, ScreenWrapper } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [role, setRole] = useState<"JOB_SEEKER" | "EMPLOYER">("JOB_SEEKER");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyRegNumber, setCompanyRegNumber] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    if (password.length < 6) e.password = "At least 6 characters";
    if (role === "EMPLOYER" && !companyName.trim()) e.companyName = "Company name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await register({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        role,
        phone: phone.trim() || undefined,
        companyName: companyName.trim() || undefined,
        companyRegNumber: companyRegNumber.trim() || undefined,
        companyDescription: companyDescription.trim() || undefined,
      });
      router.replace("/(tabs)" as any);
    } catch (err: any) {
      Alert.alert("Registration failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoSection}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <Text style={styles.appName}>Saka</Text>
          </View>

          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Join Saka today</Text>

          {/* Role toggle */}
          <View style={styles.roleRow}>
            <Button
              title="Job Seeker"
              variant={role === "JOB_SEEKER" ? "primary" : "outline"}
              onPress={() => setRole("JOB_SEEKER")}
              style={{ flex: 1 }}
            />
            <View style={{ width: SPACING.sm }} />
            <Button
              title="Employer"
              variant={role === "EMPLOYER" ? "primary" : "outline"}
              onPress={() => setRole("EMPLOYER")}
              style={{ flex: 1 }}
            />
          </View>

          <Input
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            error={errors.fullName}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <Input
            label="Phone (optional)"
            placeholder="+254 7XX XXX XXX"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Input
            label="Password"
            placeholder="At least 6 characters"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          {role === "EMPLOYER" && (
            <>
              <Input
                label="Company Name"
                placeholder="Your company"
                value={companyName}
                onChangeText={setCompanyName}
                error={errors.companyName}
              />
              <Input
                label="Company Reg. Number (optional)"
                placeholder="Reg number"
                value={companyRegNumber}
                onChangeText={setCompanyRegNumber}
              />
              <Input
                label="Company Description (optional)"
                placeholder="Tell us about your company"
                multiline
                numberOfLines={3}
                value={companyDescription}
                onChangeText={setCompanyDescription}
              />
            </>
          )}

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={{ marginTop: SPACING.sm }}
          />

          <Button
            title="Already have an account? Sign In"
            variant="ghost"
            onPress={() => router.back()}
            style={{ marginTop: SPACING.md }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  logoSection: { alignItems: "center", marginBottom: SPACING.lg, marginTop: SPACING.xl },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  logoText: { fontSize: 28, fontWeight: "800", color: COLORS.white },
  appName: { fontSize: 24, fontWeight: "700", color: COLORS.text },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  roleRow: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
});
