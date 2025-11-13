import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';

interface AddMenuItemScreenProps {
  navigation: any;
}

const AddMenuItemScreen: React.FC<AddMenuItemScreenProps> = ({ navigation }) => {
  const { addMenuItem, removeMenuItem, menuItems } = useMenu();
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('starter');

  const courses: { label: string; value: Course }[] = [
    { label: 'Starter', value: 'starter' },
    { label: 'Main', value: 'main' },
    { label: 'Dessert', value: 'dessert' },
  ];

  const handleSave = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    addMenuItem({
      name: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: priceValue,
    });

    Alert.alert('Success', 'Menu item added successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setDishName('');
          setDescription('');
          setPrice('');
          setSelectedCourse('starter');
          navigation.goBack();
        },
      },
    ]);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

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
        
        <Text style={styles.title}>Add Menu Item</Text>
        
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/*  The Dish Name Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Dish Name</Text>
          <View style={styles.imagePlaceholders}>
            {[1, 2, 3, 4, 5].map((index) => (
              <View key={index} style={styles.imagePlaceholder}>
                <Text style={styles.imageIcon}>🏔️</Text>
              </View>
            ))}
          </View>
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Enter dish name"
            placeholderTextColor="#999"
          />
        </View>

        {/*  The Description Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter dish description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        {/*  The Price Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/*  The Course Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Course</Text>
          <View style={styles.courseSelector}>
            {courses.map((course) => (
              <TouchableOpacity
                key={course.value}
                style={[
                  styles.courseOption,
                  selectedCourse === course.value && styles.courseOptionSelected,
                ]}
                onPress={() => setSelectedCourse(course.value)}
              >
                <Text
                  style={[
                    styles.courseOptionText,
                    selectedCourse === course.value && styles.courseOptionTextSelected,
                  ]}
                >
                  {course.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/*  Current Menu Items (Remove) */}
        <View style={styles.section}>
          <Text style={styles.label}>Current Menu Items</Text>
          {menuItems.length === 0 ? (
            <Text style={styles.emptyText}>No items yet.</Text>
          ) : (
            menuItems.map((item) => (
              <View key={item.id} style={styles.listRow}>
                <View style={styles.rowLeft}>
                  <Text style={styles.rowName}>{item.name}</Text>
                  <Text style={styles.rowMeta}>{item.course.toUpperCase()} • R{item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    Alert.alert('Remove Item', `Remove "${item.name}" from the menu?`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Remove', style: 'destructive', onPress: () => removeMenuItem(item.id) },
                    ]);
                  }}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/*  The Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
          <Text style={styles.saveButtonIcon}>→→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 22,
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
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 20,
    fontWeight: '900',
    color: '#6366f1',
    marginBottom: 16,
    letterSpacing: 1,
  },
  imagePlaceholders: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  imageIcon: {
    fontSize: 24,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#1f2937',
    fontWeight: '600',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  rowLeft: {
    flex: 1,
    marginRight: 12,
  },
  rowName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  rowMeta: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
  },
  removeButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  courseSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseOption: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  courseOptionSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  courseOptionText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#374151',
  },
  courseOptionTextSelected: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#ec4899',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  saveButtonIcon: {
    color: '#fff',
    fontSize: 14,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#06b6d4',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginLeft: 16,
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default AddMenuItemScreen;
