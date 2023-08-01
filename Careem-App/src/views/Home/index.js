import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


function Home() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.homeText}>Home Screen</Text>
            <Pressable
            style={styles.button}
                onPress={() => navigation.navigate('Destination')}
            ><Text style={styles.buttonText}>Book Ride</Text>
            </Pressable>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeText:{
        fontSize:40,
        position:'absolute',
        top: 100
    },
    button:{
        padding: 60,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'green'
    },
    buttonText:{
        fontSize: 20,
        color: 'green'
    }
})