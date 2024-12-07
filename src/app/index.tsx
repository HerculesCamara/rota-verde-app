import { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location'
export default function Index() {
    const [location, setLocation] = useState<LocationObject | null>(null)
    
    const mapRef = useRef<MapView>(null)
    
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

    useEffect(() => {
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
    })

    return (
        <View style={styles.container}>
            { location &&
            <MapView 
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                showsUserLocation
                showsMyLocationButton
            >
                <Marker 
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
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