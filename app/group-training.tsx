import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  Users, 
  Video, 
  Calendar, 
  Clock,
  MapPin,
  Star,
  Play,
  Heart,
  Zap,
  Trophy,
  MessageCircle,
  UserPlus,
  Settings
} from 'lucide-react-native';

export default function GroupTrainingScreen() {
  const [activeTab, setActiveTab] = useState<'live' | 'scheduled' | 'my-groups'>('live');
  
  const liveClasses = [
    {
      id: '1',
      title: 'HIIT Cardio Blast',
      instructor: 'Sarah Johnson',
      participants: 24,
      maxParticipants: 30,
      duration: '30 min',
      difficulty: 'Intermediate',
      startTime: 'Starting in 5 min',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      isLive: true,
    },
    {
      id: '2',
      title: 'Yoga Flow & Mindfulness',
      instructor: 'Emma Chen',
      participants: 18,
      maxParticipants: 25,
      duration: '45 min',
      difficulty: 'Beginner',
      startTime: 'Starting in 15 min',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      isLive: true,
    },
  ];
  
  const scheduledClasses = [
    {
      id: '3',
      title: 'Strength Training Bootcamp',
      instructor: 'Mike Rodriguez',
      participants: 0,
      maxParticipants: 20,
      duration: '50 min',
      difficulty: 'Advanced',
      startTime: 'Today 6:00 PM',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      isLive: false,
    },
    {
      id: '4',
      title: 'Dance Fitness Party',
      instructor: 'Lisa Park',
      participants: 12,
      maxParticipants: 40,
      duration: '40 min',
      difficulty: 'All Levels',
      startTime: 'Tomorrow 7:00 AM',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      isLive: false,
    },
  ];
  
  const myGroups = [
    {
      id: '1',
      name: 'Morning Warriors',
      members: 156,
      description: 'Early morning workout enthusiasts',
      nextSession: 'Tomorrow 6:00 AM',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: '2',
      name: 'Strength Squad',
      members: 89,
      description: 'Focused on building strength and muscle',
      nextSession: 'Today 7:00 PM',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    },
  ];
  
  const renderLiveClasses = () => (
    <View>
      <Card style={styles.liveHeader}>
        <Video size={24} color={colors.error} />
        <Text style={styles.liveTitle}>Live Classes</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </Card>
      
      {liveClasses.map((classItem) => (
        <Card key={classItem.id} style={styles.classCard}>
          <View style={styles.classImageContainer}>
            <Image source={{ uri: classItem.image }} style={styles.classImage} />
            <View style={styles.classOverlay}>
              <View style={styles.classLiveBadge}>
                <View style={styles.liveIndicator} />
                <Text style={styles.classLiveText}>LIVE</Text>
              </View>
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={() => Alert.alert('Join Class', `Join ${classItem.title}?`)}
              >
                <Play size={16} color={colors.black} fill={colors.black} />
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.classInfo}>
            <Text style={styles.classTitle}>{classItem.title}</Text>
            <Text style={styles.classInstructor}>with {classItem.instructor}</Text>
            
            <View style={styles.classMeta}>
              <View style={styles.classMetaItem}>
                <Clock size={14} color={colors.textSecondary} />
                <Text style={styles.classMetaText}>{classItem.duration}</Text>
              </View>
              <View style={styles.classMetaItem}>
                <Users size={14} color={colors.textSecondary} />
                <Text style={styles.classMetaText}>
                  {classItem.participants}/{classItem.maxParticipants}
                </Text>
              </View>
              <View style={styles.classMetaItem}>
                <Zap size={14} color={colors.textSecondary} />
                <Text style={styles.classMetaText}>{classItem.difficulty}</Text>
              </View>
            </View>
            
            <Text style={styles.classStartTime}>{classItem.startTime}</Text>
          </View>
        </Card>
      ))}
      
      <Card style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>Live Class Features</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Video size={16} color={colors.primary} />
            <Text style={styles.featureText}>HD video streaming</Text>
          </View>
          <View style={styles.featureItem}>
            <MessageCircle size={16} color={colors.primary} />
            <Text style={styles.featureText}>Real-time chat</Text>
          </View>
          <View style={styles.featureItem}>
            <Heart size={16} color={colors.primary} />
            <Text style={styles.featureText}>Heart rate sync</Text>
          </View>
          <View style={styles.featureItem}>
            <Trophy size={16} color={colors.primary} />
            <Text style={styles.featureText}>Live leaderboards</Text>
          </View>
        </View>
      </Card>
    </View>
  );
  
  const renderScheduledClasses = () => (
    <View>
      <Card style={styles.scheduledHeader}>
        <Calendar size={24} color={colors.primary} />
        <Text style={styles.scheduledTitle}>Upcoming Classes</Text>
        <Text style={styles.scheduledSubtitle}>
          Reserve your spot in advance
        </Text>
      </Card>
      
      {scheduledClasses.map((classItem) => (
        <Card key={classItem.id} style={styles.classCard}>
          <View style={styles.classImageContainer}>
            <Image source={{ uri: classItem.image }} style={styles.classImage} />
            <View style={styles.classOverlay}>
              <TouchableOpacity 
                style={styles.reserveButton}
                onPress={() => Alert.alert('Reserve Spot', `Reserve spot in ${classItem.title}?`)}
              >
                <UserPlus size={16} color={colors.black} />
                <Text style={styles.reserveButtonText}>Reserve</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.classInfo}>
            <Text style={styles.classTitle}>{classItem.title}</Text>
            <Text style={styles.classInstructor}>with {classItem.instructor}</Text>
            
            <View style={styles.classMeta}>
              <View style={styles.classMetaItem}>
                <Clock size={14} color={colors.textSecondary} />
                <Text style={styles.classMetaText}>{classItem.duration}</Text>
              </View>
              <View style={styles.classMetaItem}>
                <Users size={14} color={colors.textSecondary} />
                <Text style={styles.classMetaText}>
                  {classItem.participants}/{classItem.maxParticipants}
                </Text>
              </View>
              <View style={styles.classMetaItem}>
                <Zap size={14} color={colors.textSecondary} />
                <Text style={styles.classMetaText}>{classItem.difficulty}</Text>
              </View>
            </View>
            
            <Text style={styles.classStartTime}>{classItem.startTime}</Text>
          </View>
        </Card>
      ))}
      
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={() => Alert.alert('Browse Classes', 'View all available classes')}
      >
        <Text style={styles.browseButtonText}>Browse All Classes</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderMyGroups = () => (
    <View>
      <Card style={styles.groupsHeader}>
        <Users size={24} color={colors.primary} />
        <Text style={styles.groupsTitle}>My Training Groups</Text>
        <TouchableOpacity 
          style={styles.createGroupButton}
          onPress={() => Alert.alert('Create Group', 'Create a new training group')}
        >
          <UserPlus size={16} color={colors.primary} />
        </TouchableOpacity>
      </Card>
      
      {myGroups.map((group) => (
        <Card key={group.id} style={styles.groupCard}>
          <View style={styles.groupImageContainer}>
            <Image source={{ uri: group.image }} style={styles.groupImage} />
          </View>
          
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupDescription}>{group.description}</Text>
            
            <View style={styles.groupMeta}>
              <View style={styles.groupMetaItem}>
                <Users size={14} color={colors.textSecondary} />
                <Text style={styles.groupMetaText}>{group.members} members</Text>
              </View>
              <View style={styles.groupMetaItem}>
                <Calendar size={14} color={colors.textSecondary} />
                <Text style={styles.groupMetaText}>{group.nextSession}</Text>
              </View>
            </View>
            
            <View style={styles.groupActions}>
              <TouchableOpacity 
                style={styles.groupActionButton}
                onPress={() => Alert.alert('Group Chat', `Open chat for ${group.name}`)}
              >
                <MessageCircle size={16} color={colors.primary} />
                <Text style={styles.groupActionText}>Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.groupActionButton}
                onPress={() => Alert.alert('Group Settings', `Manage ${group.name} settings`)}
              >
                <Settings size={16} color={colors.primary} />
                <Text style={styles.groupActionText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      ))}
      
      <Card style={styles.discoverCard}>
        <Text style={styles.discoverTitle}>Discover New Groups</Text>
        <Text style={styles.discoverDescription}>
          Find training groups that match your interests and fitness goals.
        </Text>
        
        <View style={styles.suggestedGroups}>
          <TouchableOpacity style={styles.suggestedGroup}>
            <Text style={styles.suggestedGroupName}>Runners Club</Text>
            <Text style={styles.suggestedGroupMembers}>234 members</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.suggestedGroup}>
            <Text style={styles.suggestedGroupName}>Yoga Beginners</Text>
            <Text style={styles.suggestedGroupMembers}>89 members</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => Alert.alert('Explore Groups', 'Browse all available training groups')}
        >
          <Text style={styles.exploreButtonText}>Explore All Groups</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Group Training' }} />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'live' && styles.activeTab]}
          onPress={() => setActiveTab('live')}
        >
          <Video size={18} color={activeTab === 'live' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'live' && styles.activeTabText]}>
            Live
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'scheduled' && styles.activeTab]}
          onPress={() => setActiveTab('scheduled')}
        >
          <Calendar size={18} color={activeTab === 'scheduled' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'scheduled' && styles.activeTabText]}>
            Scheduled
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'my-groups' && styles.activeTab]}
          onPress={() => setActiveTab('my-groups')}
        >
          <Users size={18} color={activeTab === 'my-groups' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'my-groups' && styles.activeTabText]}>
            My Groups
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'live' && renderLiveClasses()}
        {activeTab === 'scheduled' && renderScheduledClasses()}
        {activeTab === 'my-groups' && renderMyGroups()}
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
  liveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.error,
  },
  classCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  classImageContainer: {
    position: 'relative',
    height: 120,
  },
  classImage: {
    width: '100%',
    height: '100%',
  },
  classOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 12,
    flexDirection: 'row',
  },
  classLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  classLiveText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.background,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  joinButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 12,
  },
  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reserveButtonText: {
    color: colors.black,
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 12,
  },
  classInfo: {
    padding: 16,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  classInstructor: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  classMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  classMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  classMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  classStartTime: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  featuresCard: {
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
  },
  scheduledHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduledTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  scheduledSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  browseButton: {
    alignSelf: 'center',
    backgroundColor: colors.primary + '20',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  browseButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  groupsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  createGroupButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupCard: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  groupImageContainer: {
    marginRight: 12,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  groupMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  groupMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  groupMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  groupActions: {
    flexDirection: 'row',
  },
  groupActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  groupActionText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 4,
  },
  discoverCard: {
    marginTop: 8,
  },
  discoverTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  discoverDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  suggestedGroups: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  suggestedGroup: {
    flex: 0.48,
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  suggestedGroupName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  suggestedGroupMembers: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  exploreButton: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: colors.black,
    fontWeight: '600',
  },
});