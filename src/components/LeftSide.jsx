import { Fab } from "@mui/material";
import LeftSideSkeleton from "./LeftSideSkeleton";
import ShortSurah from "./ShortSurah";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

const LeftSide = ({
  menuRef,
  surahList,
  currentSurahNumber,
  setCurrentSurahNumber,
  setToggleSidebar,
  readLater,
}) => {
  const { loading, surah } = surahList;
  return (
    <div
      className="bgColor1 leftSide md:transition-none p-4 m-1 rounded-lg fixed md:static translate-x-[-130%] md:translate-x-0 md:min-w-[330px] z-50"
      ref={menuRef}
    >
      <Box
        component="div"
        className="text-center absolute left-[43%] top-[-3%] md:hidden"
      >
        <Fab
          aria-label="add"
          size="small"
          className="bgColor2 hoverBg txtColor"
          onClick={() => setToggleSidebar(false)}
        >
          <CloseIcon />
        </Fab>
      </Box>
      <div className="calcHeight overflow-y-auto overflow-x-hidden w-[280px] md:w-auto space-y-2">
        {loading ? (
          <LeftSideSkeleton />
        ) : (
          <>
            {surah.map((singleSurah) => (
              <ShortSurah
                key={singleSurah.id}
                singleSurah={singleSurah}
                currentSurahNumber={currentSurahNumber}
                setCurrentSurahNumber={setCurrentSurahNumber}
                setToggleSidebar={setToggleSidebar}
                readLater={readLater}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSide;
