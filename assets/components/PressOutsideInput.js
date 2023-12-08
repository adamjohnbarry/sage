import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const PressOutsideInput = ({ children }) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={globalStyles.containerFlex}>{children}</View>
		</TouchableWithoutFeedback>
	);
};

export default PressOutsideInput;
