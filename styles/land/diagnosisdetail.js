import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    diagnosisContainer: {
        flex: 1,
    },
    modalBox: {
        // flex: 1,
        marginTop: px2dp(100),
    },
    showText: {
        width: '100%',
        height: px2dp(400),
        backgroundColor: '#fff',
    },
    lenBox: {
        width: px2dp(335),
        height: px2dp(485),
        alignSelf: 'center',
        marginTop: px2dp(18),
        borderWidth: px2dp(0.5),
        borderColor: '#4DAB6D',
    },
    topHeader: {
        height: px2dp(37),
        backgroundColor: '#4DAB6D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topText: {
        fontSize: px2dp(16),
        color: '#fff',
    },
    saveBox: {
        marginTop: px2dp(30),
        width: px2dp(335),
        alignSelf: 'center',
        alignItems: 'flex-end',
    },
    resultBox: {
        height: px2dp(32),
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: px2dp(0.5),
        borderBottomColor: '#BBBBBB',
        paddingLeft: px2dp(8),
    },
    resultTitle: {
        color: '#505559',
        fontSize: px2dp(14),
    },
    resultDesc: {
        color: '#030303',
        fontSize: px2dp(14),
        marginLeft: px2dp(4),
    },
    program: {
        height: px2dp(36),
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: px2dp(0.5),
        borderBottomColor: '#BBBBBB',
        paddingLeft: px2dp(8),
    },
    fangfa: {
        marginTop: px2dp(10),
        flexDirection: 'row',
        paddingLeft: px2dp(8),
        marginBottom: px2dp(20),
    },
    week: {
        marginLeft: px2dp(3),
        marginBottom: px2dp(20),
        color: '#505559',
        fontSize: px2dp(14),
    },
    dateBox: {
        height: px2dp(40),
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: px2dp(8),
    },
    dateTitle: {
        color: '#ADB4B9',
        fontSize: px2dp(14),
    },
    dateDesc: {
        color: '#ADB4B9',
        fontSize: px2dp(12),
        marginLeft: px2dp(4),
    },
    keyStoreText: {
        width: px2dp(246),
        color: '#4DAB6D',
        fontSize: px2dp(12),
        marginLeft: px2dp(4),
    },
    // modal 2
    diagnosisModal: {
        backgroundColor: '#fff',
        width: px2dp(260),
        alignSelf: 'center',
        borderRadius: px2dp(6),
        height: px2dp(140),
        alignItems: 'center',
    },
    modalTitle: {
        marginVertical: px2dp(10),
        fontSize: px2dp(16),
        color: '#333',
        fontWeight: '600',
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px2dp(10),
    },
    addressl: {
        fontSize: px2dp(12),
    },
    addressr: {
        marginLeft: px2dp(6),
        fontSize: px2dp(12),
    },
    dealer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px2dp(10),
    },
    dealerl: {
        fontSize: px2dp(12),
    },
    dealerr: {
        marginLeft: px2dp(6),
        fontSize: px2dp(12),
    },
    tel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px2dp(10),
    },
    tell: {
        fontSize: px2dp(12),
    },
    telr: {
        marginLeft: px2dp(6),
        fontSize: px2dp(12),
    },
    confirm: {
        marginTop: px2dp(3),
    },
    confirmText: {
        color: '#4DAB6D',
        fontSize: px2dp(14),
    },
});


export default styles
