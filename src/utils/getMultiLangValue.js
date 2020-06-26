import store from "store";

export default function getMultiLangValue(text) {
  const { lang } = store.getState().lang.locale;

  if (!text) return null;

  if (typeof text !== "object" || text == null) return text;

  return text[lang] || text["en"];
}
