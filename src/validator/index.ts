import type {
  BodyText,
  ColorPalette,
  FontWeight,
  HeadingSize,
  OpacityRange,
  SpacingLevel,
  Range,
  Alignment,
} from '../theme/theme.types'
import type { ClassType, InputType, ColorClassType } from '../mcl-theme'

export class ValidateMclClass<T extends ClassType> {
  classInput: InputType<T>
  constructor(input: InputType<T>) {
    this.classInput = input
  }
  public validateColorType(): this is ColorPalette {
    const validatorRe =
      /(primary|secondary|success|info|warning|danger|light-1|light-2|light-3|light-4|dark-1|dark-2|dark-3|dark-4|black|white|transparent)/
    if (typeof this.classInput !== 'string') {
      return false
    }
    return validatorRe.test(this.classInput)
  }
  public validateSpaceType(): this is SpacingLevel {
    const validatorRe = /(0|3xs|2xs|xs|sm|md|lg|xl|2xl|3xl)/
    if (typeof this.classInput !== 'string') {
      return false
    }
    return validatorRe.test(this.classInput)
  }
  public validateHeadingTextSizeType(): this is HeadingSize {
    const validatorRe = /(sm|md|lg|xl)/
    if (typeof this.classInput !== 'string') {
      return false
    }
    return validatorRe.test(this.classInput)
  }
  validateBodyTextSizeType(): this is BodyText {
    const validatorRe = /(xs|sm|md|lg|xl)/
    if (typeof this.classInput !== 'string') {
      return false
    }
    return validatorRe.test(this.classInput)
  }
  validateFontWeightType(): boolean {
    const validatorRe = /(light|normal|bold)/
    if (typeof this.classInput !== 'string') {
      return false
    }
    return validatorRe.test(this.classInput)
  }
  validateOpacityType(): boolean {
    const validatorRe = /\b(0|[1-9]0|100)\b/
    if (typeof this.classInput !== 'number') {
      return false
    }
    return validatorRe.test(this.classInput.toString())
  }
  validateRangeType(): boolean {
    const validatorRe = /\b([1-9]|1[0-2])\b/
    if (typeof this.classInput !== 'number') {
      return false
    }
    return validatorRe.test(this.classInput.toString())
  }
  validateAlignment(): boolean {
    const validatorRe = /(left|center|right)/
    if (typeof this.classInput !== 'string') {
      return false
    }
    return validatorRe.test(this.classInput)
  }
}
