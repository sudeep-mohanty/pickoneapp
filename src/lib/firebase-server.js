// Server-side session fetch using Firebase REST API (no SDK needed)
// This avoids importing the client SDK in server components

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export async function getSessionServer(id) {
  if (!PROJECT_ID || !id) return null;

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/sessions/${id}`;
    const res = await fetch(url, { next: { revalidate: 0 } }); // no caching

    if (!res.ok) return null;

    const doc = await res.json();
    if (!doc.fields) return null;

    return {
      id,
      opt1: doc.fields.opt1?.stringValue || "",
      opt2: doc.fields.opt2?.stringValue || "",
      picked: doc.fields.picked?.stringValue || null,
    };
  } catch {
    return null;
  }
}
