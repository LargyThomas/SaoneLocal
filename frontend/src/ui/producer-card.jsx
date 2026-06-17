function ProducerCard({ name = "Nom du producteur", location = "Localisation du producteur", image = "", href = "#" }) {
  return (
    <article className="w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img src={image} alt={`Photo de ${name}`} className="h-44 w-full object-cover"/>

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900">{name}</h2>

        <p className="mt-1 text-sm text-gray-600">{location}</p>

        <a href={href} className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600">Voir la fiche producteur</a>
      </div>
    </article>
  )
}

export default ProducerCard