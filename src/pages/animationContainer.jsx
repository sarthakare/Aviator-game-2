import ProgressBar from "../components/ProgressBar";
import RotatingBackground from "../components/RotatingBackground";

export default function Background() {
  return (
    <div className="h-full w-full bg-[#1B1C1D] relative overflow-hidden rounded-3xl border-2 border-gray-300 flex flex-col items-center justify-center gap-6 px-4 py-8">
      {/* Rotating background */}
      <div className="z-0 absolute inset-0">
        <RotatingBackground shouldRotate={false} />
      </div>
      <div className="z-10 flex flex-col items-center">
        <ProgressBar />
      </div>
    </div>
  );
}
