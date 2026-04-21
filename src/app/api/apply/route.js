import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+91\d{10}$/;
const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT?.trim() || "https://formspree.io/f/mbdpplzw";

function getTextField(formData, name) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function jsonError(message, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

async function persistApplicationLocally({
  name,
  email,
  phone,
  role,
  fullName,
  location,
  designation,
  preferredRole,
  experience,
  message,
  resume,
}) {
  const storageRoot = path.join(process.cwd(), "storage");
  const submissionsDir = path.join(storageRoot, "applications");
  const resumesDir = path.join(storageRoot, "resumes");

  await Promise.all([
    mkdir(submissionsDir, { recursive: true }),
    mkdir(resumesDir, { recursive: true }),
  ]);

  const submissionId = `${Date.now()}-${randomUUID()}`;
  const resumeFileName = `${submissionId}-${resume.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const resumePath = path.join(resumesDir, resumeFileName);
  const submissionPath = path.join(submissionsDir, `${submissionId}.json`);

  await writeFile(resumePath, Buffer.from(await resume.arrayBuffer()));

  await writeFile(
    submissionPath,
    JSON.stringify(
      {
        id: submissionId,
        submittedAt: new Date().toISOString(),
        name,
        email,
        phone,
        role,
        fullName,
        location,
        designation,
        preferredRole,
        experience,
        message,
        resume: {
          originalName: resume.name,
          savedAs: resumeFileName,
          size: resume.size,
          type: resume.type,
        },
      },
      null,
      2
    )
  );
}

async function forwardApplicationToFormspree(fields, resume) {
  const payload = new FormData();

  payload.append("_subject", "New candidate application from RCarrivox");
  payload.append("formType", "Candidate Application");

  for (const [key, value] of Object.entries(fields)) {
    if (value) {
      payload.append(key, value);
    }
  }

  payload.append("resume", resume, resume.name);

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: payload,
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result?.errors?.[0]?.message ||
        result?.message ||
        "Unable to forward the application right now."
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = getTextField(formData, "name");
    const email = getTextField(formData, "email");
    const phone = getTextField(formData, "phone");
    const role = getTextField(formData, "role");
    const fullName = getTextField(formData, "fullName");
    const location = getTextField(formData, "location");
    const designation = getTextField(formData, "designation");
    const preferredRole = getTextField(formData, "preferredRole");
    const experience = getTextField(formData, "experience");
    const message = getTextField(formData, "message");
    const resume = formData.get("resume");

    if (!name || !email || !phone || !role) {
      return jsonError("Please fill in all required fields.");
    }

    if (!EMAIL_PATTERN.test(email)) {
      return jsonError("Email format is invalid.");
    }

    if (!PHONE_PATTERN.test(phone)) {
      return jsonError("Phone must be in +91XXXXXXXXXX format.");
    }

    if (!(resume instanceof File)) {
      return jsonError("Resume PDF is required.");
    }

    if (resume.size > MAX_RESUME_SIZE) {
      return jsonError("Resume file size must be 5MB or smaller.");
    }

    const isPdfFile =
      resume.type === "application/pdf" &&
      resume.name.toLowerCase().endsWith(".pdf");

    if (!isPdfFile) {
      return jsonError("Only PDF resume files are allowed.");
    }

    const applicationFields = {
      name,
      email,
      phone,
      role,
      fullName,
      location,
      designation,
      preferredRole,
      experience,
      message,
    };

    try {
      await persistApplicationLocally({
        ...applicationFields,
        resume,
      });
    } catch (localPersistenceError) {
      console.warn("Local application storage failed", localPersistenceError);
    }

    await forwardApplicationToFormspree(applicationFields, resume);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("POST /api/apply failed", error);
    return jsonError(
      error instanceof Error
        ? error.message
        : "Something went wrong while submitting the application.",
      500
    );
  }
}
