const router = require('koa-router')({
    prefix: '/'
})
const controller = require("../controller");
const { tables, methods } = require('./route');
console.log(tables, methods);
let routes = tables.reduce((obj, key) => {
    const o = require(`../controller/${key}`);
    console.log(Object.keys(o));
    const arr = Object.keys(o).reduce((total, each) => {
        let item = { path: `${key}/${each}`, service: key, action: each };
        total.push(item);
        return total;
    }, []);
    obj = obj.concat(arr);
    return obj;
}, []);

console.log(routes);

routes.forEach(item => {
    const service = require(`../controller/${item.service}`);
    methods.forEach(method => {
        router[method](item.path, service[item.action])
    })
});

module.exports = router;