import { useContext, useState } from 'react';
import { View } from 'react-native';
import Button from '../../../assets/components/Button';
import ButtonGroup from '../../../assets/components/ButtonGroup';
import Form from '../../../assets/components/Form';
import FormButton from '../../../assets/components/FormButton';
import FormContainer from '../../../assets/components/FormContainer';
import FormGroup from '../../../assets/components/FormGroup';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/Contexts';
import globalStyles from '../../../assets/styles/GlobalStyles';
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
		if (activeButton === lang.lang.english.langCode) {
			setLang(langEN);
		} else if (activeButton === lang.lang.german.langCode) {
			setLang(langDE);
		}
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<FormContainer>
				<Form>
					<FormGroup label={lang.form.changeLanguage.label}>
						<FormButton
							emoji='🇺🇸'
							label={lang.lang.english.name}
							onPress={() => handleLanguageChange(lang.lang.english.langCode)}
							active={isLanguageButtonActive(lang.lang.english.langCode)}
						/>
						<FormButton
							emoji='🇩🇪'
							label='German'
							onPress={() => handleLanguageChange(lang.lang.german.langCode)}
							active={isLanguageButtonActive(lang.lang.german.langCode)}
						/>
					</FormGroup>
				</Form>
				<ButtonGroup>
					<Button text={lang.button.save} color='green' onPress={saveLanguage} />
				</ButtonGroup>
			</FormContainer>
		</View>
	);
};

export default ChangeLanguage;
