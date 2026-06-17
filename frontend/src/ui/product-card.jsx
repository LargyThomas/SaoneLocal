function ProductCard({ name, price, image, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-xs w-full hover:shadow-2xl transition">
      <img src={image} className="w-full h-48 object-cover" alt={name} />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold text-lg">{price}</span>
          <button type="button" onClick={onAddToCart} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm">Ajouter au Panier</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard