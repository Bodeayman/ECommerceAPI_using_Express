//@desc get all contacts
//@route GET /api/contacts
//@access public

const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');



const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json({ "contacts": contacts });
});

const getSingleContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json({ "contact": contact });
});


const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All field");
    }
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json({ "contact": newContact })
})


const putContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json({ "contact": updatedContact });
})


const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ "message": `Deleted Contact from ${req.params.id}` });
})


module.exports = { getContact, createContact, deleteContact, putContact, getSingleContact };