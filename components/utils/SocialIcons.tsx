import { Config } from "@/data/config";
import Link from "next/link";
import { FiGithub, FiInstagram, FiMail, FiTwitter, FiYoutube } from "react-icons/fi";
import { TbBrandFacebook, TbBrandLinkedin, TbBrandMastodon, TbBrandTelegram } from "react-icons/tb";

export const SocialIcons = () => {
  return (
    <div className="my-5 flex justify-center space-x-4 text-2xl font-bold">
      {Config.SocialLinks.twitter && (
        <Link href={`https://x.com/${Config.SocialLinks.twitter}`} target="_blank" title="Twitter">
          <FiTwitter className="hover:text-sky-500" />
        </Link>
      )}
      {Config.SocialLinks.telegram && (
        <Link href={`https://t.me/qalassa`} target="_blank" title="Telegram">
          <TbBrandTelegram className="hover:text-purple-500" />
        </Link>
      )}
      {Config.SocialLinks.youtube && (
        <Link href={`https://youtube.com/${Config.SocialLinks.youtube}`} target="_blank" title="Youtube">
          <FiYoutube className="hover:text-orange-500" />
        </Link>
      )}
      {Config.SocialLinks.facebook && (
        <Link href={`https://facebook.com/${Config.SocialLinks.facebook}`} target="_blank" title="Facebook">
          <TbBrandFacebook className="hover:text-blue-500" />
        </Link>
      )}
      {Config.SocialLinks.github && (
        <Link href={`https://github.com/${Config.SocialLinks.github}`} target="_blank" title="Github">
          <FiGithub className="hover:text-gray-500" />
        </Link>
      )}
      <Link href={`mailto:${Config.SocialLinks.email}`} target="_blank" title="EMail Address">
        <FiMail className="hover:text-gray-500" />
      </Link>
    </div>
  );
};
