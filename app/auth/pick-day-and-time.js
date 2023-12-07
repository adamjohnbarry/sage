import { Text, View } from 'react-native';
import { useContext, useState } from 'react';
import Button from '../../assets/components/Button';
import globalStyles from '../../assets/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import TimeSlot from '../../assets/components/TimeSlot';
import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '../../assets/contexts/UserContext';

const PickDayAndTime = () => {
	const router = useRouter();
	const { setGardenDaysTimes } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [selectedTimes, setSelectedTimes] = useState([]);

	function handleTimeSelection(day, time) {
		// Create a copy of the current state
		const newSelectedTimes = { ...selectedTimes };

		// Check if the day already exists
		if (newSelectedTimes[day]) {
			// If the time is already selected, remove it
			if (newSelectedTimes[day].includes(time)) {
				newSelectedTimes[day] = newSelectedTimes[day].filter((item) => item !== time);
			} else {
				// If the time is not selected, add it
				newSelectedTimes[day].push(time);
			}
		} else {
			// If the day doesn't exist, add the day with the time
			newSelectedTimes[day] = [time];
		}

		// Update the state with the new object
		setSelectedTimes(newSelectedTimes);
	}

	// set the days and times for the garden's meetings
	const setGardenDayAndTime = async () => {
		try {
			setGardenDaysTimes(selectedTimes);
			router.push({
				pathname: '/auth/invite-friends',
				params: { index: 7, title: lang.createGroup.inviteFriends.title, description: lang.createGroup.inviteFriends.description },
			});
		} catch (err) {
			console.log(`${err.code}: ${err.message}`);
		}
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
									<TimeSlot
										key={i}
										time={time}
										onSelect={() => handleTimeSelection(day, time)}
										lastSlot={i == lang.createGroup.pickDayAndTime.times.length - 1 ? true : false}
									/>
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
