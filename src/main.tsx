import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { client } from "./utils/apollo";
import { ROUTE_CONFIG } from "@/router";
import Page404 from "@/pages/page404";
import UserInfo from "@/components/userInfo";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          {ROUTE_CONFIG.map(item => (
            <Route path={item.path} key={item.key} element={<item.element />} />
          ))}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>
);
