import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import { useSettingsStore } from '@/store/settings-store';
import { getTranslation, isRTL } from '@/constants/languages';
import { mockUser } from '@/mocks/user-data';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from '@/components/Logo';
import { ArrowLeft, Shield, Smartphone, CheckCircle2 } from 'lucide-react-native';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  
  const { setUser } = useUserStore();
  const { settings } = useSettingsStore();
  
  const t = (key: string) => getTranslation(settings.language, key);
  const isRTLLayout = isRTL(settings.language);
  
  // Set RTL layout
  React.useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTLLayout);
  }, [isRTLLayout]);
  
  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const limited = cleaned.slice(0, 9);
    
    if (limited.length >= 6) {
      return `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(5)}`;
    } else if (limited.length >= 2) {
      return `${limited.slice(0, 2)} ${limited.slice(2)}`;
    } else {
      return limited;
    }
  };
  
  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };
  
  const isValidPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 9 && cleaned.startsWith('5');
  };
  
  const handleSendOtp = () => {
    if (!isValidPhoneNumber(phoneNumber)) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };
  
  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUser({
        ...mockUser,
        phone: `+966 ${phoneNumber}`,
      });
      
      if (mockUser.completedOnboarding) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 1500);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone');
      setOtp('');
    } else {
      router.back();
    }
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.background, colors.cardBackground]}
        style={styles.gradient}
      >
        <View style={[styles.header, isRTLLayout && styles.headerRTL]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Logo size="large" variant="vertical" color={colors.primary} />
          </View>
          
          <View style={styles.formContainer}>
            {step === 'phone' ? (
              <>
                <View style={styles.titleContainer}>
                  <View style={styles.iconContainer}>
                    <Smartphone size={32} color={colors.primary} />
                  </View>
                  <Text style={[styles.formTitle, isRTLLayout && styles.textRTL]}>{t('signInWithPhone')}</Text>
                  <Text style={[styles.formSubtitle, isRTLLayout && styles.textRTL]}>
                    {t('sendVerificationCode')}
                  </Text>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, isRTLLayout && styles.textRTL]}>{t('phoneNumber')}</Text>
                  <View style={[styles.phoneInputContainer, isRTLLayout && styles.phoneInputContainerRTL]}>
                    <View style={styles.countryCodeContainer}>
                      <Text style={styles.countryFlag}>🇸🇦</Text>
                      <Text style={styles.countryCode}>+966</Text>
                    </View>
                    <TextInput
                      style={[styles.phoneInput, isRTLLayout && styles.textInputRTL]}
                      value={phoneNumber}
                      onChangeText={handlePhoneChange}
                      placeholder="5X XXX XXXX"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="phone-pad"
                      autoComplete="tel"
                      textContentType="telephoneNumber"
                      autoFocus
                      returnKeyType="done"
                      onSubmitEditing={handleSendOtp}
                      maxLength={12}
                    />
                  </View>
                </View>

                <View style={styles.securityNote}>
                  <View style={styles.securityIcon}>
                    <Shield size={16} color={colors.primary} />
                  </View>
                  <Text style={[styles.securityText, isRTLLayout && styles.textRTL]}>
                    {t('phoneEncrypted')}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={[
                    styles.button,
                    !isValidPhoneNumber(phoneNumber) && styles.buttonDisabled
                  ]}
                  onPress={handleSendOtp}
                  disabled={!isValidPhoneNumber(phoneNumber) || isLoading}
                >
                  {isLoading ? (
                    <Text style={styles.buttonText}>{t('sendingCode')}</Text>
                  ) : (
                    <Text style={styles.buttonText}>{t('sendVerificationCode')}</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.titleContainer}>
                  <View style={styles.iconContainer}>
                    <CheckCircle2 size={32} color={colors.primary} />
                  </View>
                  <Text style={[styles.formTitle, isRTLLayout && styles.textRTL]}>{t('enterVerificationCode')}</Text>
                  <Text style={[styles.formSubtitle, isRTLLayout && styles.textRTL]}>
                    {t('sentCodeTo')}
                    <Text style={styles.phoneHighlight}>+966 {phoneNumber}</Text>
                  </Text>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, isRTLLayout && styles.textRTL]}>{t('verificationCode')}</Text>
                  <TextInput
                    style={[styles.otpInput, isRTLLayout && styles.textInputRTL]}
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="0000"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="number-pad"
                    autoComplete="sms-otp"
                    textContentType="oneTimeCode"
                    maxLength={4}
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={handleVerifyOtp}
                  />
                </View>

                <View style={styles.resendContainer}>
                  <Text style={[styles.resendText, isRTLLayout && styles.textRTL]}>{t('didntReceiveCode')}</Text>
                  <TouchableOpacity onPress={handleSendOtp}>
                    <Text style={[styles.resendLink, isRTLLayout && styles.textRTL]}>{t('resendCode')}</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                  style={[
                    styles.button,
                    (!otp || otp.length < 4) && styles.buttonDisabled
                  ]}
                  onPress={handleVerifyOtp}
                  disabled={!otp || otp.length < 4 || isLoading}
                >
                  {isLoading ? (
                    <Text style={styles.buttonText}>{t('verifyingCode')}</Text>
                  ) : (
                    <Text style={styles.buttonText}>{t('verifyAndContinue')}</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerRTL: {
    alignItems: 'flex-end',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  formContainer: {
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneHighlight: {
    color: colors.primary,
    fontWeight: '600',
  },
  textRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  phoneInputContainerRTL: {
    flexDirection: 'row-reverse',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: colors.surfaceElevated,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    gap: 8,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryCode: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },
  textInputRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  otpInput: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 24,
    color: colors.text,
    backgroundColor: colors.cardBackground,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: '600',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}10`,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
  },
  securityIcon: {
    
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 4,
  },
  resendText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  resendLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.cardBackground,
  },
  buttonText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 16,
  },
});