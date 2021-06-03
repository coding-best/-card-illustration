export default {
  pages: [
    "pages/index/index",
    "pages/my/index",
    "pages/myCard/index",
    "pages/cardList/index",
    "pages/cardDetail/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#C2C7CC",
    selectedColor: "#82C6D6",
    backgroundColor: "white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/icon_star_normal.png",
        selectedIconPath: "./assets/icon_star_active.png",
      },
      {
        pagePath: "pages/myCard/index",
        text: "我的卡牌",
        iconPath: "./assets/icon_star_normal.png",
        selectedIconPath: "./assets/icon_star_active.png",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "./assets/icon_star_normal.png",
        selectedIconPath: "./assets/icon_star_active.png",
      },
    ],
  },
};
