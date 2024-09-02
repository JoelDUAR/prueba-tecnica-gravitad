"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const charactersHandler_1 = require("../handlers/charactersHandler");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Character management routes
 */
/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Get all characters
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: A list of characters
 */
router.get('/', charactersHandler_1.getAll);
/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The character ID
 *     responses:
 *       200:
 *         description: Character data
 *       404:
 *         description: Character not found
 */
router.get('/:id', charactersHandler_1.getById);
/**
 * @swagger
 * /characters/create:
 *   post:
 *     summary: Create a new character
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               species:
 *                 type: string
 *               gender:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Character created successfully
 */
router.post('/create', charactersHandler_1.create);
/**
 * @swagger
 * /characters/update/{id}:
 *   put:
 *     summary: Update a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The character ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               species:
 *                 type: string
 *               gender:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Character updated successfully
 *       404:
 *         description: Character not found
 */
router.put('/update/:id', charactersHandler_1.update);
/**
 * @swagger
 * /characters/delete/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The character ID
 *     responses:
 *       200:
 *         description: Character deleted successfully
 *       404:
 *         description: Character not found
 */
router.delete('/delete/:id', charactersHandler_1.deleteCharacterById);
exports.default = router;
