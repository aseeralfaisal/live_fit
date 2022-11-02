import { useAppSelector } from '../redux/hooks'
import { bmiColors } from './bmiColors'

export const fillColor = () => {
  const bmi = useAppSelector((state) => state.bmi.bmi)
  if (bmi < 24.9 && bmi > 18.5) {
    return bmiColors.healthyWeight
  } else if (bmi > 30) {
    return bmiColors.overweight
  } else if (bmi < 18.5) {
    return bmiColors.underweight
  } else if (bmi > 35) {
    return bmiColors.obese
  }
}
