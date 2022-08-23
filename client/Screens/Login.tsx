import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Btn } from '../Components/Button'
import UserIcon from '../assets/icons/userIcon.svg'
import PassIcon from '../assets/icons/passIcon.svg'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { changeUserVal, changePassVal } from '../redux/states/userSlice'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'

export const Login = ({ setIsAuthenticated }: any) => {
  const dispatch = useAppDispatch()
  const userVal = useAppSelector((state) => state.user.userVal)
  const passVal = useAppSelector((state) => state.user.pass)
  const [loader, setLoader] = useState(false)

  const onUserVal = (user: string) => {
    dispatch(changeUserVal(user))
  }
  const onPassVal = (pass: string) => {
    dispatch(changePassVal(pass))
  }
  const BASE_URL = 'https://livefitv2.herokuapp.com/graphql'
  const loginAction = async () => {
    try {
      setLoader(true)
      const LOGIN_MUTATION = `mutation LoginUser($name: String!, $pass: String!) {
        loginUser(name: $name, pass: $pass) {
          user
        }
      }`
      const fetchData = await axios.post(BASE_URL, {
        query: LOGIN_MUTATION,
        variables: {
          name: userVal,
          pass: passVal,
        },
      })
      if (fetchData.data.data !== null) {
        setIsAuthenticated(true)
        setLoader(false)
      } else {
        setIsAuthenticated(false)
        setLoader(false)
        fetchData.data?.errors.map((item: { message: string }) => {
          return alert(item.message)
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey there</Text>
      <Text style={styles.title2}>Welcome</Text>
      <>
        <View style={styles.input}>
          <UserIcon />
          <TextInput
            value={userVal}
            onChangeText={(val) => onUserVal(val)}
            placeholder='User Name'
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
      </>
      <TouchableOpacity activeOpacity={0.5} onPress={loginAction}>
        <Btn title='Login' loading={loader} />
      </TouchableOpacity>
      <View style={styles.registerText}>
        <Text style={styles.title}>Don’t have an account yet?</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={[styles.title, { color: '#92A3FD' }]}>Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='light' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '15%',
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
    padding: 10,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    margin: 10,
  },
  inputTextField: {
    width: 250,
    marginHorizontal: 10,
  },
  registerText: {
    flexDirection: 'row',
  },
})
