const redirectLogin = (request, response, next) => {
    if (!request.session.Email) {
      response.status(200).redirect("/auth");
    } else {
      next();
    };
};

const redirectMain = (request, response, next) => {
    if (request.session.Email) {
      response.status(200).redirect("/subscription");
    } else {
      next();
    };
};

module.exports = {
    redirectLogin,
    redirectMain
};







