import { Pressable, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors, fontSizes, spacing } from '../theme/theme';
import globalStyles from '../styles/GlobalStyles';
import { useUser } from '../contexts/UserContext';

const Header = ({ navigation, route, safeArea }) => {
	const { user } = useUser();

	// Extract garden details or provide default values
	const gardenName = user?.garden?.name || 'My Garden';
	const gardenAddress = user?.garden?.address || 'Address not set';
	const gardenDays = user?.garden?.days || 'No days set';
	const gardenTimes = user?.garden?.times || 'No times set';

	let title = route.params?.title || '';
	let description = route.params?.description || '';
	let color = route.params?.color || colors.primary;
	let hasBackButton = route.params?.hasBackButton || false;

	return (
		<View style={[globalStyles.header, { paddingTop: safeArea.paddingTop + spacing.lgSpacing, backgroundColor: color }]}>
			{hasBackButton && (
				<View style={globalStyles.headerNavigation}>
					<Pressable style={globalStyles.headerBack} onPress={() => navigation.goBack()}>
						<FontAwesome5 name='long-arrow-alt-left' size={fontSizes.h3} color={colors.black} />
						<Text style={globalStyles.headerBackText}>Back</Text>
					</Pressable>
				</View>
			)}
			<View style={globalStyles.headerBody}>
				<Text style={globalStyles.headerTitle}>{gardenName}</Text>
				{description && <Text style={globalStyles.headerDescription}>{description}</Text>}
				{gardenAddress && gardenDays && gardenTimes && (
					<Text style={globalStyles.headerDescription}>
						Meets at <Text style={globalStyles.fontBold}>{gardenAddress}</Text> at <Text style={globalStyles.fontBold}>{gardenTimes}</Text> on{' '}
						<Text style={globalStyles.fontBold}>{gardenDays}</Text>
					</Text>
				)}
			</View>
		</View>
	);
};

export default Header;
