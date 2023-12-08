import { useRouter } from 'expo-router';
import { deleteUser, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import SettingsButton from '../../../assets/components/SettingsButton';
import { LangContext } from '../../../assets/contexts/Contexts';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { colors } from '../../../assets/theme/theme';

const Settings = () => {
	const router = useRouter();
	const { lang } = useContext(LangContext);
	const auth = getAuth();
	const user = auth.currentUser;

	// handle signing out
	const signOut = () => {
		Alert.alert(lang.settings.settingsList[3].title, lang.settings.settingsList[3].message, [
			{
				text: lang.button.cancel,
				style: 'cancel',
			},
			{
				text: lang.button.yes,
				onPress: () =>
					auth
						.signOut()
						.then(() => {
							router.replace({
								pathname: '/',
							});
						})
						.catch((err) => {
							console.log(`${err.code}: ${err.message}`);
						}),
			},
		]);
	};

	// handle deleting account
	const deleteAccount = () => {
		Alert.alert(lang.settings.settingsList[4].title, lang.settings.settingsList[4].message, [
			{
				text: lang.button.cancel,
				style: 'cancel',
			},
			{
				text: lang.button.yes,
				onPress: () =>
					deleteUser(user)
						.then(() => {
							router.replace({
								pathname: '/',
							});
						})
						.catch((err) => {
							console.log(`${err.code}: ${err.message}`);
						}),
			},
		]);
	};

	return (
		<ScrollView style={globalStyles.containerWhite}>
			<View style={globalStyles.container}>
				<SettingsButton
					text={lang.settings.settingsList[0].title}
					onPress={() =>
						router.push({
							pathname: '/home/settings/garden-settings',
							params: { title: lang.settings.settingsList[0].title, color: colors.white, hasBackButton: true },
						})
					}
				/>
				<SettingsButton
					text={lang.settings.settingsList[1].title}
					onPress={() =>
						router.push({
							pathname: '/home/settings/account-settings',
							params: { title: lang.settings.settingsList[1].title, color: colors.white, hasBackButton: true },
						})
					}
				/>
				<SettingsButton
					text={lang.settings.settingsList[2].title}
					onPress={() =>
						router.push({
							pathname: '/home/settings/change-language',
							params: { title: lang.settings.settingsList[2].title, color: colors.white, hasBackButton: true },
						})
					}
				/>
				<SettingsButton text={lang.settings.settingsList[3].title} onPress={signOut} />
				<SettingsButton text={lang.settings.settingsList[4].title} onPress={deleteAccount} />
			</View>
		</ScrollView>
	);
};

export default Settings;
