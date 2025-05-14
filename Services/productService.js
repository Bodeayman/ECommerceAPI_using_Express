const prisma = require('../prisma/prismaClient');

class ProductService {
    getAllProducts() {
        return prisma.product.findMany();
    }
    createNewProduct(name, desc, price, image) {
        return prisma.product.create({
            data: {
                name: name,
                descr: desc,
                price: price,
                image_url: image,
                refund: true,
                quantity: 1
            }
        });
    }

    getSpecificProducts(id) {
        return prisma.product.findUnique({
            where: {
                id: parseInt(id),
            }
        });
    }
    deleteSpecificProduct(id) {
        return prisma.product.delete({
            where: {
                id: id
            }
        });
    }
    updateSpecificProduct(id, name, descr, price) {
        return prisma.product.update({
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