"use client";

import { useEffect, useRef, useState } from "react";
import FormSuccessMessage from "./FormSuccessMessage";
import { submitApplication } from "../lib/backend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d{10}$/;
const LOCATION_ENDPOINT = "https://nominatim.openstreetmap.org";
const LOCATION_MIN_QUERY_LENGTH = 2;

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
    case "location":
      return value.trim() ? "" : "Please enter your current location";
    case "designation":
      return value.trim() ? "" : "Please enter your current designation";
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

function formatPhoneNumber(value) {
  return `+91${value}`;
}

function buildRoleSummary(formData) {
  return [
    formData.preferredRole ? `Preferred Role: ${formData.preferredRole}` : null,
    formData.designation ? `Current Designation: ${formData.designation}` : null,
    formData.location ? `Location: ${formData.location}` : null,
    formData.experience ? `Experience: ${formData.experience}` : null,
    formData.message ? `Notes: ${formData.message}` : null,
  ]
    .filter(Boolean)
    .join(" | ");
}

function getFormErrors(formData, phoneError) {
  return {
    fullName: validateField("fullName", formData.fullName),
    email: validateField("email", formData.email),
    phone: phoneError,
    location: validateField("location", formData.location),
    designation: validateField("designation", formData.designation),
    preferredRole: validateField("preferredRole", formData.preferredRole),
    resume: validateField("resume", formData.resume),
  };
}

function getLocationLabel(address, fallback = "") {
  const city =
    address?.city ||
    address?.town ||
    address?.village ||
    address?.hamlet ||
    address?.county ||
    "";
  const stateName = address?.state || "";
  const country = address?.country || "";

  return [city, stateName, country].filter(Boolean).join(", ") || fallback;
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
  maxLength,
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
        maxLength={maxLength}
        className={getFieldClasses(Boolean(error))}
      />
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </label>
  );
}

export default function CandidateApplyForm() {
  console.log("CandidateApplyForm loaded");

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
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [shouldSuggestLocation, setShouldSuggestLocation] = useState(false);
  const locationBlurTimeoutRef = useRef(null);

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
    const nextPhone = event.target.value.replace(/\D/g, "").slice(0, 10);

    setPhone(nextPhone);
    setPhoneError(validatePhoneNumber(nextPhone));
  };

  const handlePhoneBlur = (event) => {
    const nextPhone = event.target.value.replace(/\D/g, "").slice(0, 10);

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

  const handleLocationChange = (event) => {
    const nextLocation = event.target.value;

    setFormData((current) => ({
      ...current,
      location: nextLocation,
    }));
    setLocationState((current) => ({
      ...current,
      error: "",
    }));
    setShouldSuggestLocation(true);
    setShowLocationSuggestions(true);
  };

  const handleLocationBlur = () => {
    locationBlurTimeoutRef.current = setTimeout(() => {
      setShowLocationSuggestions(false);
    }, 120);

    setTouched((current) => ({
      ...current,
      location: true,
    }));
  };

  const handleLocationFocus = () => {
    if (formData.location.trim().length >= LOCATION_MIN_QUERY_LENGTH) {
      setShowLocationSuggestions(true);
      setShouldSuggestLocation(true);
    }
  };

  const applyLocationValue = (nextLocation) => {
    if (locationBlurTimeoutRef.current) {
      clearTimeout(locationBlurTimeoutRef.current);
    }

    setFormData((current) => ({
      ...current,
      location: nextLocation,
    }));
    setLocationState({
      error: "",
      loading: false,
    });
    setLocationSuggestions([]);
    setShowLocationSuggestions(false);
    setShouldSuggestLocation(false);
  };

  useEffect(() => {
    if (!shouldSuggestLocation) {
      return;
    }

    const query = formData.location.trim();

    if (query.length < LOCATION_MIN_QUERY_LENGTH) {
      setLocationSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `${LOCATION_ENDPOINT}/search?format=jsonv2&addressdetails=1&limit=5&q=${encodeURIComponent(
            query
          )}`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load location suggestions.");
        }

        const data = await response.json();
        const suggestions = data
          .map((item) => {
            const label = getLocationLabel(item.address, item.display_name);

            if (!label) {
              return null;
            }

            return {
              id: `${item.place_id}-${label}`,
              label,
            };
          })
          .filter(Boolean);

        setLocationSuggestions(suggestions);
        setShowLocationSuggestions(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          setLocationSuggestions([]);
        }
      }
    }, 260);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [formData.location, shouldSuggestLocation]);

  useEffect(() => {
    return () => {
      if (locationBlurTimeoutRef.current) {
        clearTimeout(locationBlurTimeoutRef.current);
      }
    };
  }, []);

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
            `${LOCATION_ENDPOINT}/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Unable to fetch your location details.");
          }

          const data = await response.json();
          const resolvedLocation = getLocationLabel(data.address, data.display_name);

          if (!resolvedLocation) {
            throw new Error("We could not detect your city, state, and country.");
          }

          applyLocationValue(resolvedLocation);
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
    console.log("Candidate form submit triggered");
    setSubmitAttempted(true);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      location: true,
      designation: true,
      preferredRole: true,
      resume: true,
    });

    const nextPhoneError = validatePhoneNumber(phone);
    const nextErrors = getFormErrors(formData, nextPhoneError);

    console.log("Candidate form validation state", {
      formData,
      phone,
      nextPhoneError,
      nextErrors,
    });

    setPhoneError(nextPhoneError);
    setSubmitError("");

    if (Object.values(nextErrors).some(Boolean)) {
      console.warn("Candidate form submit blocked by validation", nextErrors);
      return;
    }

    const submissionData = new FormData();
    submissionData.append("name", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formatPhoneNumber(phone));
    submissionData.append("role", buildRoleSummary(formData));
    submissionData.append("fullName", formData.fullName);
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
      console.log("Candidate form calling submitApplication");
      await submitApplication(submissionData);
      console.log("Candidate form submission succeeded");
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
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
      setShouldSuggestLocation(false);
    } catch (error) {
      console.error("Candidate form submission failed", error);
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
        title="Submitted successfully."
        description="Your application has been sent successfully. Our team can now review your profile, role details, and resume."
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
          maxLength={10}
        />
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Current Location
          </span>
          <div className="space-y-2">
            <div className="relative">
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                autoComplete="off"
                placeholder="City, State, Country"
                onBlur={handleLocationBlur}
                onChange={handleLocationChange}
                onFocus={handleLocationFocus}
                className={getFieldClasses(Boolean(showError("location")))}
              />
              {showLocationSuggestions && locationSuggestions.length ? (
                <div className="absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)]">
                  {locationSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onMouseDown={() => applyLocationValue(suggestion.label)}
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            {showError("location") ? (
              <p className="text-xs text-red-500">{showError("location")}</p>
            ) : null}
            {locationState.error ? (
              <p className="text-sm text-amber-600">{locationState.error}</p>
            ) : null}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={getLocation}
                disabled={locationState.loading}
                className="text-sm font-medium text-blue-700 transition hover:text-blue-900 disabled:cursor-not-allowed disabled:text-slate-400"
              >
                {locationState.loading ? "Fetching location..." : "Use Current Location"}
              </button>
              <span className="text-xs text-slate-500">
                Search by city to see city, state, and country suggestions.
              </span>
            </div>
          </div>
        </label>
        <InputField
          id="designation"
          name="designation"
          label="Current Designation"
          error={showError("designation")}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          required
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
          <span className="ml-2 text-xs font-normal text-slate-500">(Optional)</span>
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
