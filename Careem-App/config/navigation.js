import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../src/views/Home'
import ProfileScreen from '../src/views/Profile'
import ActivitiesScreen from '../src/views/Activities'
import HelpScreen from '../src/views/Help'
import PickUpScreen from '../src/views/Home/PickUp'
import SummaryScreen from '../src/views/Home/Summary'
import CarSelectionScreen from '../src/views/Home/CarSelection'
import DestinationScreen from '../src/views/Home/Destination'

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Main' component={TabNavigator} />
                <Stack.Screen name='PickUp' component={PickUpScreen} />
                <Stack.Screen name='Destination' component={DestinationScreen} />
                <Stack.Screen name='CarSelection' component={CarSelectionScreen} />
                <Stack.Screen name='Summary' component={SummaryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Help' component={HelpScreen} />
            <Tab.Screen name='Activities' component={ActivitiesScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
}