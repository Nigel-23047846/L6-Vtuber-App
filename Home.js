import React from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from "./Data.js";

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        margin: 5,
        borderRadius: 5,
        padding: 5,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF',
        padding: 10,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTextContainer: {
        flex: 1,
    },
});

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => {
                navigation.navigate('Edit', {
                    index,
                    company: section.company,
                    name: item.name,
                    description: item.description,
                    image: item.image,
                });
            }}
        >
            <View style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemTextContainer}>
                    <Text style={styles.textStyle}>{item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section: { company, bgColor } }) => (
        <Text style={[styles.headerText, { backgroundColor: bgColor }]}>{company}</Text>
    );

    return (
        <View>
            <StatusBar />
            <Button title="Add Vtuber" onPress={() => navigation.navigate('Add')} />
            <SectionList
                sections={datasource}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </View>
    );
};

export default Home;
