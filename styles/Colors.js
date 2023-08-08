let localData = require("../save data/user-preferences.json");

//Changing the color scheme based on user settings
let colorScheme = {}
if (localData.colorScheme == "orange") {
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

        textOverPrimary: '#fff',
        textOverSecondary: '#ca8a04',
        textHyperlinkColor: "#00f",
        textErrorColor: "#f00",
        textValidColor: "#479030",
    }
}
else if (localData.colorScheme == "blue") {
    colorScheme = {
        primaryColor: '#95cad8',
        primaryColorLight: '#c0eced',
        primaryColorDark: '#6daec9',

        //secondaryColor: '#545659',
        //secondaryColorLight: '#6E7073',
        //secondaryColorDark: '#222529',

        secondaryColor: '#36393d',
        secondaryColorLight: '#545659',
        secondaryColorDark: '#222529',

        tertiaryColor: '#ddd',
        tertiaryColorLight: '#fff',
        tertiaryColorDark: '#bbb',

        textOverPrimary: '#36393d',
        textOverSecondary: '#fff',
        textHyperlinkColor: "#00f",
        textErrorColor: "#f00",
        textValidColor: "#479030",
    }
}
else if (localData.colorScheme == "green") {
    colorScheme = {
        primaryColor: '#009B22',
        primaryColorLight: '#0EBC34',
        primaryColorDark: '#006316',

        secondaryColor: '#36393d',
        secondaryColorLight: '#545659',
        secondaryColorDark: '#222529',

        tertiaryColor: '#ddd',
        tertiaryColorLight: '#fff',
        tertiaryColorDark: '#bbb',

        textOverPrimary: '#fff',
        textOverSecondary: '#ccc',
        textHyperlinkColor: "#00f",
        textErrorColor: "#f00",
        textValidColor: "#479030",
    }
}

export default colorScheme;