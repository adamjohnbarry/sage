import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fontSizes } from '../theme/theme';

const Button = ({ onPress, text, disabled, color = 'black' }) => {
	let buttonStyle;
	let buttonTextStyle;

	switch (color) {
		case 'grey':
			buttonStyle = styles.buttonGrey;
			buttonTextStyle = styles.buttonGreyText;
			break;
		case 'white':
			buttonStyle = styles.buttonWhite;
			buttonTextStyle = styles.buttonWhiteText;
			break;
		case 'green':
			buttonStyle = styles.buttonGreen;
			buttonTextStyle = styles.buttonGreenText;
			break;
		case 'red':
			buttonStyle = styles.buttonRed;
			buttonTextStyle = styles.buttonRedText;
			break;
		case 'black':
			buttonStyle = styles.buttonBlack;
			buttonTextStyle = styles.buttonBlackText;
			break;
	}

	return (
		<TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, buttonStyle]}>
			<Text style={[styles.buttonText, buttonTextStyle]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 56,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.black,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonGrey: {
		backgroundColor: colors.darkGrey,
		borderWidth: 1,
		borderColor: colors.darkGrey,
	},
	buttonWhite: {
		backgroundColor: colors.white,
	},
	buttonGreen: {
		backgroundColor: colors.primary,
	},
	buttonRed: {
		backgroundColor: colors.errorLight,
		borderWidth: 1,
		borderColor: colors.errorLight,
	},
	buttonBlack: {
		backgroundColor: colors.black,
	},
	buttonText: {
		fontSize: fontSizes.body,
		fontWeight: 'bold',
	},
	buttonGreyText: {
		color: colors.white,
	},
	buttonWhiteText: {
		color: colors.black,
	},
	buttonGreenText: {
		color: colors.black,
	},
	buttonRedText: {
		color: colors.error,
	},
	buttonBlackText: {
		color: colors.white,
	},
});

export default Button;
