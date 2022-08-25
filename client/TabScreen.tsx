import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Screens/Home'
import { Image, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as NavigationBar from 'expo-navigation-bar'
import Workouts from './Screens/Workouts'
import About from './Screens/About'
import FoodScan from './Screens/FoodScan'
import MapBox from './Screens/MapBox'

export default function TabScreen() {
  const Tab = createBottomTabNavigator<any>()

  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync('white')
  }, [])

  return (
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
          component={Home}
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
          name='MapBox'
          component={MapBox}
          options={{
            tabBarLabel: 'MapBox',
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
          component={Home}
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
          component={FoodScan}
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
  )
}
