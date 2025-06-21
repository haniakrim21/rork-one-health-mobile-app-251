import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  CheckCircle2,
  AlertTriangle,
  Plus,
  User,
  Phone,
  FileText
} from 'lucide-react-native';

export default function ReferralsScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  
  const activeReferrals = [
    {
      id: '1',
      specialistType: 'Cardiologist',
      reason: 'Elevated blood pressure readings',
      urgency: 'routine',
      status: 'pending',
      referringProvider: 'Dr. Sarah Johnson',
      createdAt: '2025-06-15',
      availableSpecialists: [
        {
          id: 'card1',
          name: 'Dr. Michael Rodriguez',
          hospital: 'Heart Center',
          nextAvailable: '2025-06-25',
          rating: 4.8,
          distance: '2.3 miles',
        },
        {
          id: 'card2',
          name: 'Dr. Lisa Chen',
          hospital: 'Cardiac Institute',
          nextAvailable: '2025-06-28',
          rating: 4.9,
          distance: '3.1 miles',
        },
      ],
    },
    {
      id: '2',
      specialistType: 'Endocrinologist',
      reason: 'Diabetes management optimization',
      urgency: 'routine',
      status: 'approved',
      referringProvider: 'Dr. Michael Chen',
      createdAt: '2025-06-10',
      selectedSpecialist: {
        name: 'Dr. Amanda Foster',
        hospital: 'Diabetes Center',
        appointmentDate: '2025-07-05',
        appointmentTime: '2:00 PM',
      },
    },
  ];
  
  const completedReferrals = [
    {
      id: '3',
      specialistType: 'Dermatologist',
      reason: 'Skin lesion evaluation',
      status: 'completed',
      referringProvider: 'Dr. Sarah Johnson',
      completedDate: '2025-05-20',
      specialist: 'Dr. Jennifer Park',
      outcome: 'Benign lesion, no further treatment needed',
    },
  ];
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'stat': return colors.error;
      case 'urgent': return colors.warning;
      case 'routine': return colors.success;
      default: return colors.textSecondary;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'approved': return colors.success;
      case 'completed': return colors.primary;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };
  
  const renderActiveReferrals = () => (
    <>
      {activeReferrals.map(referral => (
        <Card key={referral.id} style={styles.referralCard}>
          <View style={styles.referralHeader}>
            <View style={styles.referralTitleContainer}>
              <Text style={styles.referralSpecialty}>{referral.specialistType}</Text>
              <View style={styles.referralMeta}>
                <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(referral.urgency) + '20' }]}>
                  <Text style={[styles.urgencyText, { color: getUrgencyColor(referral.urgency) }]}>
                    {referral.urgency}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(referral.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(referral.status) }]}>
                    {referral.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          <Text style={styles.referralReason}>{referral.reason}</Text>
          
          <View style={styles.referralDetails}>
            <View style={styles.detailItem}>
              <User size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Referred by {referral.referringProvider}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Created {new Date(referral.createdAt).toLocaleDateString()}</Text>
            </View>
          </View>
          
          {referral.status === 'pending' && referral.availableSpecialists && (
            <View style={styles.specialistsSection}>
              <Text style={styles.specialistsTitle}>Available Specialists</Text>
              {referral.availableSpecialists.map(specialist => (
                <View key={specialist.id} style={styles.specialistItem}>
                  <View style={styles.specialistInfo}>
                    <Text style={styles.specialistName}>{specialist.name}</Text>
                    <Text style={styles.specialistHospital}>{specialist.hospital}</Text>
                    <View style={styles.specialistMeta}>
                      <View style={styles.ratingContainer}>
                        <Star size={12} color={colors.warning} />
                        <Text style={styles.rating}>{specialist.rating}</Text>
                      </View>
                      <View style={styles.distanceContainer}>
                        <MapPin size={12} color={colors.textSecondary} />
                        <Text style={styles.distance}>{specialist.distance}</Text>
                      </View>
                      <View style={styles.availabilityContainer}>
                        <Clock size={12} color={colors.primary} />
                        <Text style={styles.availability}>Next: {new Date(specialist.nextAvailable).toLocaleDateString()}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.selectButton}
                    onPress={() => Alert.alert('Select Specialist', `Book appointment with ${specialist.name}?`)}
                  >
                    <Text style={styles.selectButtonText}>Select</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          
          {referral.status === 'approved' && referral.selectedSpecialist && (
            <View style={styles.appointmentSection}>
              <Text style={styles.appointmentTitle}>Scheduled Appointment</Text>
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentSpecialist}>{referral.selectedSpecialist.name}</Text>
                <Text style={styles.appointmentHospital}>{referral.selectedSpecialist.hospital}</Text>
                <Text style={styles.appointmentDateTime}>
                  {new Date(referral.selectedSpecialist.appointmentDate).toLocaleDateString()} at {referral.selectedSpecialist.appointmentTime}
                </Text>
              </View>
              <View style={styles.appointmentActions}>
                <TouchableOpacity 
                  style={styles.rescheduleButton}
                  onPress={() => Alert.alert('Reschedule', 'Reschedule this appointment')}
                >
                  <Text style={styles.rescheduleText}>Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => Alert.alert('Contact', 'Contact specialist office')}
                >
                  <Phone size={16} color={colors.primary} />
                  <Text style={styles.contactText}>Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Card>
      ))}
      
      <TouchableOpacity 
        style={styles.newReferralButton}
        onPress={() => Alert.alert('New Referral', 'Request a new specialist referral')}
      >
        <Plus size={20} color={colors.black} />
        <Text style={styles.newReferralText}>Request New Referral</Text>
      </TouchableOpacity>
    </>
  );
  
  const renderCompletedReferrals = () => (
    <>
      {completedReferrals.map(referral => (
        <Card key={referral.id} style={styles.completedReferralCard}>
          <View style={styles.referralHeader}>
            <View style={styles.referralTitleContainer}>
              <Text style={styles.referralSpecialty}>{referral.specialistType}</Text>
              <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                <CheckCircle2 size={12} color={colors.success} />
                <Text style={[styles.statusText, { color: colors.success }]}>Completed</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.referralReason}>{referral.reason}</Text>
          
          <View style={styles.referralDetails}>
            <View style={styles.detailItem}>
              <User size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Referred by {referral.referringProvider}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Completed {new Date(referral.completedDate).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailItem}>
              <User size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Seen by {referral.specialist}</Text>
            </View>
          </View>
          
          <View style={styles.outcomeSection}>
            <Text style={styles.outcomeTitle}>Outcome</Text>
            <Text style={styles.outcomeText}>{referral.outcome}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.viewReportButton}
            onPress={() => Alert.alert('View Report', 'View complete specialist report')}
          >
            <FileText size={16} color={colors.primary} />
            <Text style={styles.viewReportText}>View Report</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Referrals' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Specialist Referrals</Text>
        <Text style={styles.headerSubtitle}>
          Seamless referral management with intelligent specialist matching
        </Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Users size={18} color={activeTab === 'active' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active Referrals
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <CheckCircle2 size={18} color={activeTab === 'completed' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'active' && renderActiveReferrals()}
        {activeTab === 'completed' && renderCompletedReferrals()}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary + '20',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  referralCard: {
    marginBottom: 16,
  },
  completedReferralCard: {
    marginBottom: 16,
    backgroundColor: colors.success + '05',
    borderColor: colors.success + '20',
    borderWidth: 1,
  },
  referralHeader: {
    marginBottom: 12,
  },
  referralTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referralSpecialty: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  referralMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  urgencyBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  referralReason: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 18,
  },
  referralDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  specialistsSection: {
    marginTop: 16,
  },
  specialistsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  specialistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.primary + '05',
    borderRadius: 8,
    marginBottom: 8,
  },
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  specialistHospital: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  specialistMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 10,
    color: colors.text,
    marginLeft: 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 10,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availability: {
    fontSize: 10,
    color: colors.primary,
    marginLeft: 2,
  },
  selectButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  selectButtonText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentSection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.success + '10',
    borderRadius: 8,
  },
  appointmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  appointmentDetails: {
    marginBottom: 12,
  },
  appointmentSpecialist: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  appointmentHospital: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  appointmentDateTime: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rescheduleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  rescheduleText: {
    fontSize: 12,
    color: colors.warning,
    fontWeight: '500',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  contactText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  newReferralButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  newReferralText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  outcomeSection: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.success + '10',
    borderRadius: 8,
  },
  outcomeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  outcomeText: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 16,
  },
  viewReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  viewReportText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
});