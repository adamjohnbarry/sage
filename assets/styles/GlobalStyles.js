import { StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

const globalStyles = StyleSheet.create({
	// background image
	backgroundImage: {
		flex: 1,
	},

	// header
	header: {
		backgroundColor: colors.primary,
		padding: spacing.lgSpacing,
		gap: spacing.xlSpacing,
	},
	headerNavigation: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerBody: {
		gap: spacing.lgSpacing,
	},
	headerTitle: {
		fontSize: fontSizes.h1,
		fontWeight: 'bold',
	},
	headerDescription: {
		fontSize: fontSizes.body,
		lineHeight: spacing.xlSpacing,
	},
	headerBack: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.mdSpacing,
	},
	headerBackText: {
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
	headerIndex: {
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},

	// container
	container: {
		flex: 1,
		backgroundColor: colors.white,
		margin: spacing.lgSpacing,
	},
	containerFlex: {
		flex: 1,
	},
	containerScroll: {
		flex: 1,
		flexGrow: 1,
		marginBottom: spacing.xlSpacing,
	},
	containerWhite: {
		backgroundColor: colors.white,
	},
	containerMain: {
		gap: spacing.lgSpacing,
	},
	containerMargin: {
		margin: spacing.lgSpacing,
	},
	containerMarginHorizontal: {
		marginHorizontal: spacing.lgSpacing,
	},

	// button
	buttonGroup: {
		gap: spacing.mdSpacing,
	},

	// form
	formContainer: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		marginTop: spacing.lgSpacing,
		marginLeft: spacing.lgSpacing,
		marginRight: spacing.lgSpacing,
	},
	formContainerScroll: {
		flex: 1,
		backgroundColor: colors.white,
		marginTop: spacing.lgSpacing,
		marginLeft: spacing.lgSpacing,
		marginRight: spacing.lgSpacing,
	},
	form: {
		flex: 1,
		gap: spacing.xlSpacing,
	},
	formGroup: {
		gap: spacing.smSpacing,
	},
	formGroupSpacing: {
		marginBottom: spacing.xlSpacing,
	},
	formLabel: {
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
	formInput: {
		height: 56,
		padding: spacing.mdSpacing,
		borderRadius: spacing.borderRadius,
		backgroundColor: colors.lightGrey,
	},
	formError: {
		color: colors.error,
	},
	formHelpContainer: {
		alignItems: 'flex-end',
	},
	formHelp: {
		color: colors.darkGrey,
		fontSize: fontSizes.body,
		textDecorationLine: 'underline',
	},

	// scroll list
	verticalScroll: {
		height: '100%',
	},
	horizontalScroll: {
		paddingBottom: spacing.smSpacing,
	},

	// main screen section
	sectionTitleText: {
		color: colors.black,
		fontSize: fontSizes.h3,
		fontWeight: 'bold',
	},
	sectionBodyContainer: {
		marginTop: spacing.lgSpacing,
	},

	// fonts
	fontBold: {
		fontWeight: 'bold',
	},
});

export default globalStyles;
