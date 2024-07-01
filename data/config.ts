import { TConfig } from "@/types/config.type";

export const Config: TConfig = {
  // Image url for avatar.
  AvatarURL: "/images/qais.jpeg",
  // Your favorite motto, or a brief self-introduction, for homepage display
  Sentence:
    " وَكُلٌّ أَبِيٌّ باسِلٌ غَيرَ أَننَّي |||| إِذا عَرَضَت أُولى الطَرائِدِ أَبسَلُ ",
  // Your nickname, or pen name here.
  Nickname: "قيس العصا",

  // Website main title.
  SiteTitle: "قيس العصا",
  // Your domain for website.
  SiteDomain: "nextjs-lexical-blog-demo.vercel.app",

  // For the cover image displayed on the homepage, the recommended image aspect ratio is 4:1.
  PageCovers: {
    websiteCoverURL: "/images/qaisCover.jpeg",
  },

  // Your social platform IDs, and email address.
  SocialLinks: {
    twitter: "QaisN3Adham", // Twitter ID
    instagram: "example", // Instagram ID
    github: "qalassa", // Github ID
    facebook: "QaisN3", // Facebook ID
    linkedin: "example", // Linkedin ID
    mastodon: "https://mas.to/@example", // Mastodon link
    email: "me@example.com", // Email address, required.
    telegram: "qalassa",
    youtube: "@QaisN3"
  },

  // Giscus Configure. Please refer to the https://giscus.app for entire instruction
  Giscus: {
    enabled: true,
    repo: `PrinOrange/nextjs-lexical-blog`,
    repoId: "R_kgDOK44zmw",
    category: "Announcements",
    categoryId: "DIC_kwDOK44zm84Cb94g",
  },

  // Enable the RSS Feed? If not, the feed file will not be generated and the feed entrance will be closed.
  RSSFeed: {
    enabled: true,
  },

  // The supported sponsor ways are wechat-pay, alipay and paypal.
  Sponsor: {
    // Your WechatPay QRCode content.
    WechatPayQRCodeContent: "wxp://xxxxxxxxxxxxxxxxx",
    // Your Alipay link.
    AlipayLink: "https://qr.alipay.com/xxxx",
    // Your Paypal user Id.
    PaypalId: "xxxx",
    // If it's true, it will show the github sponsor link button.
    Github: true,
    // Your Patreon user Id.
    PatreonId: "xxxx",
    // Write your crypto wallet address here.
    Crypto: [
      {
        Name: "BTC",
        Address: "bc1q9mgj2kejx0ag3uu34lp7e6we8cs8z8s6r9les3",
        Blockchain: "Bitcoin",
      },
      {
        Name: "ETH",
        Address: "0xe42110C65Bf732a9F63e95F15e4e1Cc5963D2e74",
        Blockchain: "Ethereum",
      },
      {
        Name: "USDT",
        Address: "0xe42110C65Bf732a9F63e95F15e4e1Cc5963D2e74",
        Blockchain: "Ethereum",
      },
    ],
  },

  // Website establishment year.
  YearStart:2024,
  // Please enter your legal name for use with the copyright mark.
  AuthorName: "قساوة",
};
