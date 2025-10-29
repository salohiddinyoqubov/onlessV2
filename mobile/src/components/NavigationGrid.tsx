import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Props {
  questionIds: number[];
  answeredQuestionIds: Set<number>;
  currentQuestionId: number;
  onNavigate: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

export function NavigationGrid({
  questionIds,
  answeredQuestionIds,
  currentQuestionId,
  onNavigate,
  onNext,
  onPrevious,
  onSkip,
}: Props) {
  const [isGridOpen, setIsGridOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Question Grid (Collapsible) */}
      {isGridOpen && (
        <ScrollView style={styles.gridScrollContainer} contentContainerStyle={styles.gridContainer}>
          <View style={styles.grid}>
            {questionIds.map((questionId, index) => {
              const isAnswered = answeredQuestionIds.has(questionId);
              const isCurrent = questionId === currentQuestionId;

              return (
                <TouchableOpacity
                  key={questionId}
                  style={[
                    styles.gridButton,
                    isAnswered && styles.gridButtonAnswered,
                    isCurrent && styles.gridButtonCurrent,
                  ]}
                  onPress={() => {
                    onNavigate(index);
                    setIsGridOpen(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.gridButtonText,
                      (isAnswered || isCurrent) && styles.gridButtonTextActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* Navigation Controls */}
      <View style={styles.controls}>
        {/* Grid Toggle Button */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsGridOpen(!isGridOpen)}
        >
          <Text style={styles.toggleButtonText}>
            {isGridOpen ? 'Yopish' : 'Barcha savollar'} ({answeredQuestionIds.size}/{questionIds.length})
          </Text>
          <Text style={styles.toggleIcon}>{isGridOpen ? '▼' : '▲'}</Text>
        </TouchableOpacity>

        {/* Arrow and Skip Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={onPrevious}>
            <Text style={styles.actionButtonIcon}>←</Text>
            <Text style={styles.actionButtonText}>Orqaga</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSkip} onPress={onSkip}>
            <Text style={styles.actionButtonIconSkip}>⇥</Text>
            <Text style={styles.actionButtonTextSkip}>O'tkazish</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonNext} onPress={onNext}>
            <Text style={styles.actionButtonTextNext}>Keyingi</Text>
            <Text style={styles.actionButtonIconNext}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  gridScrollContainer: {
    maxHeight: 256,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  gridContainer: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridButton: {
    width: '18%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  gridButtonAnswered: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  gridButtonCurrent: {
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
  },
  gridButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  gridButtonTextActive: {
    color: '#FFFFFF',
  },
  controls: {
    padding: 12,
    gap: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  toggleIcon: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 6,
  },
  actionButtonIcon: {
    fontSize: 18,
    color: '#1F2937',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionButtonSkip: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 6,
  },
  actionButtonIconSkip: {
    fontSize: 18,
    color: '#2563EB',
  },
  actionButtonTextSkip: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  actionButtonNext: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 6,
  },
  actionButtonTextNext: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButtonIconNext: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
