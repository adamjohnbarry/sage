import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

const Login = () => {
	const router = useRouter();
	const { fetchUserAndGardenDetails } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	// login to user account with given credentials
	const login = async (e) => {
		e.preventDefault();

		setEmailError('');
		setPasswordError('');

		const auth = getAuth();

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			await fetchUserAndGardenDetails(userCredential.user.uid);

			// navigate to the 'My Garden' page after successful login and data fetch
			router.replace('/home/my-garden');
		} catch (err) {}
	};

	return (
		<PressOutsideInput>
			<FormContainer safeArea={safeArea}>
				<Form>
					<FormGroup label={lang.form.email.label} error={emailError}>
						<FormInputText placeholder={lang.form.email.placeholder} keyboardType='email-address' value={email} onChangeText={(text) => setEmail(text)} />
					</FormGroup>
					<FormGroup label={lang.form.passwordLogin.label} error={passwordError}>
						<FormInputText
							placeholder={lang.form.passwordLogin.placeholder}
							value={password}
							secureTextEntry={true}
							onChangeText={(text) => setPassword(text)}
						/>
					</FormGroup>
				</Form>
				<ButtonGroup>
					<Button text={lang.button.login} onPress={login} />
				</ButtonGroup>
			</FormContainer>
		</PressOutsideInput>
	);
};

export default Login;
