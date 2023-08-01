import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Button, FlatList, TouchableOpacity, Pressable, TouchableHighlight } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

function Destination() {

    const [location, setLocation] = useState({
        latitude: 25.0220625,
        longitude: 67.0658978,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    });
    const [placeName, setPlaceName] = useState()
    const [places, setPlaces] = useState([])
    const [errorMsg, setErrorMsg] = useState(null);
    const [locationListView, setLocationListView] = useState(false)

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            setLocation({ ...location, latitude, longitude });


        })();
    }, []);

    useEffect(() => {

        const { latitude, longitude } = location
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq32U4wFZ0SN5h3EiLTQ6+v/ZeuIJgSFnI0cwuhJcs4BQw='
            }
        };

        fetch(`https://api.foursquare.com/v3/places/search?query=${placeName}&ll=${latitude}%2C${longitude}&radius=100000`, options)
            .then(response => response.json())
            .then(response => setPlaces(response.results))
            .catch(err => console.error(err));


    }, [placeName]);

    const selectLocation = ({ latitude, longitude }) => {
        setLocation({ ...location, latitude, longitude })
        console.log(location)
        setLocationListView(false)
    }



    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <MapView
                region={location}
                style={styles.map}
                loadingEnabled={true}
            >
                <Marker
                    coordinate={location}
                    pinColor={'green'}/>
            </MapView>
            <Pressable
                onPress={() => navigation.navigate('PickUp', {destinationLocation: location})}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Select Drop Off</Text>
            </Pressable>
            <TextInput
                style={locationListView ? styles.input : styles.inputUnFocused}
                onChangeText={text => setPlaceName(text)}
                placeholder={'Search'}
                onFocus={() => setLocationListView(true)}
            />
            {locationListView
                &&
                <View style={styles.placesList} >
                    <FlatList
                        data={places}
                        renderItem={({ item }) =>
                            <TouchableHighlight
                            activeOpacity={0.5}
                            underlayColor={'green'}
                            onPress={() => selectLocation(item.geocodes.main)}>
                                <Text style={styles.placesItems}>{item.name}</Text>
                            </TouchableHighlight>
                        }
                    />
                </View>}
        </View>
    );
}
//FourSquare API Key :fsq32U4wFZ0SN5h3EiLTQ6+v/ZeuIJgSFnI0cwuhJcs4BQw=

export default Destination;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '90%',
    },
    input: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'green',
        top: 100,
        backgroundColor: 'white',
        height: 50,
        width: '80%',
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    button: {
        backgroundColor: 'green',
        padding: 20,
        marginTop: 10,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    inputUnFocused: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'green',
        top: 100,
        backgroundColor: 'white',
        height: 50,
        width: '80%',
        paddingHorizontal: 10,
        borderRadius: 10
    },
    placesList: {
        position: 'absolute',
        top: 150,
        backgroundColor: 'white',
        borderWidth: 1,
        maxHeight: 300,
        width: '80%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderLeftColor: 'green',
        borderRightColor: 'green',
        borderBottomColor: 'green',
        borderTopWidth: 0
    },
    placesItems: {
        fontSize: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        paddingHorizontal: 10
    }
});