import { Pressable, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors, fontSizes, spacing } from '../theme/theme';
import globalStyles from '../styles/GlobalStyles';
import { useUser } from '../contexts/UserContext';

const Header = ({ navigation, route, safeArea }) => {
	const { user, gardenDaysTimes } = useUser();

	const formatGardenSchedule = (gardenDaysTimes) => {
		return Object.entries(gardenDaysTimes || {}).map(([day, times]) => `${day}: ${times.join(', ')}`).join('; ');
	};

	// Extract garden details or provide default values
	const gardenName = user?.garden?.name || 'My Garden';
	const gardenAddress = user?.garden?.address || 'Address not set';

	let title = route.name == 'my-garden' ? gardenName : route.params?.title || '';
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
				<Text style={globalStyles.headerTitle}>{title}</Text>
				{gardenAddress && (route.name === 'my-garden') && (
                    <Text style={globalStyles.headerDescription}>
                        Meets at <Text style={globalStyles.fontBold}>{gardenAddress}</Text> 
                        {gardenDaysTimes && (
                          <Text> on <Text style={globalStyles.fontBold}>{formatGardenSchedule(gardenDaysTimes)}</Text></Text>
                        )}
                    </Text>
                )}
			</View>
		</View>
	);
};

export default Header;
