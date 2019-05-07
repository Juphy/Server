const {
    Photo
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
        album_name,
        page = 1,
        pagesize = 16
    } = p;
    p['page'] = page;
    p['pagesize'] = pagesize;
    let where = {};
    if (typeof id !== 'undefined') {
        where['id'] = id;
    }
    if (typeof name !== 'undefined') {
        where['name'] = {
            [Op.like]: '%' + name + '%'
        }
    }
    if (typeof album_name !== 'undefined') {
        where['album_name'] = {
            [Op.like]: '%' + album_name + '%'
        }
    }
    let res = await Photo.findAndCountAll({
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