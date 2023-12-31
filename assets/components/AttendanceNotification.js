// AttendanceCard.js
import { FontAwesome5 } from '@expo/vector-icons';
import { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../assets/styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';
import { LangContext } from '../contexts/Contexts';

const AttendanceNotification = ({ onYesPress, onNoPress, onCancelPress }) => {
	const { lang } = useContext(LangContext);

	return (
		<View style={styles.container}>
			<View style={styles.cardHeader}>
				<Text style={styles.cardTextMain}>{lang.myGarden.attendanceNotification.areYouComing}</Text>
				<TouchableOpacity onPress={onCancelPress}>
					<View style={styles.cardHeaderCancel}>
						<FontAwesome5 name='times' size={fontSizes.body} color={colors.white} />
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.cardButtonGroup}>
				<TouchableOpacity onPress={onYesPress} style={styles.cardButton}>
					<View style={[styles.cardButtonIcon, styles.cardButtonYes]}>
						<FontAwesome5 name='check' size={fontSizes.body} color={colors.white} />
					</View>
					<Text style={styles.cardButtonText}>{lang.myGarden.attendanceNotification.yes}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={onNoPress} style={styles.cardButton}>
					<View style={[styles.cardButtonIcon, styles.cardButtonNo]}>
						<FontAwesome5 name='times' size={fontSizes.body} color={colors.white} />
					</View>
					<Text style={styles.cardButtonText}>{lang.myGarden.attendanceNotification.no}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cardHeaderCancel: {
		width: spacing.xlSpacing,
		height: spacing.xlSpacing,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white + '25',
		borderRadius: 50,
	},
	cardTextMain: {
		...globalStyles.subtitle,
		color: colors.white,
	},
	cardButtonGroup: {
		flexDirection: 'row',
		marginTop: spacing.smSpacing,
		gap: spacing.mdSpacing,
	},
	cardButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.white + '25',
		padding: spacing.smSpacing,
		paddingHorizontal: spacing.mdSpacing,
		borderRadius: 50,
	},
	cardButtonIcon: {
		width: spacing.xlSpacing,
		height: spacing.xlSpacing,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
	},
	cardButtonText: {
		...globalStyles.fontBold,
		color: colors.white,
		paddingLeft: spacing.smSpacing,
	},
	cardButtonYes: {
		backgroundColor: colors.success,
	},
	cardButtonNo: {
		backgroundColor: colors.error,
	},
	container: {
		backgroundColor: colors.secondary,
		padding: spacing.lgSpacing,
		marginRight: spacing.mdSpacing,
		borderRadius: spacing.lgSpacing,
		justifyContent: 'center',
		height: 104,
		width: Dimensions.get('window').width - 2 * spacing.xlSpacing,
	},
});

export default AttendanceNotification;
