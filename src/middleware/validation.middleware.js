const validate =
  (schema, target = ValidationTarget.BODY) =>
  (req, res, next) => {
    const { error } = schema.validate(req[target], { abortEarly: false }); // Built-in abortEarly: false to show all validation issues.

    if (error) {
      const message = error.details.map((detail) => detail.message).join(", ");
      return res.status(400).json({ error: message });
    }

    next();
  };

const ValidationTarget = {
  BODY: "body",
  QUERY: "query",
  PARAMS: "params",
};

export { validate, ValidationTarget };