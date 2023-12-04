import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';
import { useState } from 'react';

const TimeSlot = ({ time, lastSlot }) => {
	const [pressed, setPressed] = useState(false);

	return (
		<Pressable
			style={[styles.timeSlot, lastSlot && styles.timeSlotLast, pressed && styles.timeSlotPressed]}
			onPress={() => setPressed((prevState) => !prevState)}
		>
			<Text style={[styles.timeSlotText, pressed && styles.timeSlotTextPressed]}>{time}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	timeSlot: {
		backgroundColor: colors.lightGrey,
		padding: spacing.smSpacing,
		marginRight: spacing.mdSpacing,
		borderRadius: '50%',
	},
	timeSlotLast: {
		marginRight: 0,
	},
	timeSlotPressed: {
		backgroundColor: colors.black,
	},
	timeSlotText: {
		color: colors.black,
		fontSize: fontSizes.body,
	},
	timeSlotTextPressed: {
		color: colors.white,
	},
});

export default TimeSlot;
