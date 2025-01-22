export type UserLang = "fr" | "en" | "nl";

export const langMap = {
  en: {
    errors: {
      invalid_request: "Invalid request. Please check your input.",
      unauthorized: "Unauthorized. Please log in again.",
      forbidden: "You don't have permission to perform this action.",
      not_found: "The requested resource was not found.",
      too_many_requests: "Too many requests. Please try again later.",
      server_error: "Server error. Please try again later.",
      unexpected: "An unexpected error occurred. Please try again.",
    }
  },
  fr : {
    errors: {
      invalid_request: "Requête invalide. Veuillez vérifier votre saisie.",
      unauthorized: "Non autorisé. Veuillez vous reconnecter.",
      forbidden: "Vous n'avez pas la permission d'effectuer cette action.",
      not_found: "La ressource demandée n'a pas été trouvée.",
      too_many_requests: "Trop de requêtes. Veuillez réessayer plus tard.",
      server_error: "Erreur serveur. Veuillez réessayer plus tard.",
      unexpected: "Une erreur inattendue s'est produite. Veuillez réessayer.",
    }
  },
  nl: {
    errors: {
      invalid_request: "Ongeldige aanvraag. Controleer uw invoer.",
      unauthorized: "Niet geautoriseerd. Log opnieuw in.",
      forbidden: "U heeft geen toestemming voor deze actie.",
      not_found: "De gevraagde bron is niet gevonden.",
      too_many_requests: "Te veel verzoeken. Probeer het later opnieuw.",
      server_error: "Serverfout. Probeer het later opnieuw.",
      unexpected: "Er is een onverwachte fout opgetreden. Probeer het opnieuw."
    }
  }
}
