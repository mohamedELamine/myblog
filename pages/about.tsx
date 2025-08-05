import { ContentContainer, Page } from "@/components/layouts";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/utils/Footer";
import { NavBar } from "@/components/utils/NavBar";
import { SEO } from "@/components/utils/SEO";
import { SocialIcons } from "@/components/utils/SocialIcons";
import { Config } from "@/data/config";

import Link from "next/link";

export default function AboutPage() {
  return (
    <Page>
      <SEO
        coverURL={Config.PageCovers.websiteCoverURL}
        description={""}
        title={`عني - ${Config.AuthorName}`}
      />
      <NavBar />
      <ContentContainer>
        <h2 className={`my-5 flex justify-around text-2xl font-bold font-fang-zheng-xiao-biao-song`}>{"عني"}</h2>
        <Separator />
        <div className={`font-source-serif-screen my-5 justify-center md:flex md:space-x-10`}>
          <div className="my-auto flex md:w-1/3">
            <img alt="my-profile" className="mx-auto my-auto max-h-[23rem] rounded-lg" src="/images/me.jpeg" />
          </div>
          <div className="my-auto md:w-1/3">
            <div className="mt-5 mb-3 text-3xl font-bold">محمد الأمين  </div>
            من مقالاتي تعرفونني
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <Separator />
        <SocialIcons />
        <Separator />

        <ul className="mx-auto my-10 px-5 md:w-2/3 list-disc">
          <li className="my-2">   أوقروت، تيميمون، الجزائر  </li>
        </ul>

        <div className="mx-auto my-10 md:w-2/3 font-bold">
          {
          }
        </div>
      </ContentContainer>
      <Footer />
    </Page>
  );
}
