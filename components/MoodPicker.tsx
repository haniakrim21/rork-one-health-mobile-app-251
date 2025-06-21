import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { X, Save } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export interface MoodPickerProps {
  onSave: (mood: number, notes?: string) => void;
  onClose: () => void;
}

export function MoodPicker({ onSave, onClose }: MoodPickerProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const moods = [
    { value: 1, label: 'Terrible', emoji: '😢', color: colors.terrible },
    { value: 2, label: 'Okay', emoji: '😐', color: colors.okay },
    { value: 3, label: 'Good', emoji: '😊', color: colors.good },
    { value: 4, label: 'Excellent', emoji: '😄', color: colors.excellent },
  ];

  const handleSave = () => {
    if (selectedMood !== null) {
      onSave(selectedMood, notes.trim() || undefined);
    }
  };

  return (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>How are you feeling?</Text>
          <TouchableOpacity onPress={handleSave} disabled={selectedMood === null}>
            <Save size={24} color={selectedMood !== null ? colors.primary : colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <View style={styles.moodGrid}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.value}
                style={[
                  styles.moodButton,
                  selectedMood === mood.value && styles.moodButtonSelected,
                  { borderColor: mood.color }
                ]}
                onPress={() => setSelectedMood(mood.value)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[
                  styles.moodLabel,
                  selectedMood === mood.value && { color: mood.color }
                ]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.notesLabel}>Notes (optional)</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="What's on your mind?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
          />
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
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
  },
  moodButtonSelected: {
    backgroundColor: colors.cardBackground,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  notesInput: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    color: colors.text,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
});