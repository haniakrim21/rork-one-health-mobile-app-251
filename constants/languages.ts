import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'English' | 'Arabic';

export interface Translation {
  [key: string]: string;
}

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
];

// Define translations
const translations: Record<Language, Translation> = {
  English: {
    // App Navigation
    aiChat: 'AI Chat',
    fitness: 'Fitness',
    health: 'Health',
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    wellness: 'Wellness',

    // Common Actions
    add: 'Add',
    addMedication: 'Add Medication',
    addMedicationsTrack: 'Add medications to track your treatment',
    addReading: 'Add Reading',
    cancel: 'Cancel',
    clear: 'Clear',
    completeSetup: 'Complete Setup',
    continue: 'Continue',
    createGoal: 'Create Goal',
    delete: 'Delete',
    edit: 'Edit',
    manage: 'Manage',
    reset: 'Reset',
    save: 'Save',
    scheduleAppointment: 'Schedule Appointment',
    seeAll: 'See All',
    view: 'View',
    viewAll: 'View All',
    viewCalendar: 'View Calendar',
    viewDetails: 'View Details',
    viewRecords: 'View Records',

    // Health
    aiAssessment: 'AI Assessment',
    aiHealthCoach: 'AI Health Coach',
    aiNavigator: 'AI Navigator',
    allSystemsGood: 'All Systems Good',
    annualCheckup: 'Annual Checkup',
    bloodPressure: 'Blood Pressure',
    bpm: 'BPM',
    doctorAppointment: 'Doctor Appointment',
    elevated: 'Elevated',
    excellent: 'Excellent',
    good: 'Good',
    healthGuidance: 'Health Guidance',
    healthPassport: 'Health Passport',
    healthScore: 'Health Score',
    healthStatus: 'Health Status',
    heartRate: 'Heart Rate',
    kg: 'kg',
    medications: 'Medications',
    mmHg: 'mmHg',
    noActiveMedications: 'No Active Medications',
    noUpcomingAppointments: 'No Upcoming Appointments',
    normal: 'Normal',
    provider: 'Healthcare Provider',
    riskFactors: 'Risk Factors',
    scheduleHealthCheckup: 'Schedule your next health checkup',
    score: 'Score',
    sleepQuality: 'Sleep Quality',
    symptomChecker: 'Symptom Checker',
    talkToDoctor: 'Talk to Doctor',
    trackedMetrics: 'Tracked Metrics',
    upcomingAppointments: 'Upcoming Appointments',
    virtualConsult: 'Virtual Consult',
    vitalSigns: 'Vital Signs',
    weight: 'Weight',
    yourWellnessDashboard: 'Your wellness dashboard',

    // Fitness
    activeTime: 'Active Time',
    calories: 'Calories',
    distance: 'Distance',
    energy: 'Energy',
    km: 'km',
    lastNight: 'Last Night',
    min: 'min',
    steps: 'Steps',
    today: 'Today',
    workoutSession: 'Workout Session',

    // Wellness
    meditation: 'Meditation',
    mindfulness: 'Mindfulness',
    mood: 'Mood',
    nutrition: 'Nutrition',
    sleep: 'Sleep',
    stress: 'Stress',

    // AI Chat
    aiThinking: 'Thinking...',
    askAnythingHealth: 'Ask me anything about your health journey',
    oneHealthAI: 'OneHealth AI',
    onlineReady: 'Online & Ready',
    personalWellnessAssistant: 'Your personal wellness assistant',

    // Goals & Progress
    activeGoals: 'Active Goals',
    completedGoals: 'Completed Goals',
    dailyFocus: 'Daily Focus',
    goalProgress: 'Goal Progress',
    motivation: 'Motivation',
    newPlan: 'New Plan',
    noActiveGoals: 'No Active Goals',
    setFirstGoal: 'Set your first goal to start tracking progress',

    // Time & Date
    at: 'at',
    afternoon: 'Afternoon',
    evening: 'Evening',
    morning: 'Morning',
    tomorrow: 'Tomorrow',
    upcoming: 'Upcoming',

    // Greetings
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    goodMorning: 'Good Morning',
    user: 'User',
    welcome: 'Welcome',

    // Status & Progress
    completed: 'Completed',
    error: 'Error',
    inProgress: 'In Progress',
    loading: 'Loading',
    pending: 'Pending',
    success: 'Success',

    // Messages
    connectionError: 'Connection error',
    failedToClearCache: 'Failed to clear cache',
    failedToCreatePlan: 'Failed to create plan',
    personalizedPlanCreated: 'Your personalized plan has been created',
    planCreated: 'Plan Created',
    savedSuccessfully: 'Saved successfully',

    // Quick Actions
    personalizedInsights: 'Personalized Insights',
    quickActions: 'Quick Actions',

    // Settings
    appInformation: 'App Information',
    appSettings: 'App Settings',
    appearance: 'Appearance',
    audioHaptics: 'Audio & Haptics',
    autoSync: 'Auto Sync',
    backgroundRefresh: 'Background Refresh',
    betaFeatures: 'Beta Features',
    build: 'Build',
    cacheCleared: 'Cache cleared successfully',
    clearCache: 'Clear Cache',
    clearCacheConfirm: 'Are you sure you want to clear the cache?',
    darkMode: 'Dark Mode',
    dataSync: 'Data & Sync',
    hapticFeedback: 'Haptic Feedback',
    highQualityImages: 'High Quality Images',
    language: 'Language',
    lastUpdated: 'Last Updated',
    offlineMode: 'Offline Mode',
    resetSettings: 'Reset Settings',
    resetSettingsConfirm: 'Are you sure you want to reset all settings to default?',
    settingsResetSuccess: 'Settings have been reset to default',
    soundEffects: 'Sound Effects',
    units: 'Units',
    version: 'Version',

    // Auth & Profile
    accurateRecommendations: 'For more accurate recommendations',
    age: 'Age',
    anyConditions: 'Do you have any medical conditions?',
    averageSleepHours: 'Average Sleep Hours',
    balanced: 'Balanced',
    basicInformation: 'Basic Information',
    beginner: 'Beginner',
    betterMorningEnergy: 'Better Morning Energy',
    betterSleep: 'Better Sleep',
    buildMuscle: 'Build Muscle',
    competitionChallenges: 'Competition & Challenges',
    currentStressLevel: 'Current Stress Level',
    customizeGoalSetting: 'Customize your goal setting',
    dailyHabits: 'Tell us about your daily habits',
    detailed: 'Detailed',
    dietaryPreferences: 'Dietary Preferences',
    didntReceiveCode: "Didn't receive the code?",
    diseasePrevention: 'Disease Prevention',
    email: 'Email',
    enterVerificationCode: 'Enter Verification Code',
    enterYourHeight: 'Enter your height',
    enterYourName: 'Enter your full name',
    enterYourWeight: 'Enter your weight',
    exerciseConsistently: 'Exercise consistently',
    exerciseRegularly: 'Exercise regularly',
    female: 'Female',
    firm: 'Firm',
    fitnessLevel: 'Fitness Level',
    flexible: 'Flexible',
    fullName: 'Full Name',
    gainWeight: 'Gain Weight',
    gender: 'Gender',
    gentle: 'Gentle',
    gentleSupport: 'Gentle Support',
    goalPersonalization: 'Goal Personalization',
    goals: 'goals',
    healthImprovement: 'Health Improvement',
    height: 'Height',
    improveFitness: 'Improve Fitness',
    improveFlex: 'Improve Flexibility',
    increaseBodyWeight: 'Increase body weight',
    increaseEnergy: 'Increased Energy',
    increaseEnergyOption: 'Increase Energy',
    increaseStrength: 'Increase Strength',
    intermediate: 'Intermediate',
    keepCurrentWeight: 'Keep current weight',
    letsGetToKnowYou: "Let's Get to Know You",
    lifestyleInformation: 'Lifestyle Information',
    longTerm: 'Long Term',
    loseWeight: 'Lose Weight',
    maintainWeight: 'Maintain Weight',
    male: 'Male',
    medicalHistory: 'Medical History',
    mediumTerm: 'Medium Term',
    minimal: 'Minimal',
    moreEnergy: 'More Energy',
    motivational: 'Motivational',
    nationalId: 'National ID',
    newToExercise: 'New to exercise',
    personalAchievement: 'Personal Achievement',
    personalizeHealthJourney: 'Help us personalize your health journey',
    phoneEncrypted: 'Your phone number is encrypted and secure',
    phoneNumber: 'Phone Number',
    preferNotToSay: 'Prefer not to say',
    preferredGoalTimeframe: 'Preferred Goal Timeframe',
    preferredWorkoutTime: 'Preferred Workout Time',
    reduceBodyWeight: 'Reduce body weight',
    reduceStress: 'Reduce Stress',
    reminderStyle: 'Reminder Style',
    resendCode: 'Resend Code',
    rightWorkoutPlan: 'Help us create the right workout plan for you',
    sendVerificationCode: 'Send verification code',
    sendingCode: 'Sending code...',
    sentCodeTo: 'We sent a code to ',
    shortTerm: 'Short Term',
    signInWithPhone: 'Sign in with Phone',
    simple: 'Simple',
    socialConnection: 'Social Connection',
    specificGoals: 'Specific Goals',
    stabilizeEnergy: 'Stabilize Energy',
    stressRelief: 'Stress Relief',
    targetEnergyLevel: 'Target Energy Level',
    targetStressLevel: 'Target Stress Level',
    targetWeight: 'Target Weight',
    teamCommunity: 'Team & Community',
    timeframeMonths: 'Timeframe (months)',
    trackingDetail: 'Tracking Detail',
    understandHealthBackground: 'Help us understand your health background',
    uploadMedicalReports: 'Upload Medical Reports',
    verificationCode: 'Verification Code',
    verifyAndContinue: 'Verify and Continue',
    verifyingCode: 'Verifying...',
    wakeUpRefreshed: 'Wake up refreshed',
    weightGoal: 'Weight Goal',
    weightManagement: 'Weight Management',
    whatAreYourGoals: 'What are your goals?',
    whatMotivatesYou: 'What motivates you?'
  },
  Arabic: {
    // App Navigation
    aiChat: 'المساعد الذكي',
    fitness: 'اللياقة',
    health: 'الصحة',
    home: 'الرئيسية',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    wellness: 'العافية',

    // Common Actions
    add: 'إضافة',
    addMedication: 'إضافة دواء',
    addMedicationsTrack: 'أضف أدوية لتتبع علاجك',
    addReading: 'إضافة قراءة',
    cancel: 'إلغاء',
    clear: 'مسح',
    completeSetup: 'إكمال الإعداد',
    continue: 'استمرار',
    createGoal: 'إنشاء هدف',
    delete: 'حذف',
    edit: 'تعديل',
    manage: 'إدارة',
    reset: 'إعادة تعيين',
    save: 'حفظ',
    scheduleAppointment: 'جدولة موعد',
    seeAll: 'عرض الكل',
    view: 'عرض',
    viewAll: 'عرض الكل',
    viewCalendar: 'عرض التقويم',
    viewDetails: 'عرض التفاصيل',
    viewRecords: 'عرض السجلات',

    // Health
    aiAssessment: 'تقييم ذكي',
    aiHealthCoach: 'المدرب الصحي الذكي',
    aiNavigator: 'المرشد الذكي',
    allSystemsGood: 'جميع الأنظمة جيدة',
    annualCheckup: 'الفحص السنوي',
    bloodPressure: 'ضغط الدم',
    bpm: 'نبضة/دقيقة',
    doctorAppointment: 'موعد الطبيب',
    elevated: 'مرتفع',
    excellent: 'ممتاز',
    good: 'جيد',
    healthGuidance: 'إرشادات صحية',
    healthPassport: 'جواز السفر الصحي',
    healthScore: 'النتيجة الصحية',
    healthStatus: 'الحالة الصحية',
    heartRate: 'معدل ضربات القلب',
    kg: 'كجم',
    medications: 'الأدوية',
    mmHg: 'مم زئبق',
    noActiveMedications: 'لا توجد أدوية نشطة',
    noUpcomingAppointments: 'لا توجد مواعيد قادمة',
    normal: 'طبيعي',
    provider: 'مقدم الرعاية الصحية',
    riskFactors: 'عوامل الخطر',
    scheduleHealthCheckup: 'جدول فحصك الصحي القادم',
    score: 'النتيجة',
    sleepQuality: 'جودة النوم',
    symptomChecker: 'فاحص الأعراض',
    talkToDoctor: 'تحدث مع طبيب',
    trackedMetrics: 'المقاييس المتتبعة',
    upcomingAppointments: 'المواعيد القادمة',
    virtualConsult: 'استشارة افتراضية',
    vitalSigns: 'العلامات الحيوية',
    weight: 'الوزن',
    yourWellnessDashboard: 'لوحة تحكم العافية الخاصة بك',

    // Fitness
    activeTime: 'وقت النشاط',
    calories: 'السعرات الحرارية',
    distance: 'المسافة',
    energy: 'الطاقة',
    km: 'كم',
    lastNight: 'الليلة الماضية',
    min: 'دقيقة',
    steps: 'الخطوات',
    today: 'اليوم',
    workoutSession: 'جلسة تمرين',

    // Wellness
    meditation: 'التأمل',
    mindfulness: 'اليقظة الذهنية',
    mood: 'المزاج',
    nutrition: 'التغذية',
    sleep: 'النوم',
    stress: 'التوتر',

    // AI Chat
    aiThinking: 'جاري التفكير...',
    askAnythingHealth: 'اسألني أي شيء عن رحلتك الصحية',
    oneHealthAI: 'الصحة الذكية',
    onlineReady: 'متصل وجاهز',
    personalWellnessAssistant: 'مساعدك الشخصي للعافية',

    // Goals & Progress
    activeGoals: 'الأهداف النشطة',
    completedGoals: 'الأهداف المكتملة',
    dailyFocus: 'تركيز اليوم',
    goalProgress: 'تقدم الهدف',
    motivation: 'التحفيز',
    newPlan: 'خطة جديدة',
    noActiveGoals: 'لا توجد أهداف نشطة',
    setFirstGoal: 'حدد هدفك الأول لبدء تتبع التقدم',

    // Time & Date
    at: 'في',
    afternoon: 'ظهراً',
    evening: 'مساءً',
    morning: 'صباحاً',
    tomorrow: 'غداً',
    upcoming: 'القادم',

    // Greetings
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    goodMorning: 'صباح الخير',
    user: 'المستخدم',
    welcome: 'مرحباً',

    // Status & Progress
    completed: 'مكتمل',
    error: 'خطأ',
    inProgress: 'قيد التنفيذ',
    loading: 'جاري التحميل',
    pending: 'معلق',
    success: 'نجاح',

    // Messages
    connectionError: 'خطأ في الاتصال',
    failedToClearCache: 'فشل في مسح الذاكرة المؤقتة',
    failedToCreatePlan: 'فشل في إنشاء الخطة',
    personalizedPlanCreated: 'تم إنشاء خطتك الشخصية',
    planCreated: 'تم إنشاء الخطة',
    savedSuccessfully: 'تم الحفظ بنجاح',

    // Quick Actions
    personalizedInsights: 'رؤى شخصية',
    quickActions: 'إجراءات سريعة',

    // Settings
    appInformation: 'معلومات التطبيق',
    appSettings: 'إعدادات التطبيق',
    appearance: 'المظهر',
    audioHaptics: 'الصوت والاهتزاز',
    autoSync: 'مزامنة تلقائية',
    backgroundRefresh: 'تحديث في الخلفية',
    betaFeatures: 'ميزات تجريبية',
    build: 'البناء',
    cacheCleared: 'تم مسح الذاكرة المؤقتة بنجاح',
    clearCache: 'مسح الذاكرة المؤقتة',
    clearCacheConfirm: 'هل أنت متأكد من مسح الذاكرة المؤقتة؟',
    darkMode: 'الوضع الداكن',
    dataSync: 'مزامنة البيانات',
    hapticFeedback: 'الاهتزاز',
    highQualityImages: 'صور عالية الجودة',
    language: 'اللغة',
    lastUpdated: 'آخر تحديث',
    offlineMode: 'وضع عدم الاتصال',
    resetSettings: 'إعادة تعيين الإعدادات',
    resetSettingsConfirm: 'هل أنت متأكد من إعادة تعيين جميع الإعدادات إلى الوضع الافتراضي؟',
    settingsResetSuccess: 'تمت إعادة تعيين الإعدادات إلى الوضع الافتراضي',
    soundEffects: 'المؤثرات الصوتية',
    units: 'الوحدات',
    version: 'الإصدار',

    // Auth & Profile
    accurateRecommendations: 'للحصول على توصيات أكثر دقة',
    age: 'العمر',
    anyConditions: 'هل لديك أي حالات طبية؟',
    averageSleepHours: 'متوسط ساعات النوم',
    balanced: 'متوازن',
    basicInformation: 'المعلومات الأساسية',
    beginner: 'مبتدئ',
    betterMorningEnergy: 'طاقة صباحية أفضل',
    betterSleep: 'نوم أفضل',
    buildMuscle: 'بناء العضلات',
    competitionChallenges: 'المنافسة والتحديات',
    currentStressLevel: 'مستوى التوتر الحالي',
    customizeGoalSetting: 'خصص إعداد أهدافك',
    dailyHabits: 'أخبرنا عن عاداتك اليومية',
    detailed: 'مفصل',
    dietaryPreferences: 'التفضيلات الغذائية',
    didntReceiveCode: 'لم تستلم الرمز؟',
    diseasePrevention: 'الوقاية من الأمراض',
    email: 'البريد الإلكتروني',
    enterVerificationCode: 'أدخل رمز التحقق',
    enterYourHeight: 'أدخل طولك',
    enterYourName: 'أدخل اسمك الكامل',
    enterYourWeight: 'أدخل وزنك',
    exerciseConsistently: 'تمارين مستمرة',
    exerciseRegularly: 'تمارين منتظمة',
    female: 'أنثى',
    firm: 'حازم',
    fitnessLevel: 'مستوى اللياقة',
    flexible: 'مرن',
    fullName: 'الاسم الكامل',
    gainWeight: 'زيادة الوزن',
    gender: 'الجنس',
    gentle: 'لطيف',
    gentleSupport: 'الدعم اللطيف',
    goalPersonalization: 'تخصيص الهدف',
    goals: 'أهداف',
    healthImprovement: 'تحسين الصحة',
    height: 'الطول',
    improveFitness: 'تحسين اللياقة',
    improveFlex: 'تحسين المرونة',
    increaseBodyWeight: 'زيادة وزن الجسم',
    increaseEnergy: 'زيادة الطاقة',
    increaseEnergyOption: 'زيادة الطاقة',
    increaseStrength: 'زيادة القوة',
    intermediate: 'متوسط',
    keepCurrentWeight: 'الحفاظ على الوزن الحالي',
    letsGetToKnowYou: 'دعنا نتعرف عليك',
    lifestyleInformation: 'معلومات نمط الحياة',
    longTerm: 'طويل المدى',
    loseWeight: 'إنقاص الوزن',
    maintainWeight: 'الحفاظ على الوزن',
    male: 'ذكر',
    medicalHistory: 'التاريخ الطبي',
    mediumTerm: 'متوسط المدى',
    minimal: 'الحد الأدنى',
    moreEnergy: 'طاقة أكثر',
    motivational: 'تحفيزي',
    nationalId: 'رقم الهوية',
    newToExercise: 'جديد في التمارين',
    personalAchievement: 'الإنجاز الشخصي',
    personalizeHealthJourney: 'ساعدنا في تخصيص رحلتك الصحية',
    phoneEncrypted: 'رقم هاتفك مشفر وآمن',
    phoneNumber: 'رقم الهاتف',
    preferNotToSay: 'أفضل عدم التحديد',
    preferredGoalTimeframe: 'الإطار الزمني المفضل للهدف',
    preferredWorkoutTime: 'وقت التمرين المفضل',
    reduceBodyWeight: 'تقليل وزن الجسم',
    reduceStress: 'تقليل التوتر',
    reminderStyle: 'نمط التذكير',
    resendCode: 'إعادة إرسال الرمز',
    rightWorkoutPlan: 'ساعدنا في إنشاء خطة التمرين المناسبة لك',
    sendVerificationCode: 'إرسال رمز التحقق',
    sendingCode: 'جاري إرسال الرمز...',
    sentCodeTo: 'لقد أرسلنا رمزاً إلى ',
    shortTerm: 'قصير المدى',
    signInWithPhone: 'تسجيل الدخول برقم الهاتف',
    simple: 'بسيط',
    socialConnection: 'التواصل الاجتماعي',
    specificGoals: 'أهداف محددة',
    stabilizeEnergy: 'استقرار الطاقة',
    stressRelief: 'تخفيف التوتر',
    targetEnergyLevel: 'مستوى الطاقة المستهدف',
    targetStressLevel: 'مستوى التوتر المستهدف',
    targetWeight: 'الوزن المستهدف',
    teamCommunity: 'الفريق والمجتمع',
    timeframeMonths: 'الإطار الزمني (أشهر)',
    trackingDetail: 'تفاصيل التتبع',
    understandHealthBackground: 'ساعدنا في فهم خلفيتك الصحية',
    uploadMedicalReports: 'تحميل التقارير الطبية',
    verificationCode: 'رمز التحقق',
    verifyAndContinue: 'تحقق واستمر',
    verifyingCode: 'جاري التحقق...',
    wakeUpRefreshed: 'الاستيقاظ منتعشاً',
    weightGoal: 'هدف الوزن',
    weightManagement: 'إدارة الوزن',
    whatAreYourGoals: 'ما هي أهدافك؟',
    whatMotivatesYou: 'ما الذي يحفزك؟'
  }
};

// Helper function to check if a language is RTL
export const isRTL = (language: string): boolean => {
  return language === 'Arabic';
};

// Main translation function
export const getTranslation = (language: string, key: string): string => {
  try {
    // Default to English if language not found
    const selectedLanguage = (translations[language as Language] || translations.English);
    
    // Return the translation or the key if translation not found
    return selectedLanguage[key] || key;
  } catch (error) {
    console.error('Translation error:', error);
    return key;
  }
};

// Force RTL layout for specific languages
export const configureLayoutDirection = (language: string): void => {
  if (Platform.OS !== 'web') {
    const isRTLLanguage = isRTL(language);
    if (isRTLLanguage) {
      try {
        const RNI18nManager = require('react-native').I18nManager;
        RNI18nManager.allowRTL(true);
        RNI18nManager.forceRTL(true);
      } catch (error) {
        console.error('Failed to configure RTL:', error);
      }
    } else {
      try {
        const RNI18nManager = require('react-native').I18nManager;
        RNI18nManager.allowRTL(false);
        RNI18nManager.forceRTL(false);
      } catch (error) {
        console.error('Failed to configure LTR:', error);
      }
    }
  }
};