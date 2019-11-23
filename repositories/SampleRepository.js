const mongoose = require('mongoose')
const Sample =  require('../models/sample')

// connect to db
mongoose.connect('mongodb://user:password@ds211558.mlab.com:11558/heroku_vbrlvdjr', { useNewUrlParser: true } )

this.findByKeyword = function (keyword) {
    return Sample.findOne({keyword: keyword}).then(model => model).catch(error => error)
}

this.saveSample = function (reqBody) {
    const sample = new Sample(reqBody)
    return sample.save().then(model => model).catch(error => error)
}
