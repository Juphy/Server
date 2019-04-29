module.exports = async(ctx, next) => {
    try {
        await next().catch(err => {
            throw err;
        });
        if (ctx.body) ctx.status = ctx.body.code;
        if (ctx.status === 200) {
            const p = ctx.request.params;
            if ('page' in p && 'page_size' in p) {
                const body = ctx.body['res'];
                let obj = {
                    page: {},
                    data: {}
                };
                obj.data = body['rows'];
                obj.page['count'] = body.count;
                obj.page['total'] = Math.ceil(body.count / p.page_size);
                ctx.body['res'] = obj;
            }
        }
    } catch (e) {

    }
}