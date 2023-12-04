import { Text, View } from 'react-native';
import { useContext } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';
import TimeSlot from '../../assets/components/TimeSlot';
import { ScrollView } from 'react-native-gesture-handler';
import { getFirestore } from 'firebase/firestore';

const PickDayAndTime = () => {
	const router = useRouter();
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	// set the days and times for the garden's meetings
	const setGardenDayAndTime = async () => {
		const db = getFirestore();

		try {
			// await updateDoc(userRef, {
			// 	days,
			// 	times,
			// });
		} catch (err) {
			console.log(`${err.code}: ${err.message}`);
		}

		router.push({
			pathname: '/auth/invite-friends',
			params: { index: 7, title: lang.createGroup.inviteFriends.title, description: lang.createGroup.inviteFriends.description },
		});
	};

	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { marginBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>
				<ScrollView style={[globalStyles.containerScroll]}>
					{lang.createGroup.pickDayAndTime.days.map((day, i) => (
						<View
							key={i}
							style={[globalStyles.formGroup, globalStyles.formGroupSpacing, i == lang.createGroup.pickDayAndTime.days.length - 1 && { marginBottom: 0 }]}
						>
							<Text style={globalStyles.formLabel}>{day}</Text>
							<ScrollView style={globalStyles.horizontalScroll} horizontal={true}>
								{lang.createGroup.pickDayAndTime.times.map((time, i) => (
									<TimeSlot key={i} time={time} lastSlot={i == lang.createGroup.pickDayAndTime.times.length - 1 ? true : false} />
								))}
							</ScrollView>
						</View>
					))}
				</ScrollView>
				<View style={globalStyles.buttonGroup}>
					<Button text={lang.button.continue} onPress={setGardenDayAndTime} />
				</View>
			</View>
		</View>
	);
};

export default PickDayAndTime;
