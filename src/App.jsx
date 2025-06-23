import AllBetsTable from "./components/AllBetsTable";
import BetControls from "./components/BetControls";
import HistoryBar from "./components/HistoryBar";
import AnimationContainer from "./pages/animationContainer";
import Header from "./components/Header";

function App() {
  return (
    <div className="m-0 p-0 min-h-screen w-screen flex flex-col bg-black">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="flex-1 flex flex-col md:flex-row pt-16">
        {/* Left: AllBetsTable (desktop), Bottom: AllBetsTable (mobile) */}
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-1/4 h-full bg-black text-white p-2 flex-shrink-0">
          <AllBetsTable />
        </div>
        {/* Main Content */}
        <div className="w-full md:w-3/4 h-full bg-black text-white flex flex-col p-2 gap-5 overflow-auto">
          {/* HistoryBar at the top on mobile, bottom on desktop */}
          <div className="w-full mt-4">
            <HistoryBar />
          </div>
          {/* AnimationContainer */}
          <div className="flex-1 flex items-start">
            <AnimationContainer />
          </div>
          {/* BetControls */}
          <div className="w-full mt-4">
            <BetControls />
          </div>
        </div>
        {/* Mobile AllBetsTable */}
        <div className="block md:hidden w-full bg-black text-white p-2 flex-shrink-0">
          <AllBetsTable />
        </div>
      </div>
    </div>
  );
}

export default App;
