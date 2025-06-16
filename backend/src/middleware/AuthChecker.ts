import { AuthContextType } from "src/auth";
import { MiddlewareFn } from "type-graphql";

// Ce middleware garantit que seules les personnes avec le rôle "ADMIN" ou "USER" peuvent voir certaines informations personnelles.
// root correspond à l'utilisateur actuellement en cours de résolution
export const IsUser: MiddlewareFn<AuthContextType> = async (
  { context, root },
  next
) => {
  if (context.user.role === "ADMIN" || context.user.id === root.id) {
    return await next();
  } else {
    return null;
  }
};

// Uniquement pour les admins, exemple dans le resolver User.ts pour récupérer tous les utilisateurs
export const IsAdmin: MiddlewareFn<AuthContextType> = async (
  { context },
  next
) => {
  if (context.user?.role === "ADMIN") {
    return next();
  }
  return null;
};
