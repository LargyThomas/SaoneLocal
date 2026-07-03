import { useEffect } from "react";

const SITE_NAME = "SaôneLocal";
const DEFAULT_DESCRIPTION = "SaôneLocal rassemble produits locaux, producteurs de Saône-et-Loire et événements du territoire.";

function getMetaDescription() {
  let meta = document.querySelector('meta[name="description"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  return meta;
}

export function useSeo({ description = DEFAULT_DESCRIPTION, title }) {
  useEffect(() => {
    const safeTitle = title?.trim() || SITE_NAME;
    const safeDescription = description?.trim() || DEFAULT_DESCRIPTION;

    document.title = safeTitle.includes(SITE_NAME) ? safeTitle : `${safeTitle} | ${SITE_NAME}`;
    getMetaDescription().setAttribute("content", safeDescription);
  }, [description, title]);
}
