import { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationObject,
    LocationAccuracy,
} from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Link } from 'expo-router';

export default function Index() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const mapRef = useRef<MapView>(null);
    const [travelTime, setTravelTime] = useState<string>(''); 
    const [isTraveling, setIsTraveling] = useState(false); // Estado para indicar se a viagem foi iniciada

    const [collectLocation] = useState({
        coords: {
            latitude: -16.287964597271472,
            longitude: -48.943877567594626,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        }
    });

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);

            // Solicitar confirmação do usuário para iniciar a viagem
            Alert.alert(
                'Iniciar viagem?',
                'Deseja iniciar a viagem para o ponto de coleta?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Iniciar',
                        onPress: () => {
                            setIsTraveling(true); // Define que a viagem foi iniciada
                            watchUserPosition();
                        },
                    },
                ]
            );
        } else {
            Alert.alert('Permissão Negada', 'Permissão para acessar a localização foi negada.');
        }
    }

    async function watchUserPosition() {
        await watchPositionAsync(
            { accuracy: LocationAccuracy.High, timeInterval: 1000, distanceInterval: 5 },
            (updatedPosition) => {
                setLocation(updatedPosition);
                // Centralizar o mapa na nova posição
                mapRef.current?.animateToRegion({
                    latitude: updatedPosition.coords.latitude,
                    longitude: updatedPosition.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
                if (isTraveling) {
                    checkProximityToDestination(updatedPosition.coords);
                }
            }
        );
    }

    function checkProximityToDestination(currentCoords: { latitude: number; longitude: number }) {
        const distance = calculateDistance(
            currentCoords.latitude,
            currentCoords.longitude,
            collectLocation.coords.latitude,
            collectLocation.coords.longitude
        );

        if (distance < 0.05) { // 50 metros
            Alert.alert('Você chegou!', 'Você chegou ao destino.');
            setIsTraveling(false); // Finaliza a viagem
        }
    }

    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const toRad = (value: number) => (value * Math.PI) / 180;
        const R = 6371; // Raio da Terra em km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Retorna a distância em km
    }

    useEffect(() => {
        requestLocationPermissions();
    }, []);

    return (
        <View style={styles.container}>
            <Link href="/gouvermentHome">Governo</Link>
            <Link href="/addTrash">Cadastrar Lixo</Link>
            {location && (
            <>
                <MapView 
                    ref={mapRef}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    showsUserLocation
                    showsMyLocationButton
                >
                    <MapViewDirections 
                        origin={location.coords}
                        destination={collectLocation.coords}
                        apikey="" // Substitua com sua chave da API
                        onReady={(result) => {
                            setTravelTime(`${Math.round(result.duration)} min`);
                        }}
                        strokeWidth={3}
                        strokeColor="blue"
                    />
                    <Marker 
                        coordinate={{
                            latitude: collectLocation.coords.latitude,
                            longitude: collectLocation.coords.longitude
                        }}
                        title="Ponto de Coleta"
                    />
                </MapView>
                {isTraveling && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Tempo estimado: {travelTime}</Text>
                    </View>
                )}
            </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
