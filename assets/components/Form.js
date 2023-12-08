import { View } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const Form = ({ children }) => {
	return <View style={globalStyles.form}>{children}</View>;
};

export default Form;
