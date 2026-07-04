export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3000/api';

export const COLORS = {
  primary: '#2563EB',
  primaryLight: '#DBEAFE',
  secondary: '#059669',
  secondaryLight: '#D1FAE5',
  accent: '#F59E0B',
  accentLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  white: '#FFFFFF',
  shadow: '#000',
};

export const FONTS = {
  regular: { fontFamily: undefined, fontWeight: '400' as const },
  medium: { fontFamily: undefined, fontWeight: '500' as const },
  semibold: { fontFamily: undefined, fontWeight: '600' as const },
  bold: { fontFamily: undefined, fontWeight: '700' as const },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 999,
};
