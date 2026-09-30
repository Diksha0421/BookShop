import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {books, Book} from '../data/books';
import {useCart} from '../context/CartContext';
import {colors} from '../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {addToCart, itemCount} = useCart();

  const renderBookItem = ({item}: {item: Book}) => (
    <View style={styles.card}>
      {/* Book Cover */}
      <View style={[styles.bookCover, {backgroundColor: item.color}]}>
        <View style={styles.bookSpineLine} />
        <Text style={styles.bookCoverTitle}>{item.title}</Text>
      </View>

      {/* Book Details */}
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPrice}>₹{item.price}</Text>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => addToCart(item)}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopmate</Text>
          <TouchableOpacity
            style={styles.cartButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Cart')}>
            {/* Cart Icon */}
            <View style={styles.cartIconContainer}>
              <View style={styles.cartBasket} />
              <View style={styles.cartWheelsRow}>
                <View style={styles.cartWheel} />
                <View style={styles.cartWheel} />
              </View>
            </View>

            {/* Badge */}
            {itemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Book List */}
        <FlatList
          data={books}
          keyExtractor={item => item.id}
          renderItem={renderBookItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  cartButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBasket: {
    width: 24,
    height: 16,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  cartWheelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 16,
    marginTop: 3,
  },
  cartWheel: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    backgroundColor: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: colors.accent,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 18,
    gap: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 124,
  },
  bookCover: {
    width: 78,
    height: 102,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    position: 'relative',
  },
  bookSpineLine: {
    position: 'absolute',
    left: 7,
    top: 6,
    bottom: 6,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 1,
  },
  bookCoverTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    marginLeft: 8,
    lineHeight: 15,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 10,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 3,
  },
  bookAuthor: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '500',
    marginBottom: 10,
  },
  bookPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
