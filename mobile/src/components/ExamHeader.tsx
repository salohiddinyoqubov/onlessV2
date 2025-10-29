import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatTime } from '@onless/shared';

interface Props {
  ticketNumber: number;
  currentQuestionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  studentName?: string;
  onClose: () => void;
}

export function ExamHeader({
  ticketNumber,
  currentQuestionNumber,
  totalQuestions,
  timeRemaining,
  studentName,
  onClose,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Top Row: Branding and Close */}
      <View style={styles.topRow}>
        <View style={styles.branding}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>O</Text>
          </View>
          <View>
            <Text style={styles.brandName}>ONLESS</Text>
            <Text style={styles.brandWebsite}>onless.uz</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Row: Stats */}
      <View style={styles.statsRow}>
        {/* Ticket */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>📄</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Bilet</Text>
            <Text style={styles.statValue}>#{ticketNumber}</Text>
          </View>
        </View>

        {/* Question Progress */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>❓</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Savol</Text>
            <Text style={styles.statValue}>{currentQuestionNumber}/{totalQuestions}</Text>
          </View>
        </View>

        {/* Timer */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>⏱️</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Vaqt</Text>
            <Text style={styles.statValue}>{formatTime(timeRemaining)}</Text>
          </View>
        </View>
      </View>

      {/* Student Name */}
      {studentName && (
        <View style={styles.studentRow}>
          <Text style={styles.studentIcon}>👤</Text>
          <View>
            <Text style={styles.studentLabel}>O'QUVCHI</Text>
            <Text style={styles.studentName}>{studentName}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  brandWebsite: {
    fontSize: 10,
    color: '#6B7280',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EFF6FF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  studentIcon: {
    fontSize: 20,
  },
  studentLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  studentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});
