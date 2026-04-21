"use client";

import { useState } from "react";
import FormSuccessMessage from "./FormSuccessMessage";
import { submitToFormspree } from "../lib/formspree";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d{10}$/;

const initialFormData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  requirementType: "Employer Requirement",
  message: "",
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

function getFieldClasses(hasError) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-blue-900"
  }`;
}

function validateField(name, value) {
  switch (name) {
    case "fullName":
      return value.trim() ? "" : "Please enter your full name";
    case "company":
      return value.trim() ? "" : "Please enter your company or organization";
    case "email":
      if (!value.trim()) {
        return "Please enter a valid email address";
      }
      return EMAIL_PATTERN.test(value)
        ? ""
        : "Please enter a valid email address";
    case "phone":
      if (!value.trim()) {
        return "Enter valid 10-digit phone number";
      }
      return PHONE_PATTERN.test(value) ? "" : "Enter valid 10-digit phone number";
    case "requirementType":
      return value.trim() ? "" : "Please select a requirement type";
    case "message":
      return value.trim() ? "" : "Please enter your message";
    default:
      return "";
  }
}

function getFormErrors(formData) {
  return {
    fullName: validateField("fullName", formData.fullName),
    company: validateField("company", formData.company),
    email: validateField("email", formData.email),
    phone: validateField("phone", formData.phone),
    requirementType: validateField("requirementType", formData.requirementType),
    message: validateField("message", formData.message),
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

export default function ContactQueryForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const formErrors = getFormErrors(formData);

  const showError = (field) =>
    touched[field] || submitAttempted ? formErrors[field] : "";

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      fullName: true,
      company: true,
      email: true,
      phone: true,
      requirementType: true,
      message: true,
    });
    setSubmitError("");

    if (Object.values(formErrors).some(Boolean)) {
      return;
    }

    const submissionData = new FormData();
    submissionData.append("_subject", "New contact enquiry from RCarrivox");
    submissionData.append("formType", "Contact Query");
    submissionData.append("fullName", formData.fullName);
    submissionData.append("company", formData.company);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("requirementType", formData.requirementType);
    submissionData.append("message", formData.message);

    try {
      setSubmitting(true);
      await submitToFormspree(submissionData);
      setShowSuccess(true);
      setFormData(initialFormData);
      setTouched({});
      setSubmitAttempted(false);
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
        eyebrow="Query Submitted"
        title="Submitted successfully."
        description="Your message has been sent successfully. Our team can now review your hiring requirement or enquiry."
      />
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
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
          type="text"
          value={formData.fullName}
          placeholder="Enter your full name"
        />
        <InputField
          id="company"
          name="company"
          label="Company / Organization"
          autoComplete="organization"
          error={showError("company")}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          required
          type="text"
          value={formData.company}
          placeholder="Enter company name"
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
          placeholder="Enter your email"
        />
        <InputField
          id="phone"
          name="phone"
          label="Phone Number"
          autoComplete="tel"
          error={showError("phone")}
          inputMode="tel"
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          required
          type="tel"
          value={formData.phone}
          placeholder="9876543210"
          maxLength={10}
        />
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          Requirement Type
        </span>
        <select
          id="requirementType"
          name="requirementType"
          required
          value={formData.requirementType}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          className={getFieldClasses(Boolean(showError("requirementType")))}
        >
          <option>Employer Requirement</option>
          <option>Candidate Enquiry</option>
          <option>Partnership / General Enquiry</option>
        </select>
        {showError("requirementType") ? (
          <p className="mt-1 text-xs text-red-500">
            {showError("requirementType")}
          </p>
        ) : null}
      </label>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-slate-700">
          Message
        </span>
        <textarea
          id="message"
          name="message"
          rows="6"
          required
          value={formData.message}
          onBlur={handleFieldBlur}
          onChange={handleFieldChange}
          placeholder="Tell us a little about your requirement"
          className={getFieldClasses(Boolean(showError("message")))}
        />
        {showError("message") ? (
          <p className="mt-1 text-xs text-red-500">{showError("message")}</p>
        ) : null}
      </label>

      {submitError ? (
        <p className="mt-4 text-sm text-red-500">{submitError}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
