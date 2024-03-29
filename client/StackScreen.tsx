import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import BMI from './Screens/BMI'
import Calories from './Screens/Calories'
import ChooseExercises from './Screens/ChooseExercises'
import FoodScan from './Screens/FoodScan'
import TargetExercise from './Screens/TargetExercise'
import UserExercises from './Screens/UserExercises'
import Workouts from './Screens/Workouts'
import Map from './Screens/Workouts'
import TabScreen from './TabScreen'

export default function StackScreen() {
  const Stack = createStackNavigator<any>()

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 1.5,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: 'rgba(80,80,80,0.3)' }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='dashboard' component={TabScreen} />
          <Stack.Screen name='TargetExercise' children={() => <TargetExercise />} />
          <Stack.Screen name='ChooseExercises' children={() => <ChooseExercises />} />
          <Stack.Screen name='UserExercises' children={() => <UserExercises />} />
          <Stack.Screen name='Cals' children={() => <Calories />} />
          <Stack.Screen name='Map' children={() => <Map />} />
          <Stack.Screen
            name='Workouts'
            options={{ presentation: 'modal', transitionSpec: { open: config, close: config } }}
            children={() => <Workouts />}
          />
          <Stack.Screen name='BMI' children={() => <BMI />} />
          <Stack.Screen name='FoodScan' children={() => <FoodScan />} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
}
