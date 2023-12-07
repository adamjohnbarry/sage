import { StyleSheet, Text, View } from 'react-native';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { Stack, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';
import { useUser } from '../../assets/contexts/UserContext';
import ConfettiCannon from 'react-native-confetti-cannon';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const Congratulations = () => {
	const router = useRouter();
	const { user, fetchUserAndGardenDetails } = useUser();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	// as soon as we get to congratulations page log the user in
	const login = async (e) => {
		const auth = getAuth();
		const db = getFirestore();

		try {
			await fetchUserAndGardenDetails(auth.currentUser.uid);
			// Navigate to the 'My Garden' page after successful login and data fetch
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		login();
	}, []);

	return (
		<>
			{/* hide the header for this screen */}
			<Stack.Screen options={{ headerShown: false }} />
			{/* the main congratulations content for the container */}
			<View style={[styles.congratulationsContainer, { paddingTop: safeArea.paddingTop, paddingBottom: safeArea.paddingBottom }]}>
				<ConfettiCannon count={600} origin={{ x: 0, y: 0 }} explosionSpeed={400} fallSpeed={4000} />
				<View style={styles.congratulations}>
					<View>
						<Text style={styles.congratulationsGardenName}>
							{user?.garden?.name}
						</Text>
						{/* <Text style={styles.congratulationsGardenTime}>
							{gardenDays} @ {gardenTimes}
						</Text> */}
					</View>
					<View>
						<Text style={styles.congratulationsCongrats}>{lang.createGroup.congratulations.title}</Text>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button
						text={lang.button.home}
						onPress={() =>
							router.replace({ pathname: '/home/my-garden' })
						}
					/>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	congratulationsContainer: {
		flex: 1,
		backgroundColor: colors.primary,
		paddingHorizontal: spacing.lgSpacing,
	},
	congratulations: {
		flex: 1,
		justifyContent: 'center',
		gap: spacing.xlSpacing,
	},
	congratulationsGardenName: {
		fontSize: fontSizes.h2,
		fontWeight: 'bold',
	},
	congratulationsGardenTime: {
		fontSize: fontSizes.body,
	},
	congratulationsCongrats: {
		fontSize: fontSizes.h1,
		fontWeight: 'bold',
	},
});

export default Congratulations;
