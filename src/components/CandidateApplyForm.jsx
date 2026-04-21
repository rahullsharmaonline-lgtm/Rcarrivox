"use client";

import { useState } from "react";
import FormSuccessMessage from "./FormSuccessMessage";
import { submitToFormspree } from "../lib/formspree";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;

const initialFormData = {
  fullName: "",
  email: "",
  location: "",
  designation: "",
  preferredRole: "",
  experience: "0 - 2 Years",
  message: "",
  resume: null,
};

function normalizeFieldValue(name, value) {
  if (typeof value !== "string") {
    return value;
  }

  if (name === "email") {
    return value.trim().toLowerCase();
  }

  return value;
}

function getFieldClasses(hasError, readOnly = false) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
    readOnly ? "cursor-default" : ""
  } ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-blue-900"
  }`;
}

function validateField(name, value) {
  switch (name) {
    case "fullName":
      return value.trim() ? "" : "Please enter your full name";
    case "email":
      if (!value.trim()) {
        return "Please enter a valid email address";
      }
      return EMAIL_PATTERN.test(value)
        ? ""
        : "Please enter a valid email address";
    case "preferredRole":
      return value.trim() ? "" : "Please enter your preferred role";
    case "resume":
      if (!value) {
        return "Please upload your resume";
      }
      if (
        value.type !== "application/pdf" &&
        !value.name.toLowerCase().endsWith(".pdf")
      ) {
        return "Only PDF files are allowed";
      }
      return "";
    default:
      return "";
  }
}

function validatePhoneNumber(value) {
  if (!value.trim()) {
    return "Enter valid 10-digit phone number";
  }

  return PHONE_PATTERN.test(value) ? "" : "Enter valid 10-digit phone number";
}

function getFormErrors(formData, phoneError) {
  return {
    fullName: validateField("fullName", formData.fullName),
    email: validateField("email", formData.email),
    phone: phoneError,
    preferredRole: validateField("preferredRole", formData.preferredRole),
    resume: validateField("resume", formData.resume),
  };
}

function InputField({
  id,
  label,
  name,
  autoComplete,
  error,
  inputMode,
  onBlur,
  onChange,
  required = false,
  type = "text",
  value,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        id={id}
        name={name}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        className={getFieldClasses(Boolean(error))}
      />
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </label>
  );
}

export default function CandidateApplyForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [locationState, setLocationState] = useState({
    error: "",
    loading: false,
  });

  const formErrors = getFormErrors(formData, phoneError);

  const showError = (field) =>
    touched[field] || submitAttempted ? formErrors[field] : "";

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFieldBlur = (event) => {
    const { name, value } = event.target;
    const normalizedValue = normalizeFieldValue(name, value);

    if (normalizedValue !== value) {
      setFormData((current) => ({
        ...current,
        [name]: normalizedValue,
      }));
    }

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  };

  const handlePhoneChange = (event) => {
    const nextPhone = event.target.value.replace(/\s+/g, "");

    setPhone(nextPhone);
    setPhoneError(validatePhoneNumber(nextPhone));
  };

  const handlePhoneBlur = (event) => {
    const nextPhone = event.target.value.replace(/\s+/g, "");

    setPhone(nextPhone);
    setPhoneError(validatePhoneNumber(nextPhone));
    setTouched((current) => ({
      ...current,
      phone: true,
    }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] ?? null;

    setFormData((current) => ({
      ...current,
      resume: file,
    }));
  };

  const handleResumeBlur = () => {
    setTouched((current) => ({
      ...current,
      resume: true,
    }));
  };

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setLocationState({
        error: "Geolocation is not supported on this device.",
        loading: false,
      });
      return;
    }

    setLocationState({ error: "", loading: true });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (!response.ok) {
            throw new Error("Unable to fetch your location details.");
          }

          const data = await response.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "";
          const stateName = data.address?.state || "";
          const resolvedLocation = [city, stateName].filter(Boolean).join(", ");

          if (!resolvedLocation) {
            throw new Error("We could not detect your city and state.");
          }

          setFormData((current) => ({
            ...current,
            location: resolvedLocation,
          }));
          setLocationState({ error: "", loading: false });
        } catch (error) {
          setLocationState({
            error:
              error instanceof Error
                ? error.message
                : "Unable to fetch your current location right now.",
            loading: false,
          });
        }
      },
      () => {
        setLocationState({
          error: "Please allow location access to auto-fill your city and state.",
          loading: false,
        });
      }
    );
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      preferredRole: true,
      resume: true,
    });

    const nextPhoneError = validatePhoneNumber(phone);
    const nextErrors = getFormErrors(formData, nextPhoneError);

    setPhoneError(nextPhoneError);
    setSubmitError("");

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const submissionData = new FormData();
    submissionData.append("_subject", "New candidate application from RCarrivox");
    submissionData.append("formType", "Candidate Application");
    submissionData.append("fullName", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("phone", phone);
    submissionData.append("location", formData.location);
    submissionData.append("designation", formData.designation);
    submissionData.append("preferredRole", formData.preferredRole);
    submissionData.append("experience", formData.experience);
    submissionData.append("message", formData.message);

    if (formData.resume) {
      submissionData.append("resume", formData.resume);
    }

    try {
      setSubmitting(true);
      await submitToFormspree(submissionData);
      setShowSuccess(true);
      setFormData(initialFormData);
      setPhone("");
      setPhoneError("");
      setTouched({});
      setSubmitAttempted(false);
      setLocationState({
        error: "",
        loading: false,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the form."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <FormSuccessMessage
        eyebrow="Application Submitted"
        title="Thanks for sharing your profile."
        description="Your application has been sent successfully. Our team can now review your details, resume, and role preferences directly from Formspree."
      />
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      encType="multipart/form-data"
      className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InputField
          id="fullName"
          name="fullName"
          label="Full Name"
          autoComplete="name"
          error={showError("fullName")}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          required
          value={formData.fullName}
          placeholder="Enter your full name"
        />
        <InputField
          id="email"
          name="email"
          label="Email Address"
          autoComplete="email"
          error={showError("email")}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          required
          type="email"
          value={formData.email}
          placeholder="Email Address"
        />
        <InputField
          id="phone"
          name="phone"
          label="Phone Number"
          autoComplete="tel"
          error={touched.phone || submitAttempted ? phoneError : ""}
          inputMode="tel"
          onBlur={handlePhoneBlur}
          onChange={handlePhoneChange}
          required
          type="tel"
          value={phone}
          placeholder="9876543210"
        />
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Current Location
          </span>
          <div className="space-y-2">
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              readOnly
              placeholder="City, State"
              className={getFieldClasses(false, true)}
            />
            <button
              type="button"
              onClick={getLocation}
              disabled={locationState.loading}
              className="text-sm font-medium text-blue-700 transition hover:text-blue-900 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              {locationState.loading ? "Fetching location..." : "Use Current Location"}
            </button>
            {locationState.error ? (
              <p className="text-sm text-amber-600">{locationState.error}</p>
            ) : null}
          </div>
        </label>
        <InputField
          id="designation"
          name="designation"
          label="Current Designation"
          error=""
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          value={formData.designation}
          placeholder="Enter current role"
        />
        <InputField
          id="preferredRole"
          name="preferredRole"
          label="Preferred Role"
          error={showError("preferredRole")}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          required
          value={formData.preferredRole}
          placeholder="Enter preferred role"
        />
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          Years of Experience
        </span>
        <select
          id="experience"
          name="experience"
          required
          value={formData.experience}
          onChange={handleFieldChange}
          className={getFieldClasses(false)}
        >
          <option>0 - 2 Years</option>
          <option>2 - 5 Years</option>
          <option>5 - 8 Years</option>
          <option>8+ Years</option>
        </select>
      </label>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          Upload Resume
        </span>
        <div
          className={`rounded-2xl border border-dashed bg-slate-50 p-6 text-center ${
            showError("resume") ? "border-red-500" : "border-slate-300"
          }`}
        >
          <p className="text-sm font-medium text-slate-700">
            Drag and drop your resume here
          </p>
          <p className="mt-2 text-sm text-slate-500">PDF only up to 5 MB</p>
          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf"
            onBlur={handleResumeBlur}
            onChange={handleResumeChange}
            className="mt-4 block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          {showError("resume") ? (
            <p className="mt-1 text-xs text-red-500">{showError("resume")}</p>
          ) : null}
        </div>
      </label>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          Additional Notes
        </span>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          placeholder="Share notice period, preferred locations, or key strengths"
          className={getFieldClasses(false)}
        />
      </label>

      {submitError ? (
        <p className="mt-4 text-sm text-red-500">{submitError}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {submitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
