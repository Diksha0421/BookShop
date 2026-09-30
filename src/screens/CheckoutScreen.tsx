import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useCart} from '../context/CartContext';
import {colors} from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

type PaymentMethod = 'card' | 'cash';

export default function CheckoutScreen() {
  const navigation = useNavigation<Nav>();
  const {total, clearCart} = useCart();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('card');

  const placeOrder = () => {
    if (!name.trim()) {
      Alert.alert('Missing info', 'Please enter your full name.');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Missing info', 'Please enter your address.');
      return;
    }
    Alert.alert('Order placed!', '', [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Custom header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Delivery address */}
        <Text style={styles.sectionTitle}>Delivery address</Text>

        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor={colors.muted}
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor={colors.muted}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Payment */}
        <Text style={[styles.sectionTitle, {marginTop: 24}]}>Payment</Text>

        <RadioOption
          label="Card"
          selected={payment === 'card'}
          onPress={() => setPayment('card')}
        />
        <RadioOption
          label="Cash on delivery"
          selected={payment === 'cash'}
          onPress={() => setPayment('cash')}
        />

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>
      </ScrollView>

      {/* Place order button pinned to bottom */}
      <View style={styles.footer}>
        <Pressable style={styles.orderBtn} onPress={placeOrder}>
          <Text style={styles.orderBtnText}>Place order</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function RadioOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.radioRow, selected && styles.radioRowSelected]}
      onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 56 : 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  backBtn: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },

  /* Scroll content */
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },

  /* Inputs */
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
    marginBottom: 10,
  },

  /* Radio */
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 10,
  },
  radioRowSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },

  /* Total */
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 15,
    color: colors.muted,
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },

  /* Footer */
  footer: {
    padding: 16,
    backgroundColor: colors.background,
  },
  orderBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  orderBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
