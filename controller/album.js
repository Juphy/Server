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
        id,
        name,
        category = 'nvshens',
        page = 1,
        pagesize = 16
    } = p;
    p['page'] = page;
    p['pagesize'] = pagesize;
    let where = {
        category: {
            [Op.like]: '%' + category + '%'
        }
    };
    if (typeof id !== 'undefined') {
        where['id'] = id;
    }
    if (typeof name !== 'undefined') {
        where['name'] = {
            [Op.like]: '%' + name + '%'
        }
    }
    let res = await Album.findAndCountAll({
        where: where,
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