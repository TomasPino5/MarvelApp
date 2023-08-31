import { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Dimensions, Text, StyleSheet } from 'react-native';
import CharacterCard from './character'
import apiParams from '../config'
import axios from 'axios'
import { Searchbar } from 'react-native-paper';

export default function Home() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isResponsive, setIsResponsive] = useState(true);
    const { ts, apikey, hash, baseURL } = apiParams;

    useEffect(() => {
        // Detectar el modo responsive
        const { width } = Dimensions.get('window');
        if (width > 500) {
            setIsResponsive(false)
        }
    }, []);

    useEffect(() => {
        axios.get(`${baseURL}/v1/public/characters`, {
            params: {
                ts,
                apikey,
                hash
            }
        })
        .then(response => setData(response.data.data.results))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    function searchCharacter() {
        if(search !== '') {
          setLoading(true);
          axios.get(`${baseURL}/v1/public/characters`, {
            params: {
              ts,
              apikey,
              hash,
              nameStartsWith: search
            }
          })
            .then(response => setData(response.data.data.results))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
            setSearch('')
        } else {
            // Si el campo de búsqueda está vacío, obtén todos los personajes
            axios.get(`${baseURL}/v1/public/characters`, {
                params: {
                    ts,
                    apikey,
                    hash
                }
            })
            .then(response => setData(response.data.data.results))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
        }
    }


    return (
        <>
            {!isResponsive ? (
                <View style={styles.responsiveContainer}>
                    <Text style={styles.responsiveText}>
                        Please put the app in responsive mode and reload the page.
                    </Text>
                </View>
            ) :
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
            <Searchbar
                placeholder="Search for character..."
                onChangeText={value => setSearch(value)}
                value={search}
                onIconPress={searchCharacter}
                onSubmitEditing={searchCharacter}
            />
            {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> 
            : (<FlatList
                style={{ flex: 1, marginTop: 20 }}
                data={data}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <CharacterCard 
                        id={item.id}
                        image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`} 
                        name={item.name} />)}
                />)
            }
        </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    responsiveContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    responsiveText: {
        fontSize: 30,
        color: 'red'
    }
})