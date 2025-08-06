import { ContentContainer, Page } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/utils/Footer";
import { NavBar } from "@/components/utils/NavBar";
import { TfiFaceSad } from "react-icons/tfi";

export default function NotFoundPage() {
  const handleGoBack = () => {
    if (window == null) return;
    window.history.back();
  };
  return (
    <Page>
      <NavBar />
      <ContentContainer>
        <h2 className={`my-5 flex justify-center text-2xl font-bold font-fang-zheng-xiao-biao-song`}>
          {"404 ما تطلبه غير موجود"}
        </h2>
        <Separator />
        <div className="my-5 flex flex-col justify-center">
          <TfiFaceSad className="mx-auto my-4" size={"6em"} />
          <p className={`font-source-serif-screen mx-auto my-3 text-center text-xl`}>
            {"عذرًا، الصفحة التي تبحث عنها غير موجودة. ربما تم حذفها أو تغيير عنوانها."}
          </p>
          <div className="my-5 flex justify-center">
            <Button className="font-bold" onClick={handleGoBack}>
              {"العودة للصفحة السابقة"}
            </Button>
          </div>
        </div>
      </ContentContainer>
      <Footer />
    </Page>
  );
}
