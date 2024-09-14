import {StyleSheet} from 'react-native';
import {px2dp} from '../../utils/px2dp';

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
        backgroundColor: '#C2C7CC',
    },
    activeSubmitBox: {
        backgroundColor: 'rgba(77, 171, 109, 0.99)',
    },
    saveText: {
        color: '#fff',
        fontSize: px2dp(15),
        fontWeight: '500',
    },
    textInputWrap: {
        marginTop: px2dp(30),
    },
    textInputBox: {
        marginTop: px2dp(20),
        width: px2dp(315),
        height: px2dp(36),
        alignSelf: 'center',
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(6),
        justifyContent: 'space-between',
        borderRadius: px2dp(3),
    },
    textInputStyle: {
        width: px2dp(200),
    },
});

export default styles;
