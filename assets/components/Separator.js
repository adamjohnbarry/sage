import { StyleSheet, Text, View } from 'react-native';
import { fontSizes, spacing } from '../theme/theme';

const Separator = ({ text, color = 'black' }) => {
	return (
		<View style={styles.separator}>
			<View style={[styles.separatorLine, { borderColor: color }]} />
			{text && <Text style={[styles.separatorText, { color }]}>{text}</Text>}
			{text && <View style={[styles.separatorLine, { borderColor: color }]} />}
		</View>
	);
};

const styles = StyleSheet.create({
	separator: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: spacing.lgSpacing,
	},
	separatorLine: {
		flex: 1,
		borderWidth: 1,
		borderStyle: 'solid',
	},
	separatorText: {
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
});

export default Separator;
