const prisma = require('../prisma/prismaClient');

class ProductService {
    getAllProducts() {
        return prisma.product.findMany({
            select: {
                id: true,
                name: true,
                descr: true,
                price: true,
                image_url: true,
                refund: true,
                quantity: true
            }
        });
    }
    createNewProduct(name, desc, price, image, quantity) {
        return prisma.product.create({
            data: {
                name: name,
                descr: desc,
                price: price,
                image_url: image ?? "https://placeholder.img",
                refund: true ?? true,
                quantity: quantity ?? 0,
            }
        });
    }

    getSpecificProducts(id) {
        prisma.product.findUnique({
            where: {
                id: parseInt(id),
            }
        });
    }
    deleteSpecificProduct(id) {
        prisma.product.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
    updateSpecificProduct(id, name, descr, price) {
        prisma.product.update({
            where: {
                id: id,
            }
            , data: {
                price: price,
                descr: descr,
                name: name
            }
        });
    }
}

module.exports = ProductService;