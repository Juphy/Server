const Koa = require("koa"),
    { port: port } = require('./config');
const app = new Koa();

app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}))

app.use(async(ctx, next) => {
    console.log('------ip:', ctx.headers['x-forwarded-for'] ||
        ctx.socket.remoteAddress ||
        ctx.connection.socket.remoteAddress);
    await next();
})

// 处理get和post请求参数
app.use(middlewares.request)

// 使用响应处理中间件
app.use(middlewares.response)

const router = require('./routes')
app.use(router.routes())

app.listen(port, () => console.log(new Date(), port));