import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Admin from "../../screens/admin/Admin";
import FAIcon from "../../components/FAIcon";
import SeeDrivers from "../../screens/admin/SeeDrivers";
import Users from "../../screens/admin/Users";
import PostOffer from "../../screens/admin/PostOffer";

export default function AdminTab() {

    const Tab = createBottomTabNavigator();
    
    return (
        <>
            <Tab.Navigator initialRouteName="Admin" screenOptions={{ tabBarActiveTintColor: "#641e16", tabBarInactiveTintColor: "#bdc3c7", tabBarStyle: { height: 60, backgroundColor: "#f8f9f9", }, headerStyle: { backgroundColor: '#eaeded' } }}>
                <Tab.Screen name="Admin" component={Admin} options={{ headerBackButtonDisplayMode: true, headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="admin-panel-settings" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Upload" component={PostOffer} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="campaign" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Drivers" component={SeeDrivers} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="drive-eta" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Users" component={Users} options={{ headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <FAIcon name="group" size={24} color={focused ? "#641e16" : "#bdc3c7"} /> }} />
            </Tab.Navigator>
        </>
    )
}