import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import globalStyles from '../../assets/styles/GlobalStyles';
import PersonButton from '../../assets/components/PersonButton';
import NotificationCard from './NotificationCard';

export default function Attendance({ type, members, sendInvite }) {
    const [showNotification, setShowNotification] = useState(true);
    const titleMap = {
        attending: 'Attending',
        notAttending: 'Not Attending',
        hasntResponded: "Hasn't Responded"
    };

    function handleClose() {
        setShowNotification(false);
    }

    return (
        <View style={styles.container}>
            <Text style={globalStyles.sectionTitleText}>{titleMap[type]}</Text>
            {type === 'hasntResponded' && showNotification && (
                <NotificationCard message={`Message your group members to encourage them to attend this week!`} onClose={() => handleClose()}/>
            )}
            <ScrollView style={[globalStyles.sectionBodyContainer, globalStyles.horizontalScroll]} horizontal={true}>
                {members.map((member) => (
                    <PersonButton key={member.name} photo={member.photo} firstName={member.name.split(' ')[0]} onPress={sendInvite} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }
});