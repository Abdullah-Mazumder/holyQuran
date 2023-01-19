import { useState } from "react";
import { useRef } from "react";
import Ayah from "./Ayah";
import RightSideBottomSkeleton from "./RightSideBottomSkeleton";

const RightSideBottom = ({ surah, loading, saveToReadLater, readLater }) => {
  // const verses = surah?.verses;
  // const totalAyah = verses?.length;
  const ayahRef = useRef(null);
  const [currentAyahPlaying, setCurrentAyahPlaying] = useState(null);

  // useEffect(() => {
  //   if (ayahRef && currentAyahPlaying) {
  //     ayahRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [currentAyahPlaying]);

  return (
    <>
      <div className="bgColor1 p-4 pr-2 rounded-lg mt-2">
        <div className={`mainSurah overflow-y-auto`}>
          {loading ? (
            <RightSideBottomSkeleton />
          ) : (
            <>
              {surah.verses.map((ayah) => {
                return (
                  <Ayah
                    key={ayah.id}
                    ayah={ayah}
                    ayahRef={ayahRef}
                    surahNumber={surah.id}
                    saveToReadLater={saveToReadLater}
                    readLater={readLater}
                    currentAyahPlaying={currentAyahPlaying}
                    setCurrentAyahPlaying={setCurrentAyahPlaying}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RightSideBottom;
