import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ScreenWrapper } from "@/components";
import { COLORS, SPACING } from "@/constants/theme";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";

export default function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const currentMessages = selectedChat ? messages[selectedChat] || [] : [];

  const handleSend = () => {
    if (!input.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      sender: "user" as const,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));
    setInput("");

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [
          ...prev[selectedChat],
          {
            id: Date.now(),
            sender: "employer" as const,
            text: "Great! I'll send you a calendar invite shortly. Looking forward to it.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      }));
    }, 1500);
  };

  if (selectedChat) {
    const conv = MOCK_CONVERSATIONS.find((c) => c.id === selectedChat);
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedChat(null)}>
              <Ionicons name="chevron-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <View style={styles.chatHeaderInfo}>
              <View style={styles.chatAvatar}>
                <Ionicons name="person" size={20} color={COLORS.textSecondary} />
              </View>
              <View>
                <View style={styles.chatHeaderNameRow}>
                  <Text style={styles.chatHeaderName}>{conv?.company}</Text>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                </View>
                <Text style={styles.chatHeaderRole}>{conv?.role}</Text>
              </View>
            </View>
          </View>

          <FlatList
            ref={flatListRef}
            data={currentMessages}
            keyExtractor={(m) => String(m.id)}
            contentContainerStyle={styles.messagesList}
            ListHeaderComponent={
              <Text style={styles.dateLabel}>TODAY</Text>
            }
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageRow,
                  item.sender === "user" ? styles.messageRowUser : styles.messageRowOther,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    item.sender === "user" ? styles.bubbleUser : styles.bubbleOther,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.sender === "user" && styles.messageTextUser,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            )}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          />

          <View style={styles.inputBar}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Type your message..."
                placeholderTextColor={COLORS.textMuted}
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                <Ionicons name="send" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScreenWrapper>
      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Messages</Text>
            <Text style={styles.subtitle}>Chat with employers about your applications.</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.convItem}
            onPress={() => setSelectedChat(item.id)}
          >
            <View style={styles.convAvatar}>
              <Ionicons name="person" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.convInfo}>
              <View style={styles.convTop}>
                <Text style={styles.convName}>{item.company}</Text>
                <Text style={styles.convTime}>{item.time}</Text>
              </View>
              <Text style={styles.convRole}>{item.role}</Text>
              <Text style={styles.convLast} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No conversations yet</Text>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: SPACING.lg, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: "700", color: COLORS.text },
  subtitle: { fontSize: 15, color: COLORS.textSecondary, marginTop: 2, marginBottom: SPACING.lg },
  empty: { textAlign: "center", color: COLORS.textMuted, fontSize: 15, marginTop: 60 },
  convItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  convAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  convInfo: { flex: 1 },
  convTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  convName: { fontSize: 16, fontWeight: "600" },
  convTime: { fontSize: 12, color: COLORS.textMuted },
  convRole: { fontSize: 13, color: COLORS.textSecondary, marginTop: 1 },
  convLast: { fontSize: 14, color: COLORS.textMuted, marginTop: 2 },
  unreadBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: { fontSize: 11, fontWeight: "700", color: COLORS.white },
  // Chat view
  chatContainer: { flex: 1, backgroundColor: COLORS.background },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  chatHeaderInfo: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeaderNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  chatHeaderName: { fontSize: 16, fontWeight: "600" },
  chatHeaderRole: { fontSize: 12, color: COLORS.textSecondary },
  messagesList: { padding: SPACING.lg, flexGrow: 1 },
  dateLabel: {
    textAlign: "center",
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: "600",
    marginBottom: SPACING.lg,
  },
  messageRow: { marginBottom: SPACING.md, maxWidth: "80%" },
  messageRowUser: { alignSelf: "flex-end" },
  messageRowOther: { alignSelf: "flex-start" },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  messageText: { fontSize: 15, color: COLORS.text, lineHeight: 20 },
  messageTextUser: { color: COLORS.white },
  messageTime: { fontSize: 10, color: COLORS.textMuted, marginTop: 4, paddingHorizontal: 4 },
  inputBar: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  chatInput: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
    fontSize: 15,
    color: COLORS.text,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
