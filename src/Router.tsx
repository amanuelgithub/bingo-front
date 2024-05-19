import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import CreateGame from "./components/cashier/CreateGame";
import SellCard from "./components/cashier/SellCard";
import ViewCard from "./components/ViewCard";
import FindAccount from "./components/FindAccount";
import RecoverPassword from "./components/RecoverPassword";
import { default as CardsAgent } from "./components/agent/Cards";
import { default as CardsCashier } from "./components/cashier/Cards";
import AdminWrapper from "./components/bingo-admin/AdminWrapper";
import Agents from "./components/bingo-admin/agents/Agents";
import AdminBranches from "./components/bingo-admin/branches/Branches";
import AgentBranches from "./components/agent/branches/Branches";
import AgentWrapper from "./components/agent/AgentWrapper";
import Cashiers from "./components/agent/cashiers/Cashiers";
import RegisterCard from "./components/agent/RegisterCard";
import UpdateCard from "./components/agent/UpdateCard";
import CashierWrapper from "./components/cashier/CashierWrapper";
import PageNotFound from "./components/PageNotFound";
import Game from "./components/game/Game";
import GameTest from "./components/game/GameTest";
import CashBook from "./components/cashier/CashBook";
import AgentDetail from "./components/bingo-admin/agents/AgentDetail";
import AgentDashboard from "./components/agent/Dashboard";
import AdminDashboard from "./components/bingo-admin/Dashboard";
import CashierDetail from "./components/bingo-admin/cashiers/CashierDetail";
import SoundSetting from "./components/cashier/SoundSetting";
import RouteGuard from "./util/RouteGuard";
import { UserRoleEnum } from "./models/IUser";

function Router() {
  return (
    <Routes>
      <Route path="/game-test" element={<GameTest />} />

      <Route path="" element={<Navigate to={"/signin"} />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/view-card" element={<ViewCard />} />

      <Route path="/find-account" element={<FindAccount />} />
      <Route path="/recover-password" element={<RecoverPassword />} />

      {/* super-admin routes */}
      <Route element={<RouteGuard allowedRole={UserRoleEnum.SUPER_ADMIN} />}>
        <Route path="/admin-dashboard" element={<AdminWrapper />}>
          <Route index element={<AdminDashboard />} />
          {/* branches */}
          <Route path="branches" element={<AdminBranches />} />
          {/* agents */}
          <Route path="agents" element={<Agents />} />
          <Route path="agent-detail/:id" element={<AgentDetail />} />
        </Route>
      </Route>

      {/* agent routes */}
      <Route element={<RouteGuard allowedRole={UserRoleEnum.AGENT} />}>
        <Route path="agent-dashboard" element={<AgentWrapper />}>
          <Route index element={<AgentDashboard />} />
          <Route path="cashiers" element={<Cashiers />} />
          <Route path="cashier-detail" element={<CashierDetail />} />
          <Route path="branches" element={<AgentBranches />} />
          <Route path="cards" element={<CardsAgent />} />
          <Route path="register-card" element={<RegisterCard />} />
          <Route path="update-card/:cardId" element={<UpdateCard />} />
        </Route>
      </Route>

      {/* cashier routes */}
      <Route element={<RouteGuard allowedRole={UserRoleEnum.CASHIER} />}>
        <Route path="cashier-dashboard" element={<CashierWrapper />}>
          <Route path="create-game" element={<CreateGame />} />
          <Route path="cards" element={<CardsCashier />} />
          <Route path="sell-card" element={<SellCard />} />
          <Route path="view-card/:cardId" element={<ViewCard />} />
          <Route path="cash-book" element={<CashBook />} />
          <Route path="sound-setting" element={<SoundSetting />} />
        </Route>
      </Route>

      <Route path="/game" element={<Game />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
