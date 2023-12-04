import { Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors, fontSizes, spacing } from '../theme/theme';

const SettingsButton = ({ text, onPress }) => {
	return (
		<Pressable style={styles.settingsButton} onPress={onPress}>
			<Text style={styles.settingsButtonText}>{text}</Text>
			<FontAwesome5 name='chevron-right' size={fontSizes.h3} color={colors.black} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	settingsButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: spacing.xlSpacing,
		borderBottomWidth: 1,
		borderBottomColor: colors.lightGrey,
	},
	settingsButtonText: {
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
});

export default SettingsButton;
