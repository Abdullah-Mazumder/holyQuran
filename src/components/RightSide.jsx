import React, { useMemo } from "react";
import RightSideBottom from "./RightSideBottom";
import RightSideTop from "./RightSideTop";
import RightSideTopSkeleton from "./RightSideTopSkeleton";

const RightSide = ({ singleSurah, saveToReadLater, readLater }) => {
  const { loading, fullSurah } = singleSurah;
  const { surahDetails, surah } = fullSurah;
  const RightSideTopComponent = useMemo(
    () => <RightSideTop surahDetails={surahDetails} />,
    [surahDetails]
  );
  const RightSideBottomComponent = useMemo(
    () => (
      <RightSideBottom
        surah={surah}
        loading={loading}
        saveToReadLater={saveToReadLater}
        readLater={readLater}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [surah, loading, readLater]
  );
  return (
    <div className="rightSide my-1 w-full">
      {loading ? <RightSideTopSkeleton /> : RightSideTopComponent}
      {RightSideBottomComponent}
    </div>
  );
};

export default RightSide;
