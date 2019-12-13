import colors from "./Colors";

const family = {
    //base: "CaviarDreams",
    //base_bold: "CaviarDreams_Bold",
    //base_italic: "CaviarDreams_Italic",
    //base_bold_italic: "CaviarDreams_BoldItalic",
    base: "TitilliumWeb-Regular",
    base_bold: "TitilliumWeb-Bold",
    base_italic: "TitilliumWeb-Italic",
    base_bold_italic: "TitilliumWeb-BoldItalic",
    base_semibold: "TitilliumWeb-SemiBold",
    base_semibold_italic: "TitilliumWeb-SemiBoldItalic",
}
const size = {
    big: 36,
    h1: 20,
    h2: 16,
    h3: 14,
    medium: 14,
    small: 13,
    tiny: 10
}
const style = {
    textsmall: {
        fontFamily: family.base,
        fontSize: size.small,
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        color: colors.black
    },
    textsmall_bold: {
        fontFamily: family.base_bold,
        fontSize: size.small,
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        color: colors.black
    },
    textStyle: {
        fontFamily: family.base_semibold,
        fontSize: size.medium,
        fontStyle: "normal",
        lineHeight: 20,//24
        letterSpacing: 0,
        color: colors.black
    },
    h3 :{
        fontFamily: family.base_bold,
        fontSize: size.h3,
        fontStyle: "normal",
        lineHeight: 20,//24
        letterSpacing: 0,
        textAlign: "center",
        color: colors.black
    },
    h3_small :{
        fontFamily: family.base_bold,
        fontSize: size.small,
        fontStyle: "normal",
        lineHeight: 20,//15
        letterSpacing: 0,
        textAlign: "center",
        color: colors.black
    },
    h2 :{
        fontFamily: family.base_bold,
        fontSize: size.h2,
        fontStyle: "normal",
        lineHeight: 20,//24
        letterSpacing: 0,
        textAlign: "center",
        color: colors.black
    },
    h1 :{
        fontFamily: family.base_semibold,
        fontSize: size.h1,
        fontStyle: "normal",
        lineHeight: 20,//32
        letterSpacing: 0,
        textAlign: "center",
        color: colors.black
    },
}

export default {style, family, size};