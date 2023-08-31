import * as React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CharacterCard({id, image, name}) {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => navigation.navigate('Detail', { id })}
        >
			<Image 
				style={styles.image}
				source={image}
			/>
            <Text style={styles.font}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    font: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});