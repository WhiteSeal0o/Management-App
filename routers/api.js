const express = require('express');
const router = express.Router();
const Project = require('../models/project')
const Staff = require('../models/staff')
const DailyForm = require('../models/dailyForm')

router.get('/',function (req, res) {
    // console.log('Request url: ', req.url)
    // res.send('Hi there')
    res.writeHead(200, {'Content-Type': 'text/html'})
    var readSteam = fs.createReadStream(__dirname + '/index.html','utf8')
    readSteam.pipe(res)
})

router.get('/projects',function (req, res) {
    if(!req.query.id && !req.query.date){
        Project.find({}).then(projects => {
            res.send(projects)
        })
    } else {
        res.send('nothing show yet')
    }
})

router.get('/staff',function (req, res) {
    if(!req.query.id && !req.query.date){
        Staff.find({}).then(staff => {
            res.send(staff)
        })
    } else {
        res.send('nothing show yet')
    }
})

router.get('/forms',function (req, res) {
    if(!req.query.startDate && !req.query.endDate){
        DailyForm.find({}).then(forms => {
            res.send(forms)
        })
    } else if (!req.query.endDate){
        DailyForm.findOne({ date: req.query.startDate }).then(form => {
            res.send(form)
        })
    } else {
        DailyForm.find({date: {$gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate)} }).then(form => {
            res.send(form)
        })
    }
})

router.post('/projects',function (req, res) {
    console.log(req.body)
    Project.create(req.body).then(function (staff) {
        res.send(staff)
    })
})

router.post('/staff',function (req, res) {
    var newStaff = req.body
    Staff.update({
        id: newStaff.id
    }, {
        id: newStaff.id,
        name: newStaff.name,
        projects: newStaff.projects
    }, {
        upsert : true 
    }).then(function (staff) {
        res.send(staff)
    })
})

router.post('/forms',function (req, res) {
    var newForm = req.body
    var dailyForm = {
        date: newForm.date,
        dailyStaff: [newForm.dailyStaff]
    }

    DailyForm.findOne({date: newForm.date}).then(f => {
        if (f == null) {
            DailyForm.create(dailyForm).then( staff => {
                res.send(staff)
            })
        } else {
            //remove old ver of staff
            f.dailyStaff = f.dailyStaff.filter(dst => {
                return dst.staff.id != newForm.dailyStaff.staff.id
            })
            //add new ver of staff
            f.dailyStaff.push(newForm.dailyStaff)
            //update daily form
            DailyForm.findOneAndUpdate({
                _id: f._id
            },{
                dailyStaff: f.dailyStaff
            }).then( staff => {
                res.send(staff)
            })
        }
    })
})

module.exports = router