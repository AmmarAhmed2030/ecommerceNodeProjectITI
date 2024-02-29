import productModel from "../../../../db/models/product.model.js";
import userModel from "../../../../db/models/user.model.js";
<<<<<<< HEAD
import path from "path";
import cloudinary from "../../../../utils/cloudinary.js";
import upload from "../../../../utils/multer.js";
=======
import path from 'path';
import cloudinary from "../../../utils/cloudinary.js";
import upload from "../../../utils/multer.js";
>>>>>>> 85eab177cfffccc45e6e976acbb5c970a703ca14

import categoryModel from "../../../../db/models/category.model.js";
export const addProduct = async (req, res) => {
  //console.log(req.body);
  let foundUser = await userModel.findById(req.Id);
  if (!foundUser) return res.json({ message: "you need to register first" });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    let addedProduct = new productModel({
      productName: req.body.productName,
      finalPrice: req.body.finalPrice,
      stock: req.body.stock,
      cloudinary_id: result.public_id,
      cloudinary_url: result.secure_url,
      isCouponApplied: false,
      createdBy: req.Id,
      categoryId: req.body.categoryId,
      discount: req.body.discount,
      priceAfterDiscount: req.body.finalPrice * (1 - req.body.discount / 100),
    });
    addedProduct
      .save()
      .then((product) => {
        console.log("Product added:", product);
        res.json({ message: "added user", product });
      })
      .catch((err) => {
        console.error("Error creating product:", err.message);
      });
  } catch (err) {
    console.log(err);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    // console.log(req.Id,req.role);
    let foundUser = await userModel.findById(req.Id);
    if (!foundUser) return res.json({ message: "you need to register first" });
    let foundProduct = await productModel.findById(req.params.productId);
    if (!foundProduct) return res.json({ message: "product not found" });
    if (req.role != "admin" && req.Id != foundProduct.createdBy)
      return res.json({
        message: "You are not allowed to delete this product",
      });

    await cloudinary.uploader.destroy(foundProduct.cloudinary_id);
    let deletedProduct = await productModel.findByIdAndDelete(foundProduct._id);

<<<<<<< HEAD
    res.json({ message: "product deleted", deleteProduct });
  } catch (err) {
    console.log(err);
=======
  await cloudinary.uploader.destroy(foundProduct.cloudinary_id);
  let deletedProduct= await productModel.findByIdAndDelete(foundProduct._id);

  res.json({message:"product deleted",deletedProduct});
  }catch(err){
    console.log(err)
>>>>>>> 85eab177cfffccc45e6e976acbb5c970a703ca14
  }
};

export const updateProduct = async (req, res) => {
  //console.log(req.Id,req.role);
  try {
    let foundUser = await userModel.findById(req.Id);
    if (!foundUser) return res.json({ message: "you need to register first" });
    let foundProduct = await productModel.findById(req.params.productId);
    if (!foundProduct) return res.json({ message: "product not found" });
    if (req.role != "admin" && req.Id != foundProduct.createdBy)
      return res.json({
        message: "You are not allowed to update this product",
      });

    await cloudinary.uploader.destroy(foundProduct.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);

    //console.log(req.body);
    const data = {
      productName: req.body.productName,
      discount: req.body.discount,
      finalPrice: req.body.finalPrice,
      priceAfterDiscount: req.body.finalPrice * (1 - req.body.discount / 100),
      stock: req.body.stock,
      cloudinary_id: result.public_id,
      cloudinary_url: result.secure_url,
      createdBy: req.Id,
    };
    let updatedProduct = await productModel.findByIdAndUpdate(
      foundProduct._id,
      data,
      { new: true }
    );

    res.json({ message: "product updated", updatedProduct });
  } catch (err) {
    console.log(err);
  }
};

export const getAllProductsWithPagination = async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  if (req.query.page) {
    const productsCount = await productModel.countDocuments();
    if (skip >= productsCount) {
      return res.json({ message: "there is no more Products" });
    } else {
      const pageProducts = await productModel
        .find({})
        .skip(skip)
        .limit(limit)
        .exec();
      return res.json({ message: "page products is ", pageProducts });
    }
  } else {
    const pageProducts = await productModel.find({}).skip(0).limit(10).exec();
    res.json({ message: "page products is ", pageProducts });
  }
};

export const getProduct = async (req, res) => {
  const productId = req.params.productId;
  let foundProduct = await productModel.findById(productId);
  if (!foundProduct) return res.json({ message: "product not found" });
  res.json({ message: "found product", foundProduct });
};

export const getAllWithCategoryId = async (req, res) => {
  const catId = req.params.categoryId;
  let foundCategory = await categoryModel.findById(catId);
  if (!foundCategory) return res.json({ message: "Category Not Found" });
  let foundProducts = await productModel.find({ categoryId: catId });
  if (!foundProducts)
    return res.json({ message: "No products in this category" });
  res.json({ message: "there are the category products", foundProducts });
};
