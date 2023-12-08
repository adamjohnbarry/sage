import { Tabs } from 'expo-router';
import * as SMS from 'expo-sms';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Attendance from '../../assets/components/Attendance';
import Header from '../../assets/components/Header';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';
import { MEMBERS } from '../../assets/data/members';
import globalStyles from '../../assets/styles/GlobalStyles';
import AttendanceNotification from '../../assets/components/AttendanceNotification';
import GroupChatCard from '../../assets/components/GroupChatCard';
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
				photo: { uri: user.photo }, // Use the URI directly for network images
				attendingNextSession: -1,
			};
			setMembers((currentMembers) => [...currentMembers, newUser]);
		}
	}, [user, members]);

	const attendingMembers = members.filter((member) => member.attendingNextSession === 1);
	const notAttendingMembers = members.filter((member) => member.attendingNextSession === 0);
	const hasntRespondedMembers = members.filter((member) => member.attendingNextSession === -1);

	// send invite to a friend
	const sendInvite = async (phoneNumbers) => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			const { result } = await SMS.sendSMSAsync([], lang.invite.textMessage, {});

			console.log(result);
		} else {
			console.log('Cannot use SMS on this device.');
		}
	};

	function handleYesAttending() {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: 1 } : member)));
		setShowAttendanceNotifcation(false);
	}

	function handleNoAttending() {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: 0 } : member)));
		setShowAttendanceNotifcation(false);
	}

	useEffect(() => {
		console.log('user', user);
	}, [user]);

	// We directly use the garden information from the user context
	const gardenName = user?.garden?.name || 'My Garden';

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
					snapToAlignment={"left"}
					contentContainerStyle={{
						paddingHorizontal: spacing.xlSpacing
					}}
				>
					{showAttendanceNotification && (
						<AttendanceNotification onYesPress={handleYesAttending} onNoPress={handleNoAttending} />
					)}
					<GroupChatCard onPress={() => sendInvite(members.filter(m => m.name !== 'Me').map(m => m.phone))}/>
				</ScrollView>
				<Attendance type='attending' members={attendingMembers} sendInvite={sendInvite} />
				<Attendance type='notAttending' members={notAttendingMembers} sendInvite={sendInvite} />
				<Attendance type='hasntResponded' members={hasntRespondedMembers} sendInvite={sendInvite} />
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
