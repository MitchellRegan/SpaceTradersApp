const localData = require("../user-preferences.json");

//Changing the color scheme based on user settings
let colorScheme = {}
if (localData.colorScheme == "darkOrange") {
    colorScheme = {
        primaryColor: '#ca8a04',
        primaryColorLight: '#e9c14b',
        primaryColorDark: '#f2994a',

        secondaryColor: '#36393d',
        secondaryColorLight: '#545659',
        secondaryColorDark: '#222529',

        tertiaryColor: '#ddd',
        tertiaryColorLight: '#fff',
        tertiaryColorDark: '#bbb',

        textDefaultColor1: "#000",
        textHyperlinkColor: "#00f",
        textErrorColor: "#f00",
        textValidColor: "#479030",
    }
}
else {
    colorScheme = {
        primaryColor: '#ca8a04',
        primaryColorLight: '#e9c14b',
        primaryColorDark: '#f2994a',

        secondaryColor: '#36393d',
        secondaryColorLight: '#545659',
        secondaryColorDark: '#222529',

        tertiaryColor: '#ddd',
        tertiaryColorLight: '#fff',
        tertiaryColorDark: '#bbb',

        textDefaultColor1: "#000",
        textHyperlinkColor: "#00f",
        textErrorColor: "#f00",
        textValidColor: "#479030",
    }
}

export default colorScheme;