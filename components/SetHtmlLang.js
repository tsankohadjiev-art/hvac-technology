"use client";

import { useEffect } from "react";

export default function SetHtmlLang({ lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "bg";
    };
  }, [lang]);

  return null;
}
