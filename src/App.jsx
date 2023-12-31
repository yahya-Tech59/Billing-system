import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Agents,
  Customers,
  Products,
  Orders,
  Users,
  SignIn,
  SignUp,
  SignOut,
} from "./pages/index";
import { NoMatch } from "./utils/NoMatch";
import { Sidebar } from "./components/Sidebar";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <div className="flex bg-zinc-100 ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={[<Sidebar />, <Dashboard />]} />
              <Route path="agents" element={[<Sidebar />, <Agents />]} />
              <Route path="customers" element={[<Sidebar />, <Customers />]} />
              <Route path="products" element={[<Sidebar />, <Products />]} />
              <Route path="orders" element={[<Sidebar />, <Orders />]} />
              <Route path="users" element={[<Sidebar />, <Users />]} />
              <Route path="signout" element={[<Sidebar />, <SignOut />]} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
