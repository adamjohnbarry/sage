import { View } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const ButtonGroup = ({ children }) => {
	return <View style={globalStyles.buttonGroup}>{children}</View>;
};

export default ButtonGroup;
