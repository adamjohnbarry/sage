import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme/theme';
import globalStyles from '../styles/GlobalStyles';

export const RadioButton = ({ label, value, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.radioCircle}>
        {checked ? <View style={styles.selectedRb} /> : null}
      </View>
      <Text style={globalStyles.body}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.mdSpacing,
  },
  radioText: {
    marginLeft: 6,
    fontSize: 16,
    color: colors.black,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: spacing.smSpacing,
    paddingTop: 1,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
});
