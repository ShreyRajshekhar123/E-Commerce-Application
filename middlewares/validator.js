const Joi = require('joi');


module.exports.validator = (schema) => {
    return (req, res, next)=>{
        const body = req.body;
        const {error, value} = schema.validate(body);

        if(error){
            return res.render('error', {err: error.details[0].message});
        }
        next();
    } 
}