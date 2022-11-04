import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import DoneWorkoutSVG from '../../assets/doneWorkout.svg'
import { TextInput } from 'react-native-gesture-handler'
import MainButton from '../MainButton'
import { useEffect, useState } from 'react'

type objectsType = {
  title: string
  icon: Object
}
const Wrapper = ({ elements }: any) => {
  return <View style={{ top: '10%', height: '100%', backgroundColor: '#fff' }}>{elements}</View>
}

const DoneWorkout = ({ setDoneWorkoutPopup, doneWorkoutPopup }: any) => {
  const dispatch = useDispatch()
  const selectedList = useAppSelector((state) => state.workout.selectedList)
  const UserExercises = useAppSelector((state) => state.workout.UserExercises)

  const ListTitle = ({ title, title2, title3, width }: any) => {
    const titleStyle: any = {
      width: width !== 'default' ? width : 80,
      height: 20,
      marginTop: 5,
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Poppins',
      color: '#fff',
    }
    return (
      <View
        style={{
          backgroundColor: '#92A3FD',
          borderRadius: 5,
          height: 30,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          paddingHorizontal: 12,
          width: 300,
        }}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={titleStyle}>{title2}</Text>
        <Text style={titleStyle}>{title3}</Text>
      </View>
    )
  }

  return (
    <>
      <Modal visible={doneWorkoutPopup} transparent animationType='slide'>
        <Pressable style={styles.backdrop} onPress={() => setDoneWorkoutPopup(false)}>
          <Wrapper
            elements={
              <>
                <Text style={styles.title}>Finished Workout</Text>
                <View style={{ marginVertical: 25, alignItems: 'center', flex: 1 }}>
                  <DoneWorkoutSVG />
                  <Text style={styles.goodJobText}>You did a good job</Text>
                  <MainButton
                    title='Done Workout'
                    width={300}
                    onPress={() => {
                      setDoneWorkoutPopup(false)
                    }}
                    horizontalMargin='default'
                  />
                  <View>
                    <View style={{ marginVertical: 16 }}>
                      <ListTitle title='Exercises' title2='Reps' title3='W (KG)' />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator
                        data={selectedList}
                        keyExtractor={(_, idx) => idx.toString()}
                        renderItem={({ item }) => {
                          return (
                            <>
                              {item?.sets?.length !== 0 && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginHorizontal: 10,
                                    flex: 1,
                                  }}>
                                  <Text
                                    ellipsizeMode='clip'
                                    style={[styles.titleTxt, { color: '#555', width: 100 }]}>
                                    {/* {item?.setName.split(' ')[0]}  */}
                                    {item?.setName.split(' ')[1]} {item?.setName.split(' ')[2]}
                                  </Text>
                                  <Text style={[styles.titleTxt, { color: '#555', width: 60 }]}>
                                    {item.item.reps}
                                  </Text>
                                  <Text style={[styles.titleTxt, { color: '#555', marginRight: 30 }]}>
                                    {item.item.weight}
                                  </Text>
                                  {/* <View>
                                    <Text style={[styles.titleTxt, { color: '#555' }]}>
                                      {item?.setName.split(' ')[0]} {item?.setName.split(' ')[1]}{' '}
                                      {item?.setName.split(' ')[2]}
                                    </Text>
                                  </View> */}
                                  {/* <Text style={[styles.titleTxt, { marginLeft: 140 }]}>
                                    {item?.sets.length}
                                  </Text> */}
                                </View>
                              )}
                            </>
                          )
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            }
          />
        </Pressable>
      </Modal>
    </>
  )
}

export default DoneWorkout

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#00000033',
  },
  saveWorkoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#92A3FD',
    marginHorizontal: 40,
    height: 50,
    borderRadius: 20,
  },
  saveWorkoutBtnText: {
    color: '#fff',
    fontFamily: 'Poppins_Bold',
    textAlignVertical: 'center',
    fontSize: 14,
  },
  title: {
    color: '#777',
    fontFamily: 'Poppins_Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  goodJobText: {
    fontFamily: 'Poppins_Bold',
    color: '#777',
    fontSize: 14,
    marginVertical: 20,
  },
  titleTxt: {
    fontFamily: 'Poppins_Bold',
    textTransform: 'capitalize',
    color: '#777',
    fontSize: 14,
  },
  workoutNameInput: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    borderWidth: 1,
    backgroundColor: '#F8F9F9',
    borderColor: '#ccc',
    color: '#777',
    marginHorizontal: 40,
    borderRadius: 16,
    height: 50,
  },
})
