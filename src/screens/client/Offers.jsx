import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, StatusBar, ScrollView } from 'react-native';

const offersData = [
  {
    id: '1',
    title: '20% Off on First Ride!',
    description: 'Enjoy 20% discount on your first booking through our app. Limited time offer!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1nD3VTbq8qwqEb-ucPB-xit6Pyy2fKZOhTg&s',
    expiry: 'Valid till: July 31, 2025',
  },
  {
    id: '2',
    title: 'Flat Rs. 100 Off for Lahore Users',
    description: 'Special discount for Lahore residents. Apply coupon "LAHORE100".',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX12rTRYazqZZOAKRXQu4fGbhdXWwKJuSQ9Q&s',
    expiry: 'Expires: August 5, 2025',
  },
  {
    id: '3',
    title: 'Refer & Earn',
    description: 'Refer a friend and earn Rs. 150 in your wallet when they complete their first ride.',
    image: 'https://www.shutterstock.com/image-vector/refer-earn-logo-concept-on-600nw-2469326631.jpg',
    expiry: 'No expiry',
  },
  {
    id: '4',
    title: 'Weekend Bonanza',
    description: 'Book rides this weekend and get surprise cashback up to Rs. 200!',
    image: 'https://via.placeholder.com/150/9b59b6/ffffff?text=Weekend+Cashback',
    expiry: 'Valid for: July 27-28 only',
  },
  {
    id: '5',
    title: 'Wallet Top-up Bonus',
    description: 'Add Rs. 500 or more to your wallet and get Rs. 50 bonus instantly.',
    image: 'https://via.placeholder.com/150/f1c40f/000000?text=Top-Up+Bonus',
    expiry: 'Offer ends: July 30, 2025',
  },
];

export default function Offers() {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Exclusive Offers for You</Text>
          {offersData.map((offer) => (
            <View key={offer.id} style={styles.card}>
              <Image source={{ uri: offer.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{offer.title}</Text>
                <Text style={styles.description}>{offer.description}</Text>
                <Text style={styles.expiry}>{offer.expiry}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f9',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#641e16',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },
  expiry: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
});
