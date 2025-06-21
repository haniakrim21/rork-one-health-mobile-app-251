import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, User, Video, MapPin, Home } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Appointment } from '@/types';

export interface AppointmentCardProps {
  appointment: Appointment;
  onPress: () => void;
}

export function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const getTypeIcon = () => {
    switch (appointment.type) {
      case 'virtual':
        return <Video size={20} color={colors.primary} />;
      case 'home':
        return <Home size={20} color={colors.primary} />;
      default:
        return <MapPin size={20} color={colors.primary} />;
    }
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.warning;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          {getTypeIcon()}
          <Text style={styles.type}>{appointment.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {appointment.status}
          </Text>
        </View>
      </View>
      
      <Text style={styles.title}>
        {appointment.title || `${appointment.specialistType} Appointment`}
      </Text>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <User size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>
            {appointment.provider || appointment.specialistName}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>
            {new Date(appointment.date).toLocaleDateString()}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
      </View>
      
      {appointment.notes && (
        <Text style={styles.notes}>{appointment.notes}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  notes: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 12,
    fontStyle: 'italic',
  },
});