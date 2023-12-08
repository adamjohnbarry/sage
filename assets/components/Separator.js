import { StyleSheet, Text, View } from 'react-native';
import { fontSizes, spacing } from '../theme/theme';
import globalStyles from '../styles/GlobalStyles';

const Separator = ({ text, color = 'black', marginBottom }) => {
	return (
		<View style={[styles.separator, marginBottom && { marginBottom: spacing.xlSpacing }]}>
			<View style={[styles.separatorLine, { borderColor: color }]} />
			{text && <Text style={[globalStyles.subtitle, { color }]}>{text}</Text>}
			{text && <View style={[styles.separatorLine, { borderColor: color }]} />}
		</View>
	);
};

const styles = StyleSheet.create({
	separator: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: spacing.mdSpacing,
		marginHorizontal: spacing.xlSpacing,
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
