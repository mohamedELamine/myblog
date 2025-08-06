import { SocialIcons } from "@/components/utils/SocialIcons";
import { Config } from "@/data/config";

export const HomeCover = () => {
  return (
    <>
      <div className="w-full">
        <div
          className="mb-20 mt-5 flex w-full justify-center rounded-xl"
          style={{
            aspectRatio: "4/1",
            background: `url(${Config.PageCovers.websiteCoverURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            alt={Config.Nickname}
            className="relative top-1/2 my-auto h-24 w-24 rounded-full shadow-2xl md:h-32 md:w-32"
            src={Config.AvatarURL}
          />
        </div>
      </div>
      <div className={`font-fang-zheng-xiao-biao-song my-8 text-center text-4xl font-bold`}>{Config.Nickname}</div>
      {Config.Sentence && (
        <div className="my-5 flex justify-center">
          <p className="font-source-serif-screen text-lg text-center max-w-3xl mx-auto leading-relaxed">
            {Config.Sentence}
          </p>
        </div>
      )}
      <div className="my-8">
        <SocialIcons />
      </div>
    </>
  );
};
