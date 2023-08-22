const Controller = require("../../Controller")

class BlogCategoryController extends Controller{
    async createBlogCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
};

module.exports = {
    BlogCategoryController: new BlogCategoryController()
}