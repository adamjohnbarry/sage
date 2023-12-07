import * as SMS from 'expo-sms';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Card from '../../assets/components/Card';
import globalStyles from '../../assets/styles/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../../assets/components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';
import LoginScreenImage from '../../assets/images/login-screen.png';
import PersonButton from '../../assets/components/PersonButton';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useContext, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useUser } from '../../assets/contexts/UserContext';

const MyGarden = () => {
	const { user, fetchUserAndGardenDetails } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

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
					<Card>
						<View style={styles.cardHeader}>
							<Text style={styles.cardTextMain}>Are you coming this Friday?</Text>
							<Pressable style={styles.cardHeaderCancel}>
								<FontAwesome5 name='times' size={fontSizes.body} color={colors.white} />
							</Pressable>
						</View>
						<View style={styles.cardButtonGroup}>
							<Pressable style={styles.cardButton}>
								<View style={[styles.cardButtonIcon, styles.cardButtonYes]}>
									<FontAwesome5 name='check' size={fontSizes.body} color={colors.white} />
								</View>
								<Text style={styles.cardButtonText}>Yes</Text>
							</Pressable>
							<Pressable style={styles.cardButton}>
								<View style={[styles.cardButtonIcon, styles.cardButtonNo]}>
									<FontAwesome5 name='times' size={fontSizes.body} color={colors.white} />
								</View>
								<Text style={styles.cardButtonText}>No</Text>
							</Pressable>
						</View>
					</Card>
					<View>
						<View>
							<Text style={globalStyles.sectionTitleText}>Attending</Text>
						</View>
						<ScrollView style={[globalStyles.sectionBodyContainer, globalStyles.horizontalScroll]} horizontal={true}>
							<PersonButton photo={LoginScreenImage} firstName='Me' onPress={sendInvite} />
							<PersonButton photo={LoginScreenImage} firstName='Me' />
							<PersonButton photo={LoginScreenImage} firstName='Me' />
							<PersonButton photo={LoginScreenImage} firstName='Me' />
							<PersonButton photo={LoginScreenImage} firstName='Me' />
						</ScrollView>
					</View>
					<View>
						<View>
							<Text style={globalStyles.sectionTitleText}>Not Attending</Text>
						</View>
						<Card color='grey'>
							<View style={styles.cardHeader}>
								<Text style={styles.cardTextMain}>Message Bob and Joe?</Text>
								<Pressable style={styles.cardHeaderCancel}>
									<FontAwesome5 name='times' size={fontSizes.body} color={colors.white} />
								</Pressable>
							</View>
						</Card>
						<ScrollView style={[globalStyles.sectionBodyContainer, globalStyles.horizontalScroll]} horizontal={true}>
							<PersonButton photo={LoginScreenImage} firstName='Me' />
							<PersonButton photo={LoginScreenImage} firstName='Me' />
						</ScrollView>
					</View>
					<View>
						<View>
							<Text style={globalStyles.sectionTitleText}>Hasn't Responded</Text>
						</View>
						<ScrollView style={[globalStyles.sectionBodyContainer, globalStyles.horizontalScroll]} horizontal={true}>
							<PersonButton photo={LoginScreenImage} firstName='Me' />
							<PersonButton photo={LoginScreenImage} firstName='Me' />
						</ScrollView>
					</View>
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
