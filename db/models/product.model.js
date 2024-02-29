import mongoose from "mongoose";
import slugify from "slugify";
let productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    slug: String,
    finalPrice: { type: Number, required: true },
    cloudinary_id: String,
    cloudinary_url: String,
    priceAfterDiscount: Number,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: Number,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discount: {
      type: Number,
    },

    isCouponApplied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
productSchema.pre("save", function (next) {
  this.slug = slugify(this.productName, { lower: true });
  if (this.isModified("finalPrice") || this.isModified("discount")) {
    const finalPrice = this.finalPrice || 0;
    const discount = this.discount || 0;
    this.priceAfterDiscount = finalPrice * (1 - discount / 100);
  }
  next();
});
const productModel = mongoose.model("Product", productSchema);
export default productModel;
