import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PersonButton from '../../assets/components/PersonButton';
import globalStyles from '../../assets/styles/GlobalStyles';
import NotificationCard from './NotificationCard';
import { spacing } from '../theme/theme';

export default function Attendance({ type, members, sendInvite }) {
	const [showNotification, setShowNotification] = useState(true);
	const titleMap = {
		attending: 'Attending',
		notAttending: 'Not Attending',
		hasntResponded: "Hasn't Responded",
	};

	function handleClose() {
		setShowNotification(false);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{titleMap[type]}</Text>
			{type === 'hasntResponded' && showNotification && (
				<NotificationCard message={`Message your group members to encourage them to attend this week!`} onClose={() => handleClose()} />
			)}
			<ScrollView style={globalStyles.horizontalScroll} horizontal={true}>
				{members.map((member) => (
					<PersonButton key={member.name} photo={member.photo} firstName={member.name.split(' ')[0]} onPress={sendInvite} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.lgSpacing,
		gap: spacing.mdSpacing
	},
	title: {
		...globalStyles.h3,
		marginHorizontal: spacing.xlSpacing,
	},

});
