import { Text, View } from 'react-native';
import * as SMS from 'expo-sms';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/contexts';
import FormInputText from '../../../assets/components/FormInputText';
import Button from '../../../assets/components/Button';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import FormButton from '../../../assets/components/FormButton';
import { useRouter } from 'expo-router';
import { colors } from '../../../assets/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import InviteMember from '../../../assets/components/InviteMember';

const GardenSettings = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [gardenName, setGardenName] = useState('');
	const [inviteWord, setInviteWord] = useState('');
	const [gardenAddress, setGardenAddress] = useState('');
	const [members, setMembers] = useState([]);

	// pre populate the garden settings fields
	useEffect(() => {
		const auth = getAuth();
		const db = getFirestore();

		const userRef = doc(db, 'users', auth.currentUser.uid);

		const getGardenDetails = async () => {
			const user = await getDoc(userRef);

			const gardenRef = doc(db, 'gardens', user.data().gardenId);
			const garden = await getDoc(gardenRef);

			return garden;
		};

		getGardenDetails()
			.then((garden) => {
				const gardenObj = garden.data();

				setGardenName(gardenObj.name);
				setInviteWord(gardenObj.inviteWord);
				setGardenAddress(gardenObj.gardenAddress);
				setMembers(gardenObj.members);
			})
			.catch((err) => {
				console.log(`${err.code}: ${err.message}`);
			});
	}, []);

	const inviteMembers = async () => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			const { result } = await SMS.sendSMSAsync([], lang.invite.textMessage, {});

			console.log(result);
		} else {
			console.log('Cannot use SMS on this device.');
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<ScrollView style={[globalStyles.containerScroll]}>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.groupMembers.label}</Text>
						{members.map((member, i) => (
							<InviteMember key={i} {...member} />
						))}
					</View>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.gardenName.label}</Text>
						<FormInputText placeholder={lang.form.gardenName.placeholder} value={gardenName} onChangeText={(text) => setGardenName(text)} />
					</View>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.inviteWord.label}</Text>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={(text) => setInviteWord(text)} />
					</View>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.changeLocation.label}</Text>
						<FormButton
							icon='map-pin'
							rightIcon='chevron-right'
							label={gardenAddress}
							onPress={() =>
								router.push({
									pathname: '/home/settings/change-location',
									params: { title: lang.settings.changeLocation.title, color: colors.white, hasBackButton: true },
								})
							}
						/>
					</View>
				</ScrollView>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.inviteMembers} onPress={inviteMembers} color='white' />
					<Button text={lang.button.save} color='green' />
				</View>
			</View>
		</View>
	);
};

export default GardenSettings;
