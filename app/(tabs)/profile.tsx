import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  FadeIn,
  SlideInRight
} from 'react-native-reanimated';
import { Calendar, FileText, Heart, LogOut, Map, MapPin, Settings, Star } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ProfileScreen() {
  const router = useRouter();
  
  const headerOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(30);
  const contentOpacity = useSharedValue(0);
  
  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    contentTranslateY.value = withDelay(300, withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) }));
  }, []);
  
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));
  
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  // Saved trips data
  const savedTrips = [
    {
      id: '1',
      title: 'Amalfi Coast',
      image: 'https://images.pexels.com/photos/3601421/pexels-photo-3601421.jpeg',
      location: 'Italy',
      date: 'Oct 2025',
    },
    {
      id: '2',
      title: 'Santorini Escape',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
      location: 'Greece',
      date: 'Dec 2025',
    },
  ];
  
  // Badges data
  const badges = [
    { id: '1', name: 'Explorer', icon: '🗺️', description: '5 trips completed' },
    { id: '2', name: 'Adventurer', icon: '🏔️', description: '3 adventure activities' },
    { id: '3', name: 'Photographer', icon: '📸', description: '10 photos shared' },
  ];
  
  const profileCategories = [
    { id: '1', title: 'My Trips', icon: <Map size={20} color="#FF8E3C" /> },
    { id: '2', title: 'Saved Places', icon: <Heart size={20} color="#FF8E3C" /> },
    { id: '3', title: 'Itineraries', icon: <FileText size={20} color="#FF8E3C" /> },
    { id: '4', title: 'Settings', icon: <Settings size={20} color="#FF8E3C" /> },
  ];

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg' }}
        style={styles.headerImage}
      />
      <BlurView intensity={80} tint="dark" style={styles.headerOverlay} />
      
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <View style={styles.profileLocation}>
              <MapPin size={14} color="#fff" />
              <Text style={styles.locationText}>New York, USA</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>118</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
        </View>
      </Animated.View>
      
      <ScrollView 
        style={styles.contentScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          <View style={styles.categoriesGrid}>
            {profileCategories.map((category, index) => (
              <AnimatedTouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                entering={SlideInRight.delay(300 + index * 100).duration(400)}
                activeOpacity={0.8}
              >
                <View style={styles.categoryIconContainer}>
                  {category.icon}
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </AnimatedTouchableOpacity>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Trips</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.savedTripsScroll}
            >
              {savedTrips.map((trip, index) => (
                <TouchableOpacity
                  key={trip.id}
                  style={styles.savedTripCard}
                  activeOpacity={0.9}
                >
                  <Image 
                    source={{ uri: trip.image }}
                    style={styles.tripImage}
                  />
                  <View style={styles.tripInfo}>
                    <Text style={styles.tripTitle}>{trip.title}</Text>
                    <View style={styles.tripDetails}>
                      <View style={styles.tripDetail}>
                        <MapPin size={12} color="#666" />
                        <Text style={styles.tripDetailText}>{trip.location}</Text>
                      </View>
                      <View style={styles.tripDetail}>
                        <Calendar size={12} color="#666" />
                        <Text style={styles.tripDetailText}>{trip.date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={styles.addTripCard}
                activeOpacity={0.9}
                onPress={() => router.push('/create-trip')}
              >
                <View style={styles.addTripContent}>
                  <View style={styles.plusIcon}>
                    <View style={styles.plusHorizontal} />
                    <View style={styles.plusVertical} />
                  </View>
                  <Text style={styles.addTripText}>Create New Trip</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Travel Badges</Text>
            <View style={styles.badgesContainer}>
              {badges.map((badge, index) => (
                <View key={badge.id} style={styles.badgeCard}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDescription}>{badge.description}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LogOut size={18} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 4,
  },
  profileLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-around',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#fff',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 142, 60, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  savedTripsScroll: {
    paddingRight: 24,
  },
  savedTripCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  tripImage: {
    width: '100%',
    height: 120,
  },
  tripInfo: {
    padding: 12,
  },
  tripTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  tripDetails: {},
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tripDetailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  addTripCard: {
    width: 200,
    height: 180,
    backgroundColor: 'rgba(255, 142, 60, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 142, 60, 0.3)',
    borderStyle: 'dashed',
  },
  addTripContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  plusIcon: {
    width: 40,
    height: 40,
    marginBottom: 12,
    position: 'relative',
  },
  plusHorizontal: {
    position: 'absolute',
    top: 18,
    width: 40,
    height: 4,
    backgroundColor: '#FF8E3C',
    borderRadius: 2,
  },
  plusVertical: {
    position: 'absolute',
    left: 18,
    width: 4,
    height: 40,
    backgroundColor: '#FF8E3C',
    borderRadius: 2,
  },
  addTripText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF8E3C',
    textAlign: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 8,
  },
});