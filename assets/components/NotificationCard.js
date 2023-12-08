import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme'; // Adjust the import path as needed

const NotificationCard = ({ message, onClose }) => {
	return (
		<View style={styles.card}>
			<Text style={styles.message}>{message}</Text>
			<Pressable onPress={onClose} style={styles.closeButton}>
				<FontAwesome5 name='times' size={spacing.mdSpacing} color={colors.black} />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.sunrise, // Replace with your actual color code
		borderRadius: spacing.mdSpacing,
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'start',
		marginTop: spacing.mdSpacing,
	},
	message: {
		fontSize: fontSizes.body,
		color: colors.black, // Replace with your actual color code
		flex: 1,
	},
	closeButton: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		borderRadius: 100,
		width: 24,
		height: 24,
		marginLeft: spacing.smSpacing,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default NotificationCard;
