import {StyleSheet} from 'react-native'
import {height, px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    cropSetting: {
        flex: 1,
        height: height,
    },
    cropBox: {
        width: px2dp(335),
        alignSelf: 'center',
        paddingVertical: px2dp(10),
        borderBottomColor: '#BBBBBB',
        borderBottomWidth: px2dp(0.5),
        paddingBottom: px2dp(10),
    },
    cropTopBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        width: px2dp(3),
        height: px2dp(19),
        backgroundColor: '#4DAB6D',
    },
    cropTopTitle: {
        paddingHorizontal: px2dp(10),
        color: '#030303',
        fontSize: px2dp(17),
    },
    cropDesc: {
        color: '#505559',
        fontSize: px2dp(12),
        marginHorizontal: px2dp(16),
        marginTop: px2dp(16),
        marginBottom: px2dp(10),
    },
    cropKeyStore: {
        width: px2dp(280),
        color: '#ADB4B9',
        fontSize: px2dp(12),
        marginHorizontal: px2dp(16),
    },
    fotter: {
        width: px2dp(335),
        alignSelf: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: px2dp(120),
    },
    saveBox: {
        width: px2dp(335),
        alignSelf: 'center',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        bottom: px2dp(120),
    },
    cropSelectBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px2dp(14),
    },
    aCropSelectBox: {
        paddingBottom: px2dp(10),
        borderBottomColor: '#BBBBBB',
        borderBottomWidth: px2dp(0.5),
    },
    dropBox: {
        width: px2dp(88),
        height: px2dp(30),
        borderColor: '#BBBBBB',
        borderWidth: px2dp(0.5),
        borderRadius: px2dp(6),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: px2dp(6),
    },
    selectWrap: {
        width: px2dp(335),
        alignSelf: 'center',
        marginVertical: px2dp(26),
    },
    selectName: {
        color: '#505559',
        marginRight: px2dp(12),
        fontSize: px2dp(14),
    },
    mu: {
        paddingLeft: px2dp(8),
        color: '#000000',
        opacity: 0.65,
        fontSize: px2dp(14),
    },
    diagnosisBox: {
        width: px2dp(335),
        alignSelf: 'center',
    },
    diagnosis: {
        color: '#098643',
        fontSize: px2dp(14),
        marginTop: px2dp(80),
    },
    diagnosisContent: {
        marginTop: px2dp(13),
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressText: {
        color: '#8C8C8C',
        fontSize: px2dp(14),
    },
    dropdownStyle: {
        width: px2dp(80)
    }
});


export default styles
