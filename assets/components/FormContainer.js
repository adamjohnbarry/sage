import { View } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const FormContainer = ({ children, safeArea }) => {
	return (
		<View style={[globalStyles.containerFlex, globalStyles.containerWhite, { paddingBottom: safeArea.paddingBottom }]}>
			<View style={globalStyles.formContainer}>{children}</View>
		</View>
	);
};

export default FormContainer;
