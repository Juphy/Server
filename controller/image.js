const {
    Image
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
        album_id,
        page = 1,
        pagesize = 16
    } = p;
    p['page'] = page;
    p['pagesize'] = pagesize;
    let where = {
        name: {
            [Op.like]: '%' + '' + '%'
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
    if (typeof album_id !== 'undefined') {
        where['album_id'] = album_id;
    }
    let res = await Image.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        offset: (page - 1) * pagesize,
        limit: pagesize * 1
    });
    ctx.body = success(res);
}

module.exports = {
    list
}