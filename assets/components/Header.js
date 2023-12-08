import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useUser } from '../contexts/UserContext';
import globalStyles from '../styles/GlobalStyles';
import { colors, fontSizes, spacing } from '../theme/theme';

const Header = ({ navigation, route, safeArea }) => {
  const { garden, gardenDaysTimes } = useUser();

  const formatGardenSchedule = (gardenDaysTimes) => {
    return Object.entries(gardenDaysTimes || {})
      .map(([day, times]) => `${day}: ${times.join(', ')}`)
      .join('; ');
  };

  // Extract garden details or provide default values
  const gardenName = garden?.name || 'My Garden';
  const gardenAddress = garden?.address || '45 University Ave, PA';

  let title = route.name == 'my-garden' ? gardenName : route.params?.title || '';
  let color = route.params?.color || colors.primary;
  let hasBackButton = route.params?.hasBackButton || false;

  return (
    <View style={[globalStyles.header, { paddingTop: safeArea.paddingTop + spacing.lgSpacing, backgroundColor: color }]}>
      {hasBackButton && (
        <View style={globalStyles.headerNavigation}>
          <Pressable style={globalStyles.headerBack} onPress={() => navigation.goBack()}>
            <FontAwesome5 name='long-arrow-alt-left' size={fontSizes.h3} color={colors.black} />
            <Text style={[globalStyles.fontBold, { fontSize: fontSizes.body }]}>Back</Text>
          </Pressable>
        </View>
      )}
      <View style={globalStyles.headerBody}>
        <Text style={globalStyles.h1}>{title}</Text>
        {/* {gardenAddress && route.name === 'my-garden' && (
          <Text style={[globalStyles.body, { fontSize: fontSizes.body }]}>
            Meets at <Text style={globalStyles.fontBold}>{gardenAddress}</Text>
            {gardenDaysTimes && (
              <Text>
                {' '}
                on <Text style={globalStyles.fontBold}>{formatGardenSchedule(gardenDaysTimes)}</Text>
              </Text>
            )}
          </Text>
        )} */}
      </View>
    </View>
  );
};

export default Header;
