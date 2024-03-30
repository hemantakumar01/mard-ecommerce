export const responce = (
  res,
  statuscode = 400,
  message = "",
  success = false,
  data = null,
  more = null
) => {
  res.status(statuscode).send({
    message,
    success,
    data,
    more,
  });
};
