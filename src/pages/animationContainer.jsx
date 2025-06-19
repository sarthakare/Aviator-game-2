import PlaneAnimation from "../components/PlaneAnimation";
import ProgressBar from "../components/ProgressBar";
import RotatingBackground from "../components/RotatingBackground";

export default function Background() {
  const multiplierValue = 10;

  return (
    <div className="h-full w-full bg-[#1B1C1D] relative overflow-hidden rounded-3xl border-2 border-gray-300">
      {/* Rotating background */}
      <div className="absolute inset-0 z-0">
        <RotatingBackground shouldRotate={false} />
      </div>

      {/* ProgressBar and other content */}
      <div className="absolute top-8 w-full z-10 flex justify-center">
        {/* <ProgressBar /> */}
      </div>

      {/* Plane animation full screen */}
      <div className="absolute inset-0 z-20">
        <PlaneAnimation multiplierValue={multiplierValue} />
      </div>
    </div>
  );
}
