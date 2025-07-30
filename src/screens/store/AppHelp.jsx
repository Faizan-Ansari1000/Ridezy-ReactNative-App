import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FAIcon from "../../components/FAIcon";

export default function AppHelp() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FAIcon name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sections = [
    {
      title: "Account Creation",
      points: [
        "Open the Ridezy app and go to the signup page.",
        "Fill in your name, email, and a strong password.",
      ],
    },
    {
      title: "Logging In",
      points: [
        "After account approval, go to the Profile screen.",
        "Enter your valid details and tap 'Save' to access your driver dashboard.",
      ],
    },
    {
      title: "Viewing Ride Requests",
      points: [
        "Once logged in, you’ll see all the latest ride requests.",
        "Each card will show the user’s phone and location.",
      ],
    },
    {
      title: "Approving or Rejecting a Ride",
      points: [
        "Tap the 'Approve' button to accept the ride.",
        "Tap 'Reject' if you’re not available.",
        "A toast will appear to confirm your action.",
      ],
    },
    {
      title: "Starting the Ride",
      points: [
        "After approving, contact the user via phone.",
        "Coordinate pickup and start the ride manually.",
      ],
    },
    {
      title: "Completing a Ride",
      points: [
        "Mark the ride as completed (feature coming soon).",
        "Payment is handled directly between you and the user.",
      ],
    },
    {
      title: "Profile & Settings",
      points: [
        "Access your profile from the drawer menu.",
        "View or update your CNIC, phone number, and address.",
      ],
    },
    {
      title: "App Support",
      points: [
        "For issues or feedback, contact support via the app.",
        "Our team will assist you as soon as possible.",
      ],
    },
  ];

  return (
    <>
      <StatusBar
        // translucent={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Driver Help & Guide</Text>

        {sections.map((section, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.title}>{section.title}</Text>
            {section.points.map((point, i) => (
              <Text key={i} style={styles.point}>• {point}</Text>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>Thanks for using Ridezy 🚗</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#641e16",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  point: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 6,
  },
  footer: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 30,
    color: "#666",
  },
});
