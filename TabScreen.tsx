import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Screens/Home'
import { useColorScheme } from 'react-native-appearance'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import FoodScan from './Screens/FoodScan'
import Workouts from './Screens/Workouts'
import BMI from './Screens/BMI'
import Map from './Screens/Map'
import About from './Screens/About'

type TabParamList = {
  Home: undefined
  Calories: undefined
  Workout: undefined
  About: undefined
  FoodScan: undefined
}
type StackParamList = {
  HomeMain: undefined
  FoodScan: undefined
  Workouts: undefined
  BMI: undefined
  Map: undefined
}

export default function TabScreen() {
  const [steps, setSteps] = React.useState(0)

  const Tab = createBottomTabNavigator<TabParamList>()
  const Stack = createStackNavigator<StackParamList>()
  // const navigation = useNavigation<NavigationProp<StackParamList>>()

  const HomeStack = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,0.3)' }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='HomeMain' children={() => <Home />} />
          <Stack.Screen name='Map' children={() => <Map />} />
          <Stack.Screen name='Workouts' children={() => <Workouts />} />
          <Stack.Screen name='BMI' children={() => <BMI />} />
          <Stack.Screen name='FoodScan' children={() => <FoodScan />} />
        </Stack.Navigator>
      </View>
    )
  }

  let colorScheme = useColorScheme()
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
          tabBarStyle: { width: '96%', borderRadius: 10, borderWidth: 0.1, marginBottom: 12, shadowColor: 'rgba(0,0,0,0.5)', alignSelf: 'center' },
        }}
      >
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
                  !focused
                    ? require('./assets/icons/user.png')
                    : require('./assets/icons/user-active.png')
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
