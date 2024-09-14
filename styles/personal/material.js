import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    submitBox: {
        marginTop: px2dp(50),
        width: px2dp(313),
        height: px2dp(40),
        borderRadius: px2dp(3),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(77, 171, 109, 0.99)',
    },
    saveText: {
        color: '#fff',
        fontSize: px2dp(15),
        fontWeight: '500',
    },
    // keyStore & address styles
    saveModelBox: {
        width: px2dp(335),
        height: px2dp(180),
        backgroundColor: '#fff',
        borderRadius: px2dp(3),
        padding: px2dp(20),
    },
    keyStoreBox: {
        marginTop: px2dp(8),
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: px2dp(6),
    },
    addressBox: {
        marginTop: px2dp(8),
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: px2dp(6),
    },
    saveBottonBox: {
        marginTop: px2dp(30),
        width: px2dp(280),
        height: px2dp(40),
        borderRadius: px2dp(3),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(77, 171, 109, 0.99)',
    },
    saveModalContent: {
        backgroundColor: '#ddd',
        padding: px2dp(6),
        minWidth: px2dp(230),
        borderRadius: px2dp(2),
    },
});

export default styles
