import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

//Styles
import globalStyles from '../../styles/global-stylesheet';


/**
 * Component displayed on the MapScreen to let users view the entire galactic map and zoom in.
 * Props:
 *  homeLoc: [x,y] coordinate value for the user's home location to display.
 */
export default class InteractiveMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zoom: 0
        }
    }


    zoomAtLocation = function (loc_) {
        //Only zooming in 
        if (this.state.zoom < 4) {
            console.log("Zooming at position " + loc_);
            this.setState(prevState => {
                return ({
                    ...prevState,
                    zoom: prevState.zoom + 1
                })
            })
        }
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <ImageZoom
                    style={styles.imageWrapper}
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').width}
                    imageWidth={Dimensions.get('window').width * (3 ** this.state.zoom)}
                    imageHeight={Dimensions.get('window').width * (3 ** this.state.zoom)}
                    minScale={1}
                    maxScale={10}
                    responderRelease={(moveData) => console.log(moveData)}
                    positionX={0}
                >
                    <Image
                        style={styles.mapImage}
                        resizeMethod={'auto' }
                        source={require('../../assets/images/Milky_Way_Galaxy.jpg')}
                    />

                    {/*=============== Top Row ===============*/}
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '0%', right: '67%', top: '0%', bottom: '67%' }}
                        onPress={() => this.zoomAtLocation("Top Left")}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '33%', right: '33%', top: '0%', bottom: '67%' }}
                        onPress={() => this.zoomAtLocation("Top Center")}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '67%', right: '0%', top: '0%', bottom: '67%' }}
                        onPress={() => this.zoomAtLocation("Top Right")}
                    />


                    {/*=============== Center Row ===============*/}
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '0%', right: '67%', top: '33%', bottom: '33%' }}
                        onPress={() => this.zoomAtLocation("Center Left")}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '33%', right: '33%', top: '33%', bottom: '33%'}}
                        onPress={() => this.zoomAtLocation("Center")}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '67%', right: '0%', top: '33%', bottom: '33%' }}
                        onPress={() => this.zoomAtLocation("Center Right")}
                    />


                    {/*=============== Bottom Row ===============*/}
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '0%', right: '67%', top: '67%', bottom: '0%' }}
                        onPress={() => this.zoomAtLocation("Bottom Left")}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '33%', right: '33%', top: '67%', bottom: '0%' }}
                        onPress={() => this.zoomAtLocation("Bottom Center")}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', left: '67%', right: '0%', top: '67%', bottom: '0%' }}
                        onPress={() => this.zoomAtLocation("Bottom Right")}
                    />
                </ImageZoom>
                <Text>Zoom Out</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: Dimensions.get('window').width,
    },

    imageWrapper: {

    },

    mapImage: {
        width: '100%',
        height: '100%',
    }
})