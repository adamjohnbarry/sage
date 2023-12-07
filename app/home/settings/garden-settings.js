import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { LangContext } from '../../../assets/contexts/Contexts';
import FormInputText from '../../../assets/components/FormInputText';
import Button from '../../../assets/components/Button';
import FormButton from '../../../assets/components/FormButton';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSizes } from '../../../assets/theme/theme';
import InviteMember from '../../../assets/components/InviteMember';
import { useUser } from '../../../assets/contexts/UserContext';
import { MEMBERS } from '../../../assets/data/members';

const GardenSettings = () => {
	const router = useRouter();
	const { garden, updateGardenDetails } = useUser();
	const { lang } = useContext(LangContext);

	const [isChanged, setIsChanged] = useState(false);
	const [gardenName, setGardenName] = useState(garden?.name);
	const [inviteWord, setInviteWord] = useState(garden?.inviteWord);
	const [gardenAddress, setGardenAddress] = useState(garden?.address);
	const [members, setMembers] = useState(garden?.members ?? []);

	useEffect(() => {
		setMembers(MEMBERS);
	}, []);


	useEffect(() => {
		setIsChanged(
			gardenName !== garden?.name ||
			inviteWord !== garden?.inviteWord ||
			gardenAddress !== garden?.address
		);
	}, [gardenName, inviteWord, gardenAddress]);

	const handleSave = () => {
		if (isChanged) {
			updateGardenDetails({
				...garden,
				name: gardenName,
				inviteWord: inviteWord,
				address: gardenAddress,
			});
		}
		router.back();
	};

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
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite]}>
			<ScrollView style={[globalStyles.formContainerScroll, globalStyles.containerScroll]}>
				<View style={[globalStyles.form, globalStyles.containerFlex]}>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.groupMembers.label}
						</Text>
						{members.map((member, i) => (
							<InviteMember key={i} {...member} />
						))}
						<TouchableOpacity style={styles.inviteButton} onPress={inviteMembers} color='white' >
							<Text style={styles.buttonText}>{lang.button.inviteMembers}</Text>
						</TouchableOpacity >
					</View>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>
							{lang.form.gardenName.label}
						</Text>
						<FormInputText placeholder={lang.form.gardenName.placeholder} value={gardenName} onChangeText={(text) => setGardenName(text)} />
					</View>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>
							{lang.form.inviteWord.label}
						</Text>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={(text) => setInviteWord(text)} />
					</View>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>
							{lang.form.changeLocation.label}
						</Text>
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
				</View>
				{isChanged && (
					<View style={globalStyles.buttonGroup}>
						<Button text={lang.button.save} onPress={handleSave} color='black' />
					</View>
				)}
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
