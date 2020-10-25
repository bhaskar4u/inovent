const Employee = require('../model/Employee');
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' })
const SecretKey = process.env.SecretKey || "test_121"

module.exports = {
    RegisterEmplyoee: async (req, res) => {
        const empExist = await Employee.findOne({ email: req.body.email })
        if (empExist) return res.status(409).send("use another email");
        const hashPwd = await Bcrypt.hashSync(req.body.password, 10)
        const emp = new Employee({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPwd
        })
        try {
            const EMP = await emp.save()
            res.send({
                status: res.status.code,
                data: JSON.parse(JSON.stringify(EMP))
            })

        } catch (err) {
            res.status(500).send(err)
        }
    },
    Login: async (req, res) => {
        const employee = await Employee.findOne({ email: req.body.email })
        try {
            if (employee) {
                if (Bcrypt.compareSync(req.body.password, employee.password)) {
                    const payload = {
                        name: employee.name,
                        email: employee.email,
                        mobile: employee.mobile,
                        empId: employee._id
                    }
                    let token = await jwt.sign(payload, SecretKey, {
                        expiresIn: '1d'
                    })
                    res.send({
                        status: res.status.code,
                        message: 'Login Successfully',
                        token
                    })
                } else {
                    res.status(400).send("Invalid password")
                }
            } else {
                res.status(400).send("Email Not Recognised")
            }
        } catch (err) {
            res.status(500).send(`Bad Request ${err}`)
        }
    },

    VerifyToken: (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader != "undefined") {
            const bearer = bearerHeader;
            const beareToken = bearer;
            req.token = beareToken;
            next();
        } else {
            res.status(403).send("forbidden");
        }
    },
    DecodeToken: (params) => {
        var token = params.headers["authorization"] || params.query["token"];
        var decoded = {};

        if (token) {
            decoded = jwt.verify(token, SecretKey);
        }

        return decoded;
    }
}