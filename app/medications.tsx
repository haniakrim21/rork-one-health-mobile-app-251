import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { MedicationCard } from '@/components/MedicationCard';
import { useHealthStore } from '@/store/health-store';
import { 
  Pill, 
  Plus, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Search
} from 'lucide-react-native';

export default function MedicationsScreen() {
  const { medications = [] } = useHealthStore();
  const [activeFilter, setActiveFilter] = useState<'active' | 'completed' | 'all'>('active');
  
  const filteredMedications = medications.filter(medication => {
    if (activeFilter === 'active') {
      return !medication.endDate;
    }
    if (activeFilter === 'completed') {
      return medication.endDate;
    }
    return true;
  });
  
  const todaysMedications = medications.filter(med => !med.endDate);
  const upcomingReminders = todaysMedications.filter(med => med.reminderEnabled);
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Medications' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medications</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => Alert.alert('Add Medication', 'Add a new medication to your list')}
          >
            <Plus size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        {(['active', 'completed', 'all'] as const).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.activeFilterChip
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeFilter === 'active' && (
          <>
            <Card style={styles.todayCard}>
              <View style={styles.todayHeader}>
                <Clock size={20} color={colors.primary} />
                <Text style={styles.todayTitle}>Today's Schedule</Text>
              </View>
              <Text style={styles.todaySubtitle}>
                {todaysMedications.length} medications • {upcomingReminders.length} reminders set
              </Text>
              
              <View style={styles.todayStats}>
                <View style={styles.statItem}>
                  <CheckCircle2 size={16} color={colors.success} />
                  <Text style={styles.statText}>3 taken</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={16} color={colors.warning} />
                  <Text style={styles.statText}>2 pending</Text>
                </View>
                <View style={styles.statItem}>
                  <AlertTriangle size={16} color={colors.error} />
                  <Text style={styles.statText}>1 missed</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.remindersCard}>
              <View style={styles.remindersHeader}>
                <AlertTriangle size={20} color={colors.warning} />
                <Text style={styles.remindersTitle}>Upcoming Reminders</Text>
              </View>
              
              <View style={styles.reminderItem}>
                <Text style={styles.reminderTime}>2:00 PM</Text>
                <Text style={styles.reminderMed}>Lisinopril 10mg</Text>
                <TouchableOpacity style={styles.reminderButton}>
                  <Text style={styles.reminderButtonText}>Mark Taken</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.reminderItem}>
                <Text style={styles.reminderTime}>6:00 PM</Text>
                <Text style={styles.reminderMed}>Metformin 500mg</Text>
                <TouchableOpacity style={styles.reminderButton}>
                  <Text style={styles.reminderButtonText}>Mark Taken</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </>
        )}
        
        <View style={styles.medicationsSection}>
          <Text style={styles.sectionTitle}>
            {activeFilter === 'active' ? 'Active Medications' : 
             activeFilter === 'completed' ? 'Completed Medications' : 'All Medications'}
          </Text>
          
          {filteredMedications.length > 0 ? (
            <View style={styles.medicationsList}>
              {filteredMedications.map(medication => {
                const transformedMedication = {
                  ...medication,
                  startDate: medication.startDate || new Date().toISOString(),
                  timeOfDay: medication.timeOfDay || ['morning'],
                  reminderEnabled: medication.reminderEnabled || false,
                };
                
                return (
                  <MedicationCard
                    key={medication.id}
                    medication={transformedMedication}
                    onEdit={() => router.push(`/medications/${medication.id}/edit`)}
                  />
                );
              })}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Pill size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>
                {activeFilter === 'active' ? 'No active medications' :
                 activeFilter === 'completed' ? 'No completed medications' : 'No medications found'}
              </Text>
              <TouchableOpacity 
                style={styles.addMedicationButton}
                onPress={() => Alert.alert('Add Medication', 'Add your first medication')}
              >
                <Text style={styles.addMedicationText}>Add Medication</Text>
              </TouchableOpacity>
            </Card>
          )}
        </View>
        
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Medication Tips</Text>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>Take medications at the same time each day</Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>Set up reminders to avoid missing doses</Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>Keep a medication list for emergencies</Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle2 size={16} color={colors.success} />
            <Text style={styles.tipText}>Consult your doctor before stopping any medication</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: colors.black,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  todayCard: {
    marginBottom: 16,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  todayTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  todaySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 4,
  },
  remindersCard: {
    marginBottom: 16,
  },
  remindersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  remindersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reminderTime: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    width: 60,
  },
  reminderMed: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    marginLeft: 12,
  },
  reminderButton: {
    backgroundColor: colors.success + '20',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  reminderButtonText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
  },
  medicationsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  medicationsList: {
    gap: 12,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginVertical: 16,
    textAlign: 'center',
  },
  addMedicationButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  addMedicationText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  tipsCard: {
    
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});