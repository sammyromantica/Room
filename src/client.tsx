import { hydrateRoot } from "react-dom/client";
import { Route } from "./routes/__root";
import { getRouter } from "./router";

const router = getRouter();
hydrateRoot(document, <Route.Provider router={router} />);