import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import Form from '../../assets/components/Form';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import FormInputText from '../../assets/components/FormInputText';
import PressOutsideInput from '../../assets/components/PressOutsideInput';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';

const NameGarden = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const { garden, setGarden } = useUser();

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
		setInviteWordError('');
		setInviteWord(text);
	};

	const updateGardenDetails = () => {
		if (!gardenName || gardenName.length === 0) {
			setGardenNameError(lang.error.gardenNameEmpty);

			return;
		}

		if (!inviteWord || inviteWord.length === 0) {
			setInviteWordError(lang.error.inviteWordEmpty);

			return;
		}

		// TODO: this needs to push to db and check if invite word already exists
		setGarden({ ...garden, name: gardenName, inviteWord: inviteWord.toLowerCase() });

		router.push({
			pathname: '/auth/choose-location',
			params: { index: 5, title: lang.createGroup.chooseLocation.title, description: lang.createGroup.chooseLocation.description },
		});
	};

	return (
		<PressOutsideInput>
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
		</PressOutsideInput>
	);
};

export default NameGarden;
