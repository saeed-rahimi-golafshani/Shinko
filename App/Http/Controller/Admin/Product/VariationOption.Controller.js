const createHttpError = require("http-errors");
const { VariationOptionModel } = require("../../../../Models/Variation_Option.Model");
const { createVariationOptionSchema } = require("../../../Validations/Admin/Variation.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes")

class VariationOptionController extends Controller{
  async caretVariationOption(req, res, next){
    try {
      const requestBody = await createVariationOptionSchema.validateAsync(req.body);
      const { variation_Id, value } = requestBody;
      const checkTitle = await VariationOptionModel.findOne({variation_Id, value});
      if(checkTitle){
        throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید")
      }
      const variationOption = await VariationOptionModel.create({variation_Id, value});
      if(!variationOption) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "مقدار مشخصات فنی با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  VariationOptionController: new VariationOptionController()
}