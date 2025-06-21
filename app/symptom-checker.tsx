import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Brain, 
  Plus, 
  X, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  Phone,
  Calendar
} from 'lucide-react-native';

export default function SymptomCheckerScreen() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Runny nose',
    'Fatigue', 'Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain',
    'Chest pain', 'Difficulty breathing', 'Dizziness', 'Muscle aches',
    'Joint pain', 'Rash', 'Loss of appetite', 'Chills'
  ];
  
  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setNewSymptom('');
    }
  };
  
  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };
  
  const analyzeSymptoms = () => {
    if (symptoms.length === 0) {
      Alert.alert('No Symptoms', 'Please add at least one symptom to analyze.');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        urgency: symptoms.some(s => s.toLowerCase().includes('chest pain') || s.toLowerCase().includes('difficulty breathing')) ? 'emergency' : 
                 severity === 'severe' ? 'high' : 
                 severity === 'moderate' ? 'medium' : 'low',
        recommendation: severity === 'severe' ? 
          'Seek immediate medical attention' : 
          'Monitor symptoms and consider consulting a healthcare provider',
        possibleConditions: [
          {
            condition: 'Upper Respiratory Infection',
            probability: 65,
            description: 'Common viral or bacterial infection affecting the upper respiratory tract.',
          },
          {
            condition: 'Common Cold',
            probability: 30,
            description: 'Mild viral infection with typical cold symptoms.',
          }
        ],
        nextSteps: [
          'Monitor symptoms closely',
          'Stay hydrated and rest',
          'Contact your doctor if symptoms worsen',
          'Consider over-the-counter medications for symptom relief',
        ],
        redFlags: severity === 'severe' ? ['Worsening symptoms', 'Difficulty breathing', 'Severe pain'] : undefined,
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return colors.error;
      case 'high': return colors.warning;
      case 'medium': return colors.primary;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };
  
  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return AlertTriangle;
      case 'high': return Clock;
      case 'medium': return Brain;
      case 'low': return CheckCircle2;
      default: return Brain;
    }
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'AI Symptom Checker' }} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.headerCard}>
          <Brain size={32} color={colors.primary} />
          <Text style={styles.headerTitle}>AI-Powered Symptom Analysis</Text>
          <Text style={styles.headerSubtitle}>
            Get preliminary health insights based on your symptoms. This tool provides guidance but should not replace professional medical advice.
          </Text>
        </Card>
        
        <Card style={styles.inputCard}>
          <Text style={styles.sectionTitle}>Add Your Symptoms</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.symptomInput}
              value={newSymptom}
              onChangeText={setNewSymptom}
              placeholder="Type a symptom..."
              placeholderTextColor={colors.textSecondary}
              onSubmitEditing={() => addSymptom(newSymptom)}
            />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addSymptom(newSymptom)}
            >
              <Plus size={20} color={colors.background} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.commonSymptomsTitle}>Common Symptoms</Text>
          <View style={styles.commonSymptomsGrid}>
            {commonSymptoms.map(symptom => (
              <TouchableOpacity
                key={symptom}
                style={[
                  styles.commonSymptomChip,
                  symptoms.includes(symptom) && styles.selectedSymptomChip
                ]}
                onPress={() => symptoms.includes(symptom) ? removeSymptom(symptom) : addSymptom(symptom)}
              >
                <Text style={[
                  styles.commonSymptomText,
                  symptoms.includes(symptom) && styles.selectedSymptomText
                ]}>
                  {symptom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {symptoms.length > 0 && (
            <View style={styles.selectedSymptomsContainer}>
              <Text style={styles.selectedSymptomsTitle}>Selected Symptoms</Text>
              <View style={styles.selectedSymptoms}>
                {symptoms.map(symptom => (
                  <View key={symptom} style={styles.selectedSymptom}>
                    <Text style={styles.selectedSymptomText}>{symptom}</Text>
                    <TouchableOpacity onPress={() => removeSymptom(symptom)}>
                      <X size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card>
        
        <Card style={styles.severityCard}>
          <Text style={styles.sectionTitle}>Symptom Severity</Text>
          <View style={styles.severityOptions}>
            {(['mild', 'moderate', 'severe'] as const).map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.severityOption,
                  severity === level && styles.selectedSeverity
                ]}
                onPress={() => setSeverity(level)}
              >
                <Text style={[
                  styles.severityText,
                  severity === level && styles.selectedSeverityText
                ]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        <Card style={styles.durationCard}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <TextInput
            style={styles.durationInput}
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g., 2 days, 1 week"
            placeholderTextColor={colors.textSecondary}
          />
        </Card>
        
        <TouchableOpacity 
          style={[styles.analyzeButton, isAnalyzing && styles.analyzingButton]}
          onPress={analyzeSymptoms}
          disabled={isAnalyzing}
        >
          <Brain size={20} color={colors.black} />
          <Text style={styles.analyzeButtonText}>
            {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
          </Text>
        </TouchableOpacity>
        
        {result && (
          <Card style={[styles.resultCard, { borderColor: getUrgencyColor(result.urgency) + '30' }]}>
            <View style={styles.resultHeader}>
              {React.createElement(getUrgencyIcon(result.urgency), {
                size: 24,
                color: getUrgencyColor(result.urgency)
              })}
              <Text style={[styles.urgencyText, { color: getUrgencyColor(result.urgency) }]}>
                {result.urgency.toUpperCase()} PRIORITY
              </Text>
            </View>
            
            <Text style={styles.recommendationText}>{result.recommendation}</Text>
            
            <Text style={styles.conditionsTitle}>Possible Conditions</Text>
            {result.possibleConditions.map((condition: any, index: number) => (
              <View key={index} style={styles.conditionItem}>
                <View style={styles.conditionHeader}>
                  <Text style={styles.conditionName}>{condition.condition}</Text>
                  <Text style={styles.conditionProbability}>{condition.probability}%</Text>
                </View>
                <Text style={styles.conditionDescription}>{condition.description}</Text>
              </View>
            ))}
            
            <Text style={styles.nextStepsTitle}>Recommended Next Steps</Text>
            {result.nextSteps.map((step: string, index: number) => (
              <View key={index} style={styles.nextStepItem}>
                <CheckCircle2 size={16} color={colors.success} />
                <Text style={styles.nextStepText}>{step}</Text>
              </View>
            ))}
            
            {result.redFlags && (
              <>
                <Text style={styles.redFlagsTitle}>Warning Signs</Text>
                {result.redFlags.map((flag: string, index: number) => (
                  <View key={index} style={styles.redFlagItem}>
                    <AlertTriangle size={16} color={colors.error} />
                    <Text style={styles.redFlagText}>{flag}</Text>
                  </View>
                ))}
              </>
            )}
            
            <View style={styles.resultActions}>
              <TouchableOpacity 
                style={styles.bookAppointmentButton}
                onPress={() => router.push('/virtual-consultation')}
              >
                <Calendar size={16} color={colors.black} />
                <Text style={styles.bookAppointmentText}>Book Appointment</Text>
              </TouchableOpacity>
              
              {result.urgency === 'emergency' && (
                <TouchableOpacity 
                  style={styles.emergencyButton}
                  onPress={() => Alert.alert('Emergency', 'This would connect to emergency services')}
                >
                  <Phone size={16} color={colors.background} />
                  <Text style={styles.emergencyButtonText}>Call 911</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        )}
        
        <Card style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>Important Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This symptom checker is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for proper medical evaluation.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 64,
    paddingBottom: 32,
  },
  headerCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  symptomInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonSymptomsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 12,
  },
  commonSymptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  commonSymptomChip: {
    backgroundColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSymptomChip: {
    backgroundColor: colors.primary,
  },
  commonSymptomText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  selectedSymptomText: {
    color: colors.black,
  },
  selectedSymptomsContainer: {
    marginTop: 16,
  },
  selectedSymptomsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  selectedSymptoms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedSymptom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSymptomText: {
    fontSize: 12,
    color: colors.primary,
    marginRight: 8,
  },
  severityCard: {
    marginBottom: 16,
  },
  severityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedSeverity: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  severityText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectedSeverityText: {
    color: colors.primary,
  },
  durationCard: {
    marginBottom: 16,
  },
  durationInput: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  analyzingButton: {
    backgroundColor: colors.border,
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  resultCard: {
    marginBottom: 16,
    borderWidth: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  urgencyText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  recommendationText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    lineHeight: 22,
  },
  conditionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  conditionItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conditionName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  conditionProbability: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  conditionDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nextStepText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  redFlagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginBottom: 12,
    marginTop: 16,
  },
  redFlagItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  redFlagText: {
    fontSize: 14,
    color: colors.error,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  bookAppointmentButton: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookAppointmentText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
  },
  emergencyButton: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: colors.background,
    fontWeight: '600',
    marginLeft: 8,
  },
  disclaimerCard: {
    backgroundColor: colors.warning + '10',
    borderColor: colors.warning + '30',
    borderWidth: 1,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.warning,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});