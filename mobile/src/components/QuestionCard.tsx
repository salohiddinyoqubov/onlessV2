import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Question } from '@onless/shared';

interface Props {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  showFeedback: boolean;
}

export function QuestionCard({ question, selectedOptionId, onSelectOption, showFeedback }: Props) {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Question Text */}
      <View style={styles.questionHeader}>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      {/* Image if exists */}
      {question.imagePath && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: question.imagePath }} style={styles.image} resizeMode="contain" />
        </View>
      )}

      {/* Options */}
      <View style={styles.optionsContainer}>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
                showCorrect && styles.optionButtonCorrect,
                showIncorrect && styles.optionButtonIncorrect,
              ]}
              onPress={() => !showFeedback && onSelectOption(option.id)}
              disabled={showFeedback}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.optionKey,
                  isSelected && styles.optionKeySelected,
                  showCorrect && styles.optionKeyCorrect,
                  showIncorrect && styles.optionKeyIncorrect,
                ]}
              >
                <Text
                  style={[
                    styles.optionKeyText,
                    (isSelected || showCorrect || showIncorrect) && styles.optionKeyTextSelected,
                  ]}
                >
                  {option.id}
                </Text>
              </View>
              <Text style={styles.optionText}>{option.text}</Text>
              {showCorrect && <Text style={styles.feedbackIcon}>✓</Text>}
              {showIncorrect && <Text style={styles.feedbackIcon}>✗</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Explanation */}
      {question.explanation && (
        <View style={styles.explanationContainer}>
          <TouchableOpacity
            style={styles.explanationButton}
            onPress={() => setIsExplanationOpen(!isExplanationOpen)}
          >
            <Text style={styles.explanationIcon}>💡</Text>
            <Text style={styles.explanationButtonText}>Izoh</Text>
            <Text style={styles.explanationArrow}>{isExplanationOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {isExplanationOpen && (
            <View style={styles.explanationContent}>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  questionHeader: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    height: 200,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  optionButtonSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionButtonCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  optionButtonIncorrect: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionKey: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionKeySelected: {
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
  },
  optionKeyCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#10B981',
  },
  optionKeyIncorrect: {
    borderColor: '#EF4444',
    backgroundColor: '#EF4444',
  },
  optionKeyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  optionKeyTextSelected: {
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  feedbackIcon: {
    fontSize: 20,
    marginLeft: 'auto',
  },
  explanationContainer: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#FCD34D',
    borderRadius: 12,
    overflow: 'hidden',
  },
  explanationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  explanationIcon: {
    fontSize: 20,
  },
  explanationButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
  },
  explanationArrow: {
    fontSize: 14,
    color: '#92400E',
  },
  explanationContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#FCD34D',
  },
  explanationText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});
