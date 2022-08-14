import * as React from 'react'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import TabScreen from './TabScreen'
import { Login } from './Screens/Login'
import store from './redux/store'
import { Provider } from 'react-redux'
import StackScreen from './StackScreen'

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    Poppins_Bold: require('./assets/fonts/Poppins-Bold.ttf'),
  })

  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        {isAuthenticated ? <StackScreen /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      </Provider>
    )
  }
}
