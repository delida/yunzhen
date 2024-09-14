export namespace State {
  export interface User {
    userInfo: any;
    setUserInfo: (userInfo: any) => void;
  }

  export interface Land {
    landList: any[];
    setLandList: (landList: any[]) => void;
  }
}
