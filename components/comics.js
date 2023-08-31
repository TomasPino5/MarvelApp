import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, ScrollView } from 'react-native';
import apiParams from '../config'
import axios from 'axios'

export default function Comics({ listComics }) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { ts, apikey, hash, baseURL } = apiParams;

    useEffect(() => {
        const promisesArray = listComics.map(c => (
          axios.get(c.resourceURI, {
            params: {
              ts,
              apikey,
              hash
            }      
          })
        ));
        
        Promise.all(promisesArray)
          .then(responses => setData(responses.map(r => (
            r?.data?.data?.results[0]
          ))))
          .catch(error => console.error(error))
          .finally(() => setLoading(false));
    
      }, []);

    // const listC = isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : data.map(c => (c.title))

    // const img = isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : data.map(c => (`${c?.thumbnail?.path}.${c.thumbnail.extension}`))

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                data.map((comic, index) => (
                    <View key={index} style={styles.comicContainer}>
                        <Text style={styles.comicTitle}>{comic.title}</Text>
                        <Image
                            source={{ uri: `${comic?.thumbnail?.path}.${comic.thumbnail.extension}` }}
                            style={styles.image}
                        />
                    </View>
                ))
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    comicContainer: {
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10, // Añadir bordes redondeados
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Fondo rojo claro con opacidad
        padding: 10, // Añadir espacio interno al contenedor
        borderWidth: 2, // Añadir un borde de 2 puntos
        borderColor: 'red', 
        maxWidth: 220,
    },
    comicTitle: {
        fontSize: 14,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        maxWidth: '100%',
    },
    image: {
        width: 200,
        height: 300,
        resizeMode: 'cover',
    },
});