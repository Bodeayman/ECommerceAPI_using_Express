


const ITEMS_PER_PAGE = 10;
function pagination(listOfData, page) {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;
    const paginatedItems = listOfData.slice(startIndex, endIndex);
    return paginatedItems;

}
module.exports = pagination;