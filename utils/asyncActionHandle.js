/**
 * 处理异步函数
 * @param {dispatch} dispatch
 * @param {data} data
 */

export function handleData(dispatch, data, type) {
  dispatch({
    type: type,
    data,
    isLoading: false,
  });
}

export function handleErrorData(dispatch, err, type) {
  dispatch({
    type: type,
    err,
    isLoading: true,
  });
}

/**
 * 初始化 state
 */
export const initState = {};
