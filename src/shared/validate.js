export function isFieldInvalid(fields, fieldName, errors) {
  var isInvalid = false;
  if (fields && fieldName && errors) {
    if (errors) {
      isInvalid =
        errors.has(fieldName) &&
        (!fields[fieldName].dirty ||
          (fields[fieldName].touched && fields[fieldName].dirty));
    }
  }
  return isInvalid;
}
