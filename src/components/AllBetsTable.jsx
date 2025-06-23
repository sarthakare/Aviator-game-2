const userAvatars = [
  "🦎",
  "🦊",
  "🦄",
  "🧑‍🎤",
  "🧑‍💼",
  "🦸‍♂️",
  "🐰",
  "👨‍💼",
  "🦒",
  "🤖",
];

const staticBets = [
  { user: "1***8", amount: 10.0, cashout: 0.0 },
  { user: "L***3", amount: 11.66, cashout: 0.0 },
  { user: "8***€", amount: 20.0, cashout: 0.0 },
  { user: "7***G", amount: 160.0, cashout: 0.0 },
  { user: "7***7", amount: 110.0, cashout: 0.0 },
  { user: "4***0", amount: 10000.0, cashout: 0.0 },
  { user: "1***1", amount: 50.0, cashout: 0.0 },
  { user: "T***4", amount: 10.0, cashout: 0.0 },
  { user: "6***4", amount: 80.0, cashout: 0.0 },
  { user: "8***(", amount: 290.0, cashout: 0.0 },
  { user: "9***2", amount: 70.0, cashout: 0.0 },
];

const AllBetsTable = () => {
  return (
    <div className="bg-[#18191b] rounded-xl p-4 h-full">
      <h3 className="font-bold mb-0 text-white">ALL BETS</h3>
      <div className="text-xs text-gray-400 mb-2">28</div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-400 text-left">
            <th className="font-normal py-2">User</th>
            <th className="font-normal">Bet(INR)</th>
            <th className="font-normal">X</th>
            <th className="font-normal">Cash out(INR)</th>
          </tr>
        </thead>
        <tbody>
          {staticBets.map((bet, idx) => (
            <tr
              key={idx}
              className="bg-[#131415] hover:bg-[#232425] transition-colors"
            >
              <td className="flex items-center gap-2 py-3 px-1">
                <span className="text-xl">
                  {userAvatars[idx % userAvatars.length]}
                </span>
                <span className="text-white">{bet.user}</span>
              </td>
              <td className="text-white">{bet.amount.toFixed(2)}</td>
              <td className="text-white">0.00</td>
              <td className="text-white font-bold">
                {bet.cashout.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBetsTable;
