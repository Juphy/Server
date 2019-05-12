const Koa = require("koa"),
    { port: port } = require('./config'),
    middleware = require('./middleware'),
    bodyParser = require('koa-bodyparser');
    
const app = new Koa();

app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}))

app.use(async(ctx, next) => {
    console.log('IP:', ctx.headers['x-forwarded-for'],
        ctx.socket.remoteAddress,
        ctx.request.ips);
    await next();
})

// 处理get和post请求参数
app.use(middleware.request)

// 使用响应处理中间件
app.use(middleware.response)

const router = require('./route')
app.use(router.routes())

app.listen(port, () => console.log(new Date(), port));