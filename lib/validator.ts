import * as z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";
import { orderItems, orders, products, reviews } from "@/db/schema";

// USER
export const signInFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(3, "Email doit comporter au moins 3 caractères"),
  password: z
    .string()
    .min(3, "Le mot de passe doit comporter au moins 3 caractères"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
    email: z
      .string()
      .email()
      .min(3, "Email doit comporter au moins 3 caractères"),
    password: z
      .string()
      .min(3, "Le mot de passe doit comporter au moins 3 caractères"),
    confirmPassword: z
      .string()
      .min(
        3,
        "La confirmation du mot de passe doit comporter au moins 3 caractères",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
export const updateProfileSchema = z.object({
  name: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
  email: z
    .string()
    .email()
    .min(3, "Email doit comporter au moins 3 caractères"),
});

export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, "ID est requis"),
  role: z.string().min(1, "Rôle est requis"),
});
// PRODUCT
export const insertProductSchema = createSelectSchema(products, {
  images: z
    .array(z.string())
    .min(1, "Le produit doit avoir au moins une image"),
  stock: z.coerce.number().min(0, "Le stock doit être au moins de 0"),
}).omit({
  id: true,
  rating: true,
  numReviews: true,
  createdAt: true,
});
export const updateProductSchema = createSelectSchema(products, {
  images: z
    .array(z.string())
    .min(1, "Le produit doit avoir au moins une image"),
  stock: z.coerce.number().min(0, "Le stock doit être au moins de 0"),
}).omit({
  rating: true,
  numReviews: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews, {
  rating: z.coerce
    .number()
    .int()
    .min(1, "La note doit être au moins de 1")
    .max(5, "La note doit être au maximum de 5"),
});

// CART
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Produit est requis"),
  name: z.string().min(1, "Nom est requis"),
  slug: z.string().min(1, "Slug est requis"),
  qty: z.number().int().nonnegative("La quantité doit être un nombre positif"),
  image: z.string().min(1, "Image est requise"),
  price: z.number().refine((value) => {
    // Utiliser la fonction modifiée avec le paramètre forDisplay=false
    // pour obtenir le format avec point décimal pour la validation
    const formatted = formatNumberWithDecimal(value, false);
    return /^\d+\.\d{2}$/.test(formatted);
  }, "Le prix doit avoir exactement deux décimales (ex: 49,99)"),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
  streetAddress: z
    .string()
    .min(3, "L'adresse doit comporter au moins 3 caractères"),
  city: z.string().min(3, "La ville doit comporter au moins 3 caractères"),
  postalCode: z
    .string()
    .min(3, "Le code postal doit comporter au moins 3 caractères"),
  country: z.string().min(3, "Le pays doit comporter au moins 3 caractères"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Méthode de paiement requise"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Méthode de paiement invalide",
  });

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

export const insertOrderSchema = createInsertSchema(orders, {
  shippingAddress: shippingAddressSchema,
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      email_address: z.string(),
      pricePaid: z.string(),
    })
    .optional(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems, {
  price: z.number(),
});
