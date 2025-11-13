import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { formatPrice } from '../utils/format';
import { Course } from '../types';

interface CategoryScreenProps {
  navigation: any;
  route: {
    params: {
      course: Course;
    };
  };
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route }) => {
  const { course } = route.params;
  const { getMenuItemsByCourse } = useMenu();
  const menuItems = getMenuItemsByCourse(course);

  const courseNames = {
    starter: 'STARTER',
    main: 'MAIN',
    dessert: 'DESSERT',
  };

  const renderMenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageIcon}>🍽️</Text>
        </View>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name.toUpperCase()}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>{formatPrice(item.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>{courseNames[course]}</Text>
        
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items List */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.bottomBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.bottomBackText}>BACK</Text>
        <Text style={styles.bottomBackIcon}>←</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#1f2937',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  backButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cartButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cartIcon: {
    fontSize: 22,
    color: '#fff',
  },
  listContainer: {
    padding: 24,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  imageIcon: {
    fontSize: 32,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#6366f1',
    marginBottom: 8,
    letterSpacing: 1,
  },
  menuItemDescription: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
    lineHeight: 22,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ec4899',
  },
  bottomBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#06b6d4',
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 18,
    marginHorizontal: 24,
    marginBottom: 32,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  bottomBackText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomBackIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
});

export default CategoryScreen;
