import * as SMS from 'expo-sms';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../assets/components/Card';
import globalStyles from '../../assets/styles/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../../assets/components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { Tabs } from 'expo-router';
import { useUser } from '../../assets/contexts/UserContext';
import Attendance from '../../assets/components/Attendance';
import { useState, useEffect, useContext } from 'react';

const MEMBERS = [
	{
		name: 'Nathan Larimer',
		photo: require('../../assets/images/nathan.webp'),
		attendingNextSession: 1,
	},
	{
		name: 'Nancy Kolton',
		photo: require('../../assets/images/nancy.webp'),
		attendingNextSession: 0,
	},
	{
		name: 'Koby Karp',
		photo: require('../../assets/images/koby.webp'),
		attendingNextSession: -1,
	},
	{
		name: 'Jason Sweeney',
		photo: require('../../assets/images/jason.webp'),
		attendingNextSession: 0,
	},
	{
		name: 'Luna',
		photo: require('../../assets/images/luna.webp'),
		attendingNextSession: 1,
	}

];

const MyGarden = () => {
	const { user } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const [members, setMembers] = useState(MEMBERS);
	const [showAttendanceNotification, setShowAttendanceNotifcation] = useState(true);

	useEffect(() => {
		const userExists = members.some(member => member.name === 'Me');

		if (!userExists) {
			const newUser = {
				name: 'Me',
				photo: { uri: user.photo }, // Use the URI directly for network images
				attendingNextSession: -1,
			};
			setMembers(currentMembers => [...currentMembers, newUser]);
		}
	}, [user, members]);

	const attendingMembers = members.filter(member => member.attendingNextSession === 1);
	const notAttendingMembers = members.filter(member => member.attendingNextSession === 0);
	const hasntRespondedMembers = members.filter(member => member.attendingNextSession === -1);


	// send invite to a friend
	const sendInvite = async () => {
		const isAvailable = await SMS.isAvailableAsync();

		if (isAvailable) {
			const { result } = await SMS.sendSMSAsync([], lang.invite.textMessage, {});

			console.log(result);
		} else {
			console.log('Cannot use SMS on this device.');
		}
	};

	function handleYesAttending() {
		setMembers(currentMembers =>
			currentMembers.map(member =>
				member.name === 'Me' ? { ...member, attendingNextSession: 1 } : member
			)
		);
		setShowAttendanceNotifcation(false);
	}

	function handleNoAttending() {
		setMembers(currentMembers =>
			currentMembers.map(member =>
				member.name === 'Me' ? { ...member, attendingNextSession: 0 } : member
			)
		);
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
				<View style={[globalStyles.container, globalStyles.containerMain]}>
					{showAttendanceNotification && (
						<Card>
							<View style={styles.cardHeader}>
								<Text style={styles.cardTextMain}>Are you coming this Friday?</Text>
								<Pressable style={styles.cardHeaderCancel}>
									<FontAwesome5 name='times' size={fontSizes.body} color={colors.white} />
								</Pressable>
							</View>
							<View style={styles.cardButtonGroup}>
								<TouchableOpacity onPress={handleYesAttending} style={styles.cardButton}>
									<View style={[styles.cardButtonIcon, styles.cardButtonYes]}>
										<FontAwesome5 name='check' size={fontSizes.body} color={colors.white} />
									</View>
									<Text style={styles.cardButtonText}>Yes</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={handleNoAttending} style={styles.cardButton}>
									<View style={[styles.cardButtonIcon, styles.cardButtonNo]}>
										<FontAwesome5 name='times' size={fontSizes.body} color={colors.white} />
									</View>
									<Text style={styles.cardButtonText}>No</Text>
								</TouchableOpacity>
							</View>
						</Card>
					)}
					<Attendance type='attending' members={attendingMembers} sendInvite={sendInvite} />
					<Attendance type='notAttending' members={notAttendingMembers} sendInvite={sendInvite} />
					<Attendance type='hasntResponded' members={hasntRespondedMembers} sendInvite={sendInvite} />
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	// card
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cardHeaderCancel: {
		width: spacing.xlSpacing,
		height: spacing.xlSpacing,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white + '25',
		borderRadius: '50%',
	},
	cardTextMain: {
		color: colors.white,
		fontSize: fontSizes.body,
	},
	cardButtonGroup: {
		flexDirection: 'row',
		marginTop: spacing.lgSpacing,
		gap: spacing.lgSpacing,
	},
	cardButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.white + '25',
		gap: spacing.xsSpacing,
		padding: spacing.smSpacing,
		borderRadius: '50%',
	},
	cardButtonIcon: {
		width: spacing.xlSpacing,
		height: spacing.xlSpacing,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
	},
	cardButtonText: {
		color: colors.white,
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
	cardButtonYes: {
		backgroundColor: colors.success,
	},
	cardButtonNo: {
		backgroundColor: colors.error,
	},
});

export default MyGarden;
