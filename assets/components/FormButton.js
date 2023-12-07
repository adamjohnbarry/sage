import { Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import globalStyles from '../styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../theme/theme';

const FormButton = ({ emoji, icon, rightIcon, label, onPress }) => {
	return (
		<Pressable onPress={onPress} style={[globalStyles.formInput, styles.formButton]}>
			{icon && <FontAwesome5 name={icon} size={fontSizes.h3} color={colors.black} />}
			<Text style={styles.formButtonText}>
				{emoji && emoji} {label}
			</Text>
			{rightIcon && <FontAwesome5 name={rightIcon} size={fontSizes.h3} color={colors.black} />}
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
		flexGrow: 1,
	},
});

export default FormButton;
