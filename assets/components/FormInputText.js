import { TextInput } from 'react-native';
import { colors } from '../theme/theme';
import globalStyles from '../styles/GlobalStyles';

const FormInputText = (props) => {
	return <TextInput {...props} style={globalStyles.formInput} placeholderTextColor={colors.darkGrey} />;
};

export default FormInputText;
