const FormRoutes = require("./form.routes.js");
const TicketRoutes = require("./ticket.routes.js");
const UserRoutes = require("./user.routes");

module.exports = function routes(app) {
  app.use(FormRoutes);
  app.use(TicketRoutes);
  app.use(UserRoutes);
  // app.use(route.USER, UserRoutes);
};
// module.exports = routes;
