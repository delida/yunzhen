import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    addLandContainer: {
        flex: 1,
    },
    saveBox: {
        position: 'absolute',
        bottom: '28%',
        width: px2dp(313),
        height: px2dp(44),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(77, 171, 109, 0.99)',
    },
    saveText: {
        color: '#fff',
        fontSize: px2dp(16),
    },
    elementBox: {},
    seleOpt: {
        flexDirection: 'row',
        width: px2dp(325),
        alignSelf: 'center',
    },
    seleOptText: {
        width: px2dp(64),
        fontSize: px2dp(14),
        color: '#505559',
        fontWeight: '600',
    },
    seleOptInpt: {
        borderWidth: px2dp(0.5),
        borderColor: '#BBBBBB',
        flexDirection: 'row',
        alignItems: 'center',
        width: px2dp(255),
        alignSelf: 'center',
        height: px2dp(25),
        marginLeft: px2dp(8),
        borderRadius: px2dp(2),
        paddingLeft: px2dp(6),
        justifyContent: 'space-between',
        marginBottom: px2dp(10),
    },
    cityText: {
        color: '#888',
    },
    arrowdown: {
        marginRight: px2dp(8)
    }
});


export default styles
