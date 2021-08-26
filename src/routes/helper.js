module.exports = {
  restfulMapping(_, subRouterName, controller) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach((methodName) => {
      controller[methodName] &&
        _[methodName](`/${subRouterName}`, controller[methodName]);
    });
  },
};
