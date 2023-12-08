import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../assets/components/Button';
import ButtonGroup from '../assets/components/ButtonGroup';
import { LangContext, SafeAreaContext } from '../assets/contexts/Contexts';
import LoginScreenImage from '../assets/images/login-screen.png';
import SageLogo from '../assets/images/sage-white.png';
import globalStyles from '../assets/styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../assets/theme/theme';

const Root = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	return (
		<View style={[globalStyles.containerFlex]}>
			<ImageBackground source={LoginScreenImage} resizeMode='cover' style={globalStyles.backgroundImage}>
				<View style={[globalStyles.containerMarginHorizontal, globalStyles.containerFlex, safeArea]}>
					<View style={styles.headerContainer}>
						<Image source={SageLogo} />
					</View>
					<View style={styles.bodyContainer}>
						<Text style={styles.tagline}>{lang.auth.initial.title}</Text>
						<Text style={styles.description}>{lang.auth.initial.description}</Text>
					</View>
					<ButtonGroup>
						<Button
							text={lang.button.createAccount}
							color='green'
							onPress={() =>
								router.push({
									pathname: '/auth/congratulations',
									params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
								})
							}
						/>
						<Button
							text={lang.button.login}
							onPress={() =>
								router.push({
									pathname: '/auth/login',
									params: { index: 0, title: lang.auth.login.title, description: lang.auth.login.description },
								})
							}
						/>
					</ButtonGroup>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: spacing.lgSpacing,
		alignItems: 'center',
	},
	bodyContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		gap: spacing.mdSpacing,
		paddingBottom: 2 * spacing.xlSpacing,
	},
	tagline: {
		color: colors.white,
		fontSize: fontSizes.mainHeader,
		fontWeight: 'bold',
	},
	description: {
		color: colors.white,
		fontSize: fontSizes.mainDescription,
	},
});

export default Root;
