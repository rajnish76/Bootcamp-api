const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  const reqQuery = {
    ...req.query,
  };

  //Field to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}` //{{URL}}/api/v1/bootcamps?averageCost[lte]=10000
  );

  query = model.find(JSON.parse(queryStr));

  if (req.query.select) {
    //console.log(req.query.select); //name,description
    const fields = req.query.select.split(',').join(' ');
    //console.log(fields); //name description
    query = query.select(fields); //{{URL}}/api/v1/bootcamps?select=name,description,housing&housing=true
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);
  //{{URL}}/api/v1/bootcamps?select=name,description,housing&limit=1&page=2

  if (populate) {
    query = query.populate(populate, '-__v');
  }

  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
