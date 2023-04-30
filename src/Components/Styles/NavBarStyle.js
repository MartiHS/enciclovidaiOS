import { StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Metrics, Colors, Fonts } from "../../Theme/"

export default styles = StyleSheet.create({
    navBar: {
        paddingTop: (Platform.OS === 'android') ? getStatusBarHeight() : 0,
        top: 0,
        height: (Platform.OS === 'android') ? Metrics.navBarHeight + getStatusBarHeight() : Metrics.navBarHeight,
        backgroundColor: Colors.navBarBackground,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    navBarWhite: {
        backgroundColor: Colors.white,
    },
    navBarDialog: {
        top: (Platform.OS === 'android') ? (getStatusBarHeight() + Metrics.navBarHeight) : (getStatusBarHeight() + Metrics.navBarHeight + 29),
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
    dialogTitle: {
        ...Fonts.style.h1,
        color: Colors.gray,
        paddingTop:10,
        paddingBottom:10,
        //marginTop:-20  
    },
    autocomplete: {
        paddingLeft: 35,
        fontFamily: Fonts.family.base_bold,
        height: 45,
        
      },
      dialogButton: {
        backgroundColor: Colors.blue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop:10,
        paddingBottom:10,
        borderRadius: 8,
        width:"48%",
    },
    dialogButton2: {
        backgroundColor: Colors.green,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop:10,
        paddingBottom:10,
        borderRadius: 8,
        width:"48%",
        marginRight: "4%"
    },
    dialogButton3: {
        backgroundColor: Colors.blue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding:7,
        paddingRight:0,
        borderRadius: 20,
        marginRight: 14
    }, 
    dialogLeft: {
        //backgroundColor: Colors.green,
        borderColor: Colors.green,
        borderWidth: 1,
        color: 'white',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding:7,
        paddingRight:0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingRight: 8
        
    }, 
    dialogRight: {
        borderColor: Colors.green,
        borderWidth: 1,
        color: 'white',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding:7,
        paddingRight:0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        paddingRight: 10,
        //borderLeftColor: 'red',
        //borderLeftWidth: 30,
    }, 
    dialogRounded: {
        borderColor: Colors.green,
        borderWidth: 1,
        color: 'white',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding:7,
        paddingRight:0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        paddingRight: 10,
        paddingLeft:0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingLeft: 10,
    }, 
    dialogButtonInfo: {
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding:7,
        paddingRight:0,
        borderRadius: 10,
        marginRight: 0, 
        paddingTop: 10,
        paddingBottom: 10
        
    },
    dialogButtonIcon: {
       paddingRight: 8
    },
    favIcon: {
        alignContent:"center",
        alignItems:"center",
        textAlign:"center",
        justifyContent:"center",
    },
    favIcon2: {
        alignContent:"center",
        alignItems:"center",
        textAlign:"center",
        justifyContent:"center",
        fontSize: 20,
        padding: 3,
        color: "white"
    },
    filteredIcon:{
        alignContent:"center",
        alignItems:"center",
        textAlign:"center",
        justifyContent:"center",
        fontSize: 25,
        color:Colors.navBarBackground,
    },
    faviconmenu:{
    },
    touchmenu:{
        //backgroundColor: 'rgba(250, 250, 250, 0.5)',
        paddingEnd: 0,
        right: 0,
        width:80,
        height:50,
        alignItems: 'center',
        justifyContent: "center"
    },
    imageIcon:{
        width:25,
        height:25,
    },
    iconImage:{
        fontSize:20,
    },
    title_flat:{
        ...Fonts.style.h3,
        fontFamily: Fonts.family.base_bold,
        textAlign: 'left'
    },
    flat_multiSelect:{
        width:"100%",
        paddingTop:10,
      
    },
    imageIconFilter:{
        width:60,
        height:60,
    },
    imageIconFilterHo:{
        width:50,
        height:50,
    },
    IconFilterHo:{
        fontSize:42
    },
    column:{
        flex: 1, 
        flexDirection: 'column', 
        margin: 1, 
        alignItems: 'center'
    },
    columnHo1:{
        margin: 1, 
        alignItems: 'center',
        textAlign: 'center',
        width: 100,
        height: 115,
        borderColor: Colors.gray,
        marginBottom: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    columnHo2:{
        margin: 1, 
        alignItems: 'center',
        textAlign: 'center',
        width: 100,
        height: 120,
        borderColor: Colors.gray,
        marginBottom: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    columnSelect:{
        flex: 1, 
        flexDirection: 'column', 
        margin: 1, 
        alignItems: 'center',
        backgroundColor: '#999999'
    },
    columnSelectHo1:{
        flex: 1, 
        flexDirection: 'column', 
        margin: 1, 
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: Colors.green,
        width: 100,
        height: 115,
        borderColor: Colors.gray,
        marginBottom: 10,
        padding: 10,
    },
    columnSelectHo2:{
        flex: 1, 
        flexDirection: 'column', 
        margin: 1, 
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: Colors.green,
        width: 100,
        height: 120,
        borderColor: Colors.gray,
        marginBottom: 10,
        padding: 10,
    },
    view_text:{
        ...Fonts.style.textsmall,
        textAlign: 'center',
        fontFamily: Fonts.family.base_bold,
        lineHeight: 15,
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
    tabSpace: {
        height: 10,
    },
    upButtons:{
        flexDirection: "row",
        width: "100%",
        justifyContent: 'flex-start',
    },
    rightButtons:{
        flexDirection: "row",
        width: "100%",
        justifyContent: 'flex-end',
        marginTop: -85,
        marginBottom: 58,
        //backgroundColor: 'red'
    },
    bottomButtons:{
        flexDirection: "row",
        width: "100%",
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