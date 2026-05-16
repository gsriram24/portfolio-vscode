import type { ContactInfo } from "./types";

// /contact page data.
//
// Shape matches design's ContactInfo (email + 4 social). Stored as full
// URLs (mailto/href ready). The render layer formats display text by
// stripping protocol/scheme if needed.

export const CONTACT: ContactInfo = {
  email:    "gsriram2403@gmail.com",
  github:   "https://github.com/gsriram24",
  linkedin: "https://linkedin.com/in/gsriram24",
  npm:      "https://npmjs.com/~gsriram24",
  whatsapp: "https://wa.me/918762412275",
};
