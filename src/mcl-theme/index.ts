import {
  MclColor,
  MclHeadingSize,
  MclOpacityClass,
  MclSpacingClass,
  MclText,
} from "../theme";
import type {
  Alignment,
  BodyText,
  ColorPalette,
  FontWeight,
  HeadingSize,
  OpacityRange,
  Range,
  SpacingLevel,
} from "../theme/theme.types";
import { ValidateMclClass } from "../validator";

export const colorType = [
  "BGCOLOR",
  "BEFOREBG",
  "AFTERBG",
  "HVBGCOLOR",
  "FCBGCOLOR",
  "ACTIVEBG",
  "TEXTCOLOR",
  "HVTEXTCOLOR",
  "FCTEXTCOLOR",
  "DISABLEDTEXTCOLOR",
  "SVGFILL",
  "RINGCOLOR",
  "FOCUSRING",
  "ACTIVERING",
  "OFFSETRING",
  "DUMMYCOLOR",
  "BTNCOLOR",
  "LISTCOLOR",
  "BORDER",
  "BORDERX",
  "BORDERY",
  "BORDERT",
  "BORDERB",
  "BORDERL",
  "BORDERR",
] as const;

export const textType = ["BODYTEXT", "FONTWEIGHT", "TEXTALIGN"] as const;

export const headingSizeType = ["H1", "H2", "H3", "H4"] as const;

export const borderWidthType = [
  "BORDERW",
  "BORDERXW",
  "BORDERYW",
  "BORDERTW",
  "BORDERBW",
  "BORDERLW",
  "BORDERRW",
] as const;
export const scaleType = ["BGOPACITY", "OPACITY"] as const;
export const spacingType = [
  "MARGIN",
  "MARGINX",
  "MARGINY",
  "MARGINT",
  "MARGINB",
  "MARGINL",
  "MARGINR",
  "PADDING",
  "PADDINGX",
  "PADDINGY",
  "PADDINGT",
  "PADDINGB",
  "PADDINGL",
  "PADDINGR",
  "GAP",
] as const;

export const typeGroup = {
  colorType: [
    "BGCOLOR",
    "BEFOREBG",
    "AFTERBG",
    "HVBGCOLOR",
    "FCBGCOLOR",
    "ACTIVEBG",
    "TEXTCOLOR",
    "HVTEXTCOLOR",
    "FCTEXTCOLOR",
    "DISABLEDTEXTCOLOR",
    "SVGFILL",
    "RINGCOLOR",
    "FOCUSRING",
    "ACTIVERING",
    "OFFSETRING",
    "DUMMYCOLOR",
    "BTNCOLOR",
    "LISTCOLOR",
    "BORDER",
    "BORDERX",
    "BORDERY",
    "BORDERT",
    "BORDERB",
    "BORDERL",
    "BORDERR",
  ] as const,
  textType: ["BODYTEXT", "FONTWEIGHT", "TEXTALIGN"] as const,
  headingSizeType: ["H1", "H2", "H3", "H4"] as const,
  borderWidthType: [
    "BORDERW",
    "BORDERXW",
    "BORDERYW",
    "BORDERTW",
    "BORDERBW",
    "BORDERLW",
    "BORDERRW",
  ] as const,
  scaleType: ["BGOPACITY", "OPACITY"] as const,
  spacingType: [
    "MARGIN",
    "MARGINX",
    "MARGINY",
    "MARGINT",
    "MARGINB",
    "MARGINL",
    "MARGINR",
    "PADDING",
    "PADDINGX",
    "PADDINGY",
    "PADDINGT",
    "PADDINGB",
    "PADDINGL",
    "PADDINGR",
    "GAP",
  ] as const,
};

const allType = [
  ...typeGroup.colorType,
  ...typeGroup.textType,
  ...typeGroup.headingSizeType,
  ...typeGroup.borderWidthType,
  ...typeGroup.scaleType,
  ...typeGroup.spacingType,
] as const;

export type ClassType = (typeof allType)[number];

type GroupTypes = typeof typeGroup;
type ClassTypesMap = {
  [K in keyof GroupTypes]: (typeof typeGroup)[K][number];
};
export type ColorClassType = ClassTypesMap["colorType"];
export type HeadingClassType = ClassTypesMap["headingSizeType"];
export type TextClassType = ClassTypesMap["textType"];
export type BorderWidthClassType = ClassTypesMap["borderWidthType"];
export type ScaleClassType = ClassTypesMap["scaleType"];
export type SpacingClassType = ClassTypesMap["spacingType"];

type InputOptions =
  | ColorPalette
  | HeadingSize
  | BodyText
  | FontWeight
  | Range<1, 12>
  | OpacityRange
  | SpacingLevel
  | Alignment;

export type InputType<T extends ClassType> = T extends ColorClassType
  ? ColorPalette
  : T extends HeadingClassType
  ? HeadingSize
  : T extends TextClassType
  ? BodyText | FontWeight | Alignment
  : T extends BorderWidthClassType
  ? Range<1, 12>
  : T extends ScaleClassType
  ? OpacityRange
  : T extends SpacingClassType
  ? SpacingLevel
  : never;

export class MclClass<T extends ClassType> {
  classType: T;
  classValue: InputType<T>;
  colorClass: MclColor;
  headingSizeClass: MclHeadingSize;
  opacityClass: MclOpacityClass;
  spacingClass: MclSpacingClass;
  textClass: MclText;
  validator: ValidateMclClass<T>;

