import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useMenu } from '../context/MenuContext';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { getTotalMenuItems, menuItems } = useMenu();
  const totalItems = getTotalMenuItems();
  const latestItems = [...menuItems].slice(-3).reverse();

  const computeAverage = (course: 'starter' | 'main' | 'dessert') => {
    let sum = 0;
    let count = 0;
    for (const item of menuItems) {
      if (item.course === course) {
        sum += item.price;
        count += 1;
      }
    }
    return count === 0 ? 0 : sum / count;
  };

  const avgStarter = computeAverage('starter');
  const avgMain = computeAverage('main');
  const avgDessert = computeAverage('dessert');

  const courses = [
    { name: 'STARTER', course: 'starter' as const, color: '#ec4899' },
    { name: 'MAIN', course: 'main' as const, color: '#6366f1' },
    { name: 'DESSERT', course: 'dessert' as const, color: '#06b6d4' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.title}>MENU</Text>
        
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Items Display */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total Menu Items: {totalItems}
          </Text>
        </View>

        {/* Average Price by Course */}
        <View style={styles.avgContainer}>
          <Text style={styles.avgTitle}>Average Price by Course</Text>
          <View style={styles.avgRow}>
            <Text style={styles.avgLabel}>STARTER</Text>
            <Text style={styles.avgValue}>R{avgStarter.toFixed(2)}</Text>
          </View>
          <View style={styles.avgRow}>
            <Text style={styles.avgLabel}>MAIN</Text>
            <Text style={styles.avgValue}>R{avgMain.toFixed(2)}</Text>
          </View>
          <View style={styles.avgRow}>
            <Text style={styles.avgLabel}>DESSERT</Text>
            <Text style={styles.avgValue}>R{avgDessert.toFixed(2)}</Text>
          </View>
        </View>

        {/* Latest Items */}
        <View style={styles.latestContainer}>
          <View style={styles.latestHeader}>
            <Text style={styles.latestTitle}>Latest Items</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FilterByCourse')}>
              <Text style={styles.seeAllText}>See all →</Text>
            </TouchableOpacity>
          </View>
          {latestItems.map(item => (
            <View key={item.id} style={styles.latestItemRow}>
              <Text style={styles.latestItemName}>{item.name}</Text>
              <Text style={styles.latestItemPrice}>R{item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Course Buttons */}
        <View style={styles.coursesContainer}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.course}
              style={[styles.courseButton, { backgroundColor: course.color }]}
              onPress={() => navigation.navigate('Category', { course: course.course })}
            >
              <Text style={styles.courseButtonText}>{course.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Menu Item Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddMenuItem')}
        >
          <Text style={styles.addButtonText}>+ Add Menu Item</Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity
          style={[styles.filterButton, { marginTop: 12 }]}
          onPress={() => navigation.navigate('FilterByCourse')}
        >
          <Text style={styles.filterButtonText}>Filter by Course</Text>
        </TouchableOpacity>

        {/* All Items (Complete Menu) */}
        <View style={styles.allContainer}>
          <Text style={styles.allTitle}>All Items</Text>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.allRow}>
              <View style={styles.allLeft}>
                <Text style={styles.allName}>{item.name}</Text>
                <Text style={styles.allMeta}>{item.course.toUpperCase()}</Text>
              </View>
              <Text style={styles.allPrice}>R{item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  menuButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  hamburger: {
    width: 22,
    height: 16,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
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
  totalContainer: {
    padding: 28,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  totalText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#6366f1',
    letterSpacing: 0.5,
  },
  coursesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  courseButton: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  courseButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  addButton: {
    backgroundColor: '#ec4899',
    paddingVertical: 16,
    marginHorizontal: 24,
    marginVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  filterButton: {
    backgroundColor: '#06b6d4',
    paddingVertical: 16,
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  latestContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  latestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  latestTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#06b6d4',
  },
  latestItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  latestItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  latestItemPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ec4899',
  },
  avgContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avgTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  avgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  avgLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6b7280',
  },
  avgValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#6366f1',
  },
  allContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  allTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  allRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  allLeft: {
    flex: 1,
    marginRight: 12,
  },
  allName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  allMeta: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
  },
  allPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ec4899',
  },
});

export default HomeScreen;
