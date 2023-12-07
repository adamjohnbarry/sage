import { StyleSheet, Text, View } from 'react-native';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { Stack, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';

import ConfettiCannon from 'react-native-confetti-cannon';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const Congratulations = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	const [gardenName, setGardenName] = useState('');
	const [gardenAddress, setGardenAddress] = useState('');
	const [gardenDays, setGardenDays] = useState('');
	const [gardenTimes, setGardenTimes] = useState('');

	// as soon as we get to congratulations page update the garden name and day / time
	useEffect(() => {
		const auth = getAuth();
		const db = getFirestore();

		const userRef = doc(db, 'users', auth.currentUser.uid);

		const getGardenDetails = async () => {
			const user = await getDoc(userRef);

			const gardenRef = doc(db, 'gardens', user.data().gardenId);
			const garden = await getDoc(gardenRef);

			return garden;
		};

		// update the congratulations page to reflect garden's details
		getGardenDetails()
			.then((garden) => {
				setGardenName(garden.data().name);
				setGardenAddress(garden.data().address);
				setGardenDays('Mondays & Thursdays');
				setGardenTimes('3.30pm');
			})
			.catch((err) => {
				console.log(`${err.code}: ${err.message}`);
			});
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
						<Text style={styles.congratulationsGardenName}>{gardenName}</Text>
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
							router.replace({
								pathname: '/home/my-garden',
								params: { title: gardenName, address: gardenAddress, days: gardenDays, times: gardenTimes },
							})
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
