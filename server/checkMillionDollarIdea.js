const checkMillionDollarIdea = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body
    const totalSum = numWeeks * weeklyRevenue
    if (!numWeeks || !weeklyRevenue || isNaN(totalSum) || totalSum < 1000000) {
        return res.status(400).send();
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
