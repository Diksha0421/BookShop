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
import {useCart} from '../context/CartContext';
import {colors} from '../theme';
import {Book} from '../data/books';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;
type CartItem = Book & {qty: number};

export default function CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {items, increase, decrease, total} = useCart();

  const renderCartItem = ({item}: {item: CartItem}) => (
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
        <Text style={styles.bookPrice}>₹{item.price}</Text>

        {/* Quantity Controls */}
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyButtonMinus}
            activeOpacity={0.7}
            onPress={() => decrease(item.id)}>
            <Text style={styles.qtyMinusText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.qty}</Text>
          <TouchableOpacity
            style={styles.qtyButtonPlus}
            activeOpacity={0.7}
            onPress={() => increase(item.id)}>
            <Text style={styles.qtyPlusText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My cart</Text>
        </View>

        {/* Content */}
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <FlatList
              data={items}
              keyExtractor={item => item.id}
              renderItem={renderCartItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalAmount}>₹{total}</Text>
                </View>
              }
            />

            {/* Checkout Button */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.checkoutButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    paddingRight: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 32,
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.muted,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 18,
    gap: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
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
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  bookPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 10,
  },
  qtyButtonMinus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: '#F7F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyMinusText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 18,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    minWidth: 14,
    textAlign: 'center',
  },
  qtyButtonPlus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyPlusText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 2,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.muted,
  },
  totalAmount: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 24,
    paddingTop: 12,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
