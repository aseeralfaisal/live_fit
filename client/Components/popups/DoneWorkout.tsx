import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import DoneWorkoutSVG from '../../assets/doneWorkout.svg'
import { TextInput } from 'react-native-gesture-handler'

type objectsType = {
  title: string
  icon: Object
}
const Wrapper = ({ elements }: any) => {
  return <View style={{ top: '10%', height: '100%', backgroundColor: '#fff' }}>{elements}</View>
}

const DoneWorkout = ({ setDoneWorkoutPopup, doneWorkoutPopup }: any) => {
  const dispatch = useDispatch()
  const UserExercises = useAppSelector((state) => state.workout.UserExercises)

  const ListTitle = ({ title, title2, width }: any) => {
    const textStyle = {
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
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingHorizontal: 12,
        }}>
        <Text style={textStyle}>{title}</Text>
        <Text style={textStyle}>{title2}</Text>
        {/* <TextInput placeholder={title} editable={false} placeholderTextColor='#fff' style={textStyle} />
        <TextInput placeholder={title2} editable={false} placeholderTextColor='#fff' style={textStyle} /> */}
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
                <View style={{ marginVertical: 25, alignItems: 'center' }}>
                  <DoneWorkoutSVG />
                  <Text style={[styles.titleTxt, { marginVertical: 16 }]}>Good job</Text>
                  <View>
                    <View style={{ marginVertical: 16 }}>
                      <ListTitle title='Exercises' title2='Sets' />
                    </View>
                    <FlatList
                      data={UserExercises}
                      renderItem={({ item }) => {
                        return (
                          <>
                            {item.sets.length !== 0 && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginHorizontal: 10,
                                }}>
                                <View>
                                  <Text style={[styles.titleTxt, { color: '#555' }]}>
                                    {item.name.split(' ')[0]} {item.name.split(' ')[1]}{' '}
                                    {item.name.split(' ')[2]}
                                  </Text>
                                  <Text style={[styles.titleTxt, { fontSize: 12, color: '#999' }]}>
                                    Target: {item.target}
                                  </Text>
                                </View>
                                <Text style={[styles.titleTxt, { marginLeft: 140 }]}>{item.sets.length}</Text>
                              </View>
                            )}
                          </>
                        )
                      }}
                    />
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
