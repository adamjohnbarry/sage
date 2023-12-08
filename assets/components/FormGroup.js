import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const FormGroup = ({ label, children, error, help, helpHref, spacing }) => {
	return (
		<View style={[globalStyles.formGroup, spacing && globalStyles.formGroupSpacing]}>
			{label && <Text style={globalStyles.formLabel}>{label}</Text>}
			{children}
			{error && <Text style={globalStyles.formError}>{error}</Text>}
			{help && (
				<View style={globalStyles.formHelpContainer}>
					<Link href={helpHref} style={globalStyles.formHelp}>
						{help}
					</Link>
				</View>
			)}
		</View>
	);
};

export default FormGroup;
