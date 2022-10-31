export const CHANGE_INFO = `mutation ChangeInfo($type: String, $userName: String, $value: Float) {
    changeInfo(type: $type, userName: $userName, value: $value) {
      date
      calories
    }
  }`