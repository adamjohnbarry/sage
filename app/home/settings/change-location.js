import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Button from '../../../assets/components/Button';
import ButtonGroup from '../../../assets/components/ButtonGroup';
import Form from '../../../assets/components/Form';
import FormGroup from '../../../assets/components/FormGroup';
import FormInputText from '../../../assets/components/FormInputText';
import GardenItem from '../../../assets/components/GardenItem';
import Separator from '../../../assets/components/Separator';
import { LangContext } from '../../../assets/contexts/Contexts';
import { useUser } from '../../../assets/contexts/UserContext';
import globalStyles from '../../../assets/styles/GlobalStyles';

const ChangeLocation = () => {
	const { lang } = useContext(LangContext);
	const { garden, setGarden } = useUser();

	const gardens = lang.createGroup.chooseLocation.gardens;

	const [privateAddress, setPrivateAddress] = useState('');
	const [localGardens, setLocalGardens] = useState(gardens);
	const [activeGardenItem, setActiveGardenItem] = useState('');

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
		const address = activeGardenItem || privateAddress;

		setGarden({ ...garden, address });
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite]}>
			<ScrollView style={[globalStyles.formContainerScroll, globalStyles.containerScroll]}>
				<Form>
					<FormGroup label={lang.form.privateGarden.label} spacing={true}>
						<FormInputText placeholder={lang.form.privateGarden.placeholder} value={privateAddress} onChangeText={(text) => setPrivateAddress(text)} />
					</FormGroup>
					<Separator text={lang.createGroup.chooseLocation.separatorText} marginBottom={true} />
					<FormGroup label={lang.form.localGarden.label} spacing={true}>
						{localGardens.map((garden, i) => (
							<GardenItem key={i} {...garden} onPress={() => handleGardenItemChange(garden.address)} active={isGardenItemActive(garden.address)} />
						))}
					</FormGroup>
				</Form>
				<ButtonGroup>
					<Button text={lang.button.save} onPress={saveGardenLocation} color='green' />
				</ButtonGroup>
			</ScrollView>
		</View>
	);
};

export default ChangeLocation;
