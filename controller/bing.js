const {
    Bing
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
        name = '',
            page = 1, pagesize = 16
    } = p;
    p['page'] = page;
    p['pagesize'] = pagesize;
    let res = await Bing.findAndCountAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
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