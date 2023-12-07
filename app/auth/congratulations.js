import { StyleSheet, Text, View } from 'react-native';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { Stack, useRouter } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';
import { useUser } from '../../assets/contexts/UserContext';
import Confetti from 'react-native-confetti';
import { SageWordmark } from '../../assets/icons/sagewordmark';

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
				if (confettiRef.current && success) {
					confettiRef.current.startConfetti();
				}
			} catch (e) {
				console.error(e);
				setError('There was an error create your garden. Please try again.');
			} finally {
				setIsLoading(false);
			}
		};
		submitData();
	}, []);

	if (isLoading) {
		return (
			<View style={[styles.congratulationsContainer, { paddingTop: safeArea.paddingTop, paddingBottom: safeArea.paddingBottom }]}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={[styles.congratulationsContainer, { paddingTop: safeArea.paddingTop, paddingBottom: safeArea.paddingBottom }]}>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<>
			{/* hide the header for this screen */}
			<Stack.Screen options={{ headerShown: false }} />
			{/* the main congratulations content for the container */}
			<View style={[styles.congratulationsContainer, { paddingTop: safeArea.paddingTop, paddingBottom: safeArea.paddingBottom }]}>
				<Confetti confettiCount={400} duration={4500} ref={confettiRef} />
				<SageWordmark width={80}/>
				<View style={styles.congratulations}>
					<View>
						<Text style={styles.congratulationsGardenName}>{garden?.name}</Text>
						{gardenDaysTimes && gardenDaysTimes.length && gardenDaysTimes?.map((gardenDayTime, index) => {
							const { days, times } = gardenDayTime;
							return (
								<Text key={index} style={styles.congratulationsGardenTime}>
									{days} @ {times}
								</Text>
							);
						})}
					</View>
					<View>
						<Text style={styles.congratulationsCongrats}>{lang.createGroup.congratulations.title}</Text>
					</View>
				</View>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.home} onPress={() => { router.replace({ pathname: '/home/my-garden' }); if (confettiRef.current) confettiRef.current.stopConfetti(); }} />
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
		fontSize: fontSizes.mainHeader,
		fontWeight: 'bold',
	},
});

export default Congratulations;
