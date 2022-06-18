import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from 'react-native'
import { useState, useEffect } from 'react'
import { Pedometer } from 'expo-sensors'
import Header from '../Components/Header'
import { useColorScheme } from 'react-native-appearance'
import MapView, { Marker, LocalTile } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

export default function WalkSteps() {
  let colorScheme = useColorScheme()
  const [latitude, setLat] = useState<number>(37.78825)
  const [longitude, setLng] = useState<number>(-122.4324)

  const regionValues = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const updatePinLocation = (e: any): void => {
    setLat(e.nativeEvent.coordinate.latitude)
    setLng(e.nativeEvent.coordinate.longitude)
  }

  const origin = { latitude: 37.3318456, longitude: -122.0296002 }
  const destination = { latitude: 37.771707, longitude: -122.4053769 }
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBWtAJYcnIVBEbFJX2KRuQ5BbCIuw8Xqtw'

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}
    >
      <Header />
      <>
        {/* <MapView
          region={regionValues}
          onLongPress={(e) => updatePinLocation(e)}
          style={styles.map}
        >
          <Marker
            draggable
            onDragEnd={(e) => {
              setLat(e.nativeEvent.coordinate.latitude)
              setLng(e.nativeEvent.coordinate.longitude)
            }}
            coordinate={{ latitude, longitude }}
            image={require('../assets/icons/pin.png')}
          />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView> */}
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 22,
    color: '#1ABDFF',
  },
  walkText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 22,
    color: '#29ABE2',
  },
  walkTextParent: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 60,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  steps: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 80,
    color: '#1ABDFF',
    marginVertical: -170,
  },
})
