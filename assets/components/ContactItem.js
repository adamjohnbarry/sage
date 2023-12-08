import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

const ContactItem = ({ firstName, lastName }) => {
	const [pressed, setPressed] = useState(false);

	return (
		<Pressable style={[styles.contactItem, pressed && styles.contactItemPressed]} onPress={() => setPressed((prevState) => !prevState)}>
			<View style={styles.contactItemInitials}>
				<Text style={styles.contactItemInitialsText}>
					{firstName && firstName[0]}
					{lastName && lastName[0]}
				</Text>
			</View>
			<Text style={styles.contactItemName}>
				{firstName && firstName} {lastName && lastName}
			</Text>
			{pressed == true && <FontAwesome5 name='check-circle' size={fontSizes.h3} color={colors.black} />}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	contactItem: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: spacing.borderRadius,
		gap: spacing.smSpacing,
		padding: spacing.mdSpacing,
	},
	contactItemPressed: {
		backgroundColor: colors.lightGrey,
	},
	contactItemInitials: {
		width: 40,
		aspectRatio: 1 / 1,
		borderRadius: 20,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contactItemInitialsText: {
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
	contactItemName: {
		flex: 1,
		fontSize: fontSizes.body,
	},
});

export default ContactItem;
