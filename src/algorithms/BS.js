import { swap } from './helpers'

const bs = (array, position, arraySteps, colorSteps) => {
  let colorCodes = colorSteps[colorSteps.length - 1].slice()

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1)
      }
      arraySteps.push(array.slice())
      colorCodes[j] = 1
      colorCodes[j + 1] = 1
      colorSteps.push(colorCodes.slice())
      colorCodes[j] = 0
      colorCodes[j + 1] = 0
    }
    colorCodes[arraySteps.length - 1 - i] = 2
    arraySteps.push(array.slice())
    colorSteps.push(colorCodes.slice())
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2)
  return
}

export default bs
