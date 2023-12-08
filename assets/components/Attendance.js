import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PersonButton from '../../assets/components/PersonButton';
import globalStyles from '../../assets/styles/GlobalStyles';
import { LangContext } from '../contexts/Contexts';
import { spacing } from '../theme/theme';
import NotificationCard from './NotificationCard';

export default function Attendance({ type, members, onMemberTap }) {
	const [showNotification, setShowNotification] = useState(true);
	const { lang } = useContext(LangContext);

	const titleMap = {
		attending: lang.myGarden.sections.attending,
		notAttending: lang.myGarden.sections.notAttending,
		hasntResponded: lang.myGarden.sections.hasntResponded,
	};

	function handleClose() {
		setShowNotification(false);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{titleMap[type]}</Text>
			{type === 'hasntResponded' && showNotification && <NotificationCard message={lang.myGarden.notification.message} onClose={() => handleClose()} />}
			<ScrollView style={styles.scroll} horizontal={true}>
				{members.map((member) => (
					<PersonButton key={member.name} member={member} onMemberTap={onMemberTap} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.lgSpacing,
		gap: spacing.mdSpacing,
	},
	title: {
		...globalStyles.h3,
		marginHorizontal: spacing.xlSpacing,
	},
	scroll: {
		paddingHorizontal: spacing.xlSpacing,
	},
});
