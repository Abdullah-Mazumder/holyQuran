const PlayingIcon = () => {
  return (
    <>
      <div className="wave-container cursor-pointer h-full">
        <div className="wave-animation flex items-center gap-1 w-full h-full cursor-pointer">
          <div className="wave-pillar w-[3px] h-[15px] waveBg"></div>
          <div className="wave-pillar w-[3px] h-[15px] waveBg"></div>
          <div className="wave-pillar w-[3px] h-[15px] waveBg"></div>
          <div className="wave-pillar w-[3px] h-[15px] waveBg"></div>
          <div className="wave-pillar w-[3px] h-[15px] waveBg"></div>
          <div className="wave-pillar w-[3px] h-[15px] waveBg"></div>
        </div>
      </div>
    </>
  );
};

export default PlayingIcon;
