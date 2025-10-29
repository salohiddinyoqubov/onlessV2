import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Exam: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export function HomeScreen({ navigation }: Props) {
  const handleStartExam = () => {
    navigation.navigate('Exam');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>O</Text>
          </View>
          <Text style={styles.brandName}>ONLESS</Text>
          <Text style={styles.brandSubtitle}>Haydovchilik Nazariy Imtihoni</Text>
          <Text style={styles.brandWebsite}>onless.uz</Text>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Xush kelibsiz!</Text>
          <Text style={styles.welcomeText}>
            Haydovchilik guvohnomasini olish uchun nazariy imtihonni boshlang
          </Text>
        </View>

        {/* Test Button */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={handleStartExam}
          activeOpacity={0.8}
        >
          <Text style={styles.testButtonText}>Testni Boshlash</Text>
          <Text style={styles.testButtonSubtext}>20 savol • 40 daqiqa</Text>
        </TouchableOpacity>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoNumber}>20</Text>
            <Text style={styles.infoLabel}>Savollar soni</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoNumber}>40</Text>
            <Text style={styles.infoLabel}>Daqiqa</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoNumber}>70%</Text>
            <Text style={styles.infoLabel}>O'tish bali</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  brandWebsite: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  welcomeSection: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  testButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  testButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  testButtonSubtext: {
    fontSize: 14,
    color: '#BFDBFE',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  infoNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
