import { Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const AuthenticationHeader = ({ navigation, route, safeArea }) => {
	let index = 0;
	let title = '';
	let description = '';

	// if index exists in params, then assign it to index variable
	if (route.params?.index) {
		index = route.params.index;
	}

	// if title exists in params, then assign it to title variable
	if (route.params?.title) {
		title = route.params.title;
	}

	// if description exists in params, then assign it to description variable
	if (route.params?.description) {
		description = route.params.description;
	}

	return (
		<View style={[globalStyles.header, { paddingTop: safeArea.paddingTop + spacing.lgSpacing }]}>
			<View style={globalStyles.headerNavigation}>
				<Pressable style={globalStyles.headerBack} onPress={() => navigation.goBack()}>
					<FontAwesome5 name='long-arrow-alt-left' size={fontSizes.h3} color={colors.black} />
					<Text style={globalStyles.headerBackText}>Back</Text>
				</Pressable>
				{/* set index to 0 to indicate no progress tracker */}
				{index != 0 && <Text style={globalStyles.headerIndex}>{index} / 7</Text>}
			</View>
			<View style={globalStyles.headerBody}>
				<Text style={globalStyles.headerTitle}>{title}</Text>
				<Text style={globalStyles.headerDescription}>{description}</Text>
			</View>
		</View>
	);
};

export default AuthenticationHeader;
