import { TConfig } from "@/types/config.type";

export const Config: TConfig = {
  // Image url for avatar.
  AvatarURL: "/images/profile.jpeg",
  // Your favorite motto, or a brief self-introduction, for homepage display
  Sentence:
    " مدونة شخصية! يقال شِعرُ الرجلِ قطعةٌ مِن كلامِه، وظنُّه قطعةٌ مِن علمِه، واختيارُه قطعةٌ مِن عقلِه، وهنا ستجد ذلك كله، وما أكتبه لنفسي، فأنا المتكلم والمخاطب على حد السواء، ولك بعد هذا حرية الأخذ والرد والرضى ما وجدت أسباب الرضى، والسخط ما وجدت أسبابه، وأنت مشكور في الحالين جميعا!",
  // Your nickname, or pen name here.
  Nickname: " محمد الأمين  ",

  // Website main title.
  SiteTitle: "محمد الأمين ",
  // Your domain for website.
  SiteDomain: "nextjs-lexical-blog-demo.vercel.app",

  // For the cover image displayed on the homepage, the recommended image aspect ratio is 4:1.
  PageCovers: {
    websiteCoverURL: "/images/Cover.jpeg",
  },

  // Your social platform IDs, and email address.
  SocialLinks: {
    twitter: "Twitter", // Twitter ID
    instagram: "Instagram", // Instagram ID
    github: "mohamedELamine", // Github ID
    facebook: "mohammedbml28", // Facebook ID
    linkedin: "belahcene-mohammed-elamin-a2617a22b", // Linkedin ID
    mastodon: "https://mas.to/@example", // Mastodon link
    email: "mohamedbml28@gmail.com", // Email address, required.
    telegram: "mohamedbml",
    youtube: "example", // YouTube ID
  },

  // Giscus Configure. Please refer to the https://giscus.app for entire instruction
  Giscus: {
    enabled: true,
    repo: `mohamedELamine/myblog`, // ← اسم مستودعك
    repoId: "R_kgDOPY8A1g",
    category: "General",
    categoryId: "DIC_kwDOPY8A1s4Ct0a_",
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
  AuthorName: "محمد الأمين  ",
};
