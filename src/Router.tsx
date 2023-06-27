import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import CreateGame from "./components/cashier/CreateGame";
import SellCard from "./components/cashier/SellCard";
import ViewCard from "./components/ViewCard";
import CheckCard from "./components/CheckCard";
import FindAccount from "./components/FindAccount";
import RecoverPassword from "./components/RecoverPassword";
import SuperAdminRoutes from "./util/SuperAdminRoutes";
import AgentRoutes from "./util/AgentRoutes";
import CashierRoutes from "./util/CashierRoutes";
import { default as CardsAgent } from "./components/agent/Cards";
import { default as CardsCashier } from "./components/cashier/Cards";
import AdminWrapper from "./components/bingo-admin/Dashboard/AdminWrapper";
import Agents from "./components/bingo-admin/agents/Agents";
import Branches from "./components/bingo-admin/branches/Branches";
import AgentWrapper from "./components/agent/Dashboard/AgentWrapper";
import Cashiers from "./components/agent/cashiers/Cashiers";
import RegisterCard from "./components/agent/RegisterCard";
import UpdateCard from "./components/agent/UpdateCard";
import CashierWrapper from "./components/cashier/Dashboard/CashierWrapper";
import PageNotFound from "./components/PageNotFound";
import Game from "./components/game/Game";
import CountDown from "./components/game/CountDown";
import GameTest from "./components/game/GameTest";

function Router() {
  return (
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/game-test" element={<GameTest />} />
      <Route path="/count-down" element={<CountDown />} />

      <Route path="" element={<Navigate to={"/signin"} />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/view-card" element={<ViewCard />} />
      <Route path="/check-card" element={<CheckCard />} />

      <Route path="/find-account" element={<FindAccount />} />
      <Route path="/recover-password" element={<RecoverPassword />} />

      {/* super-admin routes */}
      <Route element={<SuperAdminRoutes />}>
        <Route path="/admin-dashboard" element={<AdminWrapper />}>
          {/* branches */}
          <Route path="branches" element={<Branches />} />
          {/* agents */}
          <Route path="agents" element={<Agents />} />
          {/* <Route  element={<Dashboard />}></Route> */}
        </Route>
      </Route>

      {/* agent routes */}
      <Route element={<AgentRoutes />}>
        <Route path="agent-dashboard" element={<AgentWrapper />}>
          <Route path="cashiers" element={<Cashiers />} />
          <Route path="cards" element={<CardsAgent />} />
          <Route path="register-card" element={<RegisterCard />} />
          <Route path="update-card/:cardId" element={<UpdateCard />} />
        </Route>
      </Route>

      {/* cashier routes */}
      <Route element={<CashierRoutes />}>
        <Route path="cashier-dashboard" element={<CashierWrapper />}>
          <Route path="create-game" element={<CreateGame />} />
          <Route path="cards" element={<CardsCashier />} />
          <Route path="sell-card" element={<SellCard />} />
          <Route path="view-card/:cardId" element={<ViewCard />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
