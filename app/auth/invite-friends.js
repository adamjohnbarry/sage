import { FlatList, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useContext, useEffect, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import FormInputText from '../../assets/components/FormInputText';
import ContactItem from '../../assets/components/ContactItem';
import { spacing } from '../../assets/theme/theme';

const InviteFriends = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [searchContacts, setSearchContacts] = useState('');
	const [contacts, setContacts] = useState();

	// get all of user's contacts
	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
				});

				if (data.length > 0) {
					setContacts(data);
					// console.log(data[1].phoneNumbers[0].digits);
				}
			}
		})();
	}, []);

	const setGardenMembers = async () => {
		const db = getFirestore();

		try {
			// await updateDoc(userRef, {
			// 	members,
			// });
		} catch (err) {
			console.log(`${err.code}: ${err.message}`);
		}

		router.push('/auth/congratulations');
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<View style={[globalStyles.form, globalStyles.containerFlex]}>
					<View style={globalStyles.formGroup}>
						<FormInputText placeholder={lang.form.searchContacts.placeholder} value={searchContacts} onChangeText={(text) => setSearchContacts(text)} />
					</View>
					<View style={globalStyles.containerScroll}>
						<FlatList
							data={contacts}
							style={globalStyles.verticalScroll}
							ItemSeparatorComponent={() => <View style={{ height: spacing.mdSpacing }} />}
							renderItem={({ item }) => <ContactItem {...item} />}
							keyExtractor={(item, i) => i}
						/>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button
						text={lang.button.skip}
						color='white'
						onPress={() =>
							router.push({
								pathname: '/auth/congratulations',
								params: { index: 0 },
							})
						}
					/>
					<Button text={lang.button.finish} onPress={setGardenMembers} />
				</View>
			</View>
		</View>
	);
};

export default InviteFriends;
