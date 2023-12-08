import { View } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const ContainerScroll = ({ children }) => {
	return <View style={globalStyles.containerScroll}>{children}</View>;
};

export default ContainerScroll;
