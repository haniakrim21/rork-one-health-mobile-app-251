import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Shield,
  CheckCircle2
} from 'lucide-react-native';

export default function VirtualConsultationScreen() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  
  const specialties = [
    { id: 'general', name: 'General Medicine', icon: User },
    { id: 'cardiology', name: 'Cardiology', icon: User },
    { id: 'dermatology', name: 'Dermatology', icon: User },
    { id: 'psychiatry', name: 'Psychiatry', icon: User },
    { id: 'pediatrics', name: 'Pediatrics', icon: User },
    { id: 'orthopedics', name: 'Orthopedics', icon: User },
  ];
  
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      rating: 4.9,
      experience: '15 years',
      nextAvailable: 'Today 2:30 PM',
      price: '$75',
      languages: ['English', 'Spanish'],
      verified: true,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      rating: 4.8,
      experience: '12 years',
      nextAvailable: 'Tomorrow 10:00 AM',
      price: '$120',
      languages: ['English', 'Mandarin'],
      verified: true,
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      rating: 4.9,
      experience: '8 years',
      nextAvailable: 'Today 4:15 PM',
      price: '$95',
      languages: ['English', 'Spanish'],
      verified: true,
    },
  ];
  
  const handleBookConsultation = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    Alert.alert(
      'Book Consultation',
      `Book a virtual consultation with ${doctor?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            Alert.alert('Success', 'Virtual consultation booked successfully!');
            router.back();
          }
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Virtual Consultation' }} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.headerCard}>
          <Video size={32} color={colors.primary} />
          <Text style={styles.headerTitle}>Virtual Healthcare Consultation</Text>
          <Text style={styles.headerSubtitle}>
            Connect with certified healthcare providers from the comfort of your home. Secure, convenient, and professional care.
          </Text>
        </Card>
        
        <Card style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>Why Choose Virtual Consultation?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <CheckCircle2 size={16} color={colors.success} />
              <Text style={styles.featureText}>Instant access to healthcare professionals</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle2 size={16} color={colors.success} />
              <Text style={styles.featureText}>No travel time or waiting rooms</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle2 size={16} color={colors.success} />
              <Text style={styles.featureText}>Secure and HIPAA-compliant platform</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle2 size={16} color={colors.success} />
              <Text style={styles.featureText}>Digital prescriptions and follow-ups</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.specialtiesCard}>
          <Text style={styles.sectionTitle}>Select Specialty</Text>
          <View style={styles.specialtiesGrid}>
            {specialties.map(specialty => (
              <TouchableOpacity
                key={specialty.id}
                style={[
                  styles.specialtyChip,
                  selectedSpecialty === specialty.id && styles.selectedSpecialty
                ]}
                onPress={() => setSelectedSpecialty(specialty.id)}
              >
                <specialty.icon 
                  size={20} 
                  color={selectedSpecialty === specialty.id ? colors.primary : colors.textSecondary} 
                />
                <Text style={[
                  styles.specialtyText,
                  selectedSpecialty === specialty.id && styles.selectedSpecialtyText
                ]}>
                  {specialty.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        <Text style={styles.sectionTitle}>Available Doctors</Text>
        
        {doctors.map(doctor => (
          <Card key={doctor.id} style={styles.doctorCard}>
            <View style={styles.doctorHeader}>
              <View style={styles.doctorAvatar}>
                <User size={24} color={colors.primary} />
              </View>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorNameRow}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  {doctor.verified && (
                    <Shield size={16} color={colors.success} />
                  )}
                </View>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.doctorMeta}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color={colors.warning} />
                    <Text style={styles.rating}>{doctor.rating}</Text>
                  </View>
                  <Text style={styles.experience}>{doctor.experience}</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{doctor.price}</Text>
                <Text style={styles.priceLabel}>consultation</Text>
              </View>
            </View>
            
            <View style={styles.doctorDetails}>
              <View style={styles.availabilityRow}>
                <Clock size={16} color={colors.primary} />
                <Text style={styles.availabilityText}>Next available: {doctor.nextAvailable}</Text>
              </View>
              
              <View style={styles.languagesRow}>
                <MessageCircle size={16} color={colors.textSecondary} />
                <Text style={styles.languagesText}>Languages: {doctor.languages.join(', ')}</Text>
              </View>
            </View>
            
            <View style={styles.doctorActions}>
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => Alert.alert('Doctor Profile', `View ${doctor.name}'s full profile and reviews`)}
              >
                <Text style={styles.profileButtonText}>View Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => handleBookConsultation(doctor.id)}
              >
                <Video size={16} color={colors.black} />
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
        
        <Card style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Phone size={20} color={colors.error} />
            <Text style={styles.emergencyTitle}>Emergency Consultation</Text>
          </View>
          <Text style={styles.emergencyText}>
            For urgent medical situations, connect with an emergency physician immediately.
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Alert.alert('Emergency Consultation', 'Connect to emergency healthcare provider')}
          >
            <Text style={styles.emergencyButtonText}>Connect Now</Text>
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.supportCard}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportText}>
            Our support team is available 24/7 to help you with technical issues or questions about your consultation.
          </Text>
          <TouchableOpacity 
            style={styles.supportButton}
            onPress={() => Alert.alert('Support', 'Contact our 24/7 support team')}
          >
            <MessageCircle size={16} color={colors.primary} />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
    paddingTop: 48,
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
  featuresCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  specialtiesCard: {
    marginBottom: 16,
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  selectedSpecialty: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  specialtyText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  selectedSpecialtyText: {
    color: colors.primary,
  },
  doctorCard: {
    marginBottom: 16,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 4,
  },
  experience: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  priceLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  doctorDetails: {
    marginBottom: 16,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  availabilityText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
  },
  languagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languagesText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  doctorActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileButton: {
    flex: 0.4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  bookButton: {
    flex: 0.55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
  },
  emergencyCard: {
    marginTop: 16,
    backgroundColor: colors.error + '10',
    borderColor: colors.error + '30',
    borderWidth: 1,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  emergencyButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.error,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  supportCard: {
    marginTop: 16,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  supportButtonText: {
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
});