import React, { Component } from 'react';
import { View } from 'react-native';

//SVG Icons
import NeutronStarIcon from '../../assets/icons/starmap icons/NeutronStar_icon.svg';
import RedStarIcon from '../../assets/icons/starmap icons/RedStar_icon.svg';
import OrangeStarIcon from '../../assets/icons/starmap icons/OrangeStar_icon.svg';
import BlueStarIcon from '../../assets/icons/starmap icons/BlueStar_icon.svg';
import YoungStarIcon from '../../assets/icons/starmap icons/YoungStar_icon.svg';
import WhiteDwarfIcon from '../../assets/icons/starmap icons/WhiteDwarf_icon.svg';
import BlackHoleIcon from '../../assets/icons/starmap icons/BlackHole2_icon.svg';
import HypergiantIcon from '../../assets/icons/starmap icons/Hypergiant_icon.svg';
//import NebulaIcon from '../../assets/icons/starmap icons/Nebula_icon.svg';
//import UnstableIcon from '../../assets/icons/starmap icons/Unstable_icon.svg';
import PlanetIcon from '../../assets/icons/starmap icons/Planet_icon.svg';
import GasGiantIcon from '../../assets/icons/starmap icons/GasGiant_icon.svg';
import MoonIcon from '../../assets/icons/starmap icons/Moon_icon.svg';
import OrbitalStationIcon from '../../assets/icons/starmap icons/OrbitalStation_icon.svg';
import AsteroidFieldIcon from '../../assets/icons/starmap icons/AsteroidField_icon.svg';
import JumpGateIcon from '../../assets/icons/starmap icons/JumpGate2_icon.svg';
import GravityWellIcon from '../../assets/icons/starmap icons/GravityWell_icon.svg';
import DiamondIcon from '../../assets/icons/starmap icons/Diamond_icon.svg';


/**
 * Component displayed on the WaypointsMapScreen to render the correct SVG icon based on the given celestial body.
 * Props:
 *  typeName_: String for the type of celestial body to render.
 *  pixelSize_: Optional number for the size of the icon.
 *  style: Optional additional styles
 */
export default class DynamicMapIcon extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * Method to return the correct SVG icon based on which celestial body this icon represents.
     */
    getIcon = function () {
        let size = 0;
        switch (this.props.typeName_) {
            //=============== System Icons ===============
            case "NEUTRON_STAR":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 25);
                return (<NeutronStarIcon height={size} width={size} style={this.props.style} />);
            case "RED_STAR":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 60);
                return (<RedStarIcon height={size} width={size} style={this.props.style} />);
            case "ORANGE_STAR":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 50);
                return (<OrangeStarIcon height={size} width={size} style={this.props.style} />);
            case "BLUE_STAR":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 55);
                return (<BlueStarIcon height={size} width={size} style={this.props.style} />);
            case "YOUNG_STAR":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 40);
                return (<YoungStarIcon height={size} width={size} style={this.props.style} />);
            case "WHITE_DWARF":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 33);
                return (<WhiteDwarfIcon height={size} width={size} style={this.props.style} />);
            case "BLACK_HOLE":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 60);
                return (<BlackHoleIcon height={size} width={size} style={this.props.style} />);
            case "HYPERGIANT":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 80);
                return (<HypergiantIcon height={size} width={size} style={this.props.style} />);
            /*case "NEBULA":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 30);
                return (<NebulaIcon height={size} width={size} style={this.props.style} />);
            case "UNSTABLE":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 30);
                return (<UnstableIcon height={size} width={size} style={this.props.style} />);*/


            //=============== Waypoint Icons ===============
            case "PLANET":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 20);
                return (<PlanetIcon height={size} width={size} style={this.props.style} />);
            case "GAS_GIANT":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 30);
                return (<GasGiantIcon height={size} width={size} style={this.props.style} />);
            case "MOON":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 12);
                return (<MoonIcon height={size} width={size} style={this.props.style} />);
            case "ORBITAL_STATION":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 15);
                return (<OrbitalStationIcon height={size} width={size} style={this.props.style} />);
            case "JUMP_GATE":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 20);
                return (<JumpGateIcon height={size} width={size} style={this.props.style} />);
            case "ASTEROID_FIELD":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 15);
                return (<AsteroidFieldIcon height={size} width={size} style={this.props.style} />);
            /*case "DEBRIS_FIELD":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 20);
                return (<DebrisFieldIcon height={size} width={size} style={this.props.style} />);*/
            case "GRAVITY_WELL":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 30);
                return (<GravityWellIcon height={size} width={size} style={this.props.style} />);
            case "None":
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 15);
                return (<View style={[{height: size, width: size}, this.props.style]} />);
            default:
                size = (this.props.pixelSize_ ? this.props.pixelSize_ : 15);
                return (<DiamondIcon height={size} width={size} style={this.props.style} />);
        }
    }


    render() {
        return (
            this.getIcon()
        );
    }
}