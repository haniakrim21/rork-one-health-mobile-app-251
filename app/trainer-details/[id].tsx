import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Share,
  Heart
} from 'lucide-react-native';

export default function TrainerDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock data - in real app, fetch based on id
  const trainer = {
    id: id,
    name: 'Sarah Johnson',
    title: 'Certified Personal Trainer',
    specialty: 'HIIT & Strength Training',
    bio: 'With over 5 years of experience in fitness training, Sarah specializes in high-intensity interval training and strength building. She has helped hundreds of clients achieve their fitness goals through personalized workout plans and nutritional guidance.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZpdG5lc3MlMjB0cmFpbmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    rating: 4.9,
    reviews: 127,
    experience: '5 years',
    location: 'Downtown Gym',
    price: '$80/session',
    availability: 'Available',
    certifications: [
      'NASM Certified Personal Trainer',
      'HIIT Specialist Certification',
      'Nutrition Coaching Certificate',
      'First Aid & CPR Certified',
    ],
    specialties: [
      'High-Intensity Interval Training',
      'Strength Training',
      'Weight Loss',
      'Muscle Building',
      'Functional Fitness',
    ],
    schedule: [
      { day: 'Monday', times: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
      { day: 'Tuesday', times: ['10:00 AM', '1:00 PM', '3:00 PM'] },
      { day: 'Wednesday', times: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
      { day: 'Thursday', times: ['10:00 AM', '1:00 PM', '3:00 PM'] },
      { day: 'Friday', times: ['9:00 AM', '11:00 AM', '2:00 PM'] },
      { day: 'Saturday', times: ['10:00 AM', '12:00 PM'] },
      { day: 'Sunday', times: ['Unavailable'] },
    ],
    testimonials: [
      {
        id: '1',
        name: 'Mike Chen',
        rating: 5,
        text: 'Sarah is an amazing trainer! She helped me lose 20 pounds and build muscle. Her workouts are challenging but fun.',
        date: '2 weeks ago',
      },
      {
        id: '2',
        name: 'Emma Davis',
        rating: 5,
        text: 'Best trainer I have ever worked with. Very knowledgeable and motivating. Highly recommend!',
        date: '1 month ago',
      },
      {
        id: '3',
        name: 'John Smith',
        rating: 4,
        text: 'Great experience with Sarah. She really knows how to push you to achieve your goals.',
        date: '2 months ago',
      },
    ],
  };
  
  const handleBookSession = () => {
    Alert.alert(
      'Book Session',
      `Book a session with ${trainer.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => Alert.alert('Success', 'Session booking request sent!') }
      ]
    );
  };
  
  const handleContact = (method: string) => {
    Alert.alert('Contact', `Contact ${trainer.name} via ${method}`);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={{ uri: trainer.image }} style={styles.trainerImage} />
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                color={isFavorite ? colors.error : colors.white} 
                fill={isFavorite ? colors.error : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerInfo}>
            <Text style={styles.trainerName}>{trainer.name}</Text>
            <Text style={styles.trainerTitle}>{trainer.title}</Text>
            <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
            
            <View style={styles.headerStats}>
              <View style={styles.statItem}>
                <Star size={16} color={colors.warning} fill={colors.warning} />
                <Text style={styles.statText}>{trainer.rating}</Text>
                <Text style={styles.statSubtext}>({trainer.reviews} reviews)</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color={colors.primary} />
                <Text style={styles.statText}>{trainer.experience}</Text>
                <Text style={styles.statSubtext}>experience</Text>
              </View>
              <View style={styles.statItem}>
                <MapPin size={16} color={colors.success} />
                <Text style={styles.statText}>{trainer.location}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.priceSection}>
            <Text style={styles.price}>{trainer.price}</Text>
            <Text style={styles.availability}>{trainer.availability}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.bookButton} onPress={handleBookSession}>
              <Calendar size={20} color={colors.black} />
              <Text style={styles.bookButtonText}>Book Session</Text>
            </TouchableOpacity>
            
            <View style={styles.contactButtons}>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleContact('message')}
              >
                <MessageCircle size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleContact('phone')}
              >
                <Phone size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleContact('email')}
              >
                <Mail size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Card style={styles.bioCard}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{trainer.bio}</Text>
          </Card>
          
          <Card style={styles.certificationsCard}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {trainer.certifications.map(cert => (
              <View key={cert} style={styles.certificationItem}>
                <Award size={16} color={colors.primary} />
                <Text style={styles.certificationText}>{cert}</Text>
              </View>
            ))}
          </Card>
          
          <Card style={styles.specialtiesCard}>
            <Text style={styles.sectionTitle}>Specialties</Text>
            <View style={styles.specialtiesContainer}>
              {trainer.specialties.map(specialty => (
                <View key={specialty} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </Card>
          
          <Card style={styles.scheduleCard}>
            <Text style={styles.sectionTitle}>Availability</Text>
            {trainer.schedule.map(day => (
              <View key={day.day} style={styles.scheduleDay}>
                <Text style={styles.dayName}>{day.day}</Text>
                <View style={styles.timesContainer}>
                  {day.times.map(time => (
                    <View 
                      key={time} 
                      style={[
                        styles.timeSlot,
                        time === 'Unavailable' && styles.unavailableSlot
                      ]}
                    >
                      <Text style={[
                        styles.timeText,
                        time === 'Unavailable' && styles.unavailableText
                      ]}>
                        {time}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </Card>
          
          <Card style={styles.testimonialsCard}>
            <Text style={styles.sectionTitle}>Client Reviews</Text>
            {trainer.testimonials.map(testimonial => (
              <View key={testimonial.id} style={styles.testimonialItem}>
                <View style={styles.testimonialHeader}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <View style={styles.testimonialRating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} color={colors.warning} fill={colors.warning} />
                    ))}
                  </View>
                  <Text style={styles.testimonialDate}>{testimonial.date}</Text>
                </View>
                <Text style={styles.testimonialText}>{testimonial.text}</Text>
              </View>
            ))}
          </Card>
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
    height: 300,
    position: 'relative',
  },
  trainerImage: {
    width: '100%',
    height: '100%',
  },
  headerActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
  },
  trainerName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  trainerTitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 2,
  },
  trainerSpecialty: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 12,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 4,
    marginRight: 4,
  },
  statSubtext: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  content: {
    padding: 16,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  availability: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  contactButtons: {
    flexDirection: 'row',
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  bioCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  certificationsCard: {
    marginBottom: 16,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  certificationText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  specialtiesCard: {
    marginBottom: 16,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  scheduleCard: {
    marginBottom: 16,
  },
  scheduleDay: {
    marginBottom: 12,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  unavailableSlot: {
    backgroundColor: colors.border,
  },
  timeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  unavailableText: {
    color: colors.textSecondary,
  },
  testimonialsCard: {
    marginBottom: 16,
  },
  testimonialItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  testimonialRating: {
    flexDirection: 'row',
    marginRight: 8,
  },
  testimonialDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 'auto',
  },
  testimonialText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});