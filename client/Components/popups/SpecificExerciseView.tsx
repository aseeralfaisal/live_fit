import React from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ForwardSVG from '../../assets/forward.svg'

type PropTypes = {
  specificWorkout: boolean
  setSpecificWorkout: any
  exerciseItem: object
}

export const SpecificExerciseView = ({ specificWorkout, setSpecificWorkout, exerciseItem }: any) => {
  return (
    <Modal
      animationType='slide'
      visible={specificWorkout}
      transparent={true}
      onRequestClose={() => setSpecificWorkout(!specificWorkout)}>
      <View style={{ backgroundColor: '#ffffff' }}>
        <View
          style={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            marginTop: 40
          }}>
          <Text style={[styles.titleTxt, { fontSize: 28, width: '90%', textAlign: 'center', marginBottom: 40 }]}>
            {exerciseItem?.name}
          </Text>
          <Image
            source={{ uri: exerciseItem?.gifUrl }}
            style={{ width: 250, height: 250, resizeMode: 'contain' }}
          />
          <TouchableOpacity activeOpacity={0.6} style={{ marginTop: 160 }} onPress={() => setSpecificWorkout(!specificWorkout)}>
            <ForwardSVG />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    textTransform: 'capitalize',
    color: 'rgb(80,80,80)',
    fontSize: 14,
  },
})
