import { TextInput } from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import { colors } from '../theme/theme';

const FormInputText = (props) => {
	return <TextInput {...props} style={globalStyles.formInput} placeholderTextColor={colors.darkGrey} />;
};

export default FormInputText;
