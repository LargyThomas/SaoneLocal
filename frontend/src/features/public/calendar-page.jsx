import { useEffect, useMemo, useState } from "react";
import { fetchCalendar } from "../../api/calendar-api.js";
import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function isUpcomingEvent(event) {
  const eventDate = new Date(event.eventsdate);

  if (Number.isNaN(eventDate.getTime())) {
    return false;
  }

  return eventDate >= startOfToday();
}

function sortByDate(a, b) {
  return new Date(a.eventsdate) - new Date(b.eventsdate);
}

function sortProducerEventByDate(a, b) {
  return new Date(a.date) - new Date(b.date);
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date à venir";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function getProducerName(producer) {
  return `${producer.usersfirstname || ""} ${producer.userslastname || ""}`.trim() || producer.usersemail || "Producteur local";
}

function groupProducerEvents(producers) {
  const grouped = new Map();

  producers.forEach((producer) => {
    const key = producer.usersemail || getProducerName(producer);
    const current = grouped.get(key) || {
      email: producer.usersemail,
      events: [],
      name: getProducerName(producer),
    };

    current.events.push({
      date: producer.eventsdate,
      name: producer.eventsname,
    });

    grouped.set(key, current);
  });

  return Array.from(grouped.values())
    .map((producer) => ({
      ...producer,
      events: producer.events.filter((event) => isUpcomingEvent({ eventsdate: event.date })).sort(sortProducerEventByDate),
    }))
    .filter((producer) => producer.events.length > 0);
}

function EventCard({ event, index }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border border-coffee-beans/10 bg-[#fffdf7] p-0 shadow-[0_10px_26px_rgba(36,17,5,0.06)] transition duration-300 hover:-translate-y-1 hover:border-mustard/50 hover:shadow-[0_18px_38px_rgba(36,17,5,0.1)]">
      <div className="flex h-44 shrink-0 items-center justify-center bg-gradient-to-br from-golden-glow via-golden-glow/75 to-soft-linen p-5 sm:h-52">
        <div className="rounded-card bg-white/85 px-4 py-3 text-center shadow-sm">
          <p className="text-xs font-extrabold uppercase text-coffee-beans/60">Événement</p>
          <p className="mt-1 font-display text-2xl leading-tight text-coffee-beans">#{String(index + 1).padStart(2, "0")}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-card border border-coffee-beans/10 bg-soft-linen px-3 py-1.5 text-xs font-extrabold uppercase text-coffee-beans/70">
            {formatDate(event.eventsdate)}
          </span>
          <span className="rounded-card border border-coffee-beans/10 bg-soft-linen px-3 py-1.5 text-xs font-extrabold uppercase text-coffee-beans/70">
            {event.eventslocation || "Lieu à venir"}
          </span>
        </div>

        <h2 className="mt-5 break-words font-display text-2xl font-black leading-tight text-coffee-beans">
          {event.eventsname || "Événement local"}
        </h2>

        <p className="mt-3 flex-1 text-base leading-7 text-coffee-beans/70">
          {event.eventsdesc || "Les détails de cet événement seront ajoutés prochainement."}
        </p>
      </div>
    </Card>
  );
}

function ProducerEventCard({ producer }) {
  return (
    <Card className="group overflow-hidden bg-[#fffdf7] p-4 shadow-[0_10px_26px_rgba(36,17,5,0.05)] transition duration-200 hover:-translate-y-1 hover:border-green/20 hover:shadow-[0_16px_34px_rgba(36,17,5,0.08)] sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="min-w-0">
          <Badge variant="success">Présent</Badge>
          <h3 className="mt-3 text-lg font-extrabold text-coffee-beans">{producer.name}</h3>
          <ul className="mt-3 grid gap-2 text-sm font-semibold text-coffee-beans/75">
            {producer.events.map((event) => (
              <li className="rounded-card border border-coffee-beans/10 bg-soft-linen px-3 py-2" key={`${producer.email}-${event.name}-${event.date}`}>
                {event.name} - {formatDate(event.date)}
              </li>
            ))}
          </ul>
        </div>

        <Button as="a" className="w-full sm:w-auto" href="/producteurs" size="sm" variant="secondary">
          Voir les producteurs
        </Button>
      </div>
    </Card>
  );
}

export function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [producers, setProducers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCalendar() {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchCalendar();
        setEvents(result.resultevent || []);
        setProducers(result.resultproducer || []);
      } catch (requestError) {
        setEvents([]);
        setProducers([]);
        setError(requestError.message || "Impossible de charger le calendrier.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCalendar();
  }, []);

  const upcomingEvents = useMemo(() => events.filter(isUpcomingEvent).sort(sortByDate), [events]);
  const upcomingProducerEvents = useMemo(() => groupProducerEvents(producers), [producers]);

  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pb-8 pt-4">
        <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Événements</Badge>
          <h1 className="mt-4 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">
            Nos prochains événements
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
            Retrouvez les rendez-vous à venir et les producteurs présents près de chez vous.
          </p>
        </section>

        {error ? (
          <Card className="border-inferno bg-white p-4 text-inferno">
            <p className="font-bold">{error}</p>
          </Card>
        ) : null}
      </Container>

      <Container className="pb-11">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card className="bg-white p-4" key={index}>
                <div className="h-44 animate-pulse rounded-card bg-vanilla-custard" />
                <div className="mt-4 h-5 w-32 animate-pulse rounded-card bg-golden-glow/70" />
                <div className="mt-4 h-8 w-3/4 animate-pulse rounded-card bg-coffee-beans/10" />
                <div className="mt-4 h-20 animate-pulse rounded-card bg-coffee-beans/10" />
              </Card>
            ))}
          </div>
        ) : null}

        {!isLoading && !error && upcomingEvents.length === 0 ? (
          <Card className="bg-white p-6 text-center">
            <h2 className="font-display text-2xl text-coffee-beans">Aucun événement à venir</h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
              Les prochains rendez-vous issus du seeder seront affichés ici dès qu'ils seront disponibles.
            </p>
          </Card>
        ) : null}

        {!isLoading && upcomingEvents.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <EventCard event={event} index={index} key={`${event.eventsname}-${event.eventsdate}`} />
            ))}
          </div>
        ) : null}
      </Container>

      <Container className="pb-8">
        <section className="mb-6 rounded-card bg-white p-5 shadow-sm sm:p-7">
          <Badge>Producteurs</Badge>
          <h2 className="mt-4 break-words font-display text-3xl leading-tight text-coffee-beans sm:text-4xl">
            Venez nous rencontrer !
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-coffee-beans/75">
            Découvrez les producteurs présents durant les événements à venir.
          </p>
        </section>
      </Container>

      <Container>
        {!isLoading && !error && upcomingProducerEvents.length === 0 ? (
          <Card className="bg-white p-6 text-center">
            <h2 className="font-display text-2xl text-coffee-beans">Aucun producteur annoncé</h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
              Les présences producteurs seront ajoutées dès qu'elles seront disponibles dans l'API.
            </p>
          </Card>
        ) : null}

        {!isLoading && upcomingProducerEvents.length > 0 ? (
          <div className="grid gap-4">
            {upcomingProducerEvents.map((producer) => (
              <ProducerEventCard key={producer.email || producer.name} producer={producer} />
            ))}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
