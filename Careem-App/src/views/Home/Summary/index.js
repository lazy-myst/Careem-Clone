import { View, StyleSheet, Text, Pressable } from "react-native";

function Summary({ route: { params: { summary } } }) {
    console.log(summary)
    return (
        <View style={styles.container}>
            <Text style={styles.mainText} >Summary Screen</Text>
            <View style={styles.summaryCont}>
                <View style={styles.summaryItems}>
                    <Text style={styles.itemsText}>Distance:</Text>
                    <Text style={styles.itemsText}>{parseFloat(summary.distance / 1000).toFixed(2)} KM</Text>
                </View>
                <View style={styles.summaryItems}>
                    <Text style={styles.itemsText}>Fare:</Text>
                    <Text style={styles.itemsText}>{summary.fare}</Text>
                </View>
                <View style={styles.summaryItems}>
                    <Text style={styles.itemsText}>Vehicle:</Text>
                    <Text style={styles.itemsText}>{summary.vehicle}</Text>
                </View>
                <View style={styles.summaryItems}>
                    <Text style={styles.itemsText}>From:</Text>
                    <Text style={styles.itemsText}>{summary.location.pickUpCoords.latitude},{summary.location.pickUpCoords.longitude}</Text>
                </View>
                <View style={styles.summaryItems}>
                    <Text style={styles.itemsText}>To:</Text>
                    <Text style={styles.itemsText}>{summary.location.destinationCoords.latitude},{summary.location.destinationCoords.longitude}</Text>
                </View>
            </View>
            <Pressable
                style={styles.button}>
                <Text style={styles.btnText}>Confirm</Text>
            </Pressable>
        </View>
    );
}

export default Summary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    mainText: {
        top: 100,
        fontSize: 30,
        fontWeight: 'bold'
    },
    summaryCont: {
        top: 120,
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        borderColor: 'green',
        paddingHorizontal: 10
    },
    summaryItems: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
    },
    itemsText: {
        fontSize: 20,
        flex: 1,
    },
    button: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: 'green',
        borderRadius: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
});