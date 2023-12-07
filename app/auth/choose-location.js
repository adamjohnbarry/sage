import { ScrollView, Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useEffect, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import GardenItem from '../../assets/components/GardenItem';
import Separator from '../../assets/components/Separator';
import { useUser } from '../../assets/contexts/UserContext';

const ChooseLocation = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const { garden, setGarden } = useUser();

	const gardens = lang.createGroup.chooseLocation.gardens;

	const [privateAddress, setPrivateAddress] = useState('');
	const [localAddress, setLocalAddress] = useState('');
	const [localGardens, setLocalGardens] = useState(gardens);
	const [selected, setSelected] = useState(false);

	function handleCardPress(garden) {
		setLocalAddress(garden.name);
	}

	const filterLocalGardens = (text) => {
		setLocalAddress(text);

		// const filteredGardens = gardens.filter((garden) => garden.name.toLowerCase().match(localAddress.toLowerCase()));

		// setLocalGardens(filteredGardens);
	};

	// save garden location
	const saveGardenLocation = async () => {
		const address = localAddress || privateAddress; // use localAddress if it's selected, else use privateAddress
		setGarden({ ...garden, address });
		router.push({
			pathname: '/auth/pick-day-and-time',
			params: { index: 6, title: lang.createGroup.pickDayAndTime.title, description: lang.createGroup.pickDayAndTime.description },
		});
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<ScrollView style={[globalStyles.containerScroll]}>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.privateGarden.label}</Text>
						<FormInputText placeholder={lang.form.privateGarden.placeholder} value={privateAddress} onChangeText={(text) => setPrivateAddress(text)} />
					</View>
					<Separator text='OR' marginBottom={true} />
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.localGarden.label}</Text>
						{localGardens.map((garden, i) => (
							<GardenItem key={i} {...garden} selected={selected} onSelect={() => handleCardPress(garden)} />
						))}
					</View>
				</ScrollView>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.continue} onPress={saveGardenLocation} />
				</View>
			</View>
		</View>
	);
};

export default ChooseLocation;
