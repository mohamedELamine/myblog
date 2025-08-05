import { ContentContainer, Page } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/utils/Footer";
import { NavBar } from "@/components/utils/NavBar";
import { SEO } from "@/components/utils/SEO";
import { Config } from "@/data/config";
import { isEmptyString } from "@/lib/utils";
import { TSearchResultItem } from "@/types/search-result";
import axios from "axios";
import { nanoid } from "nanoid";
import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useQuery } from "react-query";

export default function SearchPage() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<TSearchResultItem[]>([]);
  const { toast } = useToast();

  const fetchSearchAPI = async (param: string) => {
    const response = (await axios.get<TSearchResultItem[]>(`/api/search/${param}`)).data;
    return response;
  };

  const querySearch = useQuery("searchData", () => fetchSearchAPI(searchText), {
    enabled: false,
    onSuccess: (data) => {
      setSearchResult(data);
      if (data.length === 0) {
        toast({ title: "نتيجة فارغة", description: "لم تُوجَد نتائج لهذه الكلمة، جرب كلمات أخرى" });
      }
    },
    onError: () => {
      toast({ title: "خطأ شبكي", description: "حاولة ثانيةً لاحقا" });
    },
  });

  const handleInputSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleEnterKeySearch = (event: KeyboardEvent<HTMLInputElement>) => {
    (event.key === "Go" || event.key === "Enter") && handleMakeSearch();
  };

  const handleMakeSearch = () => {
    if (isEmptyString(searchText)) {
      toast({ title: "أدخل كلمة", description: "أدخل كلمة واحدة على الأقل للبحث" });
      return;
    }
    if (searchText.length < 4) {
      toast({ title: "الكلمة قصيرة جدا", description: "يجب أن يكون عدد الحروف 5 على الأقل" });
      return;
    }
    querySearch.refetch();
  };

  return (
    <Page>
      <SEO description={"ابحث عن المقالات حسبما تريد"} title={`${Config.SiteTitle} - Search`} />
      <Toaster />
      <NavBar />
      <ContentContainer>
        <h2 className={`my-10 flex justify-center text-2xl font-bold font-fang-zheng-xiao-biao-song`}>
          {"ابحث في المدونة"}
        </h2>
        <div className="flex my-10">
          <Input
            className="my-auto py-0"
            onChange={handleInputSearchText}
            onKeyDown={handleEnterKeySearch}
            placeholder="أدخِل للبحث"
            value={searchText}
          />
          <Button className="mx-3 w-32 my-auto" disabled={querySearch.isLoading} onClick={handleMakeSearch}>
            {querySearch.isFetching ? "Loading" : "بحث"}
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          <div className={`min-h-full flex flex-col font-source-serif-screen`}>
            {querySearch.isSuccess &&
              searchResult.map((item, index) => (
                <Link
                  className={`py-2 px-5 border-t ${
                    index === searchResult.length - 1 && "border-b"
                  } hover:bg-gray-50 dark:hover:bg-gray-900 flex flex-col`}
                  href={`/blog/${item.id}`}
                  key={nanoid()}
                  target="_blank"
                >
                  <div className="my-1 capitalize">{item.title}</div>
                  <div className="flex space-x-2 flex-wrap">
                    {item.tags?.map((tagitem) => (
                      <div className="text-sm text-gray-500 dark:text-gray-400" key={nanoid()}>
                        {tagitem}
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </ContentContainer>
      <Footer />
    </Page>
  );
}
