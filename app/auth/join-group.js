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

const JoinGroup = () => {
	const router = useRouter();
	const { joinGarden } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [inviteWord, setInviteWord] = useState('');

	const [inviteWordError, setInviteWordError] = useState('');

	// error handling and invite word field updating on text change
	const inviteWordFieldChangeText = (text) => {
		if (text.length == 0) {
			setInviteWordError(lang.error.nameEmpty);
		} else {
			setInviteWordError('');
		}

		setInviteWord(text);
	};

	// handle joining a group if join button is selected
	const joinGroup = async () => {
		if (inviteWord.length == 0) {
			setInviteWordError(lang.error.inviteWordEmpty);
		}

		const success = await joinGarden(inviteWord);
		if (success) {
			router.replace('/home/my-garden');
		} else {
			setInviteWordError(lang.error.inviteWordDoesntExistError);
		}
	};

	return (
		<PressOutsideInput>
			<FormContainer safeArea={safeArea}>
				<Form>
					<FormGroup label={lang.form.inviteWord.label} error={inviteWordError} help={lang.form.inviteWord.help} helpHref='/auth/how-do-i-get-an-invite-word'>
						<FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={inviteWordFieldChangeText} />
					</FormGroup>
				</Form>
				<ButtonGroup>
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
						disabled={inviteWord.length == 0 ? true : false}
						onPress={joinGroup}
					/>
				</ButtonGroup>
			</FormContainer>
		</PressOutsideInput>
	);
};

export default JoinGroup;
