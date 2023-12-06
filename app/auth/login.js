import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useEffect, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { useUser } from '../../assets/contexts/UserContext';

const Login = () => {
	const router = useRouter();
	const { fetchUserAndGardenDetails } = useUser();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

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

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				fetchUserAndGardenDetails(userCredential.user.uid)
					.then(() => {
						// Navigate to the 'My Garden' page after successful login and data fetch
						router.replace({ pathname: '/home/my-garden' });
					})
					.catch((error) => {
						console.error('Error fetching user and garden details:', error);
					});
			}).catch((err) => {
				if (err.code === 'auth/invalid-email') {
					setEmailError('Please enter a valid email.');
				} else if (err.code === 'auth/missing-password') {
					setPasswordError('Please fill in password field.');
				} else if (err.code === 'auth/invalid-login-credentials') {
					setPasswordError('Email or password is incorrect.');
				} else {
					console.log(`${err.code}: ${err.message}`);
				}
			});
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.email.label}</Text>
						<FormInputText placeholder={lang.form.email.placeholder} keyboardType='email-address' value={email} onChangeText={(text) => setEmail(text)} />
						{emailError && <Text style={globalStyles.formError}>{emailError}</Text>}
					</View>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.passwordLogin.label}</Text>
						<FormInputText
							placeholder={lang.form.passwordLogin.placeholder}
							value={password}
							secureTextEntry={true}
							onChangeText={(text) => setPassword(text)}
						/>
						{passwordError && <Text style={globalStyles.formError}>{passwordError}</Text>}
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.login} onPress={login} />
				</View>
			</View>
		</View>
	);
};

export default Login;
