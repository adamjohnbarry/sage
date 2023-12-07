import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

const PersonButton = ({ photo, firstName, onPress }) => {
	console.log(photo);
	return (
		<Pressable style={styles.personButton} onPress={onPress}>
			<Image source={photo} style={styles.personPhoto} />
			<Text style={styles.personName}>{firstName}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	personButton: {
		alignItems: 'center',
		marginRight: spacing.lgSpacing,
	},
	personPhoto: {
		height: 72,
		aspectRatio: 1 / 1,
		borderRadius: 36,
	},
	personName: {
		color: colors.black,
		fontSize: fontSizes.body,
		marginTop: spacing.smSpacing,
	},
});

export default PersonButton;
