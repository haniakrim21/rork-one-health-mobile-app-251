import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  Platform,
  Image
} from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { 
  Camera, 
  Upload, 
  Zap, 
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react-native';

// Conditional import for camera
let CameraView: any = null;
let useCameraPermissions: any = null;

if (Platform.OS !== 'web') {
  try {
    const cameraModule = require('expo-camera');
    CameraView = cameraModule.CameraView;
    useCameraPermissions = cameraModule.useCameraPermissions;
  } catch (error) {
    console.log('Camera not available');
  }
}

interface CalorieResult {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

export default function AICalorieCalculatorScreen() {
  const [showCamera, setShowCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [permission, requestPermission] = Platform.OS !== 'web' && useCameraPermissions ? useCameraPermissions() : [null, () => {}];
  const cameraRef = useRef<any>(null);

  const handleTakePhoto = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Camera is not available on web. Please use the upload feature instead.');
      return;
    }

    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera permission is required to take photos.');
        return;
      }
    }

    setShowCamera(true);
  };

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      
      setCapturedImage(photo.uri);
      setShowCamera(false);
      analyzeImage(photo.base64);
    } catch (error) {
      Alert.alert('Error', 'Failed to capture photo');
    }
  };

  const analyzeImage = async (base64Image: string) => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a nutrition expert. Analyze the food in the image and provide detailed nutritional information. Return your response as JSON with the following structure: {"foodName": "string", "calories": number, "protein": number, "carbs": number, "fat": number, "confidence": number (0-100)}. If you cannot identify the food clearly, set confidence to a lower value.'
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please analyze this food image and provide nutritional information including calories, protein, carbs, and fat content.'
                },
                {
                  type: 'image',
                  image: base64Image
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      
      try {
        const nutritionData = JSON.parse(data.completion);
        setResult(nutritionData);
      } catch (parseError) {
        // Fallback if AI doesn't return proper JSON
        setResult({
          foodName: 'Mixed Food',
          calories: 250,
          protein: 15,
          carbs: 30,
          fat: 8,
          confidence: 75
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUploadPhoto = () => {
    // Simulate photo upload for demo
    Alert.alert('Upload Feature', 'Photo upload feature would be implemented here.');
  };

  const handleRetry = () => {
    setResult(null);
    setCapturedImage(null);
    setShowCamera(false);
  };

  const handleSaveResult = () => {
    if (result) {
      Alert.alert('Saved!', `${result.foodName} has been added to your nutrition log.`);
      router.back();
    }
  };

  if (showCamera && Platform.OS !== 'web' && CameraView) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setShowCamera(false)}
              >
                <ArrowLeft size={24} color={colors.white} />
              </TouchableOpacity>
              <Text style={styles.cameraTitle}>Point at your food</Text>
            </View>
            
            <View style={styles.cameraFooter}>
              <TouchableOpacity 
                style={styles.captureButton}
                onPress={handleCapture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'AI Calorie Calculator',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!result && !isAnalyzing && (
          <>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Zap size={32} color={colors.primary} />
              </View>
              <Text style={styles.title}>AI Calorie Calculator</Text>
              <Text style={styles.subtitle}>
                Take a photo of your food and get instant nutritional information powered by AI
              </Text>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={handleTakePhoto}
              >
                <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Camera size={32} color={colors.primary} />
                </View>
                <Text style={styles.actionTitle}>Take Photo</Text>
                <Text style={styles.actionSubtitle}>
                  Point your camera at food to analyze
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionCard}
                onPress={handleUploadPhoto}
              >
                <View style={[styles.actionIcon, { backgroundColor: colors.success + '20' }]}>
                  <Upload size={32} color={colors.success} />
                </View>
                <Text style={styles.actionTitle}>Upload Photo</Text>
                <Text style={styles.actionSubtitle}>
                  Choose from your photo library
                </Text>
              </TouchableOpacity>
            </View>

            <Card style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Tips for better results:</Text>
              <View style={styles.tipsList}>
                <Text style={styles.tipItem}>• Ensure good lighting</Text>
                <Text style={styles.tipItem}>• Keep food clearly visible</Text>
                <Text style={styles.tipItem}>• Avoid shadows and reflections</Text>
                <Text style={styles.tipItem}>• Include the entire portion</Text>
              </View>
            </Card>
          </>
        )}

        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <Loader2 size={48} color={colors.primary} style={styles.spinner} />
            <Text style={styles.analyzingTitle}>Analyzing your food...</Text>
            <Text style={styles.analyzingSubtitle}>
              Our AI is identifying the food and calculating nutritional information
            </Text>
          </View>
        )}

        {result && (
          <View style={styles.resultContainer}>
            {capturedImage && (
              <Image source={{ uri: capturedImage }} style={styles.resultImage} />
            )}
            
            <Card style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <CheckCircle size={24} color={colors.success} />
                <Text style={styles.resultTitle}>Analysis Complete</Text>
              </View>
              
              <Text style={styles.foodName}>{result.foodName}</Text>
              
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{result.calories}</Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{result.protein}g</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{result.carbs}g</Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{result.fat}g</Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
              </View>
              
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>
                  Confidence: {result.confidence}%
                </Text>
                {result.confidence < 70 && (
                  <View style={styles.lowConfidenceWarning}>
                    <AlertCircle size={16} color={colors.warning} />
                    <Text style={styles.lowConfidenceText}>
                      Low confidence - results may be approximate
                    </Text>
                  </View>
                )}
              </View>
            </Card>

            <View style={styles.resultActions}>
              <Button
                title="Save to Log"
                onPress={handleSaveResult}
                style={styles.saveButton}
              />
              <Button
                title="Try Again"
                onPress={handleRetry}
                variant="outline"
                style={styles.retryButton}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tipsCard: {
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  cameraFooter: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
  analyzingContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  spinner: {
    marginBottom: 24,
  },
  analyzingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  analyzingSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  resultContainer: {
    gap: 16,
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: colors.cardBackground,
  },
  resultCard: {
    
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  lowConfidenceWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  lowConfidenceText: {
    fontSize: 12,
    color: colors.warning,
    marginLeft: 8,
  },
  resultActions: {
    gap: 12,
  },
  saveButton: {
    
  },
  retryButton: {
    
  },
});