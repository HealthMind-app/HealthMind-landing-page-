import "server-only";
import { ServerConfigError } from "./firestore";
import { RequestError } from "./request";

/** Maps known errors to safe client messages; logs everything else. */
export function errorResponse(label: string, error: unknown) {
  if (error instanceof RequestError) {
    return Response.json({ error: error.message }, { status: error.status, headers: { "Cache-Control": "no-store" } });
  }
  if (error instanceof ServerConfigError) {
    console.error(`[${label}] server configuration error: ${error.message}`);
  } else {
    console.error(`[${label}] failed`, error);
  }
  return Response.json(
    { error: "Something went wrong on our side. Please try again later." },
    { status: 500, headers: { "Cache-Control": "no-store" } },
  );
}
