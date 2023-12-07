import { ScrollView, Text, View } from 'react-native';
import FormInputText from '../../../assets/components/FormInputText';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { useContext, useState } from 'react';
import { LangContext } from '../../../assets/contexts/Contexts';
import { useUser } from '../../../assets/contexts/UserContext';
import Button from '../../../assets/components/Button';
import GardenItem from '../../../assets/components/GardenItem';
import Separator from '../../../assets/components/Separator';

const ChangeLocation = () => {
	const { lang } = useContext(LangContext);
	const { garden, setGarden } = useUser();

	const gardens = lang.createGroup.chooseLocation.gardens;

	const [privateAddress, setPrivateAddress] = useState('');
	const [localGardens, setLocalGardens] = useState(gardens);
	const [activeGardenItem, setActiveGardenItem] = useState('45 University Ave, PA');

	// handle garden item change
	const handleGardenItemChange = (address) => {
		setActiveGardenItem(activeGardenItem === address ? null : address);
	};

	// check if the garden item is active
	const isGardenItemActive = (address) => {
		return activeGardenItem === address;
	};

	// save garden location
	const saveGardenLocation = () => {
		// use localAddress if it's selected, else use privateAddress
		const address = activeGardenItem || privateAddress || '45 University Ave, PA';

		setGarden({ ...garden, address });
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite]}>
			<ScrollView style={[globalStyles.formContainerScroll, globalStyles.containerScroll]}>
				<View style={[globalStyles.form, globalStyles.containerFlex]}>
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.privateGarden.label}</Text>
						<FormInputText placeholder={lang.form.privateGarden.placeholder} value={privateAddress} onChangeText={(text) => setPrivateAddress(text)} />
					</View>
					<Separator text='OR' marginBottom={true} />
					<View style={[globalStyles.formGroup, globalStyles.formGroupSpacing]}>
						<Text style={globalStyles.formLabel}>{lang.form.localGarden.label}</Text>
						{localGardens.map((garden, i) => (
							<GardenItem key={i} {...garden} onPress={() => handleGardenItemChange(garden.address)} active={isGardenItemActive(garden.address)} />
						))}
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.save} onPress={saveGardenLocation} color='green' />
				</View>
			</ScrollView>
		</View>
	);
};

export default ChangeLocation;
