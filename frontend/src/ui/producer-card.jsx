import Badge from "./badge.jsx";
import Button from "./button.jsx";
import Card from "./card.jsx";

export default function ProducerCard({
  producer,
  name = producer?.producername || `${producer?.usersfirstname || ""} ${producer?.userslastname || ""}`.trim() || "Producteur local",
  job = producer?.producerDesc || producer?.producerdesc || "Métier local",
  location = producer?.producerLocalisation || producer?.producerlocalisation || "Localisation à venir",
  image = producer?.producerpicture || producer?.usersprofilpicture || "",
  href = producer?.producerId ? `/producteurs/${producer.producerId}` : producer?.producerid ? `/producteurs/${producer.producerid}` : "#",
  status = producer?.producerStatus || producer?.producerstatus || "local",
}) {
  const statusLabel = status === "active" ? "Actif" : status;
  const statusVariant = status === "active" ? "success" : "muted";

  return (
    <Card className="group flex h-full flex-col bg-[#fffdf7] p-3 shadow-[0_10px_26px_rgba(36,17,5,0.05)] transition duration-200 hover:-translate-y-1 hover:border-green/20 hover:shadow-[0_16px_34px_rgba(36,17,5,0.08)]">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-photo bg-vanilla-custard">
        {image ? (
          <img
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            decoding="async"
            loading="lazy"
            src={image}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-golden-glow via-golden-glow/75 to-soft-linen">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/85 text-2xl font-extrabold text-forest-green shadow-md">
              SL
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-3 pt-4">
        <div className="space-y-2">
          <Badge variant={statusVariant}>{statusLabel}</Badge>
          <h3 className="break-words text-lg font-extrabold leading-tight text-coffee-beans">{name}</h3>
          <p className="text-sm font-bold text-forest-green">{job}</p>
          <p className="text-sm font-semibold text-brown-bark">{location}</p>
        </div>

        <Button as="a" className="mt-auto w-full" href={href} size="sm">
          Fiche producteur
        </Button>
      </div>
    </Card>
  );
}
