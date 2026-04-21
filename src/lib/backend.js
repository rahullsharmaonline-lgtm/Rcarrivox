const DEFAULT_API_BASE_URL = "http://127.0.0.1:5000";

function getApiUrl(pathname) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

  return new URL(pathname, `${baseUrl.replace(/\/+$/, "")}/`).toString();
}

export async function submitApplication(formData) {
  const response = await fetch(getApiUrl("/apply"), {
    method: "POST",
    body: formData,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong while submitting the application."
    );
  }

  return result;
}
