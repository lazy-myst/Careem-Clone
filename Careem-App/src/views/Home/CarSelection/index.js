import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
const { width } = Dimensions.get('window')
import haversine from 'haversine-distance'
import { useNavigation } from "@react-navigation/native";


function CarSelection({ route: { params: { location } } }) {
    const [vehiclesAndFares, setVehiclesAndFares] = useState({})

    const mapRef = useRef();
    const navigation = useNavigation();


    async function fitMap() {
        mapRef.current.fitToCoordinates([location.pickUpCoords, location.destinationCoords], {
            edgePadding: {
                top: 180,
                right: 100,
                bottom: 50,
                left: 100,
            },
        });
    }

    useEffect(() => {
        const pickUpCoords = { latitude: location.pickUpCoords.latitude, longitude: location.pickUpCoords.longitude }
        const destinationCoords = { latitude: location.destinationCoords.latitude, longitude: location.destinationCoords.longitude }
        const distance = Math.round(haversine(pickUpCoords, destinationCoords))

        const bikeFare = Math.round(0.030 * distance)
        const ricksahawFare = Math.round(0.045 * distance)
        const carFare = Math.round(0.060 * distance)
        setVehiclesAndFares({ distance, bikeFare, ricksahawFare, carFare })
        console.log(vehiclesAndFares)
    }, [])
    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: location.pickUpCoords.latitude,
                    longitude: location.pickUpCoords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                ref={mapRef}
                style={styles.map}
                zoomEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                onMapReady={() => fitMap()}
            >
                <Marker
                    coordinate={location.destinationCoords}
                    pinColor={'blue'}
                />
                <Marker
                    coordinate={location.pickUpCoords}
                    pinColor={'blue'}
                />
                <Polyline
                    coordinates={[
                        { latitude: location.pickUpCoords.latitude, longitude: location.pickUpCoords.longitude },
                        { latitude: location.destinationCoords.latitude, longitude: location.destinationCoords.longitude }
                    ]}
                    strokeColor='#000'
                    strokeWidth={2}
                />
            </MapView>
            <View style={styles.selectionAreaContainer}>
                <View style={styles.distanceContainer}>
                    <Text style={styles.distanceText}>Distance : {parseFloat(vehiclesAndFares.distance / 1000).toFixed(2)} Km</Text>
                </View>
                <ScrollView
                    style={styles.selectionArea}
                    horizontal={true}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Summary', { summary: { location, vehicle: 'Bike', fare: vehiclesAndFares.bikeFare, distance: vehiclesAndFares.distance } })}
                        style={styles.itemsContainer}>
                        <View style={styles.items}>
                            <Image
                                source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/high-icon-library/motorcycle-33.png' }}
                                style={styles.itemImages}
                            />
                            <View style={styles.itemsCont}>
                                <Text style={styles.itemText}>{vehiclesAndFares.bikeFare}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Summary', { summary: { location, vehicle: 'Rickshaw', fare: vehiclesAndFares.ricksahawFare, distance: vehiclesAndFares.distance } })}
                        style={styles.itemsContainer}>
                        <View style={styles.items}>
                            <Image
                                source={{ uri: 'https://t4.ftcdn.net/jpg/01/69/32/33/360_F_169323385_aR63Ylrj88W8EhONv0IwAcXn0xIFVCjw.jpg' }}
                                style={styles.itemImages}
                            />
                            <View style={styles.itemsCont}>
                                <Text style={styles.itemText}>{vehiclesAndFares.ricksahawFare}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Summary', { summary: { location, vehicle: 'Car', fare: vehiclesAndFares.carFare, distance: vehiclesAndFares.distance } })}
                        style={styles.itemsContainer}>
                        <View style={styles.items}>
                            <Image
                                source={{ uri: 'https://img.freepik.com/free-vector/modern-blue-urban-adventure-suv-vehicle-illustration_1344-205.jpg' }}
                                style={styles.itemImages}
                            />
                            <View style={styles.itemsCont}>
                                <Text style={styles.itemText}>{vehiclesAndFares.carFare}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View >
    );
}

export default CarSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '70%'
    },
    selectionAreaContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        flex: 1
    },
    distanceContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        height: 70,
    },
    distanceText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    selectionArea: {
        flex: 1
    },
    itemsContainer: {
        flex: 1,
        width: width,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    items: {
        flex: 1,
        paddingHorizontal: 10,
        height: '100%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImages: {
        flex: .5,
        height: 100,
        width: 100,
    },
    itemsCont: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 30,
        fontWeight: 'bold'
    }

})