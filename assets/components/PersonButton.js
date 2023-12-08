import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

const PersonButton = ({ member, onMemberTap }) => {
	return (
		<Pressable style={styles.personButton} onPress={() => onMemberTap(member)}>
			<Image source={member.photo} style={styles.personPhoto} />
			<Text style={styles.personName}>{member.name.split(' ')[0]}</Text>
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
