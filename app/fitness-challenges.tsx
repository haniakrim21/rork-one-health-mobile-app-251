import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { 
  Trophy, 
  Target, 
  Users, 
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Zap,
  Star,
  Play,
  CheckCircle2,
  Crown,
  Medal,
  Gift
} from 'lucide-react-native';

export default function FitnessChallengesScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'leaderboard'>('active');
  
  const activeChallenges = [
    {
      id: '1',
      title: '30-Day Strength Builder',
      description: 'Build strength with progressive overload',
      progress: 40,
      daysLeft: 18,
      participants: 1247,
      reward: '500 points + Badge',
      category: 'Strength',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '2',
      title: 'Cardio Blast Week',
      description: 'High-intensity cardio challenge',
      progress: 60,
      daysLeft: 3,
      participants: 892,
      reward: '300 points + Medal',
      category: 'Cardio',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    },
  ];
  
  const availableChallenges = [
    {
      id: '3',
      title: 'Flexibility Master',
      description: '21 days to improve flexibility',
      duration: '21 days',
      participants: 0,
      maxParticipants: 500,
      reward: '400 points + Flexibility Badge',
      category: 'Flexibility',
      difficulty: 'Beginner',
      startDate: 'June 25, 2024',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '4',
      title: 'Summer Shred',
      description: 'Get beach-ready in 8 weeks',
      duration: '8 weeks',
      participants: 234,
      maxParticipants: 1000,
      reward: '1000 points + Summer Badge',
      category: 'Weight Loss',
      difficulty: 'Intermediate',
      startDate: 'July 1, 2024',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '5',
      title: 'Marathon Prep',
      description: '16-week marathon training program',
      duration: '16 weeks',
      participants: 89,
      maxParticipants: 200,
      reward: '2000 points + Marathon Badge',
      category: 'Endurance',
      difficulty: 'Advanced',
      startDate: 'August 1, 2024',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    },
  ];
  
  const leaderboardData = [
    {
      rank: 1,
      name: 'Alex Johnson',
      points: 2450,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
      badges: 12,
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: 'Sarah Chen',
      points: 2380,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
      badges: 10,
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: 'Mike Rodriguez',
      points: 2290,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
      badges: 11,
      isCurrentUser: false,
    },
    {
      rank: 15,
      name: 'You',
      points: 1850,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
      badges: 7,
      isCurrentUser: true,
    },
  ];
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return colors.success;
      case 'Intermediate': return colors.warning;
      case 'Advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strength': return Trophy;
      case 'Cardio': return Zap;
      case 'Flexibility': return Target;
      case 'Weight Loss': return TrendingUp;
      case 'Endurance': return Clock;
      default: return Award;
    }
  };
  
  const renderActiveChallenges = () => (
    <View>
      <Card style={styles.headerCard}>
        <Trophy size={24} color={colors.primary} />
        <Text style={styles.headerTitle}>Active Challenges</Text>
        <Text style={styles.headerSubtitle}>
          Keep pushing towards your goals!
        </Text>
      </Card>
      
      {activeChallenges.map((challenge) => {
        const CategoryIcon = getCategoryIcon(challenge.category);
        return (
          <Card key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeImageContainer}>
              <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
              <View style={styles.challengeOverlay}>
                <View style={styles.challengeBadges}>
                  <View style={[styles.categoryBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) + '20' }]}>
                    <CategoryIcon size={12} color={getDifficultyColor(challenge.difficulty)} />
                    <Text style={[styles.categoryText, { color: getDifficultyColor(challenge.difficulty) }]}>
                      {challenge.category}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.challengeContent}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>{challenge.description}</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressValue}>{challenge.progress}%</Text>
                </View>
                <ProgressBar 
                  progress={challenge.progress} 
                  fillColor={colors.primary}
                  style={styles.progressBar}
                />
                <Text style={styles.daysLeft}>{challenge.daysLeft} days left</Text>
              </View>
              
              <View style={styles.challengeMeta}>
                <View style={styles.metaItem}>
                  <Users size={14} color={colors.textSecondary} />
                  <Text style={styles.metaText}>{challenge.participants.toLocaleString()}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Gift size={14} color={colors.textSecondary} />
                  <Text style={styles.metaText}>{challenge.reward}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => Alert.alert('Continue Challenge', `Continue ${challenge.title}`)}
              >
                <Play size={16} color={colors.black} />
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </Card>
        );
      })}
      
      <Card style={styles.achievementsCard}>
        <View style={styles.achievementsHeader}>
          <Award size={20} color={colors.warning} />
          <Text style={styles.achievementsTitle}>Recent Achievements</Text>
        </View>
        
        <View style={styles.achievementItem}>
          <Medal size={16} color={colors.warning} />
          <Text style={styles.achievementText}>Completed "Push-up Master" challenge</Text>
          <Text style={styles.achievementDate}>2 days ago</Text>
        </View>
        
        <View style={styles.achievementItem}>
          <Star size={16} color={colors.primary} />
          <Text style={styles.achievementText}>Reached 1000 total points</Text>
          <Text style={styles.achievementDate}>1 week ago</Text>
        </View>
      </Card>
    </View>
  );
  
  const renderAvailableChallenges = () => (
    <View>
      <Card style={styles.headerCard}>
        <Target size={24} color={colors.primary} />
        <Text style={styles.headerTitle}>Available Challenges</Text>
        <Text style={styles.headerSubtitle}>
          Join new challenges and earn rewards
        </Text>
      </Card>
      
      {availableChallenges.map((challenge) => {
        const CategoryIcon = getCategoryIcon(challenge.category);
        return (
          <Card key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeImageContainer}>
              <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
              <View style={styles.challengeOverlay}>
                <View style={styles.challengeBadges}>
                  <View style={[styles.categoryBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) + '20' }]}>
                    <CategoryIcon size={12} color={getDifficultyColor(challenge.difficulty)} />
                    <Text style={[styles.categoryText, { color: getDifficultyColor(challenge.difficulty) }]}>
                      {challenge.category}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.challengeContent}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>{challenge.description}</Text>
              
              <View style={styles.challengeInfo}>
                <View style={styles.infoItem}>
                  <Clock size={14} color={colors.textSecondary} />
                  <Text style={styles.infoText}>{challenge.duration}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Calendar size={14} color={colors.textSecondary} />
                  <Text style={styles.infoText}>Starts {challenge.startDate}</Text>
                </View>
              </View>
              
              <View style={styles.participantsContainer}>
                <Text style={styles.participantsText}>
                  {challenge.participants}/{challenge.maxParticipants} participants
                </Text>
                <ProgressBar 
                  progress={(challenge.participants / challenge.maxParticipants) * 100} 
                  fillColor={colors.success}
                  style={styles.participantsBar}
                />
              </View>
              
              <View style={styles.rewardContainer}>
                <Gift size={16} color={colors.warning} />
                <Text style={styles.rewardText}>{challenge.reward}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={() => Alert.alert('Join Challenge', `Join ${challenge.title}?`)}
              >
                <Text style={styles.joinButtonText}>Join Challenge</Text>
              </TouchableOpacity>
            </View>
          </Card>
        );
      })}
      
      <TouchableOpacity 
        style={styles.createChallengeButton}
        onPress={() => Alert.alert('Create Challenge', 'Create your own fitness challenge')}
      >
        <Text style={styles.createChallengeText}>+ Create Custom Challenge</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderLeaderboard = () => (
    <View>
      <Card style={styles.headerCard}>
        <Crown size={24} color={colors.warning} />
        <Text style={styles.headerTitle}>Global Leaderboard</Text>
        <Text style={styles.headerSubtitle}>
          See how you rank against other users
        </Text>
      </Card>
      
      <Card style={styles.leaderboardCard}>
        {leaderboardData.map((user) => (
          <View 
            key={user.rank} 
            style={[
              styles.leaderboardItem,
              user.isCurrentUser && styles.currentUserItem
            ]}
          >
            <View style={styles.rankContainer}>
              {user.rank <= 3 ? (
                <View style={[styles.medalContainer, { backgroundColor: 
                  user.rank === 1 ? colors.warning + '20' :
                  user.rank === 2 ? colors.textSecondary + '20' :
                  colors.error + '20'
                }]}>
                  <Crown size={16} color={
                    user.rank === 1 ? colors.warning :
                    user.rank === 2 ? colors.textSecondary :
                    colors.error
                  } />
                </View>
              ) : (
                <Text style={styles.rankNumber}>{user.rank}</Text>
              )}
            </View>
            
            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            
            <View style={styles.userInfo}>
              <Text style={[styles.userName, user.isCurrentUser && styles.currentUserName]}>
                {user.name}
              </Text>
              <View style={styles.userStats}>
                <Text style={styles.userPoints}>{user.points.toLocaleString()} pts</Text>
                <View style={styles.badgeCount}>
                  <Award size={12} color={colors.warning} />
                  <Text style={styles.badgeCountText}>{user.badges}</Text>
                </View>
              </View>
            </View>
            
            {user.isCurrentUser && (
              <View style={styles.currentUserBadge}>
                <Text style={styles.currentUserBadgeText}>You</Text>
              </View>
            )}
          </View>
        ))}
      </Card>
      
      <Card style={styles.pointsCard}>
        <Text style={styles.pointsTitle}>How to Earn Points</Text>
        <View style={styles.pointsItem}>
          <CheckCircle2 size={16} color={colors.success} />
          <Text style={styles.pointsText}>Complete daily workouts: 10-50 points</Text>
        </View>
        <View style={styles.pointsItem}>
          <CheckCircle2 size={16} color={colors.success} />
          <Text style={styles.pointsText}>Finish challenges: 100-2000 points</Text>
        </View>
        <View style={styles.pointsItem}>
          <CheckCircle2 size={16} color={colors.success} />
          <Text style={styles.pointsText}>Maintain streaks: Bonus multipliers</Text>
        </View>
        <View style={styles.pointsItem}>
          <CheckCircle2 size={16} color={colors.success} />
          <Text style={styles.pointsText}>Help others: 5-25 points</Text>
        </View>
      </Card>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Fitness Challenges' }} />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Play size={18} color={activeTab === 'active' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'available' && styles.activeTab]}
          onPress={() => setActiveTab('available')}
        >
          <Target size={18} color={activeTab === 'available' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}>
            Available
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Crown size={18} color={activeTab === 'leaderboard' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'active' && renderActiveChallenges()}
        {activeTab === 'available' && renderAvailableChallenges()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 48,
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
  headerCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  challengeCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  challengeImageContainer: {
    position: 'relative',
    height: 120,
  },
  challengeImage: {
    width: '100%',
    height: '100%',
  },
  challengeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 12,
  },
  challengeBadges: {
    flexDirection: 'row',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  challengeContent: {
    padding: 16,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  progressBar: {
    marginBottom: 4,
  },
  daysLeft: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  challengeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 8,
  },
  challengeInfo: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  participantsContainer: {
    marginBottom: 16,
  },
  participantsText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  participantsBar: {
    height: 4,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.warning + '10',
    padding: 8,
    borderRadius: 8,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: colors.black,
    fontWeight: '600',
  },
  createChallengeButton: {
    alignSelf: 'center',
    marginTop: 16,
  },
  createChallengeText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  achievementsCard: {
    marginTop: 8,
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  achievementText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  leaderboardCard: {
    marginBottom: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  currentUserItem: {
    backgroundColor: colors.primary + '10',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  medalContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  currentUserName: {
    color: colors.primary,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPoints: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 12,
  },
  badgeCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeCountText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  currentUserBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentUserBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.black,
  },
  pointsCard: {
    
  },
  pointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  pointsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
});