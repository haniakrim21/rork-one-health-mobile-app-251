import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { X, Save } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export interface HealthMetricInputProps {
  onSave: (metric: any) => void;
  onClose: () => void;
}

export function HealthMetricInput({ onSave, onClose }: HealthMetricInputProps) {
  const [type, setType] = useState('heart_rate');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('bpm');

  const metricTypes = [
    { id: 'heart_rate', name: 'Heart Rate', unit: 'bpm' },
    { id: 'blood_pressure', name: 'Blood Pressure', unit: 'mmHg' },
    { id: 'weight', name: 'Weight', unit: 'kg' },
    { id: 'blood_glucose', name: 'Blood Glucose', unit: 'mg/dL' },
    { id: 'sleep', name: 'Sleep', unit: 'hours' },
    { id: 'steps', name: 'Steps', unit: 'steps' },
  ];

  const handleSave = () => {
    if (!value.trim()) return;
    
    const metric = {
      type,
      value: type === 'blood_pressure' ? value : parseFloat(value),
      unit,
      timestamp: new Date().toISOString(),
      source: 'manual' as const,
    };
    
    onSave(metric);
  };

  const handleTypeSelect = (selectedType: string) => {
    const metricType = metricTypes.find(m => m.id === selectedType);
    if (metricType) {
      setType(selectedType);
      setUnit(metricType.unit);
    }
  };

  return (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Health Metric</Text>
          <TouchableOpacity onPress={handleSave} disabled={!value.trim()}>
            <Save size={24} color={value.trim() ? colors.primary : colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.label}>Metric Type</Text>
          <View style={styles.typeGrid}>
            {metricTypes.map((metricType) => (
              <TouchableOpacity
                key={metricType.id}
                style={[
                  styles.typeButton,
                  type === metricType.id && styles.typeButtonSelected
                ]}
                onPress={() => handleTypeSelect(metricType.id)}
              >
                <Text style={[
                  styles.typeButtonText,
                  type === metricType.id && styles.typeButtonTextSelected
                ]}>
                  {metricType.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>Value</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              placeholder={type === 'blood_pressure' ? '120/80' : '0'}
              placeholderTextColor={colors.textSecondary}
              keyboardType={type === 'blood_pressure' ? 'default' : 'numeric'}
            />
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 24,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeButtonSelected: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  typeButtonTextSelected: {
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  unitText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 8,
  },
});