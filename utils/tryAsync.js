export const tryAsync = (paramFunction) => (req, res, next) => {
  Promise.resolve(paramFunction(req, res, next)).catch(next);
};
