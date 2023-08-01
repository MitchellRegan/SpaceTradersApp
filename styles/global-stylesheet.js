'use strict';
import { StyleSheet } from 'react-native';

import Fonts from './Fonts';
import Colors from './Colors';

module.exports = StyleSheet.create({
    /*============================== Text ==============================*/
    header1Text: {
        fontFamily: Fonts.monospace,
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    header2Text: {
        fontFamily: Fonts.monospace,
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    defaultText: {
        fontFamily: Fonts.monospace,
        fontSize: 14,
    },

    smallText: {
        fontFamily: Fonts.monospace,
        fontSize: 12,
    },

    textList: {
        fontFamily: Fonts.monospace,
        fontSize: 14,
        paddingLeft: 20,
    },

    textListSmall: {
        fontFamily: Fonts.monospace,
        fontSize: 12,
        paddingLeft: 30,
    },

    invalidText: {
        fontFamily: Fonts.monospoace,
        marginTop: 5,
        textAlign: 'center',
        color: Colors.textErrorColor,
    },

    hyperlinkText: {
        fontSize: 15,
        color: Colors.textHyperlinkColor,
        fontFamily: Fonts.monospace,
        padding: 7,
    },

    /*============================== Buttons ==============================*/
    bigButton: {
        backgroundColor: Colors.button1Color,
        borderRadius: 5,
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 15,
        alignSelf: 'center',
    },

    bigButtonText: {
        color: Colors.button1TextColor,
        fontSize: 20,
        fontFamily: Fonts.monospace,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingRight: 20,
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
        fontFamily: Fonts.monospace,
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
        fontFamily: Fonts.monospace,
        fontWeight: "bold",
        paddingLeft: 5,
        paddingRight: 5,
    },

    /*============================== List Views ==============================*/
    listViewWrapper1: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        padding: 5,
    },

    listViewWrapper2: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderTopWidth: 1,
        borderTopColor: '#bbb',
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