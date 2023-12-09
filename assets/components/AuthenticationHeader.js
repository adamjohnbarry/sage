import { FontAwesome5 } from '@expo/vector-icons';
import { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LangContext } from '../contexts/Contexts';
import globalStyles from '../styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../theme/theme';

const AuthenticationHeader = ({ navigation, route, safeArea }) => {
	let index = route.params?.index || 0;
	let title = route.params?.title || '';
	let description = route.params?.description || '';

	const { lang } = useContext(LangContext);

	return (
		<View style={[globalStyles.header, { paddingTop: safeArea.paddingTop + spacing.lgSpacing }]}>
			<View style={globalStyles.headerNavigation}>
				<Pressable style={globalStyles.headerBack} onPress={() => navigation.goBack()}>
					<FontAwesome5 name='long-arrow-alt-left' size={fontSizes.h3} color={colors.black} />
					<Text style={[globalStyles.fontBold, { fontSize: fontSizes.body }]}>{lang.button.back}</Text>
				</Pressable>
				{/* Show progress index if not equal to 0 */}
				{index !== 0 && <Text style={globalStyles.headerIndex}>{index} / 7</Text>}
			</View>
			<View style={globalStyles.headerBody}>
				<Text style={[globalStyles.fontBold, { fontSize: fontSizes.h1 }]}>{title}</Text>
				<Text style={[globalStyles.body, { fontSize: fontSizes.body }]}>{description}</Text>
			</View>
		</View>
	);
};

export default AuthenticationHeader;
