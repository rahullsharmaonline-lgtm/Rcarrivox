export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdpplzw";

export async function submitToFormspree(formData) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result?.errors?.[0]?.message || "Something went wrong while submitting the form."
    );
  }

  return result;
}
