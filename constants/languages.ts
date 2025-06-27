import { Platform } from 'react-native';

export type Language = 'English' | 'Arabic';

export interface Translation {
  [key: string]: string;
}

// Define translations
const translations: Record<Language, Translation> = {
  English: {
    // App Navigation
    home: 'Home',
    health: 'Health',
    fitness: 'Fitness',
    wellness: 'Wellness',
    aiChat: 'AI Chat',
    profile: 'Profile',
    settings: 'Settings',

    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    view: 'View',
    manage: 'Manage',
    seeAll: 'See All',
    viewAll: 'View All',
    viewDetails: 'View Details',
    viewCalendar: 'View Calendar',
    createGoal: 'Create Goal',
    scheduleAppointment: 'Schedule Appointment',
    addReading: 'Add Reading',

    // Health
    vitalSigns: 'Vital Signs',
    heartRate: 'Heart Rate',
    bloodPressure: 'Blood Pressure',
    weight: 'Weight',
    sleepQuality: 'Sleep Quality',
    bpm: 'BPM',
    mmHg: 'mmHg',
    kg: 'kg',
    score: 'Score',
    normal: 'Normal',
    elevated: 'Elevated',
    good: 'Good',
    excellent: 'Excellent',

    // Fitness
    steps: 'Steps',
    calories: 'Calories',
    distance: 'Distance',
    activeTime: 'Active Time',
    km: 'km',
    min: 'min',
    today: 'Today',
    lastNight: 'Last Night',
    energy: 'Energy',

    // Wellness
    mood: 'Mood',
    stress: 'Stress',
    meditation: 'Meditation',
    mindfulness: 'Mindfulness',
    sleep: 'Sleep',
    nutrition: 'Nutrition',

    // AI Chat
    aiHealthCoach: 'AI Health Coach',
    personalWellnessAssistant: 'Your personal wellness assistant',
    askAnythingHealth: 'Ask me anything about your health journey',
    aiThinking: 'Thinking...',
    oneHealthAI: 'OneHealth AI',
    onlineReady: 'Online & Ready',

    // Goals & Progress
    goalProgress: 'Goal Progress',
    motivation: 'Motivation',
    newPlan: 'New Plan',
    dailyFocus: 'Daily Focus',
    activeGoals: 'Active Goals',
    completedGoals: 'Completed Goals',
    noActiveGoals: 'No Active Goals',
    setFirstGoal: 'Set your first goal to start tracking progress',

    // Time & Date
    at: 'at',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    tomorrow: 'Tomorrow',

    // Greetings
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    welcome: 'Welcome',
    user: 'User',

    // Status & Progress
    loading: 'Loading',
    success: 'Success',
    error: 'Error',
    completed: 'Completed',
    inProgress: 'In Progress',
    pending: 'Pending',

    // Messages
    savedSuccessfully: 'Saved successfully',
    connectionError: 'Connection error',
    planCreated: 'Plan Created',
    personalizedPlanCreated: 'Your personalized plan has been created',
    failedToCreatePlan: 'Failed to create plan',

    // Quick Actions
    quickActions: 'Quick Actions',
    personalizedInsights: 'Personalized Insights',
    
    // Health Status
    healthStatus: 'Health Status',
    allSystemsGood: 'All Systems Good',
    healthScore: 'Health Score',
    riskFactors: 'Risk Factors',
    trackedMetrics: 'Tracked Metrics',

    // Medical
    doctorAppointment: 'Doctor Appointment',
    annualCheckup: 'Annual Checkup',
    provider: 'Healthcare Provider',
    noUpcomingAppointments: 'No Upcoming Appointments',
    scheduleHealthCheckup: 'Schedule your next health checkup',
    medications: 'Medications',
    noActiveMedications: 'No Active Medications',
    addMedicationsTrack: 'Add medications to track your treatment',
    addMedication: 'Add Medication',

    // Insights
    healthInsights: 'Health Insights',
    greatProgress: 'Great Progress!',
    heartRateHealthy: 'Your heart rate has been in a healthy range',
    sleepOptimization: 'Sleep Optimization',
    trackSleepQuality: 'Track your sleep quality for better rest',

    // Activity
    activityRings: 'Activity Rings',
    closeYourRings: 'Close your rings',
    todaysOverview: "Today's Overview",

    // Wellness Features
    findPeace: 'Find peace',
    getAdvice: 'Get advice',
    aiCoach: 'AI Coach',
    logVitals: 'Log vitals',
    getMoving: 'Get moving',
    startWorkout: 'Start Workout',
    healthCheck: 'Health Check',

    // Progress & Goals
    goalsProgress: 'Goals Progress',
    progressTracking: 'Progress Tracking',
    reminder: 'Reminder',
    primaryFocus: 'Primary Focus',
    goals: 'goals',

    // Weather & Status
    sunny: 'Sunny',

    // Achievements
    excellentProgress: 'Excellent progress!',
  },
  Arabic: {
    // App Navigation
    home: 'الرئيسية',
    health: 'الصحة',
    fitness: 'اللياقة',
    wellness: 'العافية',
    aiChat: 'المساعد الذكي',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',

    // Common Actions
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    view: 'عرض',
    manage: 'إدارة',
    seeAll: 'عرض الكل',
    viewAll: 'عرض الكل',
    viewDetails: 'عرض التفاصيل',
    viewCalendar: 'عرض التقويم',
    createGoal: 'إنشاء هدف',
    scheduleAppointment: 'جدولة موعد',
    addReading: 'إضافة قراءة',

    // Health
    vitalSigns: 'العلامات الحيوية',
    heartRate: 'معدل ضربات القلب',
    bloodPressure: 'ضغط الدم',
    weight: 'الوزن',
    sleepQuality: 'جودة النوم',
    bpm: 'نبضة/دقيقة',
    mmHg: 'مم زئبق',
    kg: 'كجم',
    score: 'النتيجة',
    normal: 'طبيعي',
    elevated: 'مرتفع',
    good: 'جيد',
    excellent: 'ممتاز',

    // Fitness
    steps: 'الخطوات',
    calories: 'السعرات الحرارية',
    distance: 'المسافة',
    activeTime: 'وقت النشاط',
    km: 'كم',
    min: 'دقيقة',
    today: 'اليوم',
    lastNight: 'الليلة الماضية',
    energy: 'الطاقة',

    // Wellness
    mood: 'المزاج',
    stress: 'التوتر',
    meditation: 'التأمل',
    mindfulness: 'اليقظة الذهنية',
    sleep: 'النوم',
    nutrition: 'التغذية',

    // AI Chat
    aiHealthCoach: 'المدرب الصحي الذكي',
    personalWellnessAssistant: 'مساعدك الشخصي للعافية',
    askAnythingHealth: 'اسألني أي شيء عن رحلتك الصحية',
    aiThinking: 'جاري التفكير...',
    oneHealthAI: 'الصحة الذكية',
    onlineReady: 'متصل وجاهز',

    // Goals & Progress
    goalProgress: 'تقدم الهدف',
    motivation: 'التحفيز',
    newPlan: 'خطة جديدة',
    dailyFocus: 'تركيز اليوم',
    activeGoals: 'الأهداف النشطة',
    completedGoals: 'الأهداف المكتملة',
    noActiveGoals: 'لا توجد أهداف نشطة',
    setFirstGoal: 'حدد هدفك الأول لبدء تتبع التقدم',

    // Time & Date
    at: 'في',
    morning: 'صباحاً',
    afternoon: 'ظهراً',
    evening: 'مساءً',
    tomorrow: 'غداً',

    // Greetings
    goodMorning: 'صباح الخير',
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    welcome: 'مرحباً',
    user: 'المستخدم',

    // Status & Progress
    loading: 'جاري التحميل',
    success: 'نجاح',
    error: 'خطأ',
    completed: 'مكتمل',
    inProgress: 'قيد التنفيذ',
    pending: 'معلق',

    // Messages
    savedSuccessfully: 'تم الحفظ بنجاح',
    connectionError: 'خطأ في الاتصال',
    planCreated: 'تم إنشاء الخطة',
    personalizedPlanCreated: 'تم إنشاء خطتك الشخصية',
    failedToCreatePlan: 'فشل في إنشاء الخطة',

    // Quick Actions
    quickActions: 'إجراءات سريعة',
    personalizedInsights: 'رؤى شخصية',
    
    // Health Status
    healthStatus: 'الحالة الصحية',
    allSystemsGood: 'جميع الأنظمة جيدة',
    healthScore: 'النتيجة الصحية',
    riskFactors: 'عوامل الخطر',
    trackedMetrics: 'المقاييس المتتبعة',

    // Medical
    doctorAppointment: 'موعد الطبيب',
    annualCheckup: 'الفحص السنوي',
    provider: 'مقدم الرعاية الصحية',
    noUpcomingAppointments: 'لا توجد مواعيد قادمة',
    scheduleHealthCheckup: 'جدول فحصك الصحي القادم',
    medications: 'الأدوية',
    noActiveMedications: 'لا توجد أدوية نشطة',
    addMedicationsTrack: 'أضف أدوية لتتبع علاجك',
    addMedication: 'إضافة دواء',

    // Insights
    healthInsights: 'رؤى صحية',
    greatProgress: 'تقدم رائع!',
    heartRateHealthy: 'معدل ضربات قلبك في نطاق صحي',
    sleepOptimization: 'تحسين النوم',
    trackSleepQuality: 'تتبع جودة نومك للحصول على راحة أفضل',

    // Activity
    activityRings: 'حلقات النشاط',
    closeYourRings: 'أغلق حلقاتك',
    todaysOverview: "نظرة عامة اليوم",

    // Wellness Features
    findPeace: 'اعثر على السلام',
    getAdvice: 'احصل على نصيحة',
    aiCoach: 'المدرب الذكي',
    logVitals: 'سجل العلامات الحيوية',
    getMoving: 'ابدأ بالحركة',
    startWorkout: 'بدء التمرين',
    healthCheck: 'فحص صحي',

    // Progress & Goals
    goalsProgress: 'تقدم الأهداف',
    progressTracking: 'تتبع التقدم',
    reminder: 'تذكير',
    primaryFocus: 'التركيز الرئيسي',
    goals: 'أهداف',

    // Weather & Status
    sunny: 'مشمس',

    // Achievements
    excellentProgress: 'تقدم ممتاز!',
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
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  }
};