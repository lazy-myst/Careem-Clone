import React, { useState, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import { View, Pressable, Text, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";


function PickUp({ route: { params: { destinationLocation } } }) {

    const [location, setLocation] = useState({
        latitude: 24.8952922,
        longitude: 67.0823298,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
    })
    const [errorMsg, setErrorMsg] = useState(null)
    const destinationCoords = {
        latitude: destinationLocation.latitude,
        longitude: destinationLocation.longitude,
    }
    console.log(location)
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                distanceInterval: 1,
            }, (response) => {
                const { coords: { latitude, longitude } } = response
                setLocation({ ...location, latitude, longitude })
            })
        })();
    }, []);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <MapView
                region={location}
                loadingEnabled={true}
                style={styles.map}
            >
                <Marker
                    coordinate={location}
                    pinColor={'green'}
                />
            </MapView>
            <Pressable
                onPress={() => navigation.navigate('CarSelection', { location: { pickUpCoords: location, destinationCoords: destinationCoords } })}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Confirm Pick Up</Text>
            </Pressable>
        </View>
    );
}

export default PickUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '90%'
    },
    button: {
        backgroundColor: 'green',
        padding: 20,
        marginTop: 10,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
})