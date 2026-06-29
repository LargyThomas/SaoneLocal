import Badge from "../../ui/badge.jsx";
import Button from "../../ui/button.jsx";
import Card from "../../ui/card.jsx";
import Container from "../../ui/container.jsx";

export function ForgotPasswordPage() {
  return (
    <div className="bg-soft-linen pb-12">
      <Container className="pt-4">
        <Card className="mx-auto max-w-2xl bg-white p-6 text-center">
          <Badge>Compte</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-coffee-beans">Mot de passe oublié</h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-coffee-beans/70">
            La récupération automatique n'est pas encore branchée côté API. Contactez l'équipe SaôneLocal pour réinitialiser votre accès.
          </p>
          <Button as="a" className="mt-6 w-full sm:w-auto" href="/connexion">
            Retour à la connexion
          </Button>
        </Card>
      </Container>
    </div>
  );
}
