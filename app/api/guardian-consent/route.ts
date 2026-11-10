import { loadGuardianRequest, recordGuardianDecision } from "@/lib/server/guardian-consent";
import { enforceRateLimit } from "@/lib/server/rate-limit";
import { RequestError, assertSameOrigin, clientIp, readJson, sha256 } from "@/lib/server/request";
import { errorResponse } from "@/lib/server/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Records a parent or guardian's decision for a user aged 13 to 17.
 * Body: { token, decision: "approve" | "decline", confirm: true }.
 * The signed token is the authorization; the app reads the result from
 * guardian_consents/{uid}.
 */
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = await readJson(request);
    if (body.decision !== "approve" && body.decision !== "decline") {
      throw new RequestError(400, "Choose approve or decline.");
    }
    if (body.decision === "approve" && body.confirm !== true) {
      throw new RequestError(400, "Please confirm you are their parent or guardian.");
    }
    const ip = clientIp(request);
    await enforceRateLimit("guardian-consent", ip, 10, 60 * 60_000);

    const guardianRequest = await loadGuardianRequest(body.token);
    const decision = body.decision === "approve" ? "approved" : "declined";
    await recordGuardianDecision(guardianRequest, decision, {
      ipHash: sha256(ip),
      userAgent: request.headers.get("user-agent") ?? "",
    });
    return Response.json({ success: true, status: decision }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse("guardian-consent", error);
  }
}
