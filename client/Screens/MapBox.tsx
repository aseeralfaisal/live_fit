import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import * as Location from 'expo-location'
import { Btn } from '../Components/Button'

const MapBox = () => {
  const [coordinates, setCoordinates] = useState([90.9629, 23.5937])
  // const [coordinates, setCoordinates] = useState<any>([])
  // const [coordinates2] = useState([90.9529, 23.593])
  const [startPostion, setStartPostion] = useState<any>("")
  const [endPostion, setEndPostion] = useState<any>("")
  const [route] = useState({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [startPostion, endPostion],
        },
      },
    ],
  })
  const token = 'pk.eyJ1IjoiaXN0aWEiLCJhIjoiY2wzZXJlNnllMDA5cTNobmV2dG1yZXF6ZSJ9.ok7F0WbbLNWemVziQlo0cA'
  MapboxGL.setAccessToken(token)

  useEffect(() => {
    ;(async () => {
      // MapboxGL.setTelemetryEnabled(false)
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return alert('Permission to access location was denied')
      }
      let location = await Location.getCurrentPositionAsync({})
      setCoordinates([location.coords.longitude, location.coords.latitude])
    })()
  })

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={18} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation coordinate={startPostion} id='pointAnnotation' />
          <MapboxGL.PointAnnotation coordinate={endPostion} id="pointAnnotation" />
          <MapboxGL.ShapeSource id="line1" shape={route}>
            <MapboxGL.LineLayer
            id="linelayer1"
            style={{ lineColor: "yellow", lineWidth: 3 }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        <TouchableOpacity
          style={{ position: 'absolute', top: '80%', left: '50%' }}
          onPress={() => {
            setStartPostion(coordinates)
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Btn title='Start' loading={false} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', top: '80%', left: '50%' }}
          onPress={() => {
            setEndPostion(coordinates)
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Btn title='end' loading={false} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '95%',
    width: '95%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
})

export default MapBox
