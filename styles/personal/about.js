import {StyleSheet} from 'react-native';
import {px2dp} from '../../utils/px2dp';

const styles = StyleSheet.create({
    aboutContainer: {
        flex: 1,
        backgroundColor: '#F2F4F7',
    },
    aboutBox: {
        backgroundColor: '#fff',
        paddingHorizontal: px2dp(34),
        paddingVertical: px2dp(40),
    },
    desc: {
        lineHeight: px2dp(28),
        color: '#505559',
        fontSize: px2dp(15),
    },
});

export default styles;
