import lazyload from "../components/lazyload";

function getFlattenRoutes(routes: RouteItem[]): any {

  const mod = import.meta.glob("../pages/**/[a-z[]*.tsx");
  const res: any[] = [];

  function travel(_routes: RouteItem[]) {
    _routes.forEach((route) => {

      if (route.key && !route.children) {
        route.component = lazyload(mod[`../pages/${route.key}/index.tsx`]);
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}
export default getFlattenRoutes;
