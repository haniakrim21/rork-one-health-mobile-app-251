import { Platform, I18nManager } from 'react-native';

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

    // Auth & Profile
    signInWithPhone: 'Sign in with Phone',
    sendVerificationCode: 'Send verification code',
    phoneNumber: 'Phone Number',
    phoneEncrypted: 'Your phone number is encrypted and secure',
    sendingCode: 'Sending code...',
    enterVerificationCode: 'Enter Verification Code',
    sentCodeTo: 'We sent a code to ',
    verificationCode: 'Verification Code',
    didntReceiveCode: "Didn't receive the code?",
    resendCode: 'Resend Code',
    verifyingCode: 'Verifying...',
    verifyAndContinue: 'Verify and Continue',
    fullName: 'Full Name',
    enterYourName: 'Enter your full name',
    nationalId: 'National ID',
    email: 'Email',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    preferNotToSay: 'Prefer not to say',
    height: 'Height',
    enterYourHeight: 'Enter your height',
    enterYourWeight: 'Enter your weight',
    uploadMedicalReports: 'Upload Medical Reports',
    whatAreYourGoals: 'What are your goals?',
    selectAllThatApply: 'Select all that apply',
    loseWeight: 'Lose Weight',
    buildMuscle: 'Build Muscle',
    improveFitness: 'Improve Fitness',
    increaseStrength: 'Increase Strength',
    improveFlex: 'Improve Flexibility',
    reduceStress: 'Reduce Stress',
    betterSleep: 'Better Sleep',
    moreEnergy: 'More Energy',
    medicalHistory: 'Medical History',
    understandHealthBackground: 'Help us understand your health background',
    anyConditions: 'Do you have any medical conditions?',
    fitnessLevel: 'Fitness Level',
    rightWorkoutPlan: 'Help us create the right workout plan for you',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    newToExercise: 'New to exercise',
    exerciseRegularly: 'Exercise regularly',
    exerciseConsistently: 'Exercise consistently',
    lifestyleInformation: 'Lifestyle Information',
    dailyHabits: 'Tell us about your daily habits',
    averageSleepHours: 'Average Sleep Hours',
    currentStressLevel: 'Current Stress Level',
    dietaryPreferences: 'Dietary Preferences',
    whatMotivatesYou: 'What motivates you?',
    competitionChallenges: 'Competition & Challenges',
    teamCommunity: 'Team & Community',
    personalAchievement: 'Personal Achievement',
    gentleSupport: 'Gentle Support',
    preferredWorkoutTime: 'Preferred Workout Time',
    flexible: 'Flexible',
    reminderStyle: 'Reminder Style',
    gentle: 'Gentle',
    firm: 'Firm',
    motivational: 'Motivational',
    goalPersonalization: 'Goal Personalization',
    customizeGoalSetting: 'Customize your goal setting',
    balanced: 'Balanced',
    whatMotivatesYouSelect: 'What motivates you? (Select all that apply)',
    healthImprovement: 'Health Improvement',
    weightManagement: 'Weight Management',
    stressRelief: 'Stress Relief',
    betterSleepOption: 'Better Sleep',
    increasedEnergy: 'Increased Energy',
    socialConnection: 'Social Connection',
    personalAchievementOption: 'Personal Achievement',
    diseasePrevention: 'Disease Prevention',
    preferredGoalTimeframe: 'Preferred Goal Timeframe',
    shortTerm: 'Short Term',
    mediumTerm: 'Medium Term',
    longTerm: 'Long Term',
    trackingDetail: 'Tracking Detail',
    detailed: 'Detailed',
    simple: 'Simple',
    minimal: 'Minimal',
    specificGoals: 'Specific Goals',
    personalizedGoalsSetup: 'Set up your personalized goals',
    weightGoal: 'Weight Goal',
    loseWeightOption: 'Lose Weight',
    gainWeight: 'Gain Weight',
    maintainWeight: 'Maintain Weight',
    reduceBodyWeight: 'Reduce body weight',
    increaseBodyWeight: 'Increase body weight',
    keepCurrentWeight: 'Keep current weight',
    targetWeight: 'Target Weight',
    timeframeMonths: 'Timeframe (months)',
    energyGoal: 'Energy Goal',
    increaseEnergyOption: 'Increase Energy',
    stabilizeEnergy: 'Stabilize Energy',
    betterMorningEnergy: 'Better Morning Energy',
    feelMoreEnergetic: 'Feel more energetic',
    avoidEnergyCrashes: 'Avoid energy crashes',
    wakeUpRefreshed: 'Wake up refreshed',
    targetEnergyLevel: 'Target Energy Level',
    stressReductionGoal: 'Stress Reduction Goal',
    targetStressLevel: 'Target Stress Level',
    continue: 'Continue',
    completeSetup: 'Complete Setup',
    letsGetToKnowYou: "Let's Get to Know You",
    personalizeHealthJourney: 'Help us personalize your health journey',
    basicInformation: 'Basic Information',
    accurateRecommendations: 'For more accurate recommendations',
    upcoming: 'Upcoming',
    workoutSession: 'Workout Session'
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

    // Auth & Profile
    signInWithPhone: 'تسجيل الدخول برقم الهاتف',
    sendVerificationCode: 'إرسال رمز التحقق',
    phoneNumber: 'رقم الهاتف',
    phoneEncrypted: 'رقم هاتفك مشفر وآمن',
    sendingCode: 'جاري إرسال الرمز...',
    enterVerificationCode: 'أدخل رمز التحقق',
    sentCodeTo: 'لقد أرسلنا رمزاً إلى ',
    verificationCode: 'رمز التحقق',
    didntReceiveCode: 'لم تستلم الرمز؟',
    resendCode: 'إعادة إرسال الرمز',
    verifyingCode: 'جاري التحقق...',
    verifyAndContinue: 'تحقق واستمر',
    fullName: 'الاسم الكامل',
    enterYourName: 'أدخل اسمك الكامل',
    nationalId: 'رقم الهوية',
    email: 'البريد الإلكتروني',
    age: 'العمر',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    preferNotToSay: 'أفضل عدم التحديد',
    height: 'الطول',
    enterYourHeight: 'أدخل طولك',
    enterYourWeight: 'أدخل وزنك',
    uploadMedicalReports: 'تحميل التقارير الطبية',
    whatAreYourGoals: 'ما هي أهدافك؟',
    selectAllThatApply: 'اختر كل ما ينطبق',
    loseWeight: 'إنقاص الوزن',
    buildMuscle: 'بناء العضلات',
    improveFitness: 'تحسين اللياقة',
    increaseStrength: 'زيادة القوة',
    improveFlex: 'تحسين المرونة',
    reduceStress: 'تقليل التوتر',
    betterSleep: 'نوم أفضل',
    moreEnergy: 'طاقة أكثر',
    medicalHistory: 'التاريخ الطبي',
    understandHealthBackground: 'ساعدنا في فهم خلفيتك الصحية',
    anyConditions: 'هل لديك أي حالات طبية؟',
    fitnessLevel: 'مستوى اللياقة',
    rightWorkoutPlan: 'ساعدنا في إنشاء خطة التمرين المناسبة لك',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    newToExercise: 'جديد في التمارين',
    exerciseRegularly: 'تمارين منتظمة',
    exerciseConsistently: 'تمارين مستمرة',
    lifestyleInformation: 'معلومات نمط الحياة',
    dailyHabits: 'أخبرنا عن عاداتك اليومية',
    averageSleepHours: 'متوسط ساعات النوم',
    currentStressLevel: 'مستوى التوتر الحالي',
    dietaryPreferences: 'التفضيلات الغذائية',
    whatMotivatesYou: 'ما الذي يحفزك؟',
    competitionChallenges: 'المنافسة والتحديات',
    teamCommunity: 'الفريق والمجتمع',
    personalAchievement: 'الإنجاز الشخصي',
    gentleSupport: 'الدعم اللطيف',
    preferredWorkoutTime: 'وقت التمرين المفضل',
    flexible: 'مرن',
    reminderStyle: 'نمط التذكير',
    gentle: 'لطيف',
    firm: 'حازم',
    motivational: 'تحفيزي',
    goalPersonalization: 'تخصيص الهدف',
    customizeGoalSetting: 'خصص إعداد أهدافك',
    balanced: 'متوازن',
    whatMotivatesYouSelect: 'ما الذي يحفزك؟ (اختر كل ما ينطبق)',
    healthImprovement: 'تحسين الصحة',
    weightManagement: 'إدارة الوزن',
    stressRelief: 'تخفيف التوتر',
    betterSleepOption: 'نوم أفضل',
    increasedEnergy: 'زيادة الطاقة',
    socialConnection: 'التواصل الاجتماعي',
    personalAchievementOption: 'الإنجاز الشخصي',
    diseasePrevention: 'الوقاية من الأمراض',
    preferredGoalTimeframe: 'الإطار الزمني المفضل للهدف',
    shortTerm: 'قصير المدى',
    mediumTerm: 'متوسط المدى',
    longTerm: 'طويل المدى',
    trackingDetail: 'تفاصيل التتبع',
    detailed: 'مفصل',
    simple: 'بسيط',
    minimal: 'الحد الأدنى',
    specificGoals: 'أهداف محددة',
    personalizedGoalsSetup: 'إعداد أهدافك الشخصية',
    weightGoal: 'هدف الوزن',
    loseWeightOption: 'إنقاص الوزن',
    gainWeight: 'زيادة الوزن',
    maintainWeight: 'الحفاظ على الوزن',
    reduceBodyWeight: 'تقليل وزن الجسم',
    increaseBodyWeight: 'زيادة وزن الجسم',
    keepCurrentWeight: 'الحفاظ على الوزن الحالي',
    targetWeight: 'الوزن المستهدف',
    timeframeMonths: 'الإطار الزمني (أشهر)',
    energyGoal: 'هدف الطاقة',
    increaseEnergyOption: 'زيادة الطاقة',
    stabilizeEnergy: 'استقرار الطاقة',
    betterMorningEnergy: 'طاقة صباحية أفضل',
    feelMoreEnergetic: 'الشعور بمزيد من النشاط',
    avoidEnergyCrashes: 'تجنب انخفاض الطاقة',
    wakeUpRefreshed: 'الاستيقاظ منتعشاً',
    targetEnergyLevel: 'مستوى الطاقة المستهدف',
    stressReductionGoal: 'هدف تقليل التوتر',
    targetStressLevel: 'مستوى التوتر المستهدف',
    continue: 'استمرار',
    completeSetup: 'إكمال الإعداد',
    letsGetToKnowYou: 'دعنا نتعرف عليك',
    personalizeHealthJourney: 'ساعدنا في تخصيص رحلتك الصحية',
    basicInformation: 'المعلومات الأساسية',
    accurateRecommendations: 'للحصول على توصيات أكثر دقة',
    upcoming: 'القادم',
    workoutSession: 'جلسة تمرين'
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