import type { MetadataRoute } from "next";
import { ALLOW_INDEX } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return ALLOW_INDEX ? { rules: { userAgent: "*", allow: "/" } } : { rules: { userAgent: "*", disallow: "/" } };
}
