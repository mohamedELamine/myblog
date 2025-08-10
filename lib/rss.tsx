import { CopyrightAnnouncement, LatestPostCountInHomePage, WebsiteURL } from "@/consts/consts";
import { Config } from "@/data/config";
import { Feed } from "feed";
import fs from "fs";
import { JSDOM } from "jsdom";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { renderToString } from "react-dom/server";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMathJax from "rehype-mathjax/svg";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import externalLinks from "remark-external-links";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkPrism from "remark-prism";
import { getPostFileContent, sortedPosts } from "./post-process";

const NoticeForRSSReaders = `\n---\n**NOTE:** Different RSS reader may have deficient even no support for svg formulations rendering. If it happens, please read the origin page to have better experience.`;

function minifyHTMLCode(htmlString: string): string {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;
  const elements = document.querySelectorAll("*");
  const unusedElements = document.querySelectorAll("script, style");

  // Remove all class attributes.
  elements.forEach((element) => {
    element.removeAttribute("class");
  });

  // Remove all script and style tags.
  unusedElements.forEach((element) => {
    element.parentElement?.removeChild(element);
  });

  return dom.serialize();
}

/**
 * Generate the RSS Feed File in `./public` so it could be visited by https://domain/rss.xml
 */
export const generateRSSFeed = async () => {
  // الأساس لبناء الروابط المطلقة
  const BASE = WebsiteURL || `https://${Config.SiteDomain}`;

  // تحويل أي مسار/رابط (حتى لو كان فيه null/undefined) إلى رابط مطلق صالح
  const toAbs = (p?: string | null): string | undefined => {
    if (!p) return undefined; // يغطي undefined و null و ""
    const trimmed = p.trim();
    // التقط أول مقطع يبدو كرابط أو مسار
    const candidate =
      trimmed.split(/\s+/).find((t) => /^https?:\/\//.test(t) || t.startsWith("/")) || trimmed;
    try {
      return new URL(candidate, BASE).toString();
    } catch {
      return undefined; // تجاهل المدخلات غير الصالحة بدل إسقاط البناء
    }
  };

  const feed = new Feed({
    title: Config.SiteTitle,
    description: Config.Sentence,
    id: BASE,                       // اجعله مطلقًا
    link: BASE,                     // اجعله مطلقًا
    image: toAbs(Config.PageCovers.websiteCoverURL),
    favicon: toAbs("/favicon.ico"), // إصلاح الخطأ المطبعي السابق
    copyright: CopyrightAnnouncement,
    generator: "Node.js Feed",
    author: {
      name: Config.AuthorName,
      email: Config.SocialLinks.email,
      link: BASE,
    },
  });

  const count = Math.min(LatestPostCountInHomePage, sortedPosts.allPostList.length);

  for (let i = 0; i < count; i++) {
    const post = sortedPosts.allPostList[i];

    // إزالة القوس الزائد الذي كان يكسر الـ build
    const postFileContent = `${getPostFileContent(post.id)}${NoticeForRSSReaders}`;

    // تفكيك التاريخ مع الانتباه لأن الشهر صفر-مفهرس في JS
    const dateParts = (post.frontMatter.time || "").split("-").map((n) => parseInt(n, 10));
    const y = dateParts[0] || new Date().getFullYear();
    const m = (dateParts[1] || 1) - 1; // شهر JS يبدأ من 0
    const d = dateParts[2] || 1;

    // تحويل MDX إلى HTML ثم تقليصه
    const mdxSource = await serialize(postFileContent ?? "", {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkPrism, externalLinks, remarkMath, remarkGfm],
        rehypePlugins: [rehypeMathJax, rehypeAutolinkHeadings, rehypeSlug, rehypePresetMinify as any, rehypeRaw],
        format: "md",
      },
    });
    const htmlContent = minifyHTMLCode(renderToString(<MDXRemote {...mdxSource} />));

    // روابط مطلقة للمنشور والغلاف
    const postUrl = new URL(`/blog/${post.id}`, BASE).toString();
    const coverAbs = toAbs(post.frontMatter.coverURL ?? undefined);

    feed.addItem({
      title: post.frontMatter.title,
      id: postUrl,                  // اجعله مطلقًا
      link: postUrl,                // اجعله مطلقًا
      description: post.frontMatter.summary ?? undefined,
      content: htmlContent,
      author: [
        {
          name: Config.AuthorName,
          email: Config.SocialLinks.email,
          link: new URL("/about", BASE).toString(),
        },
      ],
      category: post.frontMatter.tags?.map((tagname) => ({ name: tagname })),
      date: new Date(y, m, d),
      image: coverAbs,              // undefined إذا لم يكن صالحًا
      // enclosure: coverAbs ? { url: coverAbs, type: 'image/png' } : undefined, // اختياري
    });
  }

  try {
    fs.writeFileSync("./public/rss.xml", feed.rss2(), "utf-8");
  } catch (e) {
    console.error("RSS write failed, skipping:", e);
  }
};

// export const generateRSSFeed = async () => {
//   const feed = new Feed({
//     title: Config.SiteTitle,
//     description: Config.Sentence,
//     id: Config.SiteDomain,
//     link: WebsiteURL,
//     image: Config.PageCovers.websiteCoverURL,
//     favicon: `https://${Config.SiteDomain}/favcion.ico`,
//     copyright: CopyrightAnnouncement,
//     generator: "Node.js Feed",
//     author: {
//       name: Config.AuthorName,
//       email: Config.SocialLinks.email,
//       link: WebsiteURL,
//     },
//   });

//   for (let i = 0; i < Math.min(LatestPostCountInHomePage, sortedPosts.allPostList.length); i++) {
//     const post = sortedPosts.allPostList[i];
//     const postFileContent = `${getPostFileContent(post.id)}${NoticeForRSSReaders}}`;
//     const dateNumber = post.frontMatter.time.split("-").map((num) => parseInt(num));
//     const mdxSource = await serialize(postFileContent ?? "", {
//       parseFrontmatter: true,
//       mdxOptions: {
//         remarkPlugins: [remarkPrism, externalLinks, remarkMath, remarkGfm],
//         rehypePlugins: [rehypeMathJax, rehypeAutolinkHeadings, rehypeSlug, rehypePresetMinify as any, rehypeRaw],
//         format: "md",
//       },
//     });
//     const htmlContent = minifyHTMLCode(renderToString(<MDXRemote {...mdxSource} />));

//     feed.addItem({
//       title: post.frontMatter.title,
//       id: post.id,
//       link: `https://${Config.SiteDomain}/blog/${post.id}`,
//       description: post.frontMatter.summary ?? undefined,
//       content: htmlContent,
//       author: [
//         {
//           name: Config.AuthorName,
//           email: Config.SocialLinks.email,
//           link: `https://${Config.SiteDomain}/about`,
//         },
//       ],
//       category: post.frontMatter.tags?.map((tagname) => ({ name: tagname })),
//       date: new Date(dateNumber[0], dateNumber[1], dateNumber[2]),
//       image: post.frontMatter.coverURL ?? undefined,
//     });
//   }
//   fs.writeFile("./public/rss.xml", feed.rss2(), "utf-8", (err) => {});
// };