  constructor(classType: T, classValue: InputType<T>) {
    this.classType = classType;
    this.classValue = classValue;
    this.colorClass = new MclColor();
    this.headingSizeClass = new MclHeadingSize();
    this.opacityClass = new MclOpacityClass();
    this.spacingClass = new MclSpacingClass();
    this.textClass = new MclText();
    this.validator = new ValidateMclClass(classValue);
  }
  public generateColorClass(): string {
    switch (this.classType) {
      case "BGCOLOR":
        return this.getBgColorClass();
      case "HVBGCOLOR":
        return this.getHoverBgColorClass();
      case "FCBGCOLOR":
        return this.getFocusBgColorClass();
      case "BEFOREBG":
        return this.getBeforeBgColorClass();
      default:
        return " ";
    }
  }
  // handle color class
  // bg color
  private getBgColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.bgColor[this.classValue];
    }
    return " ";
  }
  private getHoverBgColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.hoverBgColor[this.classValue];
    }
    return "";
  }
  getFocusBgColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.focusBgColor[this.classValue];
    }
    return " ";
  }
  getBeforeBgColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.beforeBgColor[this.classValue];
    }
    return " ";
  }
  getAfterBgColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.afterBgColor[this.classValue];
    }
    return " ";
  }
  getActiveBgColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.bgActiveColor[this.classValue];
    }
    return " ";
  }
  // text color
  getTextColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.textColor[this.classValue];
    }
    return " ";
  }
  getHoverTextColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.hoverTextColor[this.classValue];
    }
    return " ";
  }
  getFocusTextColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.focusTextColor[this.classValue];
    }
    return " ";
  }
  getDisabledTextColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.disabledTextColor[this.classValue];
    }
    return " ";
  }
  // svg color
  getSvgFillColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.svgFillColor[this.classValue];
    }
    return " ";
  }
  // ring color
  getRingColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.ringColor[this.classValue];
    }
    return " ";
  }
  getFocusRingColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.ringFocusColor[this.classValue];
    }
    return " ";
  }
  getActiveRingColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.ringActiveColor[this.classValue];
    }
    return " ";
  }
  getRingOffsetColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.ringOffsetColor[this.classValue];
    }
    return " ";
  }
  // btn & list
  getBtnColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.btnColor[this.classValue];
    }
    return " ";
  }
  getListColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.listColor[this.classValue];
    }
    return " ";
  }
  // border color
  getBorderColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.borderColor[this.classValue];
    }
    return " ";
  }
  getBorderXColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.borderXColor[this.classValue];
    }
    return " ";
  }
  getBorderYColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.borderYColor[this.classValue];
    }
    return " ";
  }
  getBorderTopColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.borderTopColor[this.classValue];
    }
    return " ";
  }
  getBorderBottomColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.borderBottomColor[this.classValue];
    }
    return " ";
  }
  getBorderLeftColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.borderLeftColor[this.classValue];
    }
    return " ";
  }
  getBorderRightColorClass(): string {
    if (!this.validator.validateColorType()) {
      return " ";
    }
    if (this.isColorClass(this.classValue)) {
      return this.colorClass.borderRightColor[this.classValue];
    }
    return " ";
  }
  // handle heading classes
  getH1Class(): string {
    if (!this.validator.validateHeadingTextSizeType()) {
      return " ";
    }
    if (this.isHeadingClass(this.classValue)) {
      return this.headingSizeClass.heading1[this.classValue];
    }
    return " ";
  }
  getH2Class(): string {
    if (!this.validator.validateHeadingTextSizeType()) {
      return " ";
    }
    if (this.isHeadingClass(this.classValue)) {
      return this.headingSizeClass.heading2[this.classValue];
    }
    return " ";
  }
  getH3Class(): string {
    if (!this.validator.validateHeadingTextSizeType()) {
      return " ";
    }
    if (this.isHeadingClass(this.classValue)) {
      return this.headingSizeClass.heading3[this.classValue];
    }
    return " ";
  }
  getH4Class(): string {
    if (!this.validator.validateHeadingTextSizeType()) {
      return " ";
    }
    if (this.isHeadingClass(this.classValue)) {
      return this.headingSizeClass.heading4[this.classValue];
    }
    return " ";
  }
  // handle body text size classes
  getBodyTextSizeClass(): string {
    if (!this.validator.validateBodyTextSizeType()) {
      return " ";
    }
    if (this.isBodyTextClass(this.classValue)) {
      return this.textClass.bodyText[this.classValue];
    }
    return " ";
  }
  // handle font weight classes
  getFontWeightClass(): string {
    if (!this.validator.validateFontWeightType()) {
      return " ";
    }
    if (this.isFontWeightClass(this.classValue)) {
      return this.textClass.fontweight[this.classValue];
    }
    return " ";
  }
  // handle text align classes
  getTextAlignClass(): string {
    if (!this.validator.validateAlignment()) {
      return " ";
    }
    if (this.isTextAlignmentClass(this.classValue)) {
      return this.textClass.textAlign[this.classValue];
    }
    return " ";
  }

  // check for classType
  private isColorClass(arg: InputOptions): arg is ColorPalette {
    return (this.classType as string) in typeGroup.colorType;
  }
  private isHeadingClass(arg: InputOptions): arg is HeadingSize {
    return (this.classType as string) in typeGroup.headingSizeType;
  }
  private isBodyTextClass(arg: InputOptions): arg is BodyText {
    return (this.classType as string) in typeGroup.textType;
  }
  private isFontWeightClass(arg: InputOptions): arg is FontWeight {
    return (this.classType as string) in typeGroup.textType;
  }
  private isTextAlignmentClass(arg: InputOptions): arg is Alignment {
    return (this.classType as string) in typeGroup.textType;
  }
}
