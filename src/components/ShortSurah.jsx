import RestoreIcon from "@mui/icons-material/Restore";

import icon from "./../media/icon3.png";
import { Box } from "@mui/material";

const ShortSurah = ({
  singleSurah,
  currentSurahNumber,
  setCurrentSurahNumber,
  setToggleSidebar,
  readLater,
}) => {
  const {
    id,
    arabicName,
    banglaName,
    englishName,
    enTranslatedName,
    enLocation,
    arLocation,
    totalAyah,
  } = singleSurah;
  return (
    <>
      <div
        onClick={() => {
          setCurrentSurahNumber(singleSurah.id);
          setToggleSidebar(false);
        }}
        className={`bgColor2 hoverBg p-2 cursor-pointer rounded-md w-full mr-1 ${
          currentSurahNumber === id ? "active" : ""
        }`}
        id={`shortSurah-${id}`}
      >
        <div className="flex items-center gap-3">
          <div className="logo w-12 md:w-16">
            <img src={icon} alt="icon" />
          </div>
          <div className="w-full flex items-center justify-between txtColor">
            <div className="details">
              <div className="name flex flex-col gap-0 text-md md:text-lg">
                <div className="my-1">
                  <Box component="div" className="">
                    <span className="arabicTxt text-xl">{arabicName} </span>
                    <span className="text-sm">( {banglaName} )</span>
                  </Box>
                </div>
                <Box style={{ marginTop: "-5px" }} className="">
                  <span>{enTranslatedName} </span>
                  <span className="text-sm">( {englishName} )</span>
                </Box>
              </div>
              <div className="bottom flex gap-3 mt-1 text-xs md:text-sm">
                <Box component="span" className="">
                  <span className="arabicTxt">{arLocation} </span>
                  <span className="text-sm">( {enLocation} )</span>
                </Box>
                <Box component="span" className="">
                  Ayah: {totalAyah}
                </Box>
              </div>
            </div>
            <div className="icon">
              <div className="text-sm p-2 font-semibold flex items-center justify-center">
                <span>{id}</span>
              </div>
              {readLater[id] && <RestoreIcon />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortSurah;
