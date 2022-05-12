import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Screens/Home'
import { useColorScheme } from 'react-native-appearance'
import { StyleSheet, Image, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import FoodScan from './Screens/FoodScan'
import Workouts from './Screens/Workouts'
import BMI from './Screens/BMI'
import Map from './Screens/Map'

type TabParamList = {
  HomeStack: undefined
  Calories: undefined
  About: undefined
}
type StackParamList = {
  Home: undefined
  FoodScan: undefined
  Workouts: undefined
  BMI: undefined
  Map: undefined
}

export default function TabScreen() {
  const [steps, setSteps] = React.useState(0)

  const Tab = createMaterialBottomTabNavigator<TabParamList>()
  const Stack = createStackNavigator<StackParamList>()
  // const navigation = useNavigation<NavigationProp<StackParamList>>()

  const HomeStack = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,0.3)' }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' children={() => <Home />} />
          {/* <Stack.Screen name='WalkSteps' children={() => <WalkSteps steps={steps} setSteps={setSteps} />} /> */}
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
        initialRouteName='HomeStack'
        sceneAnimationEnabled={false}
        activeColor='rgb(80,80,80)'
        barStyle={{ backgroundColor: 'rgb(250,250,250)' }}
        shifting={true}
        labeled={false}
      >
        <Tab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            tabBarLabel: 'HomeStack',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/dashboard.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color,
                }}
              />
            ),
            // tabBarColor: 'rgb(50,30,0)'
          }}
        />

        <Tab.Screen
          name='Calories'
          component={Home}
          options={{
            tabBarLabel: 'Calories',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/statistics.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name='About'
          component={Home}
          options={{
            tabBarLabel: 'Info',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/body.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
