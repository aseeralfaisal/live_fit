import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Screens/Home'
import { Image, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as NavigationBar from 'expo-navigation-bar'
import FoodScan from './Screens/FoodScan'
import Workouts from './Screens/Workouts'
import BMI from './Screens/BMI'
import Map from './Screens/Map'
import About from './Screens/About'
import SpecificExercise from './Screens/SpecificExercise'
import UserExercises from './Screens/UserExercises'

export default function TabScreen() {
  const Tab = createBottomTabNavigator<any>()
  const Stack = createStackNavigator<any>()

  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync('white')
  }, [])

  const HomeStack = () => {
    
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,0.3)' }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='HomeMain' children={() => <Home />} />
          <Stack.Screen name='SpecificExercise' children={() => <SpecificExercise />} />
          <Stack.Screen name='UserExercises' children={() => <UserExercises />} />
          <Stack.Screen name='Map' children={() => <Map />} />
          <Stack.Screen name='Workouts' children={() => <Workouts />} />
          <Stack.Screen name='BMI' children={() => <BMI />} />
          <Stack.Screen name='FoodScan' children={() => <FoodScan />} />
        </Stack.Navigator>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        sceneContainerStyle={{
          backgroundColor: 'rgb(250,250,250)',
          shadowOpacity: 0,
          borderRadius: 10,
        }}
        screenOptions={{
          tabBarStyle: {
            width: '100%',
            borderRadius: 10,
            borderWidth: 0.0,
            shadowColor: 'rgba(0,0,0,0.5)',
            alignSelf: 'center',
          },
        }}>
        <Tab.Screen
          name='Home'
          component={HomeStack}
          options={{
            tabBarLabel: 'HomeStack',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={
                  !focused
                    ? require('./assets/icons/dashboard.png')
                    : require('./assets/icons/dashboard-active.png')
                }
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Workout'
          component={Workouts}
          options={{
            tabBarLabel: 'HomeStack',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={
                  !focused
                    ? require('./assets/icons/workout.png')
                    : require('./assets/icons/workout-active.png')
                }
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name='Calories'
          component={HomeStack}
          options={{
            tabBarLabel: 'Calories',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={require('./assets/icons/search.png')}
                  style={{
                    height: 110,
                    width: 110,
                    marginTop: -12,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name='FoodScan'
          component={HomeStack}
          options={{
            tabBarLabel: 'Camera',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={
                  !focused
                    ? require('./assets/icons/camera.png')
                    : require('./assets/icons/camera-active.png')
                }
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name='About'
          component={About}
          options={{
            tabBarLabel: 'Info',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={
                  !focused ? require('./assets/icons/user.png') : require('./assets/icons/user-active.png')
                }
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
