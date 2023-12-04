import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme/theme';

const Card = ({ children, color = 'darkGreen' }) => {
	return <View style={[styles.card, color === 'darkGreen' && styles.cardGreen, color === 'grey' && styles.cardGrey]}>{children}</View>;
};

const styles = StyleSheet.create({
	card: {
		borderRadius: spacing.borderRadius,
		padding: spacing.lgSpacing,
	},
	cardGreen: {
		backgroundColor: colors.secondary,
	},
	cardGrey: {
		backgroundColor: colors.lightGrey,
	},
});

export default Card;
