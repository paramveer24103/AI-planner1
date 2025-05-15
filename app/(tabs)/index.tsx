import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Calendar, Clock, MapPin, User, Users, Wallet } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

export default function HomeScreen() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  
  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);
  
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
    transform: [{ translateY: contentTranslateY.value }]
  }));
  
  // Sample trip data
  const upcomingTrips = [
    {
      id: '1',
      title: 'Paris Adventure',
      date: 'Oct 15 - Oct 25, 2025',
      image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
      location: 'Paris, France',
      days: 10,
      completed: 0.8,
    },
    {
      id: '2',
      title: 'Tokyo Exploration',
      date: 'Dec 5 - Dec 15, 2025',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
      location: 'Tokyo, Japan',
      days: 11,
      completed: 0.4,
    },
  ];
  
  const recentTrips = [
    {
      id: '3',
      title: 'Bali Retreat',
      date: 'Sep 1 - Sep 10, 2025',
      image: 'https://images.pexels.com/photos/1822608/pexels-photo-1822608.jpeg',
      location: 'Bali, Indonesia',
    },
    {
      id: '4',
      title: 'Swiss Alps',
      date: 'Aug 20 - Aug 30, 2025',
      image: 'https://images.pexels.com/photos/290452/pexels-photo-290452.jpeg',
      location: 'Interlaken, Switzerland',
    },
    {
      id: '5',
      title: 'New York City',
      date: 'Jul 15 - Jul 22, 2025',
      image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
      location: 'New York, USA',
    },
  ];

  const handleCreateTrip = () => {
    router.push('/create-trip');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Alex</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View style={contentAnimatedStyle}>
          {upcomingTrips.length > 0 ? (
            <View style={styles.upcomingContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Trip</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.upcomingScroll}
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
              >
                {upcomingTrips.map((trip) => (
                  <TouchableOpacity 
                    key={trip.id} 
                    style={styles.upcomingCard}
                    activeOpacity={0.9}
                    onPress={() => {}}
                  >
                    <Image 
                      source={{ uri: trip.image }} 
                      style={styles.upcomingImage}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.7)']}
                      style={styles.cardGradient}
                    />
                    <View style={styles.cardContent}>
                      <Text style={styles.tripTitle}>{trip.title}</Text>
                      <View style={styles.tripInfo}>
                        <View style={styles.infoItem}>
                          <Calendar size={14} color="#fff" />
                          <Text style={styles.infoText}>{trip.date}</Text>
                        </View>
                        <View style={styles.infoItem}>
                          <MapPin size={14} color="#fff" />
                          <Text style={styles.infoText}>{trip.location}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View 
                            style={[
                              styles.progressFill, 
                              { width: `${trip.completed * 100}%` }
                            ]} 
                          />
                        </View>
                        <Text style={styles.progressText}>
                          {Math.round(trip.completed * 100)}% Complete
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity 
                  style={styles.createTripCard}
                  activeOpacity={0.9}
                  onPress={handleCreateTrip}
                >
                  <LinearGradient
                    colors={['#FF8E3C', '#FF5F6D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.createTripGradient}
                  >
                    <Plus size={32} color="#fff" />
                    <Text style={styles.createTripText}>Create New Trip</Text>
                    <Text style={styles.createTripSubtext}>
                      Plan your next adventure
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.emptyStateContainer}
              activeOpacity={0.9}
              onPress={handleCreateTrip}
            >
              <LinearGradient
                colors={['#FF8E3C', '#FF5F6D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emptyGradient}
              >
                <Plus size={40} color="#fff" />
                <Text style={styles.emptyTitle}>Plan Your First Trip</Text>
                <Text style={styles.emptySubtext}>
                  Create an itinerary, add destinations, and more
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          
          <View style={styles.recentTripsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Trips</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {recentTrips.map((trip) => (
              <TouchableOpacity 
                key={trip.id}
                style={styles.recentTripItem}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <Image 
                  source={{ uri: trip.image }} 
                  style={styles.recentTripImage}
                />
                <View style={styles.recentTripInfo}>
                  <Text style={styles.recentTripTitle}>{trip.title}</Text>
                  <View style={styles.recentTripDetails}>
                    <View style={styles.recentInfoItem}>
                      <Calendar size={14} color="#666" />
                      <Text style={styles.recentInfoText}>{trip.date}</Text>
                    </View>
                    <View style={styles.recentInfoItem}>
                      <MapPin size={14} color="#666" />
                      <Text style={styles.recentInfoText}>{trip.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

// Custom Plus Icon for cleaner look
function Plus({ size, color }) {
  return (
    <View style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{
        width: size * 0.8,
        height: 3,
        backgroundColor: color,
        borderRadius: 4,
      }} />
      <View style={{
        width: 3,
        height: size * 0.8,
        backgroundColor: color,
        borderRadius: 4,
        position: 'absolute',
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FF8E3C',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF8E3C',
  },
  upcomingContainer: {
    marginBottom: 32,
  },
  upcomingScroll: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  upcomingCard: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 20,
  },
  upcomingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    borderRadius: 16,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  tripTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#fff',
    marginBottom: 8,
  },
  tripInfo: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#fff',
    marginLeft: 6,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8E3C',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
  },
  createTripCard: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 20,
  },
  createTripGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  createTripText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#fff',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  createTripSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  emptyStateContainer: {
    margin: 24,
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    marginBottom: 32,
  },
  emptyGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  recentTripsContainer: {
    paddingHorizontal: 24,
  },
  recentTripItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  recentTripImage: {
    width: 100,
    height: 100,
  },
  recentTripInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  recentTripTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  recentTripDetails: {},
  recentInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentInfoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
});