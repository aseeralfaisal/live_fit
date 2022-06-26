import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native'
import { Btn } from '../Components/Button'
import EmailIcon from '../assets/icons/emailIcon.svg'
import PassIcon from '../assets/icons/passIcon.svg'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { changeEmailVal, changePassVal } from '../redux/userSlice'

export const Login = () => {
  const dispatch = useAppDispatch()
  const emailVal = useAppSelector((state) => state.user.email)
  const passVal = useAppSelector((state) => state.user.pass)

  const onEmailVal = (email: string) => {
    dispatch(changeEmailVal(email))
  }
  const onPassVal = (pass: string) => {
    dispatch(changePassVal(pass))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey there</Text>
      <Text style={styles.title2}>Welcome</Text>
      <View style={styles.input}>
        <EmailIcon />
        <TextInput
          value={emailVal}
          onChangeText={(val) => onEmailVal(val)}
          placeholder='Email'
          style={styles.inputTextField}
        />
      </View>
      <View style={styles.input}>
        <PassIcon />
        <TextInput
          value={passVal}
          onChangeText={(val) => onPassVal(val)}
          placeholder='Password'
          style={styles.inputTextField}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => console.log({ emailVal, passVal })}
      >
        <Btn title='Login' />
      </TouchableOpacity>
      <View style={styles.registerText}>
        <Text style={styles.title}>Don’t have an account yet?</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={[styles.title, { color: '#92A3FD' }]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
  },
  title: {
    color: '#1D1617',
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
  },
  title2: {
    color: '#1D1617',
    fontFamily: 'Poppins_Bold',
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    width: 305,
    padding: 10,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    margin: 10,
  },
  inputTextField: {
    marginHorizontal: 10,
  },
  registerText: {
    flexDirection: 'row',
  },
})
