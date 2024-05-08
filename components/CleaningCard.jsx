import { StyleSheet, View, Text } from 'react-native'
import { useEffect, useState } from 'react';
import { Link } from 'expo-router'
const pending = require("../assets/pending.png")
const completed = require("../assets/completed.png")


const CleaningCard = () => {



    return (
        <View style={styles.container}>
            <Text style={styles.labelTxt}>Today’s Cleaning</Text>
            <View style={styles.card}>
                <View>
                    <Text style={styles.cleaningStatusTxt}>Cleaning Pending - </Text>
                    <Link href="/">
                        <Text>Go to Login</Text>
                    </Link>
                </View>
            </View>
        </View>
    )
}

export default CleaningCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 16,
        backgroundColor: '#ffffff',
        gap: 20,
    },
    labelTxt: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 20,
    },
    cleaningStatusTxt: {
        fontSize: 18,
        fontWeight: 'medium',
    }
})