import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showCartButton?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showCartButton = true,
  onBackPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <Text style={styles.backIcon} onPress={onBackPress}>←</Text>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightSection}>
        {showCartButton && (
          <Text style={styles.cartIcon}>🛒</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cartIcon: {
    fontSize: 22,
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default Header;
