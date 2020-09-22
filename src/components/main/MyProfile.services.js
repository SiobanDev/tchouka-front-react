export const handleUserCreationDataUpload = (userCreationData, userCreationDataType, notificationContext) => {
  localStorage.setItem(userCreationDataType, userCreationData)
  notificationContext.setSeverityKind("success");
  notificationContext.setNotificationMessage(
    `Ma ${userCreationDataType} a été chargée à l'étape ${userCreationDataType === "partition" ? "1" : "2"}.`
  );
  notificationContext.setOpen(true);
};


