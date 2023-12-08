import { Image, StyleSheet } from 'react-native';
import { spacing } from '../theme/theme';

const FormPhoto = ({ source }) => {
	return <Image source={{ uri: source }} style={styles.formPhoto}></Image>;
};

const styles = StyleSheet.create({
	formPhoto: {
		height: 112,
		aspectRatio: 1 / 1,
		borderRadius: 56,
		marginHorizontal: spacing.xlSpacing,
	},
});

export default FormPhoto;
