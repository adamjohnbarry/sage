import { FontAwesome5 } from '@expo/vector-icons';
import { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LangContext } from '../contexts/Contexts';
import { useUser } from '../contexts/UserContext';
import globalStyles from '../styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../theme/theme';

const Header = ({ navigation, route, safeArea }) => {
	const { lang } = useContext(LangContext);
	const { garden, gardenDaysTimes } = useUser();

	const formatGardenSchedule = (gardenDaysTimes) => {
		console.log('GDT: ', gardenDaysTimes);
		return Object.entries(gardenDaysTimes || {})
			.map(([day, times]) => `${day} from ${times.join(', ')}`)
			.join(', ');
	};

	// Extract garden details or provide default values
	const gardenName = garden?.name || 'My Garden';
	const gardenAddress = garden?.address || '45 University Ave, PA';

	let title = route.name == 'my-garden' ? gardenName : route.params?.title || '';
	let color = route.params?.color || colors.primary;
	let hasBackButton = route.params?.hasBackButton || false;

	return (
		<View style={[globalStyles.header, { paddingTop: safeArea.paddingTop + spacing.lgSpacing, backgroundColor: color }]}>
			{hasBackButton && (
				<View style={globalStyles.headerNavigation}>
					<Pressable style={globalStyles.headerBack} onPress={() => navigation.goBack()}>
						<FontAwesome5 name='long-arrow-alt-left' size={fontSizes.h3} color={colors.black} />
						<Text style={[globalStyles.fontBold, { fontSize: fontSizes.body }]}>{lang.button.back}</Text>
					</Pressable>
				</View>
			)}
			<View style={globalStyles.headerBody}>
				<Text style={globalStyles.h1}>{title}</Text>
				{gardenAddress && route.name === 'my-garden' && (
					<Text style={globalStyles.body}>
						Meets at <Text style={globalStyles.subtitle}>{gardenAddress}</Text>
						{gardenDaysTimes && (
							<Text>
								{' '}
								on <Text style={globalStyles.subtitle}>{formatGardenSchedule(gardenDaysTimes)}</Text>
							</Text>
						)}
					</Text>
				)}
			</View>
		</View>
	);
};

export default Header;
