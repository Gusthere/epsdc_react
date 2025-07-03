import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MainTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: 'recepcion', label: 'Recepción' },
    { name: 'solicitud', label: 'Solicitud' },
    { name: 'entrega', label: 'Entrega' }, // <-- Añade esta línea
     { name: 'periodo', label: 'Periodo' }, 
  ];

  return (
    <View style={styles.tabsContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          style={[
            styles.tab,
            route.name === tab.name && styles.activeTab
          ]}
          onPress={() => navigation.navigate(tab.name)}
        >
          <Text style={[
            styles.tabText,
            route.name === tab.name && styles.activeTabText
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#5478ff',
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: '#ff4343',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default MainTabs;