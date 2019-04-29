const {
    Album
} = require("../lib/model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
    success,
    failed
} = require('./base.js');

const list = async(ctx, next) => {
    let p = ctx.request.params;
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
            ['create_time', 'ASC']
        ],
        offset: (page - 1) * pagesize,
        limit: pagesize * 1
    });
    ctx.body = success(res);
}

module.exports = {
    list
}