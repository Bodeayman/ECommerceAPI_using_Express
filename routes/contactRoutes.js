const express = require('express');

const { getContact, createContact, putContact, deleteContact, getSingleContact } = require('../Controllers/contactController')
// You should define the brackets and the words inside the brackets 
const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts
 *     tags: 
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contacts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contacts:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Contact'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact with the provided information
 *     tags: 
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 description: Contact's full name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact's email address
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 description: Contact's phone number
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   $ref: '#/definitions/Contact'
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.route('/').get(getContact).post(createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     description: Retrieve a specific contact by its ID
 *     tags: 
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   $ref: '#/definitions/Contact'
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a contact
 *     description: Update an existing contact's information
 *     tags: 
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Contact's full name
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact's email address
 *                 example: "john.updated@example.com"
 *               phone:
 *                 type: string
 *                 description: Contact's phone number
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   $ref: '#/definitions/Contact'
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a contact
 *     description: Delete a contact by its ID
 *     tags: 
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted Contact from 507f1f77bcf86cd799439011"
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.route('/:id').put(putContact).delete(deleteContact).get(getSingleContact);

module.exports = router;



/*


router.get('/', getContact);

router.post('/', createContact)

router.put('/:id', putContact);

router.delete('/:id', deleteContact);

router.delete('/:id', getContact);

This is the normal way
*/