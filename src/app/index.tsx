import { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { View, Text, StyleSheet } from 'react-native';
import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
import { Link } from 'expo-router';
export default function Index() {
    const [location, setLocation] = useState<LocationObject | null>(null)
    
    const mapRef = useRef<MapView>(null)

    const [collectLocation, setCollectLocation] = useState({
        coords: {
            latitude: -16.287964597271472, 
            longitude: -48.943877567594626,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        }
    })
    
    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync()
        if (granted) {
            const currentPosition = await getCurrentPositionAsync()
            setLocation(currentPosition)
        }
    }

    useEffect(() => {
        requestLocationPermissions()
    },[])

    /* useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            distanceInterval: 1000,
            timeInterval: 10000,
        }, (response) => {
            setLocation(response)
            mapRef.current?.animateCamera({
                pitch: 70,
                center: response.coords
            })
        })
    }) */

    return (
        <View style={styles.container}>
            <Link href="/gouvermentHome">Governo</Link>
            <Link href="/addTrash">Casdastrar Lixo</Link>
            { location &&
            <MapView 
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
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
                    apikey=''
                />
                <Marker 
                    coordinate={{
                        latitude: collectLocation.coords.latitude,
                        longitude: collectLocation.coords.longitude
                    }}
                />
            </MapView>
            }
        </View>
    )
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
    }

})