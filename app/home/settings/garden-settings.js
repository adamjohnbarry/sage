import { useRouter } from 'expo-router';
import * as SMS from 'expo-sms';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../assets/components/Button';
import ButtonGroup from '../../../assets/components/ButtonGroup';
import Form from '../../../assets/components/Form';
import FormButton from '../../../assets/components/FormButton';
import FormGroup from '../../../assets/components/FormGroup';
import FormInputText from '../../../assets/components/FormInputText';
import InviteMember from '../../../assets/components/InviteMember';
import { LangContext } from '../../../assets/contexts/Contexts';
import { useUser } from '../../../assets/contexts/UserContext';
import { MEMBERS } from '../../../assets/data/members';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../../../assets/theme/theme';

const GardenSettings = () => {
	const router = useRouter();
	const { garden, gardenDaysTimes, setGardenDaysTimes, updateGardenDetails, checkInviteWordAvailability } = useUser();
	const { lang } = useContext(LangContext);

	const [isChanged, setIsChanged] = useState(false);
	const [gardenName, setGardenName] = useState(garden?.name);
	const [inviteWord, setInviteWord] = useState(garden?.inviteWord);
	const [inviteWordError, setInviteWordError] = useState('');
	const [gardenAddress, setGardenAddress] = useState(garden?.address);
	const [members, setMembers] = useState(garden?.members ?? []);
	const [meetingDays, setMeetingDays] = useState(gardenDaysTimes || {});

	useEffect(() => {
		setMembers(MEMBERS);
	}, []);

	useEffect(() => {
		setIsChanged(
			gardenName !== garden?.name ||
			inviteWord !== garden?.inviteWord ||
			gardenAddress !== garden?.address ||
			JSON.stringify(meetingDays) !== JSON.stringify(gardenDaysTimes) // compare stringified objects
		);
	}, [gardenName, inviteWord, gardenAddress, meetingDays]);

	const handleSave = async () => {
		if (isChanged) {
			console.log(inviteWord)
			const isAvailable = await checkInviteWordAvailability(inviteWord);
			console.log(isAvailable)

			if (!isAvailable) {
				setInviteWordError(lang.error.inviteWordAlreadyExistsError);
				return;
			} else {
				updateGardenDetails({
					...garden,
					name: gardenName,
					inviteWord: inviteWord,
					address: gardenAddress,
					meetingDays: meetingDays,
				});

				setGardenDaysTimes(meetingDays);
				router.back();
			}
		}
	};

	const inviteMembers = async () => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			await SMS.sendSMSAsync([], lang.invite.textMessage, {});
		} else {
			console.log(lang.error.cannotUseSMSError);
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite]}>
			<ScrollView style={[globalStyles.formContainerScroll, globalStyles.containerScroll]}>
				<Form>
					<FormGroup label={lang.form.groupMembers.label} spacing={true}>
						{members.map((member, i) => (
							<InviteMember key={i} {...member} />
						))}
						<TouchableOpacity style={styles.inviteButton} onPress={inviteMembers} color='white'>
							<Text style={styles.buttonText}>{lang.button.inviteMembers}</Text>
						</TouchableOpacity>
					</FormGroup>
					<FormGroup label={lang.form.gardenName.label} spacing={true}>
						<FormInputText placeholder={lang.form.gardenName.placeholder} value={gardenName} onChangeText={(text) => setGardenName(text)} />
					</FormGroup>
					<FormGroup label={lang.form.inviteWord.label} spacing={true} error={inviteWordError}>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={(text) => setInviteWord(text)} />
					</FormGroup>
					<FormGroup label={lang.form.changeLocation.label} spacing={true}>
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
					</FormGroup>
				</Form>
				<ButtonGroup>{isChanged && <Button text={lang.button.save} onPress={handleSave} color='black' />}</ButtonGroup>
			</ScrollView>
		</View>
	);
};

export default GardenSettings;

const styles = StyleSheet.create({
	inviteButton: {
		backgroundColor: colors.primary,
		borderRadius: 100,
		padding: spacing.mdSpacing,
		width: '100%',
		marginTop: spacing.mdSpacing,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
});
