const router = require('express').Router();

exports.response = (res, statusCode, status, message, data) => {
	
	return res.status(statusCode).json({
		status,
		statusCode,
		message,
		data
	});
};

exports.removeEmptyKeyFromObject = (obj) => {
    Object.keys(obj).forEach(function(key) {
      (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
      (obj[key] === '' || obj[key] === null || obj[key] === undefined) && delete obj[key]
    });
    return obj;
  };

exports.paginateModel = async (model, query_criteria, page, results_per_page, populateArray = []) => {

    return await model.find(query_criteria).count()
        .then((total_records) => {
            let total_pages = Math.ceil(total_records / results_per_page);
            let skip = page >= 1 ? (page - 1) * results_per_page : 0;

            let qry = model.find(query_criteria).skip(skip).limit(results_per_page);

            if (populateArray.length > 0) {
                populateArray.map(obj => {
                    qry.populate(obj.populate, obj.fields)
                })
            }

            return {
                query: qry,
                pagination: {
                    total_records: total_records,
                    current_page: page,
                    total_pages: total_pages ? total_pages : 1,
                    next_page: page < total_pages ? page + 1 : null,
                    previous_page: page > 1 ? page - 1 : null,
                }
            };
        })
        .catch((error) => { return helper.response(false, error, {}, 500); });
};

exports.createEnrollmentNo = async(category, currentClass, dob, sequentialId ) => { 
    const dateOfBirth = dob.split("/")
    let count = sequentialId + "";
    for (let index = 5 - count.length ; index <= 5; index++) {
        count = "0" + count
    }
    return "AMP" + this.category + this.currentClass + dateOfBirth[2] + dateOfBirth[1] + count + "@ampindia.org";
}
