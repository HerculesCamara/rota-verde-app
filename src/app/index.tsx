import { Link } from 'expo-router';
import { View, Text, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native';
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from 'react-native-linear-gradient';
import BottomTabMenu from '@/components/bottomTabMenu';

export default function Index() {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>PROCURAR COLETA?</Text>
                    <TouchableOpacity style={styles.searchRoute}>
                        <Link href="/navigationRoutesMap">
                            <Octicons name="search" size={60} />
                        </Link>
                        <Text style={styles.label}>Sim</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomTabMenu />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#50B154',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    searchRoute: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 10,
        borderColor: '#045630',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    }
});
