import { Tabs } from 'expo-router';
import * as SMS from 'expo-sms';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Attendance from '../../assets/components/Attendance';
import AttendanceNotification from '../../assets/components/AttendanceNotification';
import GroupChatCard from '../../assets/components/GroupChatCard';
import Header from '../../assets/components/Header';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';
import { MEMBERS } from '../../assets/data/members';
import globalStyles from '../../assets/styles/GlobalStyles';
import { spacing } from '../../assets/theme/theme';

const MyGarden = () => {
	const { user } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const [members, setMembers] = useState(MEMBERS);
	const [showAttendanceNotification, setShowAttendanceNotifcation] = useState(true);

	useEffect(() => {
		const userExists = members.some((member) => member.name === 'Me');

		if (!userExists) {
			const newUser = {
				name: 'Me',
				photo: { uri: user.photo },
				attendingNextSession: -1,
			};
			setMembers((currentMembers) => [...currentMembers, newUser]);
		}
	}, [user, members]);

	const attendingMembers = members.filter((member) => member.attendingNextSession === 1);
	const notAttendingMembers = members.filter((member) => member.attendingNextSession === 0);
	const hasntRespondedMembers = members.filter((member) => member.attendingNextSession === -1);

	// send check in message to a friend
	const sendGroupChatMessage = async (phoneNumbers) => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			await SMS.sendSMSAsync(phoneNumbers, lang.myGarden.groupChat.groupChatMessage, {});
		} else {
			console.log(lang.error.cannotUseSMSError);
		}
	};

	// send check in message to a friend
	const sendCheckIn = async (message) => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			await SMS.sendSMSAsync(['+16504444444'], message, {});
		} else {
			console.log(lang.error.cannotUseSMSError);
		}
	};

	const handleYesAttending = () => {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: 1 } : member)));
		setShowAttendanceNotifcation(false);
	};

	const handleNoAttending = () => {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: 0 } : member)));
		setShowAttendanceNotifcation(false);
	};

	const handleMaybeAttending = () => {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: -1 } : member)));
		setShowAttendanceNotifcation(false);
	};

	// We directly use the garden information from the user context
	const gardenName = user?.garden?.name || lang.myGarden.default.title;

	return (
		<>
			{/* update the header to reflect the name, location, days, and times */}
			<Tabs.Screen
				options={{
					header: (props) => <Header {...props} title={gardenName} safeArea={safeArea} />,
				}}
			/>
			{/* update the header to reflect the name */}
			<ScrollView style={globalStyles.containerWhite}>
				<ScrollView
					style={styles.bannerScroll}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					decelerationRate={0}
					snapToInterval={Dimensions.get('window').width - (2 * spacing.xlSpacing + spacing.mdSpacing) - 30}
					snapToAlignment={'left'}
					contentContainerStyle={{
						paddingHorizontal: spacing.xlSpacing,
					}}
				>
					{showAttendanceNotification && (
						<AttendanceNotification onYesPress={handleYesAttending} onNoPress={handleNoAttending} onCancelPress={handleMaybeAttending} />
					)}
					<GroupChatCard onPress={() => sendGroupChatMessage(members.filter((m) => m.name !== 'Me').map((m) => m.phone))} />
				</ScrollView>
				<Attendance type='attending' members={attendingMembers} sendCheckIn={() => sendCheckIn(lang.myGarden.chat.attendingMessage)} />
				<Attendance type='notAttending' members={notAttendingMembers} sendCheckIn={() => sendCheckIn(lang.myGarden.chat.notAttendingMessage)} />
				<Attendance type='hasntResponded' members={hasntRespondedMembers} sendCheckIn={() => sendCheckIn(lang.myGarden.chat.hasntRespondedMessage)} />
			</ScrollView>
		</>
	);
};

export default MyGarden;

const styles = StyleSheet.create({
	bannerScroll: {
		marginVertical: spacing.xlSpacing,
		gap: spacing.mdSpacing,
	},
});
