const controller = require("../controller");
const { tables, methods } = require('./route');

let routes = tables.reduce((obj, key) => {
    const o = require(`../controllers/${key}`);
    const arr = Object.keys(o).reduce((total, each) => {
        Object.keys(o[each]).forEach(i => {
            let item = { path: `/${key}/${i}`, service: key, action: i, type: each };
            total.push(item);
        })
        return total;
    }, []);
    obj = obj.concat(arr);
    return obj;
}, []);

routes.forEach(item => {
    const service = require(`../controllers/${item.service}`);
    methods.forEach(method => {
        router[method](item.path, service[item.type][item.action])
    })
});

module.exports = router;