import * as React from 'react'
import { useRoute } from '@react-navigation/native'
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import { setWorkoutNameUserInput } from '../../redux/states/workoutSlice'
import axios from 'axios'
import { CHANGE_INFO } from '../../Queries/CAHNGE_INFO'
import { changePopupTitle } from '../../redux/states/userSlice'
import { BASE_URI } from '../../URI'

const Wrapper = ({ elements }: any) => {
  return <View style={{ top: '70%', height: '100%', backgroundColor: '#fff' }}>{elements}</View>
}

const InfoChangePopup = ({ popup, setPopup, CreateUpdateWorkout, type }: any) => {
  const inputValue = useAppSelector((state) => state.workout.workoutNameUserInput)
  const userName = useAppSelector((state) => state.user.userVal)
  const dispatch = useDispatch()
  const popupTitle = useAppSelector((state) => state.user.popupTitle)
  const route = useRoute()
  const routeName = route.name

  const saveFunction = () => {
    CreateUpdateWorkout()
    dispatch(setWorkoutNameUserInput(''))
    setPopup(false)
  }

  const changeInfo = async () => {
    try {
      setPopup(false)
      await axios.post(BASE_URI, {
        query: CHANGE_INFO,
        variables: {
          type,
          userName,
          value: parseFloat(inputValue),
        },
      })
      dispatch(setWorkoutNameUserInput(''))
    } catch (err) {
      console.log(err)
    }
  }

  const SaveButton = ({ title, func }: { title: string; func: Function }) => {
    return (
      <TouchableOpacity style={styles.saveWorkoutBtn} onPress={() => func()}>
        <Text style={styles.saveWorkoutBtnText}>{title}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <>
      <Modal transparent animationType='slide' visible={popup}>
        <Pressable
          style={styles.backdrop}
          onPress={() => {
            dispatch(setWorkoutNameUserInput(''))
            setPopup(false)
          }}>
          <Wrapper
            elements={
              <>
                <Text style={styles.title}>{routeName === 'About' ? popupTitle : 'Your Workout Name'}</Text>
                <View style={{ marginVertical: 25 }}>
                  <TextInput
                    keyboardType={routeName === 'About' ? 'numeric' : 'default'}
                    placeholder={routeName === 'About' ? `Change ${popupTitle}...` : 'Workout Name...'}
                    placeholderTextColor='#bbb'
                    value={inputValue}
                    onChangeText={(txt) => dispatch(setWorkoutNameUserInput(txt))}
                    style={styles.workoutNameInput}
                  />
                </View>
                {routeName === 'About' ? (
                  <SaveButton title='Save Info' func={changeInfo} />
                ) : (
                  <SaveButton title='Save Workout' func={saveFunction} />
                )}
              </>
            }
          />
        </Pressable>
      </Modal>
    </>
  )
}

export default InfoChangePopup

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
    textTransform: 'capitalize',
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
