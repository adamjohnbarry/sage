import { FlatList, Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useEffect, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import GardenItem from '../../assets/components/GardenItem';
import { spacing } from '../../assets/theme/theme';
import Separator from '../../assets/components/Separator';
import { useUser } from '../../assets/contexts/UserContext';

const ChooseLocation = () => {
	const router = useRouter();
	const { garden, setGarden } = useUser();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const gardens = lang.createGroup.chooseLocation.gardens;

	const [privateAddress, setPrivateAddress] = useState('');
	const [localAddress, setLocalAddress] = useState('');
	const [localGardens, setLocalGardens] = useState(gardens);
	const [selected, setSelected] = useState(false);

	function handleCardPress(item) {
		setLocalAddress(item.name);
	}

	const filterLocalGardens = (text) => {
		setLocalAddress(text);

		// const filteredGardens = gardens.filter((garden) => garden.name.toLowerCase().match(localAddress.toLowerCase()));

		// setLocalGardens(filteredGardens);
	};

	// save garden location
	const saveGardenLocation = async () => {
		const address = localAddress || privateAddress; // use localAddress if it's selected, else use privateAddress
		setGarden({ ...garden, address })
		router.push({
			pathname: '/auth/pick-day-and-time',
			params: { index: 6, title: lang.createGroup.pickDayAndTime.title, description: lang.createGroup.pickDayAndTime.description },
		});
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={[globalStyles.form, globalStyles.containerFlex]}>
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.privateGarden.label}</Text>
						<FormInputText placeholder={lang.form.privateGarden.placeholder} value={privateAddress} onChangeText={(text) => setPrivateAddress(text)} />
					</View>
					<Separator text='OR' />
					<View style={globalStyles.containerScroll}>
						<Text style={globalStyles.formLabel}>{lang.form.localGarden.label}</Text>
						<FlatList
							data={localGardens}
							style={(globalStyles.verticalScroll, { marginTop: spacing.smSpacing })}
							ItemSeparatorComponent={() => <View style={{ height: spacing.lgSpacing }} />}
							renderItem={({ item }) => <GardenItem {...item} selected={selected} onSelect={() => handleCardPress(item)} />}
							keyExtractor={(item, i) => i}
						/>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.continue} onPress={saveGardenLocation} />
				</View>
			</View>
		</View>
	);
};

export default ChooseLocation;
