import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import FAIcon from '../../components/FAIcon';

const primaryColor = '#641e16';

export default function About() {
  return (
   <>
   <StatusBar translucent={false} />
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* Header */}
      <Text style={styles.heading}>About Ridezy</Text>
      <Text style={styles.subHeading}>
        Ridezy is your trusted companion for fast, safe, and affordable rides across your city. Built with precision and a user-first approach, we aim to redefine the ride-sharing experience.
      </Text>

      {/* Features */}
      <Text style={styles.sectionTitle}>Key Features</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <FAIcon name="car" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Book instant or scheduled rides anytime</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="credit-card" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Multiple payment options: Cash, Card, Wallet</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="map-marker" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Live ride tracking and driver location updates</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="star" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Rate drivers and view feedback history</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="shield" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Safety-first features with verified drivers</Text>
        </View>
      </View>

      {/* Mission */}
      <Text style={styles.sectionTitle}>Our Mission</Text>
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          At Ridezy, our mission is to make daily commuting simple, transparent, and empowering for everyone — whether you're a passenger looking for comfort or a driver seeking opportunity.
        </Text>
      </View>

      {/* Vision */}
      <Text style={styles.sectionTitle}>Our Vision</Text>
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          We envision a future where every city has a reliable, accessible, and eco-friendly ride option. Through technology and innovation, Ridezy aims to lead this movement.
        </Text>
      </View>

      {/* Team */}
      <Text style={styles.sectionTitle}>Our Team</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <FAIcon name="user" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Faizan Ansari – Founder & Lead Developer</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="users" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Ridezy Crew – Designers, Developers, and Support Team</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="globe" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Remote Team – Working across cities and timezones</Text>
        </View>
      </View>

      {/* App Info */}
      <Text style={styles.sectionTitle}>App Information</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <FAIcon name="mobile" size={18} color={primaryColor} />
          <Text style={styles.rowText}>App Version: 1.0.0</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="calendar" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Last Updated: July 2025</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="android" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Platform: Android (iOS coming soon)</Text>
        </View>
      </View>

      {/* Contact */}
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <FAIcon name="envelope" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Email: support@ridezy.com</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="instagram" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Instagram: @ridezy_official</Text>
        </View>
        <View style={styles.row}>
          <FAIcon name="facebook" size={18} color={primaryColor} />
          <Text style={styles.rowText}>Facebook: facebook.com/ridezy</Text>
        </View>
      </View>
    </ScrollView>
   </>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: primaryColor,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: '#333',
    marginBottom: 25,
    lineHeight: 22,
  },
  sectionTitle: {
    color: '#999',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 20,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rowText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#000',
    flex: 1,
    lineHeight: 20,
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
});
