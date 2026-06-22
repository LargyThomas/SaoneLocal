import { routes } from "./routes.jsx";
import { PublicLayout } from "./layouts/public-layout.jsx";

function getCurrentRoute() {
  const path = window.location.pathname;

  const productRoute = routes.find((route) => route.path === "/produits/:id");
  if (path.startsWith("/produits/") && productRoute) {
    const productId = path.replace("/produits/", "");
    return { route: productRoute, params: { id: productId } };
  }

  const producerRoute = routes.find((route) => route.path === "/producteurs/:id");
  if (path.startsWith("/producteurs/") && producerRoute) {
    const producerId = path.replace("/producteurs/", "");
    return { route: producerRoute, params: { id: producerId } };
  }

  const currentRoute = routes.find((route) => route.path === path);
  if (currentRoute) {
    return { route: currentRoute, params: {} };
  }

  return { route: routes.find((route) => route.path === "*"), params: {} };
}

export default function App() {
  const { route, params } = getCurrentRoute();
  const Page = route.component;

  return (
    <PublicLayout>
      <Page params={params} />
    </PublicLayout>
  );
}
