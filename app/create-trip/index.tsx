import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withDelay,
  Easing,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { ArrowLeft, Calendar, Check, ChevronRight, MapPin, Search, Users, Wallet } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const STEPS = [
  { id: 'destination', title: 'Destination' },
  { id: 'dates', title: 'Dates' },
  { id: 'travelers', title: 'Travelers' },
  { id: 'budget', title: 'Budget' },
  { id: 'review', title: 'Review' },
];

export default function CreateTripScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [destination, setDestination] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelType, setTravelType] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState('medium');
  
  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const progressValue = useSharedValue(0);
  
  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    contentOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    progressValue.value = withTiming((currentStep / (STEPS.length - 1)) * 100, { duration: 600 });
  }, [currentStep]);
  
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));
  
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));
  
  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));
  
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };
  
  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create the trip and navigate to home
      router.replace('/(tabs)');
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 0: // Destination
        return !destination;
      case 1: // Dates
        return !startDate || !endDate;
      case 2: // Travelers
        return !travelType;
      case 3: // Budget
        return !budget;
      default:
        return false;
    }
  };
  
  // Sample destination suggestions
  const popularDestinations = [
    { id: '1', name: 'Paris, France', image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg' },
    { id: '2', name: 'Tokyo, Japan', image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg' },
    { id: '3', name: 'New York, USA', image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg' },
    { id: '4', name: 'Rome, Italy', image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg' },
    { id: '5', name: 'Bali, Indonesia', image: 'https://images.pexels.com/photos/1822608/pexels-photo-1822608.jpeg' },
  ];
  
  const travelTypes = [
    { id: 'solo', title: 'Solo', icon: '🧳' },
    { id: 'couple', title: 'Couple', icon: '👫' },
    { id: 'family', title: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'friends', title: 'Friends', icon: '👯‍♂️' },
  ];
  
  const budgetOptions = [
    { id: 'budget', title: 'Budget', description: 'Economical options', icon: '💰' },
    { id: 'medium', title: 'Medium', description: 'Mid-range comfort', icon: '💰💰' },
    { id: 'luxury', title: 'Luxury', description: 'Premium experience', icon: '💰💰💰' },
  ];
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          >
            <Text style={styles.stepTitle}>Where would you like to go?</Text>
            <Text style={styles.stepDescription}>Search for a city, region, or country</Text>
            
            <View style={styles.searchContainer}>
              <Search size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search destinations..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            <Text style={styles.suggestionsTitle}>Popular Destinations</Text>
            <ScrollView 
              contentContainerStyle={styles.destinationsGrid}
              showsVerticalScrollIndicator={false}
            >
              {popularDestinations.map((item, index) => (
                <AnimatedTouchableOpacity
                  key={item.id}
                  style={[
                    styles.destinationCard,
                    destination === item.name && styles.selectedDestinationCard
                  ]}
                  onPress={() => setDestination(item.name)}
                  activeOpacity={0.9}
                  entering={FadeIn.delay(100 * index).duration(400)}
                >
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.destinationImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.destinationGradient}
                  />
                  <Text style={styles.destinationName}>{item.name}</Text>
                  {destination === item.name && (
                    <View style={styles.selectedIndicator}>
                      <Check size={12} color="#fff" />
                    </View>
                  )}
                </AnimatedTouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        );
      
      case 1:
        return (
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          >
            <Text style={styles.stepTitle}>When are you traveling?</Text>
            <Text style={styles.stepDescription}>Select your trip dates</Text>
            
            <View style={styles.dateContainer}>
              <View style={styles.dateInputContainer}>
                <Calendar size={20} color="#999" style={styles.dateIcon} />
                <TextInput
                  style={styles.dateInput}
                  placeholder="Start date (MM/DD/YYYY)"
                  placeholderTextColor="#999"
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
              
              <View style={styles.dateInputContainer}>
                <Calendar size={20} color="#999" style={styles.dateIcon} />
                <TextInput
                  style={styles.dateInput}
                  placeholder="End date (MM/DD/YYYY)"
                  placeholderTextColor="#999"
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>
            
            <Text style={styles.dateNote}>
              Tip: For the best rates, consider traveling during shoulder seasons (Spring or Fall)
            </Text>
            
            <View style={styles.calendarPlaceholder}>
              <Text style={styles.placeholderText}>Calendar would appear here in a real app</Text>
            </View>
          </Animated.View>
        );
      
      case 2:
        return (
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          >
            <Text style={styles.stepTitle}>Who's traveling?</Text>
            <Text style={styles.stepDescription}>Select your travel group</Text>
            
            <View style={styles.travelTypesContainer}>
              {travelTypes.map((type, index) => (
                <AnimatedTouchableOpacity
                  key={type.id}
                  style={[
                    styles.travelTypeCard,
                    travelType === type.id && styles.selectedTravelTypeCard
                  ]}
                  onPress={() => setTravelType(type.id)}
                  activeOpacity={0.9}
                  entering={FadeIn.delay(100 * index).duration(400)}
                >
                  <Text style={styles.travelTypeIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.travelTypeName,
                    travelType === type.id && styles.selectedTravelTypeName
                  ]}>{type.title}</Text>
                </AnimatedTouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.travelersTitle}>Number of Travelers</Text>
            
            <View style={styles.travelerCountContainer}>
              <Text style={styles.travelerLabel}>Adults</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => setAdults(Math.max(1, adults - 1))}
                  disabled={adults <= 1}
                >
                  <Text style={[
                    styles.counterButtonText,
                    adults <= 1 && styles.disabledCounterButton
                  ]}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{adults}</Text>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => setAdults(adults + 1)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.travelerCountContainer}>
              <Text style={styles.travelerLabel}>Children</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => setChildren(Math.max(0, children - 1))}
                  disabled={children <= 0}
                >
                  <Text style={[
                    styles.counterButtonText,
                    children <= 0 && styles.disabledCounterButton
                  ]}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{children}</Text>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => setChildren(children + 1)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        );
      
      case 3:
        return (
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          >
            <Text style={styles.stepTitle}>What's your budget?</Text>
            <Text style={styles.stepDescription}>Select a budget range for your trip</Text>
            
            <View style={styles.budgetOptionsContainer}>
              {budgetOptions.map((option, index) => (
                <AnimatedTouchableOpacity
                  key={option.id}
                  style={[
                    styles.budgetCard,
                    budget === option.id && styles.selectedBudgetCard
                  ]}
                  onPress={() => setBudget(option.id)}
                  activeOpacity={0.9}
                  entering={FadeIn.delay(100 * index).duration(400)}
                >
                  <Text style={styles.budgetIcon}>{option.icon}</Text>
                  <Text style={[
                    styles.budgetTitle,
                    budget === option.id && styles.selectedBudgetTitle
                  ]}>{option.title}</Text>
                  <Text style={[
                    styles.budgetDescription,
                    budget === option.id && styles.selectedBudgetDescription
                  ]}>{option.description}</Text>
                </AnimatedTouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.budgetNote}>
              Your budget helps us recommend suitable accommodations, activities, and transportation options.
            </Text>
          </Animated.View>
        );
      
      case 4:
        return (
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
          >
            <Text style={styles.stepTitle}>Review Your Trip</Text>
            <Text style={styles.stepDescription}>Confirm your trip details before creating</Text>
            
            <View style={styles.reviewCard}>
              <Image 
                source={{ uri: popularDestinations.find(d => d.name === destination)?.image || popularDestinations[0].image }} 
                style={styles.reviewImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.reviewImageGradient}
              />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewTitle}>{destination || 'Your Trip'}</Text>
                
                <View style={styles.reviewDetails}>
                  <View style={styles.reviewDetail}>
                    <Calendar size={16} color="#555" />
                    <Text style={styles.reviewDetailText}>
                      {startDate && endDate ? `${startDate} - ${endDate}` : 'Dates not specified'}
                    </Text>
                  </View>
                  
                  <View style={styles.reviewDetail}>
                    <Users size={16} color="#555" />
                    <Text style={styles.reviewDetailText}>
                      {travelType ? `${travelType.charAt(0).toUpperCase() + travelType.slice(1)} Travel` : 'Travel type not specified'} 
                      • {adults} {adults === 1 ? 'Adult' : 'Adults'}
                      {children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
                    </Text>
                  </View>
                  
                  <View style={styles.reviewDetail}>
                    <Wallet size={16} color="#555" />
                    <Text style={styles.reviewDetailText}>
                      {budget.charAt(0).toUpperCase() + budget.slice(1)} Budget
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.aiNoticeContainer}>
              <BlurView intensity={80} tint="light" style={styles.aiNotice}>
                <Text style={styles.aiNoticeTitle}>AI Trip Planning</Text>
                <Text style={styles.aiNoticeText}>
                  Journey Genie will use AI to create a personalized itinerary based on your preferences. You'll be able to customize it further after creation.
                </Text>
              </BlurView>
            </View>
          </Animated.View>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={goBack}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.stepsContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[styles.progressFill, progressAnimatedStyle]} 
            />
          </View>
          <Text style={styles.stepIndicator}>
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </Text>
        </View>
      </Animated.View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.contentContainer, contentAnimatedStyle]}>
          {renderStepContent()}
        </Animated.View>
      </ScrollView>
      
      <BlurView intensity={80} tint="light" style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            isNextDisabled() && styles.disabledButton
          ]}
          onPress={goNext}
          disabled={isNextDisabled()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep < STEPS.length - 1 ? 'Continue' : 'Create Trip'}
          </Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepsContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8E3C',
    borderRadius: 2,
  },
  stepIndicator: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  nextButton: {
    backgroundColor: '#FF8E3C',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8E3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  nextButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
  },
  suggestionsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  destinationCard: {
    width: '48%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  selectedDestinationCard: {
    borderWidth: 3,
    borderColor: '#FF8E3C',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  destinationName: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF8E3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    marginBottom: 24,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  dateIcon: {
    marginRight: 12,
  },
  dateInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
  },
  dateNote: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  calendarPlaceholder: {
    height: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#999',
  },
  travelTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  travelTypeCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedTravelTypeCard: {
    backgroundColor: 'rgba(255, 142, 60, 0.1)',
    borderWidth: 1,
    borderColor: '#FF8E3C',
  },
  travelTypeIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  travelTypeName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333',
  },
  selectedTravelTypeName: {
    color: '#FF8E3C',
  },
  travelersTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  travelerCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  travelerLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#333',
  },
  disabledCounterButton: {
    color: '#999',
  },
  counterValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    width: 40,
    textAlign: 'center',
  },
  budgetOptionsContainer: {
    marginBottom: 24,
  },
  budgetCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  selectedBudgetCard: {
    backgroundColor: 'rgba(255, 142, 60, 0.1)',
    borderWidth: 1,
    borderColor: '#FF8E3C',
  },
  budgetIcon: {
    fontSize: 24,
    marginBottom: 12,
  },
  budgetTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  selectedBudgetTitle: {
    color: '#FF8E3C',
  },
  budgetDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  selectedBudgetDescription: {
    color: '#FF8E3C',
  },
  budgetNote: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewImage: {
    width: '100%',
    height: 160,
  },
  reviewImageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  reviewContent: {
    padding: 20,
  },
  reviewTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#333',
    marginBottom: 16,
  },
  reviewDetails: {
    marginBottom: 8,
  },
  reviewDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewDetailText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
  },
  aiNoticeContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  aiNotice: {
    padding: 20,
    backgroundColor: 'rgba(255, 142, 60, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 142, 60, 0.2)',
  },
  aiNoticeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FF8E3C',
    marginBottom: 8,
  },
  aiNoticeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});