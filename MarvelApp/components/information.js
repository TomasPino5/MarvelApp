import { Text, View, Image, StyleSheet } from 'react-native'

export default function Information({ image, name, description }) {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{uri: image}}
            />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description ? description : 'Without description'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300, // You can adjust the height as needed
        resizeMode: 'cover', // This will make sure the image covers the entire space
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'center',
    },
})