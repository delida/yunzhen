import {StyleSheet} from 'react-native'
import {px2dp} from '../utils/px2dp'

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
    },
    searchBox: {
        width: px2dp(305),
        alignSelf: 'flex-start',
        height: px2dp(34),
        backgroundColor: '#F7F8F7',
        borderRadius: px2dp(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: px2dp(8),
        marginLeft: px2dp(18),
        marginVertical: px2dp(8),
    },
    textInput: {
        marginLeft: px2dp(8),
        width: px2dp(280),
        // height: px2dp(30),
        fontSize: px2dp(14),
        alignItems: 'center',
    },
    claBox: {
        position: 'absolute',
        top: px2dp(8),
        right: px2dp(12),
    },
    caleTextBox: {
        zIndex: 999,
    },
    caleText: {
        color: '#333',
        fontSize: px2dp(14),
        fontWeight: '400',
    },
    searchHistoryBox: {
        width: px2dp(325),
        alignSelf: 'center',
        marginVertical: px2dp(20),
    },
    searchHistoryTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: '#333',
        fontSize: px2dp(12),
        fontWeight: '400',
    },
    itemWraper: {
        marginVertical: px2dp(16),
    },
    itemBox: {
        width: px2dp(70),
        paddingHorizontal: px2dp(6),
        height: px2dp(26),
        borderRadius: px2dp(18),
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        width: px2dp(60),
        textAlign: 'center',
        color: '#333',
        fontWeight: '300',
    },
});

export default styles
