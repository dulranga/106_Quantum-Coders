import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#7695FF",
    fontFamily: "inherit",
  },
  components: {
    Button: {
      fontSizeLG: 16,
      fontSize: 14,
    },
    Progress: {
      defaultColor: "#7695FF",
    },
  },
};

export default theme;
