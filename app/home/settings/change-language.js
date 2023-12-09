import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import Button from '../../../assets/components/Button';
import ButtonGroup from '../../../assets/components/ButtonGroup';
import Form from '../../../assets/components/Form';
import FormButton from '../../../assets/components/FormButton';
import FormContainer from '../../../assets/components/FormContainer';
import FormGroup from '../../../assets/components/FormGroup';
import { LangContext, SafeAreaContext } from '../../../assets/contexts/Contexts';
import { langDE, langEN } from '../../../assets/utils/utils';

const ChangeLanguage = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang, setLang } = useContext(LangContext);

	const [activeButton, setActiveButton] = useState(lang.settings.changeLanguage.english.langCode);

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
		if (activeButton === lang.settings.changeLanguage.english.langCode) {
			setLang(langEN);
		} else if (activeButton === lang.settings.changeLanguage.german.langCode) {
			setLang(langDE);
		}

		router.back();
	};

	return (
		<FormContainer safeArea={safeArea}>
			<Form>
				<FormGroup label={lang.form.changeLanguage.label}>
					<FormButton
						emoji='🇺🇸'
						label={lang.settings.changeLanguage.english.name}
						onPress={() => handleLanguageChange(lang.settings.changeLanguage.english.langCode)}
						active={isLanguageButtonActive(lang.settings.changeLanguage.english.langCode)}
					/>
					<FormButton
						emoji='🇩🇪'
						label={lang.settings.changeLanguage.german.name}
						onPress={() => handleLanguageChange(lang.settings.changeLanguage.german.langCode)}
						active={isLanguageButtonActive(lang.settings.changeLanguage.german.langCode)}
					/>
				</FormGroup>
			</Form>
			<ButtonGroup>
				<Button text={lang.button.save} color='black' onPress={saveLanguage} />
			</ButtonGroup>
		</FormContainer>
	);
};

export default ChangeLanguage;
