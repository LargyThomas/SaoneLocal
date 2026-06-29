import Badge from "./badge.jsx";
import Button from "./button.jsx";
import Card from "./card.jsx";
import { formatPrice } from "../utils/format.js";

export default function ProductCard({
  product,
  name = product?.productName || product?.productname || "Produit local",
  description = product?.productDesc || product?.productdesc || "",
  price = product?.productPrice ?? product?.productprice,
  image = product?.productPicture || product?.productpicture || "",
  category = product?.categoryName || product?.categoryname || "Produit local",
  producerLabel = product?.producername || product?.producerdesc || (product?.producerId || product?.producerid ? `Producteur ${product.producerId || product.producerid}` : "Producteur local"),
  href = product?.productId ? `/produits/${product.productId}` : product?.productid ? `/produits/${product.productid}` : "#",
  onAddToCart,
}) {
  const formattedPrice = formatPrice(price);

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-[#fffdf7] shadow-[0_10px_26px_rgba(36,17,5,0.05)] transition duration-200 hover:-translate-y-1 hover:border-green/20 hover:shadow-[0_16px_34px_rgba(36,17,5,0.08)]">
      <div className="m-3 mb-0 flex h-44 items-center justify-center overflow-hidden rounded-photo bg-vanilla-custard text-sm font-bold text-brown-bark sm:aspect-[4/3] sm:h-auto">
        {image ? (
          <img alt={name} className="h-full w-full rounded-photo object-cover transition duration-300 group-hover:scale-[1.03]" decoding="async" loading="lazy" src={image} />
        ) : (
          <span>Image à venir</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <Badge className="bg-golden-glow/90">{category}</Badge>
          <h3 className="break-words text-lg font-extrabold leading-tight text-coffee-beans">{name}</h3>
          {description ? <p className="line-clamp-2 text-sm leading-6 text-coffee-beans/65">{description}</p> : null}
        </div>

        <div className="mt-auto space-y-4">
          <div>
            {formattedPrice ? <p className="text-xl font-extrabold text-green">{formattedPrice}</p> : null}
            <p className="mt-1 text-sm font-semibold text-brown-bark">{producerLabel}</p>
          </div>

          <div className="grid gap-2">
            <Button as="a" className="w-full" href={href} size="sm">
              Fiche produit
            </Button>
            {onAddToCart ? (
              <Button className="w-full" onClick={() => onAddToCart(product)} size="sm" variant="secondary">
                Ajouter au panier
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
