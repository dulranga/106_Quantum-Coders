import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4f46e5",
    fontFamily: "inherit",
  },
  components: {
    Button: {
      fontSizeLG: 16,
      fontSize: 14,
    },
    Progress: {
      defaultColor: "#4f46e5",
    },
  },
};

export default theme;
