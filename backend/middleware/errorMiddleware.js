const errorHandler = (err,req,res,next) => {
    // const statusCode = res.status ? res.status : 400;
    // res.status(statusCode)
    res.json({
        error:err.message
    })
}

module.exports = {
    errorHandler
}