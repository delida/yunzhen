import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'


const styles = StyleSheet.create({
    landContainer: {
        flex: 1,
        backgroundColor: '#FEFFFE',
    },
    landImg: {
        marginTop: px2dp(3),
        width: px2dp(335),
        alignSelf: 'center',
        height: px2dp(120),
    },
    addlandBox: {
        width: px2dp(335),
        alignSelf: 'center',
        marginTop: px2dp(13),
        borderBottomWidth: px2dp(0.5),
        borderBottomColor: '#BBBBBB',
        paddingBottom: px2dp(8),
    },
    addLandText: {
        fontSize: px2dp(17),
        color: '#098643',
    },
    loading: {
        alignSelf: 'center',
        marginTop: px2dp(10)
    }
});


export default styles
