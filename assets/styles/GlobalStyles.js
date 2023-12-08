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
		paddingHorizontal: spacing.xlSpacing,
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
		padding: spacing.xlSpacing,
	},
	containerFlex: {
		flex: 1,
	},
	containerScroll: {
		marginBottom: spacing.lgSpacing,
	},
	containerWhite: {
		backgroundColor: colors.white,
	},
	containerMain: {
		gap: spacing.lgSpacing,
	},
	containerMargin: {
		margin: spacing.xlSpacing,
	},
	containerMarginHorizontal: {
		marginHorizontal: spacing.xlSpacing,
	},

	// button
	buttonGroup: {
		gap: spacing.mdSpacing,
		marginHorizontal: spacing.xlSpacing,
	},

	// form
	formContainer: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		marginTop: spacing.xlSpacing,
	},
	formContainerScroll: {
		flex: 1,
		backgroundColor: colors.white,
		marginTop: spacing.xlSpacing,
		marginLeft: spacing.xlSpacing,
		marginRight: spacing.xlSpacing,
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
		marginHorizontal: spacing.xlSpacing,
	},
	formInput: {
		height: 56,
		fontFamily: 'Adelle-Regular',
		padding: spacing.lgSpacing,
		borderRadius: spacing.borderRadius,
		backgroundColor: colors.lightGrey,
		marginHorizontal: spacing.xlSpacing,
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
		marginBottom: spacing.lgSpacing,
		marginHorizontal: spacing.mdSpacing,
	},
	horizontalScroll: {
		paddingBottom: spacing.smSpacing,
	},

	// main screen section
	sectionTitleText: {
		color: colors.black,
		...this.h3,
		paddingHorizontal: spacing.xlSpacing,
	},

	// fonts
	fontBold: {
		fontWeight: 'bold',
	},

	body: {
		fontSize: fontSizes.body,
		fontFamily: 'Adelle-Regular',
		lineHeight: (150 / 100) * fontSizes.body, // Assuming the Figma line-height is a percentage
	},
	mainHeader: {
		fontSize: fontSizes.mainHeader,
		fontFamily: 'Adelle-Bold',
		lineHeight: (150 / 100) * fontSizes.h1,
	},
	h1: {
		fontSize: fontSizes.h1,
		fontFamily: 'Adelle-Bold',
		lineHeight: (150 / 100) * fontSizes.h1,
	},
	h2: {
		fontSize: fontSizes.h2,
		fontFamily: 'Adelle-Semibold',
		lineHeight: (150 / 100) * fontSizes.h2,
	},
	h3: {
		fontSize: fontSizes.h3,
		fontFamily: 'Adelle-Bold',
		lineHeight: (150 / 100) * fontSizes.h3,
	},
	h4: {
		fontSize: fontSizes.h4,
		fontFamily: 'Adelle-Regular',
		lineHeight: (150 / 100) * fontSizes.h4,
	},
	subtitle: {
		fontSize: fontSizes.body, // Assuming subtitle uses the same size as body
		fontFamily: 'Adelle-Bold',
		// Line height 'Auto' typically means it is defaulted or not set
	},
});

export default globalStyles;
