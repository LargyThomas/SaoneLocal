import { routes } from "./routes.jsx";
import { PublicLayout } from "./layouts/public-layout.jsx";

function getCurrentRoute() {
  const path = window.location.pathname;
  return routes.find((route) => route.path === path) ?? routes.find((route) => route.path === "*");
}

export default function App() {
  const route = getCurrentRoute();
  const Page = route.component;

  return (
    <PublicLayout>
      <Page />
    </PublicLayout>
  );
}
