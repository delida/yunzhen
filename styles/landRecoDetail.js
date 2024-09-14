import {StyleSheet} from 'react-native'
import {px2dp} from '../utils/px2dp'

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        backgroundColor: '#FEFFFE',
    },
    imgBox: {
        width: px2dp(335),
        height: px2dp(200),
        alignSelf: 'center',
        marginHorizontal: px2dp(6),
        backgroundColor: 'red',
        // borderWidth: px2dp(2),
        // borderColor: '#BBBBBB'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentBox: {
        width: px2dp(335),
        alignSelf: 'center',
        marginTop: px2dp(20),
    },
    landNameBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#BBBBBB',
        borderBottomWidth: px2dp(0.5),
        paddingBottom: px2dp(6),
        marginTop: px2dp(15),
    },
    landName: {
        fontSize: px2dp(14),
        color: '#505559',
    },
    name: {
        fontSize: px2dp(14),
        color: '#030303',
        marginLeft: px2dp(6),
    },
    diagnosisBox: {
        flexDirection: 'row',
        marginTop: px2dp(15),
        borderBottomWidth: px2dp(0.5),
        borderBottomColor: '#BBBBBB',
    },
    diagnosisTitle: {
        marginTop: px2dp(6),
        color: '#505559',
    },
    diagnosisContent: {
        flexDirection: 'column',
        marginBottom: px2dp(20),
    },
    diagnosisHeader: {
        width: px2dp(270),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrowBox: {
        // width: px2dp(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    arrowTitle: {
        marginRight: px2dp(4),
        color: '#959595',
        fontSize: px2dp(12),
    },
    keyStyle: {
        width: px2dp(200),
        color: '#098643',
        fontSize: px2dp(12),
    },
    createTime: {
        fontSize: px2dp(12),
        marginTop: px2dp(8),
        color: '#333',
    },
});

export default styles

