import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { Link, useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';

const JoinGroup = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [inviteWord, setInviteWord] = useState('');

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.inviteWord.label}</Text>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={(text) => setInviteWord(text)} />
						<View style={globalStyles.formHelpContainer}>
							<Link href='/auth/how-do-i-get-an-invite-word' style={globalStyles.formHelp}>
								{lang.form.inviteWord.help}
							</Link>
						</View>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button
						text={lang.button.createGroup}
						color='white'
						onPress={() =>
							router.push({
								pathname: '/auth/create-group',
								params: { index: 3, title: lang.createGroup.createGroup.title, description: lang.createGroup.createGroup.description },
							})
						}
					/>
					<Button
						text={lang.button.join}
						color={inviteWord.length > 0 ? 'black' : 'grey'}
						onPress={
							inviteWord.length > 0
								? () =>
										router.replace({
											pathname: '/home/my-garden',
											params: { title: lang.myGarden.myGarden.title, description: lang.myGarden.myGarden.description },
										})
								: null
						}
					/>
				</View>
			</View>
		</View>
	);
};

export default JoinGroup;
