/* eslint-disable react-hooks/exhaustive-deps */
import { PlayArrow } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import useAudioPlayer from "../hooks/useAudioPlay";
import icon from "../media/icon.png";

const RightSideTop = ({ surahDetails }) => {
  const {
    id,
    arabicName,
    banglaName,
    englishName,
    arLocation,
    enLocation,
    enTranslatedName,
    totalAyah,
    audio,
  } = surahDetails;

  const { audioRef, isLoading, isPlaying, audioUrlHandler, setIsPlaying } =
    useAudioPlayer();

  return (
    <div>
      <div className="bgColor1 p-2 rounded-lg flex justify-center">
        <div className="w-[90%] md:w-[400px] lg:w-[600px]">
          <div className="w-full flex items-center justify-between">
            <audio ref={audioRef} />
            {!isPlaying && !isLoading && (
              <div className="button">
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Play The Surah"
                  arrow={true}
                  placement="left"
                  classes={{
                    tooltip: "darkBgColor1",
                    tooltipArrow: "darkBgColor1",
                  }}
                >
                  <IconButton
                    aria-label="play"
                    size="large"
                    onClick={() => audioUrlHandler(audio)}
                  >
                    <PlayArrow fontSize="inherit" className="txtColor" />
                  </IconButton>
                </Tooltip>
              </div>
            )}
            {isPlaying && !isLoading && (
              <Tooltip
                TransitionComponent={Zoom}
                title="Pause The Surah"
                arrow={true}
                placement="left"
                classes={{
                  tooltip: "darkBgColor1",
                  tooltipArrow: "darkBgColor1",
                }}
              >
                <div
                  className="wave-container cursor-pointer h-full"
                  onClick={() => setIsPlaying(false)}
                >
                  <div className="wave-animation flex items-center gap-1 w-full h-full cursor-pointer">
                    <div
                      className="wave-pillar w-[3px] h-[15px] waveBg rounded-sm"
                      onClick={() => setIsPlaying(false)}
                    ></div>
                    <div
                      className="wave-pillar w-[3px] h-[15px] waveBg rounded-sm"
                      onClick={() => setIsPlaying(false)}
                    ></div>
                    <div
                      className="wave-pillar w-[3px] h-[15px] waveBg rounded-sm"
                      onClick={() => setIsPlaying(false)}
                    ></div>
                    <div
                      className="wave-pillar w-[3px] h-[15px] waveBg rounded-sm"
                      onClick={() => setIsPlaying(false)}
                    ></div>
                    <div
                      className="wave-pillar w-[3px] h-[15px] waveBg rounded-sm"
                      onClick={() => setIsPlaying(false)}
                    ></div>
                    <div
                      className="wave-pillar w-[3px] h-[15px] waveBg rounded-sm"
                      onClick={() => setIsPlaying(false)}
                    ></div>
                  </div>
                </div>
              </Tooltip>
            )}
            {isLoading && (
              <Tooltip
                TransitionComponent={Zoom}
                title="Loading..."
                arrow={true}
                placement="left"
                classes={{
                  tooltip: "darkBgColor1",
                  tooltipArrow: "darkBgColor1",
                }}
              >
                <CircularProgress
                  classes={{
                    circle: "txtColor",
                  }}
                />
              </Tooltip>
            )}
            <div className="details flex items-center gap-3">
              <div>
                <div className="p-1 border-2 border-slate-400 rounded-full flex items-center justify-center">
                  <span className="txtColor">{id}</span>
                </div>
              </div>
              <div>
                <div className="top">
                  <Box component="div" className="txtColor">
                    <span className="arabicTxt text-lg">{arabicName} </span>
                    <span className="text-sm">( {banglaName} )</span>
                  </Box>
                  <Box style={{ marginTop: "" }} className="txtColor">
                    <span>{enTranslatedName} </span>
                    <span
                      className="text-sm"
                      onClick={() => setIsPlaying(false)}
                    >
                      ( {englishName} )
                    </span>
                  </Box>
                </div>
                <div
                  className="bottom flex gap-3 text-xs md:text-sm"
                  onClick={() => setIsPlaying(false)}
                >
                  <Box component="span" className="txtColor">
                    <span className="arabicTxt">{arLocation} </span>
                    <span
                      className="text-sm"
                      onClick={() => setIsPlaying(false)}
                    >
                      ( {enLocation === "meccan" ? "Makki" : "Madani"} )
                    </span>
                  </Box>
                  <Box component="span" className="txtColor">
                    Ayah: {totalAyah}
                  </Box>
                </div>
              </div>
            </div>
            <div className="icon h-12 md:h-16">
              <img
                src={icon}
                style={{ height: "100%", width: "auto" }}
                alt="icn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideTop;
