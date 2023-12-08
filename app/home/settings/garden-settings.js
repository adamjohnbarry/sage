import { useRouter } from 'expo-router';
import * as SMS from 'expo-sms';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../assets/components/Button';
import ButtonGroup from '../../../assets/components/ButtonGroup';
import ContainerScroll from '../../../assets/components/ContainerScroll';
import FormButton from '../../../assets/components/FormButton';
import FormContainer from '../../../assets/components/FormContainer';
import FormGroup from '../../../assets/components/FormGroup';
import FormInputText from '../../../assets/components/FormInputText';
import InviteMember from '../../../assets/components/InviteMember';
import PressOutsideInput from '../../../assets/components/PressOutsideInput';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/Contexts';
import { useUser } from '../../../assets/contexts/UserContext';
import { MEMBERS } from '../../../assets/data/members';
import { colors, fontSizes, spacing } from '../../../assets/theme/theme';

const GardenSettings = () => {
	const router = useRouter();
	const { garden, gardenDaysTimes, setGardenDaysTimes, updateGardenDetails, checkInviteWordAvailability } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
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
			const isAvailable = await checkInviteWordAvailability(inviteWord);

			if (!isAvailable) {
				setInviteWordError(lang.error.inviteWordAlreadyExistsError);
			} else {
				updateGardenDetails({
					...garden,
					name: gardenName,
					inviteWord: inviteWord,
					address: gardenAddress,
					meetingDays: meetingDays,
				});

				setGardenDaysTimes(meetingDays);
			}
		}

		router.back();
	};

	// invite members to your garden
	const inviteMembers = async () => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			await SMS.sendSMSAsync([], lang.settings.gardenSettings.inviteTextMessage, {});
		} else {
			console.log(lang.error.cannotUseSMSError);
		}
	};

	// remove member from your garden
	const remove = (member) => {
		let newMembers = members.filter((el) => el.phone !== member.phone);

		setMembers(newMembers);

		// do a context update
	};

	return (
		<PressOutsideInput>
			<FormContainer safeArea={safeArea}>
				<ContainerScroll>
					<FormGroup label={lang.form.groupMembers.label} spacing={true}>
						<View style={{ gap: spacing.smSpacing }}>
							{members.map((member, i) => (
								<InviteMember key={i} {...member} removeOnPress={() => remove(member)} />
							))}
						</View>
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
				</ContainerScroll>
				<ButtonGroup>
					<Button text={lang.button.save} onPress={handleSave} />
				</ButtonGroup>
			</FormContainer>
		</PressOutsideInput>
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
