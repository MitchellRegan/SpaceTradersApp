'use strict';
import { StyleSheet } from 'react-native';

import Fonts from './Fonts';
import Colors from './Colors';

module.exports = StyleSheet.create({
    /*============================== Text ==============================*/
    header1Text: {
        color: Colors.primaryColor,
        fontFamily: Fonts.tekturBold,
        fontSize: 34,
        paddingBottom: 5,
    },

    header2Text: {
        fontFamily: Fonts.tekturBold,
        fontSize: 18,
        paddingBottom: 5,
    },

    header3Text: {
        fontFamily: Fonts.tektur,
        fontSize: 15,
        paddingBottom: 5,
    },

    defaultText: {
        fontFamily: Fonts.tektur,
        fontSize: 14,
    },

    smallText: {
        fontFamily: Fonts.tektur,
        fontSize: 12,
    },

    textListLarge: {
        fontFamily: Fonts.tekturBold,
        fontSize: 16,
        color: Colors.primaryColor,
    },

    textList: {
        fontFamily: Fonts.tektur,
        fontSize: 14,
        color: Colors.primaryColor,
    },

    textListSmall: {
        fontFamily: Fonts.tektur,
        fontSize: 12,
        color: Colors.primaryColor,
    },

    invalidText: {
        fontFamily: Fonts.tektur,
        fontSize: 12,
        textAlign: 'center',
        color: Colors.textErrorColor,
    },

    hyperlinkText: {
        fontSize: 15,
        color: Colors.textHyperlinkColor,
        fontFamily: Fonts.tektur,
    },

    /*============================== Buttons ==============================*/
    bigButton1: {
        backgroundColor: Colors.button1Color,
        borderColor: Colors.primaryColor,
        borderWidth: 4,
        borderRadius: 50,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        alignSelf: 'center',
    },

    bigButton1Text: {
        color: Colors.button1TextColor,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.tektur,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 190,
    },

    bigButton2: {
        //backgroundColor: Colors.button2Color,
        borderColor: Colors.primaryColorDark,
        borderWidth: 4,
        borderRadius: 50,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        alignSelf: 'center',
    },

    bigButton2Text: {
        color: Colors.button2TextColor,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.tektur,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 190,
    },

    drawerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },

    drawerButtonText: {
        fontFamily: Fonts.tektur,
        fontSize: 18,
        paddingLeft: 15,
        textAlign: 'center',
    },

    acceptButton: {
        backgroundColor: Colors.textValidColor,
        borderRadius: 5,
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        marginTop: 3,
        alignSelf: 'center',
    },

    acceptButtonText: {
        color: Colors.button1TextColor,
        fontSize: 14,
        fontFamily: Fonts.tekturBold,
        paddingLeft: 5,
        paddingRight: 5,
    },

    traitButton: {
        borderColor: '#88',
        borderRadius: 3,
        borderWidth: 1,
        backgroundColor: '#fff',
        marginLeft: 1,
        marginRight: 1,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },

    traitButtonText: {
        color: '#888',
        fontFamily: Fonts.tektur,
        fontSize: 11,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 3,
        paddingRight: 3,
    },

    /*============================== Views ==============================*/
    screenWrapperView: {
        flex: 1,
        backgroundColor: Colors.secondaryColor
    },

    textInputView: {
        flexDirection: 'row',
        alignSelf: 'center',
        margin: 4,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: Colors.primaryColor,
        borderWidth: 3,
        borderRadius: 10,
    },

    /*============================== List Views ==============================*/
    listViewWrapper1: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },

    listViewWrapper2: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
    },

    traitListView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 3,
        paddingRight: 3,
    },

    /*============================== Page Break Views ==============================*/
    pageBreak: {
        height: 3,
        width: '85%',
        alignSelf: 'center',
        margin: 5,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderColor: Colors.button1Color,
        backgroundColor: Colors.button1Color,
        borderWidth: 1,
    },
});