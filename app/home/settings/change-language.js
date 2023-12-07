import { Text, View } from 'react-native';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/Contexts';
import FormButton from '../../../assets/components/FormButton';
import Button from '../../../assets/components/Button';
import { langDE, langEN } from '../../../assets/utils/utils';

const ChangeLanguage = () => {
	const { safeArea } = useContext(SafeAreaContext);
	const { lang, setLang } = useContext(LangContext);

	const [activeButton, setActiveButton] = useState(lang.langCode.english);

	// handle language button changing
	const handleLanguageChange = (id) => {
		setActiveButton(activeButton === id ? null : id);
	};

	// check if the button is active
	const isLanguageButtonActive = (id) => {
		return activeButton === id;
	};

	// handle saving language
	const saveLanguage = () => {
		if (activeButton === 'EN') {
			setLang(langEN);
		} else if (activeButton === 'DE') {
			setLang(langDE);
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={globalStyles.form}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.changeLanguage.label}</Text>
						<FormButton
							emoji='🇺🇸'
							label='English'
							onPress={() => handleLanguageChange(lang.langCode.english)}
							active={isLanguageButtonActive(lang.langCode.english)}
						/>
						<FormButton
							emoji='🇩🇪'
							label='German'
							onPress={() => handleLanguageChange(lang.langCode.german)}
							active={isLanguageButtonActive(lang.langCode.german)}
						/>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.save} color='green' onPress={saveLanguage} />
				</View>
			</View>
		</View>
	);
};

export default ChangeLanguage;
