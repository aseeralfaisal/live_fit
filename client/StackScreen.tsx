import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import BMI from './Screens/BMI'
import FoodScan from './Screens/FoodScan'
import SpecificExercise from './Screens/SpecificExercise'
import UserExercises from './Screens/UserExercises'
import Workouts from './Screens/Workouts'
import Map from './Screens/Workouts'
import TabScreen from './TabScreen'

export default function StackScreen() {
  const Stack = createStackNavigator<any>()
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,0.3)' }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='dashboard' component={TabScreen} />
          <Stack.Screen name='SpecificExercise' children={() => <SpecificExercise />} />
          <Stack.Screen name='UserExercises' children={() => <UserExercises />} />
          <Stack.Screen name='Map' children={() => <Map />} />
          <Stack.Screen name='Workouts' children={() => <Workouts />} />
          <Stack.Screen name='BMI' children={() => <BMI />} />
          <Stack.Screen name='FoodScan' children={() => <FoodScan />} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
}
