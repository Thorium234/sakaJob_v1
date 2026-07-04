import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { COLORS } from "@/constants/theme";

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/(tabs)" />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
