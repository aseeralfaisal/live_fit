import { StyleSheet, TextInput, View } from 'react-native'

type propTypes = {
  title: string
  width: number | 'default'
}

export const ListTitle = ({ title, width }: propTypes) => {
  return (
    <View
      style={{
        backgroundColor: '#92A3FD',
        borderRadius: 5,
        height: 30,
      }}>
      <TextInput
        placeholder={title}
        editable={false}
        placeholderTextColor='#fff'
        style={{
          width: width !== 'default' ? width : 70,
          height: 20,
          marginTop: 8,
          fontSize: 14,
          textAlign: 'center',
          fontFamily: 'Poppins',
          color: '#777',
        }}
      />
    </View>
  )
}
