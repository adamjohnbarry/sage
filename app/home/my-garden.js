import { Tabs } from 'expo-router';
import * as SMS from 'expo-sms';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { RadioButton } from '../../assets/components/RadioButton';
import { ScrollView } from 'react-native-gesture-handler';
import Attendance from '../../assets/components/Attendance';
import AttendanceNotification from '../../assets/components/AttendanceNotification';
import GroupChatCard from '../../assets/components/GroupChatCard';
import Header from '../../assets/components/Header';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';
import { MEMBERS } from '../../assets/data/members';
import globalStyles from '../../assets/styles/GlobalStyles';
import { spacing, colors, } from '../../assets/theme/theme';

const MyGarden = () => {
	const { user } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const [members, setMembers] = useState(MEMBERS);
	const [showAttendanceNotification, setShowAttendanceNotifcation] = useState(true);
	const [showAttendanceModal, setShowAttendanceModal] = useState(false);
	const [selectedAttendanceOption, setSelectedAttendanceOption] = useState('hasntResponded');

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
	const sendCheckIn = async (members, message) => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			const phoneNumbers = members.map(member => member.phone).filter(phone => phone); // This will filter out any undefined or null phone numbers

			if (phoneNumbers.length > 0) {
				await SMS.sendSMSAsync(phoneNumbers, message, {});
			} else {
				console.log("No valid phone numbers found in members array.");
			}
		} else {
			console.log(lang.error.cannotUseSMSError);
		}
	};


	const handleMemberTap = (member, message) => {
		if (member.name === 'Me') {
			setShowAttendanceModal(true);
		} else {
			sendCheckIn([member], message);
		}
	};

	const handleYesAttending = () => {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: 1 } : member)));
		setShowAttendanceNotifcation(false);
		setShowAttendanceModal(false);
	};

	const handleNoAttending = () => {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: 0 } : member)));
		setShowAttendanceNotifcation(false);
		setShowAttendanceModal(false);
	};

	const handleMaybeAttending = () => {
		setMembers((currentMembers) => currentMembers.map((member) => (member.name === 'Me' ? { ...member, attendingNextSession: -1 } : member)));
		setShowAttendanceNotifcation(true);
		setShowAttendanceModal(false);
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
			{showAttendanceModal && (
				<Modal
					animationType="fade"
					transparent={true}
					visible={showAttendanceModal}
					onRequestClose={() => {
						setShowAttendanceModal(!showAttendanceModal);
					}}
				>
					<TouchableWithoutFeedback onPress={() => setShowAttendanceModal(false)}>
						<View style={styles.modalOverlay}>
							<View style={styles.modalContent}>
								<Text style={globalStyles.h3}>Update Attendance</Text>

								<View style={styles.radioButtonContainer}>
									<RadioButton
										label="Attending"
										value="attending"
										checked={members.find((member) => member.name === 'Me').attendingNextSession === 1}
										onPress={handleYesAttending}
									/>
									<RadioButton
										label="Not Attending"
										value="notAttending"
										checked={members.find((member) => member.name === 'Me').attendingNextSession === 0}
										onPress={handleNoAttending}

									/>
									<RadioButton
										label="Hasn't Responded"
										value="hasntResponded"
										checked={members.find((member) => member.name === 'Me').attendingNextSession === -1}
										onPress={handleMaybeAttending}
									/>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			)}

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
				<Attendance type='attending' members={attendingMembers} onMemberTap={(member) => handleMemberTap(member, lang.myGarden.chat.attendingMessage)} />
				<Attendance type='notAttending' members={notAttendingMembers} onMemberTap={(member) => handleMemberTap(member, lang.myGarden.chat.notAttendingMessage)} />
				<Attendance type='hasntResponded' members={hasntRespondedMembers} onMemberTap={(member) => handleMemberTap(member, lang.myGarden.chat.hasntRespondedMessage)} />
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
	// ...other styles
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
	},
	modalContent: {
		backgroundColor: colors.fogLight,
		padding: spacing.xlSpacing,
		borderRadius: 10,
		width: '60%', // Set width of the modal
		gap: spacing.lgSpacing,
	},
	radioButtonContainer: {
		alignSelf: 'stretch', // Take full width of the modal
		alignItems: 'flex-start',
	},

});
