import { FlatList, Text, View } from 'react-native';
import FormInputText from '../../assets/components/FormInputText';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import GardenItem from '../../assets/components/GardenItem';
import { spacing } from '../../assets/theme/theme';
import Separator from '../../assets/components/Separator';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

const ChooseLocation = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const gardens = lang.createGroup.chooseLocation.gardens;

	const [privateAddress, setPrivateAddress] = useState('');
	const [localAddress, setLocalAddress] = useState('');
	const [localGardens, setLocalGardens] = useState(gardens);
	const [selected, setSelected] = useState(false);

	const filterLocalGardens = (text) => {
		setLocalAddress(text);

		// const filteredGardens = gardens.filter((garden) => garden.name.toLowerCase().match(localAddress.toLowerCase()));

		// setLocalGardens(filteredGardens);
	};

	// update private garden selection
	const updateLocalGarden = (garden) => {
		setSelected(true);
	};

	// save garden location
	const saveGardenLocation = async () => {
		const auth = getAuth();
		const db = getFirestore();

		const userRef = doc(db, 'users', auth.currentUser.uid);
		const user = await getDoc(userRef);

		const gardenRef = doc(db, 'gardens', user.data().gardenId);
		const address = privateAddress;

		// TODO: The following needs to be fixed once we can singley select an item

		// use local address if it is selected over private address
		if (localAddress) {
			address = localAddress;
		}

		// update the garden's address
		await updateDoc(gardenRef, {
			address,
		});

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
					<View style={globalStyles.formGroup}>
						<Text style={globalStyles.formLabel}>{lang.form.localGarden.label}</Text>
						<FormInputText placeholder={lang.form.localGarden.placeholder} value={localAddress} onChangeText={filterLocalGardens} />
					</View>
					<View style={globalStyles.containerScroll}>
						<FlatList
							data={localGardens}
							style={globalStyles.verticalScroll}
							ItemSeparatorComponent={() => <View style={{ height: spacing.lgSpacing }} />}
							renderItem={({ item }) => <GardenItem {...item} selected={selected} onSelect={() => updateLocalGarden(item)} />}
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
