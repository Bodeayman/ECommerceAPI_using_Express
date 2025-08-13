const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const { parse, formatISO } = require("date-fns");
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const getAllSales = async (req, res) => {
    // To get the page
    let page = 1;
    if (req.query.page > 0) {
        page = parseInt(req.query.page);
    }

    // To Get the date

    const { date } = req.body
    if (date == null) {
        return res.status(403).json({ "message": "Please import the date" })
    }
    const newDate = parse(date, "yyyy-MM-dd", new Date());
    const startOfDay = new Date(newDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(newDate);
    endOfDay.setHours(23, 59, 59, 999);


    try {

        const allSales = await prisma.sale.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });
        if (allSales.length === 0) {
            return res.status(200).json({ "message": "No stocks found in this day" })
        }
        const paginatedSales = pagination(allSales, page);
        res.status(200).json(paginatedSales);
    }
    catch (err) {
        res.status(404).json({ err: err.message });
    }
}

const getLowStockProducts = async (req, res) => {
    try {
        const lowStockProducts = await prisma.product.findMany({
            where: {
                quantity: {
                    lt: 5
                }
            }
        });
        res.json(lowStockProducts);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const exportProductsInFile = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            select: { id: true, name: true, price: true, quantity: true }
        });
        console.log(products);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=products.pdf');

        const doc = new PDFDocument();
        doc.pipe(res);

        // Title
        doc.fontSize(20).text('Products List', { align: 'center' });
        doc.moveDown();

        // Simple rows
        products.forEach(p => {
            doc.fontSize(12).text(
                `ID: ${p.id} | Name: ${p.name} | Price: ${p.price} | Quantity: ${p.quantity ?? ''}`
            );
        });

        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const exportSalesInFile = async (req, res) => {
    try {
        const sales = await prisma.sale.findMany({
            select: { id: true, quantity: true, date: true, productId: true }
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=products.pdf');

        const doc = new PDFDocument();
        doc.pipe(res);

        // Title
        doc.fontSize(20).text('Products List', { align: 'center' });
        doc.moveDown();

        // Simple rows
        sales.forEach(p => {
            doc.fontSize(12).text(
                `ID: ${p.id} | Quantity: ${p.quantity} | Product Id: ${p.productId} | Date: ${p.date ?? ''}`
            );
        });

        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = { getLowStockProducts, getAllSales, exportProductsInFile, exportSalesInFile }