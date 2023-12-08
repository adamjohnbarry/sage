import * as Contacts from 'expo-contacts';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import ContactItem from '../../assets/components/ContactItem';
import Form from '../../assets/components/Form';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import FormInputText from '../../assets/components/FormInputText';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import globalStyles from '../../assets/styles/GlobalStyles';
import { spacing } from '../../assets/theme/theme';

const InviteFriends = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [searchContacts, setSearchContacts] = useState('');
	const [contacts, setContacts] = useState();
	const [filteredContacts, setFilteredContacts] = useState();

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
					setFilteredContacts(data);
				}
			}
		})();
	}, []);

	// handle filtering the contacts
	const filterContacts = (text) => {
		setSearchContacts(text);

		const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(text.toLowerCase()));

		setFilteredContacts(filteredContacts);
	};

	// handle inviting friends
	const inviteFriends = () => {
		// TODO: implement invite functionality
		router.push('/auth/congratulations');
	};

	return (
		// <PressOutsideInput>
		<FormContainer safeArea={safeArea}>
			<Form>
				<FormGroup>
					<FormInputText placeholder={lang.form.searchContacts.placeholder} value={searchContacts} onChangeText={filterContacts} />
				</FormGroup>
				<FlatList
					data={filteredContacts}
					style={globalStyles.verticalScroll}
					ItemSeparatorComponent={() => <View style={{ height: spacing.smSpacing }} />}
					renderItem={({ item }) => <ContactItem {...item} />}
					keyExtractor={(item, i) => i}
				/>
			</Form>
			<ButtonGroup>
				<Button text={lang.button.skip} color='white' onPress={() => router.push('/auth/congratulations')} />
				<Button text={lang.button.finish} onPress={inviteFriends} />
			</ButtonGroup>
		</FormContainer>
		// </PressOutsideInput>
	);
};

export default InviteFriends;
