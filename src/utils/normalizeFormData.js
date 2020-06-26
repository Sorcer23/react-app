export default function normalizeFormData(data) {
  const normalizedData = { ...data };

  for (const name in data) {
    const value = data[name];

    if (value === null) {
      normalizedData[name] = "";
    }
  }

  return normalizedData;
}
