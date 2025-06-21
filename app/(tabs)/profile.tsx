import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { Card } from '@/components/Card';
import { GoalCard } from '@/components/GoalCard';
import { ProgressBar } from '@/components/ProgressBar';
import { PersonalizedGoal } from '@/types';
import { 
  User, 
  Settings, 
  Edit, 
  Target, 
  Award, 
  Calendar,
  Heart,
  Activity,
  Brain,
  Phone,
  Mail,
  MapPin,
  Plus,
  TrendingUp,
  Shield,
  Star,
  ChevronRight
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, updateUser, addGoal, updateGoalProgress } = useUserStore();
  const [showGoalForm, setShowGoalForm] = useState(false);
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }
  
  const handleEditProfile = () => {
    router.push('/edit-profile');
  };
  
  const handleSettings = () => {
    router.push('/settings');
  };
  
  const handleGoalPress = (goalId: string) => {
    router.push(`/goals/${goalId}`);
  };
  
  const handleGoalUpdate = (goalId: string, progress: number) => {
    updateGoalProgress(goalId, progress);
    Alert.alert('Progress Updated', 'Your goal progress has been updated!');
  };
  
  const handleAddGoal = () => {
    const newGoal = {
      title: 'New Wellness Goal',
      name: 'New Wellness Goal',
      description: 'A new goal to improve your wellness',
      category: 'wellness' as const,
      type: 'wellness' as const,
      targetValue: 100,
      currentValue: 0,
      unit: 'points',
      targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium' as const,
      status: 'not_started' as const,
      progress: 0,
      completed: false,
      difficulty: 'moderate' as const,
      timeframe: 'medium' as const,
      trackingMetrics: ['wellness_score'],
      checkInFrequency: 'weekly' as const,
      reminderSettings: {
        enabled: true,
        frequency: 'weekly' as const,
        style: 'gentle' as const,
      },
    };
    
    addGoal(newGoal);
    Alert.alert('Goal Added', 'New goal has been added to your profile!');
  };
  
  const activeGoals = (user.goals || []).filter((goal: PersonalizedGoal) => !goal.completed);
  const completedGoals = (user.goals || []).filter((goal: PersonalizedGoal) => goal.completed);
  const overallProgress = user.goals?.length ? 
    Math.round((completedGoals.length / user.goals.length) * 100) : 0;
  
  return (
    <View style={styles.container}>
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Text style={styles.headerSubtitle}>Your wellness journey</Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={handleSettings}
        >
          <Settings size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: user.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }}
                style={styles.avatar}
              />
              <TouchableOpacity 
                style={styles.editAvatarButton}
                onPress={handleEditProfile}
              >
                <Edit size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.profileBadges}>
                <View style={styles.badge}>
                  <Shield size={12} color={colors.primary} />
                  <Text style={styles.badgeText}>Verified</Text>
                </View>
                <View style={styles.badge}>
                  <Star size={12} color={colors.warning} />
                  <Text style={styles.badgeText}>Premium</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.goals?.length || 0}</Text>
              <Text style={styles.statLabel}>Total Goals</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedGoals.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{overallProgress}%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </Card>
        
        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          <View style={styles.statsGrid}>
            <Card variant="elevated" style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={[styles.statCardIcon, { backgroundColor: `${colors.health}20` }]}>
                  <Heart size={24} color={colors.health} />
                </View>
                <View style={styles.statCardText}>
                  <Text style={styles.statCardValue}>72</Text>
                  <Text style={styles.statCardLabel}>Avg Heart Rate</Text>
                  <Text style={styles.statCardUnit}>bpm</Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={[styles.statCardIcon, { backgroundColor: `${colors.fitness}20` }]}>
                  <Activity size={24} color={colors.fitness} />
                </View>
                <View style={styles.statCardText}>
                  <Text style={styles.statCardValue}>8.2k</Text>
                  <Text style={styles.statCardLabel}>Daily Steps</Text>
                  <Text style={styles.statCardUnit}>steps</Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={[styles.statCardIcon, { backgroundColor: `${colors.wellness}20` }]}>
                  <Brain size={24} color={colors.wellness} />
                </View>
                <View style={styles.statCardText}>
                  <Text style={styles.statCardValue}>Good</Text>
                  <Text style={styles.statCardLabel}>Mood Today</Text>
                  <Text style={styles.statCardUnit}>feeling</Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={[styles.statCardIcon, { backgroundColor: `${colors.warning}20` }]}>
                  <Award size={24} color={colors.warning} />
                </View>
                <View style={styles.statCardText}>
                  <Text style={styles.statCardValue}>12</Text>
                  <Text style={styles.statCardLabel}>Achievements</Text>
                  <Text style={styles.statCardUnit}>earned</Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
        
        {/* Goals Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Goals Progress</Text>
            <TouchableOpacity onPress={handleAddGoal}>
              <Text style={styles.addGoalText}>Add Goal</Text>
            </TouchableOpacity>
          </View>
          
          <Card variant="elevated" style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressTitle}>Overall Progress</Text>
                <Text style={styles.progressDescription}>
                  {completedGoals.length} of {user.goals?.length || 0} goals completed
                </Text>
              </View>
              <View style={styles.progressPercentageContainer}>
                <Text style={styles.progressPercentage}>{overallProgress}%</Text>
              </View>
            </View>
            <ProgressBar 
              progress={overallProgress} 
              color={colors.primary}
              style={styles.progressBar}
            />
          </Card>
          
          {activeGoals.length > 0 ? (
            <View style={styles.goalsContainer}>
              {activeGoals.slice(0, 3).map((goal: PersonalizedGoal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onPress={() => handleGoalPress(goal.id)}
                  onUpdate={(progress: number) => handleGoalUpdate(goal.id, progress)}
                />
              ))}
            </View>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <View style={styles.emptyIcon}>
                  <Target size={32} color={colors.textSecondary} />
                </View>
                <Text style={styles.emptyTitle}>No active goals</Text>
                <Text style={styles.emptyDescription}>
                  Set your first goal to start tracking your progress
                </Text>
                <TouchableOpacity 
                  style={styles.createGoalButton}
                  onPress={handleAddGoal}
                >
                  <Text style={styles.createGoalText}>Create Goal</Text>
                  <Plus size={16} color={colors.black} />
                </TouchableOpacity>
              </View>
            </Card>
          )}
        </View>
        
        {/* Profile Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>
          
          <View style={styles.settingsContainer}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={handleEditProfile}
            >
              <View style={styles.settingIcon}>
                <Edit size={20} color={colors.primary} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Edit Profile</Text>
                <Text style={styles.settingDescription}>Update your personal information</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/health-passport')}
            >
              <View style={styles.settingIcon}>
                <Shield size={20} color={colors.health} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Health Passport</Text>
                <Text style={styles.settingDescription}>View your health summary</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/achievements')}
            >
              <View style={styles.settingIcon}>
                <Award size={20} color={colors.warning} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Achievements</Text>
                <Text style={styles.settingDescription}>View your wellness milestones</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={handleSettings}
            >
              <View style={styles.settingIcon}>
                <Settings size={20} color={colors.info} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>App Settings</Text>
                <Text style={styles.settingDescription}>Notifications, privacy, and more</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Recent Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity onPress={() => router.push('/achievements')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.achievementsContainer}>
            <Card variant="elevated" style={styles.achievementCard}>
              <View style={styles.achievementContent}>
                <View style={[styles.achievementIcon, { backgroundColor: `${colors.warning}20` }]}>
                  <Award size={24} color={colors.warning} />
                </View>
                <View style={styles.achievementText}>
                  <Text style={styles.achievementTitle}>Goal Achiever</Text>
                  <Text style={styles.achievementDescription}>
                    Completed your first wellness goal!
                  </Text>
                  <Text style={styles.achievementDate}>2 days ago</Text>
                </View>
              </View>
            </Card>
            
            <Card variant="elevated" style={styles.achievementCard}>
              <View style={styles.achievementContent}>
                <View style={[styles.achievementIcon, { backgroundColor: `${colors.success}20` }]}>
                  <TrendingUp size={24} color={colors.success} />
                </View>
                <View style={styles.achievementText}>
                  <Text style={styles.achievementTitle}>Consistency Master</Text>
                  <Text style={styles.achievementDescription}>
                    Maintained a 7-day streak of daily check-ins
                  </Text>
                  <Text style={styles.achievementDate}>1 week ago</Text>
                </View>
              </View>
            </Card>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  profileBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}15`,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  addGoalText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCardText: {
    flex: 1,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  statCardLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 1,
  },
  statCardUnit: {
    fontSize: 10,
    color: colors.textTertiary,
  },
  progressCard: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  progressDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressPercentageContainer: {
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBar: {
    
  },
  goalsContainer: {
    gap: 12,
  },
  emptyCard: {
    
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.textSecondary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  createGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 8,
  },
  createGoalText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  settingsContainer: {
    gap: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.textTertiary,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 50,
  },
});