import { Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import globalStyles from '../styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../theme/theme';

const FormButton = ({ icon, label, onPress }) => {
	return (
		<Pressable onPress={onPress} style={[globalStyles.formInput, styles.formButton]}>
			<FontAwesome5 name={icon} size={fontSizes.h3} color={colors.black} />
			<Text style={styles.formButtonText}>{label}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	formButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.mdSpacing,
	},
	formButtonText: {
		fontSize: fontSizes.body,
	},
});

export default FormButton;
