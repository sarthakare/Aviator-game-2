const BetControls = () => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-6 w-full items-stretch space-y-0 md:space-y-0">
      {/* First Bet Panel */}
      <div className="bg-[#1b1c1d] p-4 flex flex-1 flex-row space-x-4 items-center rounded-xl mb-4 md:mb-0">
        {/* Left: Bet Controls */}
        <div className="flex flex-col items-center px-4 py-3 w-auto">
          <div className="flex items-center bg-gray-800 rounded-full px-3 py-1 mb-2">
            <button className="text-white text-xl px-2">-</button>
            <span className="mx-3 text-white font-bold text-xl">10.00</span>
            <button className="text-white text-xl px-2">+</button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1 text-xs w-full">
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">10</button>
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">20</button>
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">50</button>
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">100</button>
          </div>
        </div>
        {/* Right: Bet Button */}
        <button
          className="w-full sm:w-auto flex-1 bg-[#279b0b] text-white font-bold text-2xl py-8 rounded-lg border border-green-200"
          style={{ minWidth: 0, maxWidth: 300 }}
        >
          BET<br />
          <span className="text-xl font-normal">10.00 INR</span>
        </button>
      </div>

      {/* Second Bet Panel (duplicate) */}
      <div className="bg-[#1b1c1d] p-4 rounded-xl flex flex-1 flex-row space-x-4 items-center">
        {/* Left: Bet Controls */}
        <div className="flex flex-col items-center px-4 py-3 w-auto">
          <div className="flex items-center bg-gray-800 rounded-full px-3 py-1 mb-2">
            <button className="text-white text-xl px-2">-</button>
            <span className="mx-3 text-white font-bold text-xl">10.00</span>
            <button className="text-white text-xl px-2">+</button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1 text-xs w-full">
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">10</button>
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">20</button>
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">50</button>
            <button className="bg-gray-700 text-blue-400 rounded py-1 px-4">100</button>
          </div>
        </div>
        {/* Right: Bet Button */}
        <button
          className="w-full sm:w-auto flex-1 bg-[#279b0b] text-white font-bold text-2xl py-8 rounded-lg border border-green-200"
          style={{ minWidth: 0, maxWidth: 300 }}
        >
          BET<br />
          <span className="text-xl font-normal">10.00 INR</span>
        </button>
      </div>
    </div>
  );
};

export default BetControls;
