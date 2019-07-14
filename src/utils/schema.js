const getBrokenProp = schemaError => schemaError.details[0].context.key;

module.exports = {
  getBrokenProp
};
