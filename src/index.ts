import { MclClass, type ClassType, type InputType } from './mcl-theme'

const generateClass = <T extends ClassType>(
  type: T,
  value: InputType<T>
): string => {
  const mclGenerate = new MclClass(type, value)
  return mclGenerate.generateClass()
}

const someFn = () => {
  const var1 = generateClass('BGCOLOR', 'dark-3')
  const var2 = generateClass('PADDINGR', 'lg')
  const var3 = generateClass('H3', 'md')
  return {
    var1,
    var2,
    var3,
  }
}
const exampleFn = (): string => {
  const classArray: string[] = [generateClass('BGCOLOR', 'primary')]
  classArray.push(generateClass('FONTWEIGHT', 'bold'))
  classArray.push(generateClass('H1', 'md'))
  classArray.push(generateClass('MARGINT', '3xl'))
  return classArray.join(' ')
}

console.log(exampleFn())
