export type LangMap = "fr" | "en" | "nl";

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
    },
    feature: {
      send_message: "Send",
      type_message: "Type your message...",
      export_to_pdf: "Export to PDF",
      end_conversation: "End conversation"
    }
  },
  fr: {
    errors: {
      invalid_request: "Requête invalide. Veuillez vérifier votre saisie.",
      unauthorized: "Non autorisé. Veuillez vous reconnecter.",
      forbidden: "Vous n'avez pas la permission d'effectuer cette action.",
      not_found: "La ressource demandée n'a pas été trouvée.",
      too_many_requests: "Trop de requêtes. Veuillez réessayer plus tard.",
      server_error: "Erreur serveur. Veuillez réessayer plus tard.",
      unexpected: "Une erreur inattendue s'est produite. Veuillez réessayer.",
    },
    feature: {
      send_message: "Envoyer",
      type_message: "Tapez votre message...",
      export_to_pdf: "Exporter en PDF",
      end_conversation: "Finir la conversation"
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
    },
    feature: {
      send_message: "Verzenden",
      type_message: "Typ je bericht...",
      export_to_pdf: "Exporteren naar PDF",
      end_conversation: "Gesprek beëindigen"
    }
  }
}
