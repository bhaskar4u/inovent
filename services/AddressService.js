const bcrypt = require('bcryptjs')

const Address = require('../model/Address');


const { DecodeToken } = require('./EmplyoeeService')

module.exports = {
    AddingAddress: async (data, params) => {

        console.log(data.body);
        try {
            const presentBody = data.body.presentAddress
            const permanentBody = data.body.permanentAddress
            const officeBody = data.body.officeAddress


            const EMP = await DecodeToken(params.req)
            // console.log(EMP);
            const address = new Address({
                empId: EMP.empId, empName: EMP.name,

                presentAddress: { addressLine_1: presentBody.addressLine_1, addressLine_2: presentBody.addressLine_2, city: presentBody.city, pin: presentBody.pin, country: presentBody.country },
                permanentAddress: { addressLine_1: permanentBody.addressLine_1, addressLine_2: permanentBody.addressLine_2, city: permanentBody.city, pin: permanentBody.pin, country: permanentBody.country },
                officeAddress: { addressLine_1: officeBody.addressLine_1, addressLine_2: officeBody.addressLine_2, city: officeBody.city, pin: officeBody.pin, country: officeBody.country }


            })
            const EmpAddress = await address.save()
            data.res.status(200).send({
                message: 'Address Saved Successfully',
                data: JSON.parse(JSON.stringify(EmpAddress))
            })

        } catch (err) {
            data.res.status(400).send({
                status: data.res.status.code,
                message: 'something went wrong'
            })
        }
    },
    ListAddressByCity: async (req, res) => {
        try {
            const searchField = req.query.city;
            const search = await Address.find({ name: { $regex: searchField, $options: '$i' } })
            res.send({
                data: JSON.parse(JSON.stringify(search))
            })
        } catch (err) {
            res.status(400).send(err)
        }
    }
}