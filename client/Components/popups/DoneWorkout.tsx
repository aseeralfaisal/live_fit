import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import DoneWorkoutSVG from '../../assets/doneWorkout.svg'

type objectsType = {
  title: string
  icon: Object
}
const Wrapper = ({ elements }: any) => {
  return <View style={{ top: '10%', height: '100%', backgroundColor: '#fff' }}>{elements}</View>
}

const DoneWorkout = ({ setDoneWorkoutPopup, doneWorkoutPopup }: any) => {
  const dispatch = useDispatch()
  const nutritionResult = useAppSelector((state) => state.nutrition.nutritionResult)
  const userName = useAppSelector((state) => state.user.userVal)
  const todaysDate = useAppSelector((state) => state.nutrition.todaysDate)

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
