import { Text, View } from 'react-native';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/contexts';
import FormButton from '../../../assets/components/FormButton';
import Button from '../../../assets/components/Button';

const ChangeLanguage = () => {
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	// handle saving account details
	const saveAccountDetails = () => {};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.changeLanguage.label}</Text>
						<FormButton emoji='🇺🇸' label='English' onPress={saveAccountDetails} />
						<FormButton emoji='🇩🇪' label='German' onPress={saveAccountDetails} />

						{/* <FormInputText placeholder={lang.form.name.placeholder} value={name} onChangeText={(text) => setName(text)} /> */}
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.save} color='green' onPress={saveAccountDetails} />
				</View>
			</View>
		</View>
	);
};

export default ChangeLanguage;
