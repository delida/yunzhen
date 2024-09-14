import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    keyContainer: {
        flex: 1,
        backgroundColor: '#F2F4F7',
    },
    copyBox: {
        backgroundColor: '#fff',
        paddingVertical: px2dp(19),
        paddingHorizontal: px2dp(33),
    },
    keyBox: {
        width: px2dp(313),
        alignSelf: 'center',
        backgroundColor: '#F2F4F7',
        marginTop: px2dp(27),
        marginBottom: px2dp(45),
        paddingVertical: px2dp(10),
        paddingHorizontal: px2dp(10),
    },
    key: {
        color: '#505559',
        fontSize: px2dp(12),
        lineHeight: px2dp(18),
    },
    exportBox: {
        backgroundColor: '#4DAB6D',
        width: px2dp(313),
        height: px2dp(44),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    saveText: {
        color: '#fff',
        fontSize: px2dp(16),
    },
})

export default styles
