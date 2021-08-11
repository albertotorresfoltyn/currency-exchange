import withAuth from "../wrappers/withAuth";
import Auth from "../pages/Auth";
import Countries from "../pages/Countries";

export default class WebRoutes {
  static routes = [
    {
      path: "/",
      component: withAuth(Countries),
    },
    {
      path: "/login",
      component: Auth,
    },
  ];

  static getList = () => {
    return [...WebRoutes.routes];
  };
}
