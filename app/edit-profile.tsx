import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { GoalCard } from '@/components/GoalCard';
import { Camera, Save, Plus, Target } from 'lucide-react-native';

export default function EditProfileScreen() {
  const { user, updateUser, addGoal, updateGoal, deleteGoal } = useUserStore();
  
  if (!user) {
    router.replace('/(auth)/login');
    return null;
  }
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email || '',
    phone: user.phone,
    dateOfBirth: user.dateOfBirth || '',
    gender: user.gender || '',
    height: (user.height ?? 170).toString(),
    weight: (user.weight ?? 70).toString(),
  });

  const [goalPersonalization, setGoalPersonalization] = useState({
    primaryFocus: user.goalPersonalization?.primaryFocus || 'balanced',
    preferredGoalTimeframe: user.goalPersonalization?.preferredGoalTimeframe || 'medium',
    trackingPreference: user.goalPersonalization?.trackingPreference || 'simple',
    celebrationStyle: user.goalPersonalization?.celebrationStyle || 'milestone-based',
  });
  
  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      gender: formData.gender as 'male' | 'female' | 'other' | 'prefer-not-to-say' | undefined,
      height: parseInt(formData.height) || 170,
      weight: parseInt(formData.weight) || 70,
      goalPersonalization: {
        ...user.goalPersonalization,
        ...goalPersonalization,
      },
    };
    
    updateUser(updatedUser);
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };
  
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateGoalPersonalization = (field: string, value: string) => {
    setGoalPersonalization(prev => ({ ...prev, [field]: value }));
  };

  const handleAddGoal = () => {
    Alert.alert('Add Goal', 'Goal creation feature coming soon!');
  };

  const handleEditGoal = (goalId: string) => {
    Alert.alert('Edit Goal', `Edit goal ${goalId} feature coming soon!`);
  };

  const handleDeleteGoal = (goalId: string) => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteGoal(goalId)
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Profile' }} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.avatarSection}>
          <Avatar 
            source={user.profilePicture} 
            initials={user.name.charAt(0)} 
            size="xlarge"
          />
          <TouchableOpacity 
            style={styles.changePhotoButton}
            onPress={() => Alert.alert('Change Photo', 'Photo selection feature coming soon!')}
          >
            <Camera size={16} color={colors.primary} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={formData.dateOfBirth}
              onChangeText={(value) => updateField('dateOfBirth', value)}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              {(['male', 'female', 'other', 'prefer-not-to-say'] as const).map(gender => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderOption,
                    formData.gender === gender && styles.selectedGender
                  ]}
                  onPress={() => updateField('gender', gender)}
                >
                  <Text style={[
                    styles.genderText,
                    formData.gender === gender && styles.selectedGenderText
                  ]}>
                    {gender === 'prefer-not-to-say' ? 'Prefer not to say' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>
        
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Physical Information</Text>
          
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={formData.height}
                onChangeText={(value) => updateField('height', value)}
                placeholder="170"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
            
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={formData.weight}
                onChangeText={(value) => updateField('weight', value)}
                placeholder="70"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>
        </Card>

        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Goal Personalization</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Primary Focus</Text>
            <View style={styles.optionsContainer}>
              {(['health', 'wellness', 'fitness', 'balanced'] as const).map(focus => (
                <TouchableOpacity
                  key={focus}
                  style={[
                    styles.optionButton,
                    goalPersonalization.primaryFocus === focus && styles.selectedOption
                  ]}
                  onPress={() => updateGoalPersonalization('primaryFocus', focus)}
                >
                  <Text style={[
                    styles.optionText,
                    goalPersonalization.primaryFocus === focus && styles.selectedOptionText
                  ]}>
                    {focus.charAt(0).toUpperCase() + focus.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Preferred Goal Timeframe</Text>
            <View style={styles.optionsContainer}>
              {(['short', 'medium', 'long'] as const).map(timeframe => (
                <TouchableOpacity
                  key={timeframe}
                  style={[
                    styles.optionButton,
                    goalPersonalization.preferredGoalTimeframe === timeframe && styles.selectedOption
                  ]}
                  onPress={() => updateGoalPersonalization('preferredGoalTimeframe', timeframe)}
                >
                  <Text style={[
                    styles.optionText,
                    goalPersonalization.preferredGoalTimeframe === timeframe && styles.selectedOptionText
                  ]}>
                    {timeframe === 'short' ? 'Short (1-3 months)' :
                     timeframe === 'medium' ? 'Medium (3-6 months)' :
                     'Long (6+ months)'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tracking Preference</Text>
            <View style={styles.optionsContainer}>
              {(['detailed', 'simple', 'minimal'] as const).map(preference => (
                <TouchableOpacity
                  key={preference}
                  style={[
                    styles.optionButton,
                    goalPersonalization.trackingPreference === preference && styles.selectedOption
                  ]}
                  onPress={() => updateGoalPersonalization('trackingPreference', preference)}
                >
                  <Text style={[
                    styles.optionText,
                    goalPersonalization.trackingPreference === preference && styles.selectedOptionText
                  ]}>
                    {preference.charAt(0).toUpperCase() + preference.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        <Card style={styles.formCard}>
          <View style={styles.goalsHeader}>
            <Text style={styles.sectionTitle}>Your Goals</Text>
            <TouchableOpacity 
              style={styles.addGoalButton}
              onPress={handleAddGoal}
            >
              <Plus size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          {user.goals && user.goals.length > 0 ? (
            user.goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onPress={() => handleEditGoal(goal.id)}
                onEdit={() => handleEditGoal(goal.id)}
                onComplete={() => Alert.alert('Complete Goal', 'Goal completion feature coming soon!')}
                showActions={true}
              />
            ))
          ) : (
            <View style={styles.noGoalsContainer}>
              <Target size={48} color={colors.textSecondary} />
              <Text style={styles.noGoalsTitle}>No goals yet</Text>
              <Text style={styles.noGoalsDescription}>
                Add your first goal to start tracking your progress
              </Text>
              <TouchableOpacity 
                style={styles.addFirstGoalButton}
                onPress={handleAddGoal}
              >
                <Plus size={16} color={colors.primary} />
                <Text style={styles.addFirstGoalText}>Add Your First Goal</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Save size={20} color={colors.black} />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
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
    paddingTop: 80,
    paddingBottom: 32,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary + '20',
    borderRadius: 8,
  },
  changePhotoText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  formCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genderOption: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedGender: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  genderText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedGenderText: {
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  optionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: colors.primary,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addGoalButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGoalsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noGoalsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noGoalsDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  addFirstGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  addFirstGoalText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
});