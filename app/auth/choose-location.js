import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import ContainerScroll from '../../assets/components/ContainerScroll';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import FormInputText from '../../assets/components/FormInputText';
import GardenItem from '../../assets/components/GardenItem';
import Separator from '../../assets/components/Separator';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';

const ChooseLocation = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const { garden, setGarden } = useUser();

	const gardens = lang.createGroup.chooseLocation.gardens;

	const [privateAddress, setPrivateAddress] = useState('');
	const [localGardens, setLocalGardens] = useState(gardens);
	const [activeGardenItem, setActiveGardenItem] = useState();

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

		router.push({
			pathname: '/auth/pick-day-and-time',
			params: { index: 6, title: lang.createGroup.pickDayAndTime.title, description: lang.createGroup.pickDayAndTime.description },
		});
	};

	return (
		<FormContainer safeArea={safeArea}>
			<ContainerScroll>
				<FormGroup label={lang.form.privateGarden.label} spacing={true}>
					<FormInputText placeholder={lang.form.privateGarden.placeholder} value={privateAddress} onChangeText={(text) => setPrivateAddress(text)} />
				</FormGroup>
				<Separator text={lang.createGroup.chooseLocation.separatorText} marginBottom={true} />
				{/* FIX BELOW TO SPACING TRUE */}
				<FormGroup label={lang.form.localGarden.label} spacing={true}>
					{localGardens.map((garden, i) => (
						<GardenItem key={i} {...garden} onPress={() => handleGardenItemChange(garden.address)} active={isGardenItemActive(garden.address)} />
					))}
				</FormGroup>
			</ContainerScroll>
			<ButtonGroup>
				<Button text={lang.button.continue} onPress={saveGardenLocation} />
			</ButtonGroup>
		</FormContainer>
	);
};

export default ChooseLocation;
