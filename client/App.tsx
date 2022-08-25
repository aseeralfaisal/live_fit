import * as React from 'react'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import TabScreen from './TabScreen'
import { Login } from './Screens/Login'
import { Provider } from 'react-redux'
import StackScreen from './StackScreen'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useAppSelector } from './redux/hooks'

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    Poppins_Bold: require('./assets/fonts/Poppins-Bold.ttf'),
  })

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {isAuthenticated ? <StackScreen /> : <Login />}
        </PersistGate>
      </Provider>
    )
  }
}
