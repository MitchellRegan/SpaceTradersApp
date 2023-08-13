import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

//Styles
import Colors from '../../styles/Colors';
import globalStyles from '../../styles/global-stylesheet';

//Components
import SmallButton from '../shared/SmallButton';
import FrameDetails from './FrameDetails';
import ReactorDetails from './ReactorDetails';
import EngineDetails from './EngineDetails';
import CrewDetails from './CrewDetails';
import ModuleDetails from './ModuleDetails';
import MountDetails from './MountDetails';
import CargoDetails from './CargoDetails';

//SVG Icons
import FrameIcon from '../../assets/icons/ship icons/Frame_icon.svg';
import ReactorIcon from '../../assets/icons/ship icons/Reactor_icon.svg';
import EngineIcon from '../../assets/icons/ship icons/Engine_icon.svg';
import CrewIcon from '../../assets/icons/ship icons/Crew_icon.svg';
import ModuleIcon from '../../assets/icons/ship icons/Module_icon.svg';
import MountsIcon from '../../assets/icons/ship icons/Mounts_icon.svg';
import CargoIcon from '../../assets/icons/ship icons/Cargo_icon.svg';


export default class MenuSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
        }
    }


    render() {
        return (
            <View>
                <View style={styles.iconRow}>
                    <SmallButton
                        onPress={() => this.setState(prevState => { return ({ ...prevState, index: 0 }) })}
                        state={(this.state.index == 0 ? "disabled" : "default")}
                        style={{ flex: 1 }}
                    >
                        <FrameIcon height={35} width={35} style={{ alignSelf: 'center' }} />
                    </SmallButton>

                    <SmallButton
                        onPress={() => this.setState(prevState => { return ({ ...prevState, index: 1 }) })}
                        state={(this.state.index == 1 ? "disabled" : "default")}
                        style={{ flex: 1 }}
                    >
                        <ReactorIcon height={35} width={35} style={{ alignSelf: 'center' }} />
                    </SmallButton>

                    <SmallButton
                        onPress={() => this.setState(prevState => { return ({ ...prevState, index: 2 }) })}
                        state={(this.state.index == 2 ? "disabled" : "default")}
                        style={{ flex: 1 }}
                    >
                        <EngineIcon height={35} width={35} style={{ alignSelf: 'center' }} />
                    </SmallButton>

                    <SmallButton
                        onPress={() => this.setState(prevState => { return ({ ...prevState, index: 3 }) })}
                        state={(this.state.index == 3 ? "disabled" : "default")}
                        style={{ flex: 1}}
                    >
                        <CrewIcon height={35} width={35} style={{alignSelf: 'center'}} />
                    </SmallButton>

                    <SmallButton
                        onPress={() => this.setState(prevState => { return ({ ...prevState, index: 4 }) })}
                        state={(this.state.index == 4 ? "disabled" : "default")}
                        style={{ flex: 1 }}
                    >
                        <ModuleIcon height={35} width={35} style={{ alignSelf: 'center' }} />
                    </SmallButton>

                    <SmallButton
                        onPress={() => this.setState(prevState => { return ({ ...prevState, index: 5 }) })}
                        state={(this.state.index == 5 ? "disabled" : "default")}
                        style={{ flex: 1 }}
                    >
                        <MountsIcon height={35} width={35} style={{ alignSelf: 'center' }} />
                    </SmallButton>

                    <SmallButton
                        onPress={() => this.setState(prevState => { return ({ ...prevState, index: 6 }) })}
                        state={(this.state.index == 6 ? "disabled" : "default")}
                        style={{flex: 1}}
                    >
                        <CargoIcon height={35} width={35} style={{ alignSelf: 'center' }} />
                    </SmallButton>
                </View>

                {(this.state.index == 0) && <FrameDetails frameData={this.props.frameData} />}
                {(this.state.index == 1) && <ReactorDetails reactorData={this.props.reactorData} />}
                {(this.state.index == 2) && <EngineDetails engineData={this.props.engineData} />}
                {(this.state.index == 3) && <CrewDetails crewData={this.props.crewData} />}
                {(this.state.index == 4) && <ModuleDetails moduleData={this.props.moduleData} />}
                {(this.state.index == 5) && <MountDetails mountData={this.props.mountData} />}
                {(this.state.index == 6) && <CargoDetails cargoData={this.props.cargoData} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconRow: {
        flexDirection: 'row'
    }
})