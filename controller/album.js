const {
    Album
} = require("../lib/model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const list = async(ctx, next) => {
    let {
        category = 'nvshens',
            page = 1, pagesize = 16
    } = p;
    p['page'] = page;
    p['pagesize'] = pagesize;
    let res = await Album.findAndCountAll({
        where: {
            category: {
                [Op.like]: '%' + category + '%'
            }
        },
        order: [
            ['create_time', 'DESC']
        ],
        offset: (page - 1) * pagesize,
        limit: pagesize * 1
    });
    ctx.body = success(res);
}

module.exports = {
    list
}