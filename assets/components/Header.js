import { Pressable, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors, fontSizes, spacing } from '../theme/theme';
import globalStyles from '../styles/GlobalStyles';

const Header = ({ navigation, route, safeArea }) => {
	let title = '';
	let description = '';
	let color = colors.primary;
	let hasBackButton = false;
	let address = '';
	let days = '';
	let times = '';

	// if title exists in params, then assign it to title variable
	if (route.params?.title) {
		title = route.params.title;
	}

	// if description exists in params, then assign it to description variable
	if (route.params?.description) {
		description = route.params.description;
	}

	// if color exists in params, then assign it to color variable
	if (route.params?.color) {
		color = route.params.color;
	}

	// if hasBackButton exists in params, then assign it to hasBackButton variable
	if (route.params?.hasBackButton) {
		hasBackButton = route.params.hasBackButton;
	}

	// if address exists in params, then assign it to address variable
	if (route.params?.address) {
		address = route.params.address;
	}

	// if days exists in params, then assign it to days variable
	if (route.params?.days) {
		days = route.params.days;
	}

	// if times exists in params, then assign it to times variable
	if (route.params?.times) {
		times = route.params.times;
	}

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
				{description && <Text style={globalStyles.headerDescription}>{description}</Text>}
				{address && days && times && (
					<Text style={globalStyles.headerDescription}>
						Meets at <Text style={globalStyles.fontBold}>{address}</Text> at <Text style={globalStyles.fontBold}>{times}</Text> on{' '}
						<Text style={globalStyles.fontBold}>{days}</Text>
					</Text>
				)}
			</View>
		</View>
	);
};

export default Header;
