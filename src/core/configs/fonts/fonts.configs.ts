import localFont from "next/font/local";

const IRAN_YEKAN_BAKH_FONT = localFont({
  src: [
    {
      path: "../../../../public/fonts/Yekan-Bakh-FaNum-04-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Yekan-Bakh-FaNum-05-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Yekan-Bakh-FaNum-06-Bold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Yekan-Bakh-FaNum-07-Heavy.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Yekan-Bakh-FaNum-08-Fat.woff",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-iran-yekan-bakh",
});

export default IRAN_YEKAN_BAKH_FONT;
