import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "@/constants/colors";
import { Card } from "@/components/Card";
import { 
  Home, 
  Heart, 
  Dumbbell, 
  Leaf, 
  MessageCircle, 
  User,
  Search,
  Calendar,
  Activity,
  Brain,
  Shield,
  Pill,
  Stethoscope,
  Target,
  Users,
  Moon,
  Zap
} from "lucide-react-native";

export default function NotFoundScreen() {
  const healthFeatures = [
    { title: "Virtual Consultation", href: "/virtual-consultation", icon: Heart },
    { title: "Symptom Checker", href: "/symptom-checker", icon: Brain },
    { title: "Digital Twin", href: "/digital-twin", icon: Activity },
    { title: "AI Health Navigator", href: "/ai-health-navigator", icon: Brain },
    { title: "Health Passport", href: "/health-passport", icon: Shield },
    { title: "Appointments", href: "/appointments", icon: Calendar },
    { title: "Medications", href: "/medications", icon: Pill },
    { title: "Care Plans", href: "/care-plans", icon: Stethoscope },
    { title: "Referrals", href: "/referrals", icon: Users },
  ];

  const fitnessFeatures = [
    { title: "Fitness Assessment", href: "/fitness-assessment", icon: Activity },
    { title: "AI Trainer", href: "/ai-trainer", icon: Brain },
    { title: "Group Training", href: "/group-training", icon: Dumbbell },
    { title: "Challenges", href: "/fitness-challenges", icon: Dumbbell },
    { title: "Trainers", href: "/trainers", icon: User },
    { title: "Workouts", href: "/workouts", icon: Target },
    { title: "Fitness Insights", href: "/fitness-insights", icon: Activity },
  ];

  const wellnessFeatures = [
    { title: "Meditation", href: "/meditation", icon: Brain },
    { title: "Sleep Tracking", href: "/sleep-tracking", icon: Moon },
    { title: "Stress Management", href: "/stress-management", icon: Heart },
    { title: "Wellness Paths", href: "/wellness-paths", icon: Target },
    { title: "Energy Insights", href: "/energy-insights", icon: Zap },
    { title: "Resilience Insights", href: "/resilience-insights", icon: Shield },
    { title: "Wellness Insights", href: "/wellness-insights", icon: Leaf },
  ];

  const mainTabs = [
    { title: "Home", href: "/", icon: Home },
    { title: "Health", href: "/(tabs)/health", icon: Heart },
    { title: "Fitness", href: "/(tabs)/fitness", icon: Dumbbell },
    { title: "Wellness", href: "/(tabs)/wellness", icon: Leaf },
    { title: "AI Chat", href: "/(tabs)/ai-chat", icon: MessageCircle },
    { title: "Profile", href: "/(tabs)/profile", icon: User },
  ];

  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Oops! Page Not Found</Text>
          <Text style={styles.subtitle}>
            The page you are looking for does not exist. Explore our comprehensive health and fitness features below.
          </Text>
        </View>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Main Navigation</Text>
          <View style={styles.grid}>
            {mainTabs.map((tab) => (
              <Link key={tab.href} href={tab.href} asChild>
                <TouchableOpacity style={styles.featureCard}>
                  <tab.icon size={24} color={colors.primary} />
                  <Text style={styles.featureTitle}>{tab.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Health Features</Text>
          <Text style={styles.sectionDescription}>
            Comprehensive healthcare with AI-powered diagnostics, virtual consultations, and preventive care.
          </Text>
          <View style={styles.grid}>
            {healthFeatures.map((feature) => (
              <Link key={feature.href} href={feature.href} asChild>
                <TouchableOpacity style={styles.featureCard}>
                  <feature.icon size={24} color={colors.primary} />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Features</Text>
          <Text style={styles.sectionDescription}>
            AI-powered training plans, performance tracking, and personalized fitness coaching.
          </Text>
          <View style={styles.grid}>
            {fitnessFeatures.map((feature) => (
              <Link key={feature.href} href={feature.href} asChild>
                <TouchableOpacity style={styles.featureCard}>
                  <feature.icon size={24} color={colors.primary} />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Features</Text>
          <Text style={styles.sectionDescription}>
            Mental wellness, mindfulness practices, and holistic health optimization.
          </Text>
          <View style={styles.grid}>
            {wellnessFeatures.map((feature) => (
              <Link key={feature.href} href={feature.href} asChild>
                <TouchableOpacity style={styles.featureCard}>
                  <feature.icon size={24} color={colors.primary} />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </Card>

        <Card style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Heart size={20} color={colors.error} />
            <Text style={styles.emergencyTitle}>Need Immediate Help?</Text>
          </View>
          <Text style={styles.emergencyText}>
            For medical emergencies, contact emergency services immediately.
          </Text>
          <Link href="/virtual-consultation" asChild>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Virtual Consultation</Text>
            </TouchableOpacity>
          </Link>
        </Card>

        <Link href="/" style={styles.homeLink}>
          <Text style={styles.homeLinkText}>← Go to Home Screen</Text>
        </Link>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: colors.primary + "10",
    borderRadius: 12,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text,
    marginTop: 8,
    textAlign: "center",
  },
  emergencyCard: {
    backgroundColor: colors.error + "10",
    borderColor: colors.error + "30",
    borderWidth: 1,
    marginBottom: 24,
  },
  emergencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.error,
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  emergencyButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.error,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: colors.background,
    fontWeight: "600",
  },
  homeLink: {
    alignSelf: "center",
    paddingVertical: 15,
  },
  homeLinkText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "500",
  },
});