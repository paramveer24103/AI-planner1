import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { Home, Compass, User, Map, Plus } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export default function TabLayout() {
  const router = useRouter();
  
  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <BlurView intensity={80} tint="light" style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.title;
            const isFocused = state.index === index;
            
            // Don't render the create trip button in the normal tab list
            if (route.name === 'create-trip') {
              return null;
            }
            
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            
            let icon;
            if (route.name === 'index') {
              icon = <Home size={24} color={isFocused ? '#FF8E3C' : '#999'} />;
            } else if (route.name === 'explore') {
              icon = <Compass size={24} color={isFocused ? '#FF8E3C' : '#999'} />;
            } else if (route.name === 'profile') {
              icon = <User size={24} color={isFocused ? '#FF8E3C' : '#999'} />;
            }
            
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.tabButton}
              >
                {icon}
                {isFocused && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
          
          {/* Create Trip Button */}
          <TouchableOpacity
            style={styles.createTripButton}
            onPress={() => router.push('/create-trip')}
            activeOpacity={0.8}
          >
            <Plus size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </BlurView>
    );
  };
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide the default tab bar
        },
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="create-trip" options={{ title: 'Create Trip' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 35,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  tabButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 10,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF8E3C',
  },
  createTripButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF8E3C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8E3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});