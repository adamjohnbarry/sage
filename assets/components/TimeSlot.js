import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

const TimeSlot = ({ time, lastSlot, onSelect }) => {
	const [pressed, setPressed] = useState(false);

	const handlePress = () => {
		setPressed((prevState) => !prevState);
		if (onSelect) {
			onSelect(time, !pressed); // passing the new state of pressed
		}
	};

	return (
		<Pressable style={[styles.timeSlot, lastSlot && styles.timeSlotLast, pressed && styles.timeSlotPressed]} onPress={handlePress}>
			<Text style={[styles.timeSlotText, pressed && styles.timeSlotTextPressed]}>{time}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	timeSlot: {
		backgroundColor: colors.lightGrey,
		paddingVertical: spacing.smSpacing,
		paddingHorizontal: spacing.mdSpacing,
		marginRight: spacing.smSpacing,
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
