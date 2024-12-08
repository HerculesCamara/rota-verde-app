import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Octicons } from "@expo/vector-icons";

export default function BottomTabMenu(){
    return (
        <View style={styles.container}>
            <View style={styles.buttonsWrapper}>
            <Link href="./">
                <Octicons name="location" size={50} color="white" />
            </Link>
            <View>
                <Link href="./">
                    <Octicons name="location" size={50} color="white" />
                </Link>
            </View>
            <Link href="./">
                <Octicons name="location" size={50} color="white" />
            </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#263238',
        padding: 20,
        gap: 10,
        alignItems: 'center',
    },
    buttonsWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row', 
        maxWidth: 280,
    }
})