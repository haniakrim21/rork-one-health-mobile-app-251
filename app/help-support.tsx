import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Book, 
  HelpCircle,
  Send,
  ChevronRight,
  ExternalLink,
  Star
} from 'lucide-react-native';

export default function HelpSupportScreen() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'feedback'>('faq');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
  });
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    feedback: '',
  });

  const faqItems = [
    {
      id: '1',
      question: 'How do I sync my fitness data?',
      answer: 'Go to Settings > Data & Sync > Auto Sync and enable the feature. You can also manually sync by pulling down on the main screen.',
    },
    {
      id: '2',
      question: 'Can I use the app offline?',
      answer: 'Yes! Most features work offline. Your data will sync automatically when you reconnect to the internet.',
    },
    {
      id: '3',
      question: 'How do I change my workout plan?',
      answer: 'Navigate to the Fitness tab, select your current plan, and tap "Change Plan" to browse available options.',
    },
    {
      id: '4',
      question: 'Is my health data secure?',
      answer: 'Absolutely. We use end-to-end encryption and follow strict privacy guidelines. Your data is never shared without your consent.',
    },
    {
      id: '5',
      question: 'How do I cancel my subscription?',
      answer: 'Go to Profile > Settings > Subscription and select "Cancel Subscription". You can also manage it through your app store.',
    },
    {
      id: '6',
      question: 'Can I export my data?',
      answer: 'Yes, go to Settings > Privacy > Export Data to download a copy of all your health and fitness data.',
    },
  ];

  const handleContactSubmit = () => {
    if (!contactForm.subject || !contactForm.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    Alert.alert('Success', 'Your message has been sent! We will get back to you within 24 hours.');
    setContactForm({ subject: '', message: '' });
  };

  const handleFeedbackSubmit = () => {
    if (feedbackForm.rating === 0 || !feedbackForm.feedback) {
      Alert.alert('Error', 'Please provide a rating and feedback');
      return;
    }
    
    Alert.alert('Thank You!', 'Your feedback helps us improve the app.');
    setFeedbackForm({ rating: 0, feedback: '' });
  };

  const renderFAQ = () => (
    <>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      {faqItems.map(item => (
        <Card key={item.id} style={styles.faqCard}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        </Card>
      ))}
      
      <Card style={styles.resourcesCard}>
        <Text style={styles.resourcesTitle}>Additional Resources</Text>
        
        <TouchableOpacity 
          style={styles.resourceItem}
          onPress={() => Alert.alert('User Guide', 'Opening user guide...')}
        >
          <Book size={20} color={colors.primary} />
          <Text style={styles.resourceText}>User Guide</Text>
          <ExternalLink size={16} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resourceItem}
          onPress={() => Alert.alert('Video Tutorials', 'Opening video tutorials...')}
        >
          <MessageCircle size={20} color={colors.success} />
          <Text style={styles.resourceText}>Video Tutorials</Text>
          <ExternalLink size={16} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resourceItem}
          onPress={() => Alert.alert('Community Forum', 'Opening community forum...')}
        >
          <HelpCircle size={20} color={colors.warning} />
          <Text style={styles.resourceText}>Community Forum</Text>
          <ExternalLink size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </Card>
    </>
  );

  const renderContact = () => (
    <>
      <Text style={styles.sectionTitle}>Contact Support</Text>
      
      <Card style={styles.contactMethodsCard}>
        <Text style={styles.contactMethodsTitle}>Get in Touch</Text>
        
        <TouchableOpacity 
          style={styles.contactMethod}
          onPress={() => Alert.alert('Email', 'Opening email client...')}
        >
          <View style={[styles.contactIcon, { backgroundColor: colors.primary + '20' }]}>
            <Mail size={20} color={colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactDetail}>support@healthapp.com</Text>
            <Text style={styles.contactTime}>Response within 24 hours</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactMethod}
          onPress={() => Alert.alert('Phone', 'Calling support...')}
        >
          <View style={[styles.contactIcon, { backgroundColor: colors.success + '20' }]}>
            <Phone size={20} color={colors.success} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Phone Support</Text>
            <Text style={styles.contactDetail}>+1 (555) 123-4567</Text>
            <Text style={styles.contactTime}>Mon-Fri, 9 AM - 6 PM EST</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactMethod}
          onPress={() => Alert.alert('Live Chat', 'Starting live chat...')}
        >
          <View style={[styles.contactIcon, { backgroundColor: colors.warning + '20' }]}>
            <MessageCircle size={20} color={colors.warning} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactDetail}>Chat with our team</Text>
            <Text style={styles.contactTime}>Available 24/7</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </Card>
      
      <Card style={styles.contactFormCard}>
        <Text style={styles.contactFormTitle}>Send us a Message</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Subject</Text>
          <TextInput
            style={styles.input}
            value={contactForm.subject}
            onChangeText={(text) => setContactForm(prev => ({ ...prev, subject: text }))}
            placeholder="What can we help you with?"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={contactForm.message}
            onChangeText={(text) => setContactForm(prev => ({ ...prev, message: text }))}
            placeholder="Describe your issue or question..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleContactSubmit}>
          <Send size={20} color={colors.black} />
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </Card>
    </>
  );

  const renderFeedback = () => (
    <>
      <Text style={styles.sectionTitle}>Share Your Feedback</Text>
      
      <Card style={styles.feedbackCard}>
        <Text style={styles.feedbackTitle}>Rate Your Experience</Text>
        <Text style={styles.feedbackSubtitle}>How would you rate our app?</Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map(rating => (
            <TouchableOpacity
              key={rating}
              style={styles.starButton}
              onPress={() => setFeedbackForm(prev => ({ ...prev, rating }))}
            >
              <Star 
                size={32} 
                color={rating <= feedbackForm.rating ? colors.warning : colors.border}
                fill={rating <= feedbackForm.rating ? colors.warning : 'transparent'}
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Tell us more</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={feedbackForm.feedback}
            onChangeText={(text) => setFeedbackForm(prev => ({ ...prev, feedback: text }))}
            placeholder="What did you like? What could we improve?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
          <Send size={20} color={colors.black} />
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </Card>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
          onPress={() => setActiveTab('faq')}
        >
          <HelpCircle size={20} color={activeTab === 'faq' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
          onPress={() => setActiveTab('contact')}
        >
          <MessageCircle size={20} color={activeTab === 'contact' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
            Contact
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'feedback' && styles.activeTab]}
          onPress={() => setActiveTab('feedback')}
        >
          <Star size={20} color={activeTab === 'feedback' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'feedback' && styles.activeTabText]}>
            Feedback
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'faq' && renderFAQ()}
        {activeTab === 'contact' && renderContact()}
        {activeTab === 'feedback' && renderFeedback()}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  faqCard: {
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  resourcesCard: {
    marginTop: 16,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resourceText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  contactMethodsCard: {
    marginBottom: 16,
  },
  contactMethodsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  contactDetail: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 2,
  },
  contactTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  contactFormCard: {
    marginBottom: 16,
  },
  contactFormTitle: {
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
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  feedbackCard: {
    marginBottom: 16,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  feedbackSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  starButton: {
    padding: 4,
    marginHorizontal: 4,
  },
});