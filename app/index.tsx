import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Compass, Calendar } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const iconOpacity = useSharedValue(0);
  const iconTranslateY = useSharedValue(20);
  
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
    
    iconOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    iconTranslateY.value = withDelay(500, withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) }));
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }]
    };
  });
  
  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
      transform: [{ translateY: iconTranslateY.value }]
    };
  });

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg' }} 
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />
      
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.title}>Journey Genie</Text>
        <Text style={styles.subtitle}>Your AI-Powered Trip Planner</Text>
        
        <Animated.View style={[styles.featuresContainer, iconAnimatedStyle]}>
          <View style={styles.featureItem}>
            <MapPin color="#ffffff" size={24} />
            <Text style={styles.featureText}>Smart Destinations</Text>
          </View>
          <View style={styles.featureItem}>
            <Compass color="#ffffff" size={24} />
            <Text style={styles.featureText}>Personalized Trips</Text>
          </View>
          <View style={styles.featureItem}>
            <Calendar color="#ffffff" size={24} />
            <Text style={styles.featureText}>Itinerary Planning</Text>
          </View>
        </Animated.View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={handleSignup}>
            <Text style={[styles.buttonText, styles.signupButtonText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width,
    height,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    width,
    height,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
    paddingBottom: 80,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 40,
  },
  featuresContainer: {
    marginBottom: 60,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#FF8E3C',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
  signupButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  signupButtonText: {
    color: '#ffffff',
  },
});