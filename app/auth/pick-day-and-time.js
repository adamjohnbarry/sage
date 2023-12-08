import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import ContainerScroll from '../../assets/components/ContainerScroll';
import FormContainer from '../../assets/components/FormContainer';
import FormGroup from '../../assets/components/FormGroup';
import TimeSlot from '../../assets/components/TimeSlot';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { useUser } from '../../assets/contexts/UserContext';
import globalStyles from '../../assets/styles/GlobalStyles';

const PickDayAndTime = () => {
	const router = useRouter();
	const { setGardenDaysTimes } = useUser();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	const [selectedTimes, setSelectedTimes] = useState();

	function handleTimeSelection(day, time) {
		// create a copy of the current state
		const newSelectedTimes = { ...selectedTimes };

		// check if the day already exists
		if (newSelectedTimes[day]) {
			// if the time is already selected, remove it
			if (newSelectedTimes[day].includes(time)) {
				newSelectedTimes[day] = newSelectedTimes[day].filter((item) => item !== time);
			} else {
				// if the time is not selected, add it
				newSelectedTimes[day].push(time);
			}
		} else {
			// if the day doesn't exist, add the day with the time
			newSelectedTimes[day] = [time];
		}

		// update the state with the new object
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
		<FormContainer safeArea={safeArea}>
			<ContainerScroll>
				{lang.createGroup.pickDayAndTime.days.map((day, i) => (
					<FormGroup key={i} spacing={i != lang.createGroup.pickDayAndTime.days.length - 1}>
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
					</FormGroup>
				))}
			</ContainerScroll>
			<ButtonGroup>
				<Button text={lang.button.continue} color={selectedTimes ? 'black' : 'grey'} disabled={selectedTimes ? false : true} onPress={setGardenDayAndTime} />
			</ButtonGroup>
		</FormContainer>
	);
};

export default PickDayAndTime;
