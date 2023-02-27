import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {}

//App에서 받는 함수의 형태를 interface에 명시해야함
//toggleDark 함수는 argument와 return 이 없어서 ()=>void 로 작성한다.

function Router({}: IRouterProps) {
  return (
    <BrowserRouter basename="/coin-chart">
      <Switch>
        <Route path={"/:coinId"}>
          <Coin />
        </Route>
        <Route path={"/"}>
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
