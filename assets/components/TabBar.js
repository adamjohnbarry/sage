import { StyleSheet, View, Text, Touchable } from 'react-native';
import { colors, spacing } from '../theme/theme';
import { useRouter } from 'expo-router';
import { usePathname } from 'expo-router';
import Learn from '../icons/Learn';
import MyGarden from '../icons/MyGarden';
import Settings from '../icons/Settings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';

const TabBar = ({ safeArea }) => {
    const router = useRouter();
    const currentPath = usePathname();
    const isActive = (path) => currentPath === path;

    const iconColor = (path) => (isActive(path) ? 'black' : 'rgba(0,0,0,0.5)');

    return (
        <BlurView intensity={90} tint="light" style={[styles.tabBar, { paddingBottom: safeArea.paddingBottom }]}>
            { /* Learn Tab */}
            <TouchableOpacity
                style={styles.tabContainer}
                onPress={() => router.replace({
                    pathname: '/home/learn',
                    params: {
                        title: 'Learn',
                        description: 'Hi',
                    },
                })}>
                <Learn color={iconColor('/home/learn')} />
                <Text style={[styles.tabText, isActive('/home/learn') ? styles.activeTabText : styles.inactiveTabText]}>
                    Learn
                </Text>
            </TouchableOpacity>

            { /* My Garden Tab */}
            <TouchableOpacity
                style={styles.tabContainer}
                onPress={() => router.replace({
                    pathname: '/home/my-garden',
                    params: {
                        title: 'My Garden',
                        description: 'Hi',
                    },
                })}>
                <MyGarden color={iconColor('/home/my-garden')} />
                <Text style={[styles.tabText, isActive('/home/my-garden') ? styles.activeTabText : styles.inactiveTabText]}>
                    My Garden
                </Text>
            </TouchableOpacity>

            { /* Settings Tab */}
            <TouchableOpacity
                style={styles.tabContainer}
                onPress={() => router.replace({
                    pathname: '/home/settings',
                    params: {
                        title: 'Settings',
                        color: colors.white,
                    },
                })}>
                <Settings color={iconColor('/home/settings')} />
                <Text style={[styles.tabText, isActive('/home/settings') ? styles.activeTabText : styles.inactiveTabText]}>
                    Settings
                </Text>
            </TouchableOpacity>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: spacing.smSpacing,
        backgroundColor: 'rgba(189,223,80,.5)',
    },
    tabContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabText: {
        paddingTop: 2,
        fontWeight: 'bold',
    },
    activeTabText: {
        color: 'black', // Active tab text color
    },
    inactiveTabText: {
        color: 'rgba(0,0,0,0.5)', // Inactive tab text color
    },
});

export default TabBar;

