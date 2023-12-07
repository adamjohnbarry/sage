import { Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useState, useContext } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';

const NameGarden = () => {
    const router = useRouter();
    const { safeArea } = useContext(SafeAreaContext);
    const { lang } = useContext(LangContext);
    const { garden, setGarden } = useUser();

    const [gardenName, setGardenName] = useState('');
    const [inviteWord, setInviteWord] = useState('');

    const [gardenNameError, setGardenNameError] = useState('');
    const [inviteWordError, setInviteWordError] = useState('');

    const handleGardenNameChange = (text) => {
        if (text.length == 0) {
            setGardenNameError(lang.error.gardenNameEmpty);
        } else {
            setGardenNameError('');
        }
        setGardenName(text);
    };

    const handleInviteWordChange = (text) => {
        setInviteWord(text);
    };

    const updateGardenDetails = () => {
        if (!gardenName || gardenName.length === 0) {
            setGardenNameError(lang.error.gardenNameEmpty);
            return;
        }
        if (!inviteWord || inviteWord.length === 0) {
            setInviteWordError(lang.error.inviteWordEmpty);
            return;
        }

        setGarden({ ...garden, name: gardenName, inviteWord: inviteWord.toLowerCase() });
        
        // Navigate to the next step
        router.push('/auth/choose-location', {
            index: 5,
            title: lang.createGroup.chooseLocation.title,
            description: lang.createGroup.chooseLocation.description,
        });
    };

    return (
        <View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
            <View style={globalStyles.formContainer}>
                <View style={globalStyles.form}>
                    <View style={globalStyles.formGroup}>
                        <Text style={globalStyles.formLabel}>{lang.form.gardenName.label}</Text>
                        <FormInputText placeholder={lang.form.gardenName.placeholder} value={gardenName} onChangeText={handleGardenNameChange} />
                        {gardenNameError && <Text style={globalStyles.formError}>{gardenNameError}</Text>}
                    </View>
                    <View style={globalStyles.formGroup}>
                        <Text style={globalStyles.formLabel}>{lang.form.inviteWord.label}</Text>
                        <FormInputText placeholder={lang.form.inviteWord.placeholder} value={inviteWord} onChangeText={handleInviteWordChange} />
                        {inviteWordError && <Text style={globalStyles.formError}>{inviteWordError}</Text>}
                    </View>
                </View>
                <View style={globalStyles.buttonGroup}>
                    <Button text={lang.button.continue} onPress={updateGardenDetails} />
                </View>
            </View>
        </View>
    );
};

export default NameGarden;
