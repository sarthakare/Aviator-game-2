import RotatingBackground from "../components/RotatingBackground"

export default function Background() {
  return (
    <div className="h-full w-full bg-[#1B1C1D] relative overflow-hidden rounded-3xl border-2 border-gray-300">
      <RotatingBackground shouldRotate={false} />
    </div>
  );
}