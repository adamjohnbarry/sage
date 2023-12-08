import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Button from '../../../assets/components/Button';
import ButtonGroup from '../../../assets/components/ButtonGroup';
import Form from '../../../assets/components/Form';
import FormContainer from '../../../assets/components/FormContainer';
import FormGroup from '../../../assets/components/FormGroup';
import FormInputText from '../../../assets/components/FormInputText';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/Contexts';
import { useUser } from '../../../assets/contexts/UserContext';
import globalStyles from '../../../assets/styles/GlobalStyles';

const AccountSettings = () => {
	const router = useRouter();
	const { user, updateUserDetails } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [name, setName] = useState(user?.name);
	const [isChanged, setIsChanged] = useState(false);

	useEffect(() => {
		setIsChanged(name !== user?.name);
	}, [name, user]);

	// handle saving account changes
	const handleSave = async () => {
		if (isChanged) {
			await updateUserDetails({
				...user,
				name: name,
			});
		}

		router.back();
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<FormContainer>
				<Form>
					<FormGroup label={lang.form.name.label}>
						<FormInputText placeholder={lang.form.name.placeholder} value={name} onChangeText={(text) => setName(text)} />
					</FormGroup>
				</Form>
				<ButtonGroup>
					<Button text={lang.button.save} color='black' onPress={handleSave} />
				</ButtonGroup>
			</FormContainer>
		</View>
	);
};

export default AccountSettings;
