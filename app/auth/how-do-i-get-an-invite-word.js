import { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LangContext } from '../../assets/contexts/Contexts';
import InviteWordHelp from '../../assets/images/invite-word-help.png';
import { fontSizes, spacing } from '../../assets/theme/theme';

const HowDoIGetAnInviteWord = () => {
	const { lang } = useContext(LangContext);

	return (
		<View style={[styles.howDoIGetAnInviteWord]}>
			<Text style={styles.howDoIGetAnInviteWordTitle}>{lang.auth.howDoIGetAnInviteWord.title}</Text>
			<Text style={styles.howDoIGetAnInviteWordDescription}>{lang.auth.howDoIGetAnInviteWord.description}</Text>
			<Image source={InviteWordHelp} resizeMode='stretch' style={styles.howDoIGetAnInviteWordImage} />
		</View>
	);
};

const styles = StyleSheet.create({
	howDoIGetAnInviteWord: {
		flex: 1,
		paddingTop: spacing.xlSpacing,
		paddingHorizontal: spacing.lgSpacing,
		gap: spacing.lgSpacing,
	},
	howDoIGetAnInviteWordTitle: {
		fontSize: fontSizes.h2,
		fontWeight: 'bold',
	},
	howDoIGetAnInviteWordDescription: {
		fontSize: fontSizes.body,
	},
	howDoIGetAnInviteWordImage: {
		width: '100%',
		borderRadius: spacing.borderRadius,
	},
});

export default HowDoIGetAnInviteWord;
