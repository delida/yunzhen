import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    changePassword: {
        flex: 1,
        backgroundColor: '#F2F4F7',
    },
    submitBox: {
        marginTop: px2dp(133),
        width: px2dp(313),
        height: px2dp(40),
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: px2dp(3),
        justifyContent: 'center',
        backgroundColor: 'rgba(77, 171, 109, 0.99)',
    },
    saveText: {
        color: '#fff',
        fontSize: px2dp(16),
        fontWeight: '500',
    },
});

export default styles
