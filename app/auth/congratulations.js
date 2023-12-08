import { Stack, useRouter } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Confetti from 'react-native-confetti';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';
import { SageWordmark } from '../../assets/icons/sagewordmark';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';

const Congratulations = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);
	const { garden, gardenDaysTimes, submitRegistration } = useUser();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const confettiRef = useRef(null);

	useEffect(() => {
		submitData = async () => {
			try {
				const success = await submitRegistration();

				// if registration worked
				if (success) {
					if (confettiRef.current) {
						confettiRef.current.startConfetti();
					}
				} else {
					setError(lang.createGroup.congratulations.registrationError);
				}
			} catch (err) {
				setError(lang.createGroup.congratulations.gardenCreationError);
			} finally {
				setIsLoading(false);
			}
		};

		submitData();
	}, []);

	// render the day and time of your garden events
	const renderGardenDaysTimes = () => {
		const entries = Object.entries(gardenDaysTimes);

		return entries.map(([day, times], index) => {
			const timesStr = times.join(', ');

			return (
				<Text key={index} style={styles.congratulationsGardenTime}>
					{day} @ {timesStr}
				</Text>
			);
		});
	};

	// while we are waiting for the congratulations page results
	if (isLoading) {
		return (
			<View style={[styles.congratulationsContainer, { paddingTop: safeArea.paddingTop, paddingBottom: safeArea.paddingBottom }]}>
				<Text>{lang.createGroup.congratulations.loading}</Text>
			</View>
		);
	}

	// if there is an error with user registration, inform the user
	if (error) {
		return (
			<>
				{/* hide the header for this screen */}
				<Stack.Screen options={{ headerShown: false }} />
				{/* show the error message content */}
				<View style={[styles.congratulationsContainer, { paddingTop: safeArea.paddingTop, paddingBottom: safeArea.paddingBottom }]}>
					<View style={styles.congratulations}>
						<Text style={styles.congratulationsCongrats}>{lang.createGroup.congratulations.oops}</Text>
						<Text style={styles.congratulationsGardenTime}>{error}</Text>
					</View>
					<Button
						text={lang.button.restart}
						onPress={() => {
							router.replace({ pathname: '/' });
						}}
					/>
				</View>
			</>
		);
	}

	return (
		<>
			{/* hide the header for this screen */}
			<Stack.Screen options={{ headerShown: false }} />
			{/* the main congratulations content for the container */}
			<View style={[styles.congratulationsContainer, { paddingTop: safeArea.paddingTop, paddingBottom: safeArea.paddingBottom }]}>
				<Confetti confettiCount={400} duration={4500} ref={confettiRef} />
				<SageWordmark width={80} />
				<View style={styles.congratulations}>
					<View>
						<Text style={styles.congratulationsGardenName}>{garden?.name}</Text>
						{gardenDaysTimes && gardenDaysTimes.length && renderGardenDaysTimes()}
					</View>
					<View>
						<Text style={styles.congratulationsCongrats}>{lang.createGroup.congratulations.title}</Text>
					</View>
				</View>
				<ButtonGroup>
					<Button
						text={lang.button.home}
						onPress={() => {
							router.replace({ pathname: '/home/my-garden' });
							if (confettiRef.current) confettiRef.current.stopConfetti();
						}}
					/>
				</ButtonGroup>
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
		fontSize: fontSizes.mainHeader,
		fontWeight: 'bold',
	},
});

export default Congratulations;
