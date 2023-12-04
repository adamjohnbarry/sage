import { Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors, fontSizes, spacing } from '../theme/theme';

const TabBarButton = ({ icon, text, onPress }) => {
	return (
		<Pressable style={styles.tabBarButton} onPress={onPress}>
			<FontAwesome5 name={icon} size={fontSizes.h2} color={colors.black} />
			<Text style={styles.tabBarLabel}>{text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	tabBarButton: {
		alignItems: 'center',
		gap: spacing.xsSpacing,
	},
	tabBarLabel: {
		justifyContent: 'center',
		fontSize: fontSizes.navigation,
		fontWeight: 'bold',
	},
});

export default TabBarButton;
