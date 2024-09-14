import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    editContainer: {
        flex: 1,
        backgroundColor: '#F2F4F7',
    },
    submitBox: {
        marginTop: px2dp(133),
        width: px2dp(323),
        height: px2dp(40),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: px2dp(3),
        backgroundColor: 'rgba(77, 171, 109, 0.99)',
    },
    saveText: {
        color: '#fff',
        fontSize: px2dp(16),
        fontWeight: '500',
    },
});


export default styles
