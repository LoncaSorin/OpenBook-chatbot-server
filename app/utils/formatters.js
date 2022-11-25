const formatRoute = (route, params) => {
  let formattedRoute = route;

  Object.keys(params).forEach((key) => {
    formattedRoute = formattedRoute.replace(`:${key}`, params[key]);
  });

  return formattedRoute;
};

module.exports = {
  formatRoute,
}
