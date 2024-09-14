import {StyleSheet} from 'react-native'
import {px2dp} from '../../utils/px2dp'

const styles = StyleSheet.create({
    cropContainer: {
        flex: 1,
    },
    cropImg: {
        marginTop: px2dp(3),
        width: px2dp(335),
        alignSelf: 'center',
        height: px2dp(120),
    },
    addCropTopBox: {
        marginTop: px2dp(15),
        paddingBottom: px2dp(8),
        width: px2dp(335),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#BBBBBB',
        borderBottomWidth: px2dp(0.5),
    },
    addTitle: {
        fontSize: px2dp(17),
        color: '#030303',
    },
    addCrop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: px2dp(5),
    },
    addText: {
        fontSize: px2dp(13),
        color: '#959595',
        marginRight: px2dp(6),
    },
});

export default styles
