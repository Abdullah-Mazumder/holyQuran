import LeftSide from "./LeftSide";
import Navbar from "./Navbar";
import RightSide from "./RightSide";
import IconButton from "@mui/material/IconButton";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import { useEffect, useMemo, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Button, Zoom } from "@mui/material";
import { allSurahList } from "../data/allSurah";
import { Box } from "@mui/system";

const HolyQuran = () => {
  const menuRef = useRef(null);
  const currentSurahRef = useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSurahNumber, setCurrentSurahNumber] = useState(1);
  const [surah, setSurah] = useState({
    loading: true,
    fullSurah: "",
  });
  const { loading } = surah;
  // eslint-disable-next-line no-unused-vars
  const [ayahNumber, setAyahNumber] = useState("1");
  const [surahList, setSurahList] = useState({
    loading: true,
    surah: [],
  });
  const [readLater, setReadLater] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const saveToReadLater = (surah, ayah) => {
    if (!localStorage.getItem("holyQuran")) {
      localStorage.setItem("holyQuran", JSON.stringify({}));
    }
    const holyQuranLocal = JSON.parse(localStorage.getItem("holyQuran"));
    // eslint-disable-next-line eqeqeq
    if (holyQuranLocal[surah] && holyQuranLocal[surah] == ayah) {
      delete holyQuranLocal[surah];
      delete holyQuranLocal.lastRead;
    } else {
      holyQuranLocal[surah] = ayah.toString();
      holyQuranLocal.lastRead = surah;
    }
    setReadLater(holyQuranLocal);
    localStorage.setItem("holyQuran", JSON.stringify(holyQuranLocal));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleModal = () => {
    localStorage.setItem("isShowedQuranModal", JSON.stringify(true));
    setModalOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem("isShowedQuranModal")) {
        setModalOpen(true);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (readLater[currentSurahNumber]) {
      setAyahNumber(readLater[currentSurahNumber]);
    } else {
      setAyahNumber("1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurahNumber]);

  useEffect(() => {
    const element = document.querySelector(`#ayat${ayahNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, ayahNumber, surah.fullSurah]);

  useEffect(() => {
    if (currentSurahRef.current) {
      currentSurahRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSurahNumber, surahList.surah]);

  useEffect(() => {
    setSurah({
      loading: true,
      fullSurah: "",
    });
  }, [currentSurahNumber]);

  useEffect(() => {
    import(`./../data/allSurah/${currentSurahNumber}.json`).then((res) => {
      setSurah({
        loading: false,
        fullSurah: res.default,
      });
    });
  }, [currentSurahNumber]);

  useEffect(() => {
    setSurahList({
      loading: false,
      surah: allSurahList,
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.matches) setDarkMode(true);
    if (localStorage.getItem("holyQuran")) {
      setReadLater(JSON.parse(localStorage.getItem("holyQuran")));
    }
  }, []);

  useEffect(() => {
    if (menuRef.current.classList.contains("transition-all")) {
      menuRef.current.classList.remove("transition-all");
    }
    const holyQuran = document.getElementById("holyQuran");
    if (darkMode) {
      holyQuran.classList.add("dark");
      holyQuran.classList.remove("light");
    } else {
      holyQuran.classList.add("light");
      holyQuran.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (
      menuRef.current.classList.contains("translate-x-[-130%]") &&
      toggleSidebar
    ) {
      menuRef.current.classList.add("transition-all");
      menuRef.current.classList.remove("translate-x-[-130%]");
      menuRef.current.classList.add("translate-x-[0%]");
    } else {
      menuRef.current.classList.add("transition-all");
      menuRef.current.classList.add("translate-x-[-130%]");
      menuRef.current.classList.remove("translate-x-[0%]");
    }
  }, [toggleSidebar]);

  useEffect(() => {
    if (readLater && readLater.lastRead) {
      setCurrentSurahNumber(readLater.lastRead);
    }
  }, [readLater]);

  const NaveBarComponent = useMemo(
    () => <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkMode]
  );

  const LeftSideComponent = useMemo(() => {
    return (
      <LeftSide
        menuRef={menuRef}
        surahList={surahList}
        currentSurahNumber={currentSurahNumber}
        setCurrentSurahNumber={setCurrentSurahNumber}
        setToggleSidebar={setToggleSidebar}
        readLater={readLater}
        currentSurahRef={currentSurahRef}
      />
    );
  }, [currentSurahNumber, surahList, readLater]);

  return (
    <div id="holyQuran">
      {NaveBarComponent}
      <div className="bgColor1 toggle md:hidden mt-1 w-full flex justify-center items-center">
        <Tooltip
          TransitionComponent={Zoom}
          title="Menu"
          arrow={true}
          placement="top"
          classes={{
            tooltip: "bgColor2",
            tooltipArrow: "bgColor2",
          }}
        >
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <MenuBookTwoToneIcon fontSize="inherit" className="txtColor" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="md:container mx-auto">
        <div className="mainContainer md:flex relative md:gap-2">
          {LeftSideComponent}
          <RightSide
            singleSurah={surah}
            saveToReadLater={saveToReadLater}
            readLater={readLater}
          />
        </div>
      </div>
      {modalOpen && (
        <div
          className="modal absolute w-screen h-screen flex items-center justify-center top-0 left-0 !z-[99999]"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="dialog bgColor2 txtColor max-w-[350px] p-5 rounded-sm m-2 md:m-0">
            <div className="title divider">
              <Box component={"p"} className="text-xl mb-1 font-semibold">
                Browser Compatibility
              </Box>
            </div>
            <div className="content my-1 mb-2">
              For optimal performance and a seamless browsing experience, it is
              recommended to use the latest version of popular browsers such as
              Chrome, Firefox, Safari, and Edge.
            </div>
            <div className="bottom flex justify-center mt-3">
              <Button
                size="small"
                variant="contained"
                onClick={() => handleModal()}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolyQuran;
