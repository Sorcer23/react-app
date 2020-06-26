import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import toFormData from "object-to-formdata";

export function objectToFormData(data) {
  return toFormData(data);
}

export function transformDataForApi(data) {
  if (typeof data !== "object" || data == null || data instanceof FormData)
    return data;

  return snakecaseKeys(data, { deep: true });
}

export function transformDataFromApi(data) {
  if (typeof data !== "object" || data == null) return data;

  return camelcaseKeys(data, { deep: true });
}

export function transformApiValidation(errors) {
  // TODO: fix 400 response (not validation)
  if (!Array.isArray(errors)) return {};

  return errors.reduce((acc, error) => {
    acc[error.field] = error.message;
    return acc;
  }, {});
}
