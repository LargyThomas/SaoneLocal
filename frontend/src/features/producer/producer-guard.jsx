import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import { getStoredUser } from "../../api/api.js";

export function ProducerGuard({ children }) {
  const user = getStoredUser();

  if (user?.role !== 2) {
    return (
      <Card className="bg-white p-6 text-center">
        <Badge variant="danger">Accès producteur</Badge>
        <h1 className="mt-4 font-display text-2xl text-coffee-beans">Connexion producteur requise</h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-coffee-beans/70">
          Connectez-vous avec un compte producteur et cochez “Espace producteur : Oui”.
        </p>
        <Button as="a" className="mt-5 w-full sm:w-auto" href="/connexion">
          Me connecter
        </Button>
      </Card>
    );
  }

  return children;
}
