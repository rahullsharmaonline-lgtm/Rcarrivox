export async function submitApplication(formData) {
  let response;

  try {
    response = await fetch("/api/apply", {
      method: "POST",
      body: formData,
    });
  } catch (_error) {
    throw new Error("Application service is not reachable right now.");
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong while submitting the application."
    );
  }

  return result;
}
