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

const UploadName = () => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [name, setName] = useState('');

	const [nameError, setNameError] = useState('');

	// error handling and name field updating on text change
	const nameFieldChangeText = (text) => {
		if (text.length == 0) {
			setNameError(lang.error.nameEmpty);
		} else {
			setNameError('');
		}

		setName(text);
	};

	// update account with name
	const updateDisplayName = async (e) => {
		e.preventDefault();
		setUser({ ...user, name });
		router.push({
			pathname: '/auth/upload-number',
			params: { index: 1, title: lang.auth.register.title, description: lang.auth.register.description },
		});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={globalStyles.containerFlex}>
				<FormContainer safeArea={safeArea}>
					<Form>
						<FormGroup label={lang.form.name.label} error={nameError}>
							<FormInputText placeholder={lang.form.name.placeholder} value={name} onChangeText={nameFieldChangeText} />
						</FormGroup>
					</Form>
					<ButtonGroup>
						<Button text={lang.button.continue} onPress={updateDisplayName} />
					</ButtonGroup>
				</FormContainer>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default UploadName;
