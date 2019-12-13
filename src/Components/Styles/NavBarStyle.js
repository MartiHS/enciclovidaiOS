import { StyleSheet } from "react-native";

import { Metrics, Colors, Fonts } from "../../Theme/"

export default styles = StyleSheet.create({
    navBar: {
        height: Metrics.navBarHeight,
        backgroundColor: Colors.navBarBackground,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    navBarWhite: {
        backgroundColor: Colors.white,
    },
    navBarDialog: {
        top: Metrics.navBarHeight,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    title: {
        ...Fonts.style.h3,
        color: Colors.white
    },
    subtitle: {
        ...Fonts.style.h3_small,
        color: Colors.white,
        //fontStyle: "italic",
        fontFamily: Fonts.family.base_italic,
    },
    title_small: {
        ...Fonts.style.h3_small,
        color: Colors.white
    },
    favIcon: {
        alignContent:"center",
        alignItems:"center",
        textAlign:"center",
        justifyContent:"center"

    },
    faviconmenu:{
    },
    touchmenu:{
        //backgroundColor: "#0f0f0f",
        width:80,
        height:50,
        alignItems: 'center',
        justifyContent: "center"
    },
    imageIcon:{
        width:25,
        height:25,
    },
    title_flat:{
        ...Fonts.style.h3,
        fontFamily: Fonts.family.base_bold,
    },
    imageIconFilter:{
        width:60,
        height:60,
    },
    column:{
        flex: 1, 
        flexDirection: 'column', 
        margin: 1, 
        alignItems: 'center'
    },
    columnSelect:{
        flex: 1, 
        flexDirection: 'column', 
        margin: 1, 
        alignItems: 'center',
        backgroundColor: '#999999'
    },
    view_text:{
        ...Fonts.style.textsmall,
        textAlign: 'center',
        fontFamily: Fonts.family.base,
    },
    transparent: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        zIndex: 10
    },
    leftContainer: {
        width: Metrics.buttonSize,
        alignItems: "center",
        justifyContent: "center"
    },titleWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },rightContainer: {
        width: Metrics.buttonSize,
        alignItems: "center",
        justifyContent: "center"
    },
    content:{
        paddingTop: 10,
    },
    tabLine: {
        backgroundColor: "#B5B3AE",
        height: 2,
        margin: 10,
    },
    items: {
        ...Fonts.style.textsmall,
        marginRight: 30,
        color: Colors.textdialog,
    },
    itemsdetails:{
        ...Fonts.style.textsmall,
        color: Colors.textdialog,
        //fontWeight: "bold",
        fontFamily: Fonts.family.base_bold,
    },
    image:{
        position: 'absolute', 
        top: 0, 
        right: 0, 
        bottom: 22, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    imagelast:{
        bottom: 0, 
    },
});