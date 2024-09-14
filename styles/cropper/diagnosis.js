import {StyleSheet, Platform} from 'react-native'
import {px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    diagnosis: {
        flex: 1,
    },
    diagnosisContent: {
        width: px2dp(335),
        alignSelf: 'center',
        marginTop: px2dp(14),
        marginBottom: Platform.OS === 'ios' ? px2dp(6) : px2dp(10), // fix android 底部塌陷
    },
    itemBox: {
        marginTop: px2dp(16),
        borderBottomColor: '#BBBBBB',
        borderBottomWidth: px2dp(0.5),
        paddingBottom: px2dp(4),
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: '#505559',
        fontSize: px2dp(14),
    },
    desc: {
        fontSize: px2dp(14),
        color: '#030303',
    },
    store: {
        width: px2dp(270),
        color: '#4DAB6D',
        fontSize: px2dp(12),
    },
    fotter: {
        marginTop: px2dp(60),
        alignItems: 'flex-end',
    },
    // modal
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
