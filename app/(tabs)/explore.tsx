import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  FadeIn
} from 'react-native-reanimated';
import { Calendar, MapPin, Search, Star, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ExploreScreen() {
  const router = useRouter();
  
  const headerOpacity = useSharedValue(0);
  const searchOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  
  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 700 });
    searchOpacity.value = withDelay(200, withTiming(1, { duration: 700 }));
    contentOpacity.value = withDelay(400, withTiming(1, { duration: 700 }));
  }, []);
  
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));
  
  const searchAnimatedStyle = useAnimatedStyle(() => ({
    opacity: searchOpacity.value,
  }));
  
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));
  
  // Sample destination data
  const trendingDestinations = [
    {
      id: '1',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Kyoto',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg',
      rating: 4.7,
    },
    {
      id: '3',
      name: 'Barcelona',
      country: 'Spain',
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
      rating: 4.6,
    },
  ];
  
  const categories = [
    { id: '1', name: 'Beach', icon: '🏖️' },
    { id: '2', name: 'Mountain', icon: '⛰️' },
    { id: '3', name: 'City', icon: '🏙️' },
    { id: '4', name: 'Cultural', icon: '🏛️' },
    { id: '5', name: 'Food', icon: '🍽️' },
  ];
  
  const popularTrips = [
    {
      id: '1',
      title: 'Italian Adventure',
      location: 'Rome, Florence, Venice',
      image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
      days: 12,
      rating: 4.9,
      travelers: 2,
    },
    {
      id: '2',
      title: 'Thailand Beaches',
      location: 'Bangkok, Phuket, Koh Samui',
      image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
      days: 10,
      rating: 4.7,
      travelers: 1,
    },
    {
      id: '3',
      title: 'New Zealand Explorer',
      location: 'Auckland, Queenstown, Christchurch',
      image: 'https://images.pexels.com/photos/724949/pexels-photo-724949.jpeg',
      days: 14,
      rating: 4.8,
      travelers: 4,
    },
  ];
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover amazing destinations</Text>
        </Animated.View>
        
        <Animated.View style={[styles.searchContainer, searchAnimatedStyle]}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search destinations, activities..."
              placeholderTextColor="#999"
            />
          </View>
        </Animated.View>
        
        <Animated.View style={[styles.categoriesContainer, contentAnimatedStyle]}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <AnimatedTouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                entering={FadeIn.delay(300 + index * 100).duration(400)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </AnimatedTouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
        
        <Animated.View style={[styles.trendingContainer, contentAnimatedStyle]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingScroll}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH - 50}
          >
            {trendingDestinations.map((destination, index) => (
              <AnimatedTouchableOpacity
                key={destination.id}
                style={styles.trendingCard}
                activeOpacity={0.9}
                entering={FadeIn.delay(500 + index * 100).duration(400)}
              >
                <Image
                  source={{ uri: destination.image }}
                  style={styles.trendingImage}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.trendingGradient}
                />
                <View style={styles.trendingContent}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <Text style={styles.destinationCountry}>{destination.country}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{destination.rating}</Text>
                  </View>
                </View>
              </AnimatedTouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
        
        <Animated.View style={[styles.popularTripsContainer, contentAnimatedStyle]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Trips</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {popularTrips.map((trip, index) => (
            <AnimatedTouchableOpacity 
              key={trip.id}
              style={styles.popularTripCard}
              activeOpacity={0.9}
              entering={FadeIn.delay(700 + index * 100).duration(400)}
            >
              <Image
                source={{ uri: trip.image }}
                style={styles.popularTripImage}
              />
              <View style={styles.popularTripContent}>
                <Text style={styles.popularTripTitle}>{trip.title}</Text>
                <View style={styles.tripDetails}>
                  <View style={styles.tripDetailItem}>
                    <MapPin size={14} color="#666" />
                    <Text style={styles.tripDetailText}>{trip.location}</Text>
                  </View>
                  <View style={styles.tripDetailItem}>
                    <Calendar size={14} color="#666" />
                    <Text style={styles.tripDetailText}>{trip.days} days</Text>
                  </View>
                  <View style={styles.tripDetailItem}>
                    <Users size={14} color="#666" />
                    <Text style={styles.tripDetailText}>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</Text>
                  </View>
                </View>
                <View style={styles.popularTripFooter}>
                  <View style={styles.ratingContainerLarge}>
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingTextLarge}>{trip.rating}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View Trip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AnimatedTouchableOpacity>
          ))}
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
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#333',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  categoriesScroll: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  categoryName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#333',
  },
  trendingContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF8E3C',
  },
  trendingScroll: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  trendingCard: {
    width: CARD_WIDTH - 50,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  trendingContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  destinationName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  destinationCountry: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  popularTripsContainer: {
    paddingHorizontal: 24,
  },
  popularTripCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  popularTripImage: {
    width: '100%',
    height: 150,
  },
  popularTripContent: {
    padding: 16,
  },
  popularTripTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  tripDetails: {
    marginBottom: 12,
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tripDetailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  popularTripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainerLarge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTextLarge: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  viewButton: {
    backgroundColor: '#FF8E3C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#fff',
  },
});