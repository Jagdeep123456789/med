const express = require("express");
const router = express.Router();

const Prescription =
require("../models/Prescription");

router.post("/",async(req,res)=>{

const prescription =
await Prescription.create(
req.body
);

res.status(201).json(
prescription
);

});

router.get(
"/appointment/:appointmentId",
async(req,res)=>{

const prescription =
await Prescription.findOne({
appointment_id:
req.params.appointmentId
});

res.json(prescription);

});

module.exports = router;