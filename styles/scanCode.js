import {StyleSheet} from 'react-native'
import {px2dp} from '../utils/px2dp'

const styles = StyleSheet.create({
    scanCodeContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    backStyle: {
        marginTop: px2dp(12),
        marginLeft: px2dp(8)
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangle: {
        height: px2dp(200),
        width: px2dp(200),
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: px2dp(10),
    },
    border: {
        flex: 0,
        width: px2dp(200),
        height: px2dp(2),
        backgroundColor: '#00FF00',
    },
});

export default styles
