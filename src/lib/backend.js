export async function submitApplication(formData) {
  let response;

  try {
    console.log("submitApplication calling /api/apply");
    response = await fetch("/api/apply", {
      method: "POST",
      body: formData,
    });
  } catch (_error) {
    console.error("submitApplication could not reach /api/apply");
    throw new Error("Application service is not reachable right now.");
  }

  const result = await response.json().catch(() => ({}));
  console.log("submitApplication response", {
    status: response.status,
    ok: response.ok,
    result,
  });

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong while submitting the application."
    );
  }

  return result;
}
