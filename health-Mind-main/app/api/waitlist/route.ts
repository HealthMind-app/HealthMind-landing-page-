import { google } from "googleapis";
import { type NextRequest, NextResponse } from "next/server";
import path from "node:path";

interface WaitlistEntry {
  email: string;
  timestamp: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

export async function POST(request: NextRequest) {
  try {
    // Check if Google Sheets ID is configured
    if (!SHEET_ID) {
      console.error("GOOGLE_SHEETS_ID environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const { email, name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const entry: WaitlistEntry = {
      email,
      timestamp: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    await appendToGoogleSheet(entry);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("WAITLIST ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function appendToGoogleSheet(entry: WaitlistEntry) {
  let auth;

  // Check if we're in Vercel (production/preview)
  if (
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  ) {
    // Use environment variables in production
    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } else {
    // Use credentials file in local development
    const credentialsPath = path.join(
      process.cwd(),
      "app/api/_credentials/google-credentials.json"
    );
    auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[entry.email, entry.timestamp]],
    },
  });
}
