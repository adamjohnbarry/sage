import { Text, View } from 'react-native';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/Contexts';
import FormInputText from '../../../assets/components/FormInputText';
import Button from '../../../assets/components/Button';
import { useRouter } from 'expo-router';
import { useUser } from '../../../assets/contexts/UserContext';

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

	const handleSave = async () => {
		if (isChanged) {
			await updateUserDetails({
				...user,
				name: name,
			});
		}
		router.back();
	}

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.name.label}</Text>
						<FormInputText placeholder={lang.form.name.placeholder} value={name} onChangeText={(text) => setName(text)} />
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.save} color='black' onPress={handleSave} />
				</View>
			</View>
		</View>
	);
};

export default AccountSettings;
