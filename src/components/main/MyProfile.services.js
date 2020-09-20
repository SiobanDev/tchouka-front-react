export const handleScoreUploading = (score, setScore, notificationContext) => {
  setScore(score);
  notificationContext.setSeverityKind("success");
  notificationContext.setNotificationMessage(
    "Ma partition a été chargée à l'étape 1."
  );
  notificationContext.setOpen(true);
};

export const handleCompositionUploading = (
  composition,
  setComposition,
  notificationContext
) => {
  setComposition(composition);
  notificationContext.setSeverityKind("success");
  notificationContext.setNotificationMessage(
    "Ma composition a été chargée à l'étape 2."
  );
  notificationContext.setOpen(true);
};
