import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import neighborhoods from '../../assets/neighborhoodData.json'

export default function GouvermentHome() {
    return (
        <View style={styles.container}>
            <View style={styles.headerButtons}>
                <TouchableOpacity>
                    <Ionicons name="options-outline" size={30}  />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="caretup" size={30} color='blue' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="caretdown" size={30} color='red' />
                </TouchableOpacity>
            </View>
            <View style={styles.neighborhoodWrapper}>
                <FlatList
                    data={neighborhoods}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.bairroItem}>
                        <Text style={styles.bairroNome}>{item.nome}</Text>
                        <Text style={styles.bairroColetas}>
                        {item.porcentagemColetas}% de coletas
                        </Text>
                    </View>
                    )}
                />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: 300,
        justifyContent: 'space-around',
        alignSelf: 'center',
        padding: 10,

    },
    neighborhoodWrapper: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    bairroItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      bairroNome: {
        fontSize: 18,
        fontWeight: '600',
      },
      bairroColetas: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
      },

})