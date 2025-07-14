interface IPhoneFrameProps {
  children: React.ReactNode;
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative h-[700px] w-[350px] rounded-[43px] bg-black p-2 shadow-[0px_10px_45px_0px_rgba(0,0,0,0.5)]">
      {/* Screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-white">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 transform rounded-full bg-black"></div>

        {/* Content Area */}
        <div className="relative h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-auto">{children}</div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 transform rounded-full bg-black opacity-60"></div>
      </div>

      {/* Side Buttons */}
      {/* Volume Buttons */}
      <div className="absolute top-28 -left-1 h-7 w-1 rounded-l-sm bg-gray-800"></div>
      <div className="absolute top-38 -left-1 h-7 w-1 rounded-l-sm bg-gray-800"></div>

      {/* Power Button */}
      <div className="absolute top-34 -right-1 h-10 w-1 rounded-r-sm bg-gray-800"></div>

      {/* Action Button (iPhone 15 Pro feature, keeping for iPhone 16) */}
      <div className="absolute top-17 -left-1 h-5 w-1 rounded-l-sm bg-gray-800"></div>
    </div>
  );
}
