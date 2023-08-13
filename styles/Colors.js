let localData = require("../save data/user-preferences.json");

//Changing the color scheme based on user settings
let colorScheme = {}
if (localData.colorScheme == "SpaceTraders") {
    colorScheme = {
        primaryColor: '#ca8a04',
        primaryColorLight: '#F6B01D',
        primaryColorDark: '#A26E00',

        secondaryColor: '#36393d',
        secondaryColorLight: '#545659',
        secondaryColorDark: '#222529',

        tertiaryColor: '#ddd',
        tertiaryColorLight: '#fff',
        tertiaryColorDark: '#999',

        backgroundColor: '#36393d',
        backgroundColorLight: '#545659',
        backgroundColorDark: '#222529',

        textOverPrimary: '#fff',
        textOverSecondary: '#ca8a04',
        textHyperlinkColor: "#0066cc",
        textErrorColor: "#ddd",
        textValidColor: "#479030",
    }
}
else if (localData.colorScheme == "Nebula") {
    colorScheme = {
        //primaryColor: '#95cad8',
        primaryColor: '#2DB9D3',
        primaryColorLight: '#68CBDE',
        primaryColorDark: '#01677A',

        secondaryColor: '#1be0b1',
        secondaryColorLight: '#70ECCD',
        secondaryColorDark: '#009E76',

        tertiaryColor: '#ddd',
        tertiaryColorLight: '#fff',
        tertiaryColorDark: '#bbb',

        backgroundColor: '#36393d',
        backgroundColorLight: '#545659',
        backgroundColorDark: '#222529',

        textOverPrimary: '#36393d',
        textOverSecondary: '#fff',
        textHyperlinkColor: "#0066cc",
        textErrorColor: "#f00",
        textValidColor: "#479030",
    }
}
else if (localData.colorScheme == "DarkSpace") {
    colorScheme = {
        primaryColor: '#2d6bba',
        primaryColorLight: '#75A1D9',
        primaryColorDark: '#0D53AE',

        secondaryColor: '#8647A6',
        secondaryColorLight: '#A66EC2',
        secondaryColorDark: '#712E93',

        tertiaryColor: '#ddd',
        tertiaryColorLight: '#fff',
        tertiaryColorDark: '#bbb',

        backgroundColor: '#222',
        backgroundColorLight: '#444',
        backgroundColorDark: '#000',

        textOverPrimary: '#fff',
        textOverSecondary: '#ccc',
        textHyperlinkColor: "#0066cc",
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

        backgroundColor: '#36393d',
        backgroundColorLight: '#545659',
        backgroundColorDark: '#222529',

        textOverPrimary: '#fff',
        textOverSecondary: '#ccc',
        textHyperlinkColor: "#0066cc",
        textErrorColor: "#f00",
        textValidColor: "#479030",
    }
}

export default colorScheme;