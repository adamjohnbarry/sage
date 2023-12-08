import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import Form from '../../assets/components/Form';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import FormInputText from '../../assets/components/FormInputText';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';
import globalStyles from '../../assets/styles/GlobalStyles';

const NameGarden = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const { garden, setGarden, checkInviteWordAvailability, } = useUser();

	const [gardenName, setGardenName] = useState('');
	const [inviteWord, setInviteWord] = useState('');

	const [gardenNameError, setGardenNameError] = useState('');
	const [inviteWordError, setInviteWordError] = useState('');

	const handleGardenNameChange = (text) => {
		if (text.length == 0) {
			setGardenNameError(lang.error.gardenNameEmpty);
		} else {
			setGardenNameError('');
		}

		setGardenName(text);
	};

	const handleInviteWordChange = (text) => {
		setInviteWord(text);
	};

	const updateGardenDetails = async () => {
		const isAvailable = await checkInviteWordAvailability(inviteWord);
		if (!isAvailable) {
			setInviteWordError(lang.error.inviteWordAlreadyExistsError);
			return;
		}
		if (!gardenName || gardenName.length === 0) {
			setGardenNameError(lang.error.gardenNameEmpty);

			return;
		}

		if (!inviteWord || inviteWord.length === 0) {
			setInviteWordError(lang.error.inviteWordEmpty);

			return;
		}

		setGarden({ ...garden, name: gardenName, inviteWord: inviteWord.toLowerCase() });

		router.push({
			pathname: '/auth/choose-location',
			params: { index: 5, title: lang.createGroup.inviteFriends.title, description: lang.createGroup.inviteFriends.description },
		});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={globalStyles.containerFlex}>
				<FormContainer safeArea={safeArea}>
					<Form>
						<FormGroup label={lang.form.gardenName.label} error={gardenNameError}>
							<FormInputText placeholder={lang.form.gardenName.placeholder} value={gardenName} onChangeText={handleGardenNameChange} />
						</FormGroup>
						<FormGroup label={lang.form.inviteWord.label} error={inviteWordError}>
							<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={handleInviteWordChange} />
						</FormGroup>
					</Form>
					<ButtonGroup>
						<Button text={lang.button.continue} onPress={updateGardenDetails} />
					</ButtonGroup>
				</FormContainer>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default NameGarden;
