const express = require('express');
const router = express.Router();
const Project = require('../models/project')
const Staff = require('../models/staff')
const DailyForm = require('../models/dailyForm')
const User = require('../models/user')
const {md5} = require('md5js')
const session = require('express-session')

var sess

router.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

router.get('/',function (req, res) {
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
    sess = req.session
    if(!sess.UserName){
        res.send({success: false, message: 'Please login first!'})
    } else {
        console.log(sess.UserName)
        Project.create(req.body).then(function (staff) {
            res.send(staff)
        })
    }
})

router.post('/staff',function (req, res) {
    sess = req.session
    if(!sess.UserName){
        res.send({success: false, message: 'Please login first!'})
    } else {
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
    }
})

router.post('/forms',function (req, res) {
    sess = req.session
    if(!sess.UserName){
        res.send({success: false, message: 'Please login first!'})
    } else {
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
    }
})

router.post('/login',function (req, res) {
    var user = req.body
    sess = req.session
    
    User.findOne({UserName: user.UserName, Password: md5(user.Password,32)}).then(f => {
        if (f == null) {
            res.send(false)
        } else {
            sess.UserName = user.UserName
            res.send(true)
        }
    })
})

router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});

router.get('/authenticate',function(req,res){
    sess = req.session
    if(!sess.UserName){
        res.send({success: false, message: 'Please login first!'})
    } else {
        res.send({success: true, userName: sess.UserName})
    }
});

router.delete('/projects',function (req, res) {
    sess = req.session
    if(!sess.UserName){
        res.send({success: false, message: 'Please login first!'})
    } else {
        var project = req.body
        Project.findOneAndRemove({name: project.name}).then(function (project) {
            res.send(project)
        })
    }
})

router.delete('/staff',function (req, res) {
    sess = req.session
    if(!sess.UserName){
        res.send({success: false, message: 'Please login first!'})
    } else {
        var staff = req.body
        Staff.findOneAndDelete({id: staff.id}).then(function (staff) {
            res.send(staff)
        })
    }
})

module.exports = router