import * as React from 'react'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import TabScreen from './TabScreen'
import { Login } from './Screens/Login'
import store from './redux/store'
import { Provider } from 'react-redux'

const client = new ApolloClient({
  uri: 'localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    Poppins_Bold: require('./assets/fonts/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <TabScreen />
      </Provider>
    )
  }
}
