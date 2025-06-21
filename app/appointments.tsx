import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { AppointmentCard } from '@/components/AppointmentCard';
import { useHealthStore } from '@/store/health-store';
import { Appointment } from '@/types';
import { 
  Calendar, 
  Plus, 
  Clock, 
  Video,
  MapPin,
  Filter,
  Search
} from 'lucide-react-native';

export default function AppointmentsScreen() {
  const { appointments = [] } = useHealthStore();
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  
  const now = new Date();
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    if (activeFilter === 'upcoming') {
      return appointmentDate >= now;
    }
    if (activeFilter === 'past') {
      return appointmentDate < now;
    }
    return true;
  });
  
  const quickActions = [
    {
      title: 'Virtual Consultation',
      description: 'Book online appointment',
      icon: Video,
      color: colors.primary,
      onPress: () => router.push('/virtual-consultation'),
    },
    {
      title: 'In-Person Visit',
      description: 'Schedule clinic visit',
      icon: MapPin,
      color: colors.success,
      onPress: () => Alert.alert('In-Person', 'Schedule in-person appointment'),
    },
    {
      title: 'Emergency',
      description: 'Urgent care needed',
      icon: Clock,
      color: colors.error,
      onPress: () => Alert.alert('Emergency', 'Connect to emergency services'),
    },
  ];
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Appointments' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/virtual-consultation')}
          >
            <Plus size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        {(['upcoming', 'past', 'all'] as const).map(filter => (
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
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Book</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickActionCard}
                onPress={action.onPress}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>
            {activeFilter === 'upcoming' ? 'Upcoming Appointments' : 
             activeFilter === 'past' ? 'Past Appointments' : 'All Appointments'}
          </Text>
          
          {filteredAppointments.length > 0 ? (
            <View style={styles.appointmentsList}>
              {filteredAppointments.map(appointment => {
                const transformedAppointment: Appointment = {
                  ...appointment,
                  type: (appointment.type as 'virtual' | 'physical' | 'home') || 'virtual',
                  specialistId: appointment.id,
                  specialistName: appointment.provider || 'Dr. Unknown',
                  specialistType: 'General Practitioner',
                  duration: 30,
                };
                
                return (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={transformedAppointment}
                    onPress={() => router.push(`/appointment-details/${appointment.id}`)}
                  />
                );
              })}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Calendar size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>
                {activeFilter === 'upcoming' ? 'No upcoming appointments' :
                 activeFilter === 'past' ? 'No past appointments' : 'No appointments found'}
              </Text>
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => router.push('/virtual-consultation')}
              >
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </Card>
          )}
        </View>
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
  quickActionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  quickActionsGrid: {
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  quickActionDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  appointmentsSection: {
    
  },
  appointmentsList: {
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
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
});