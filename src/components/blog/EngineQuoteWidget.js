"use client";

import { useState } from "react";
import { lookupVrm } from "@/lib/vrmLookup";

export function EngineQuoteWidget({ siteName = "BMW Garage" }) {
  const [reg, setReg] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState("");

  const [vehicle, setVehicle] = useState(null);
  const [showManualFields, setShowManualFields] = useState(false);

  // Manual fallback fields
  const [manualMake, setManualMake] = useState("BMW");
  const [manualModel, setManualModel] = useState("");
  const [manualYear, setManualYear] = useState("");
  const [manualFuel, setManualFuel] = useState("");

  // Customer contact info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleLookup = async (e) => {
    if (e) e.preventDefault();
    const cleanReg = reg.trim().toUpperCase();
    if (!cleanReg) {
      setLookupError("Please enter your vehicle registration");
      return;
    }

    setIsLookingUp(true);
    setLookupError("");

    try {
      const data = await lookupVrm(cleanReg);
      if (data && (data.model || data.make)) {
        setVehicle(data);
        setShowManualFields(false);
      } else {
        setShowManualFields(true);
        setLookupError("Details not found automatically. Please confirm vehicle details below.");
      }
    } catch (err) {
      setShowManualFields(true);
      setLookupError(err.message || "Could not retrieve details. Please enter them manually below.");
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const brand = vehicle?.make || manualMake || "BMW";
    const series = vehicle?.model || manualModel;
    const vrm = (vehicle?.vrm || reg || "").trim().toUpperCase();

    if (!series) {
      setSubmitError("Please specify your vehicle model/series.");
      return;
    }

    if (!name.trim() || !number.trim()) {
      setSubmitError("Name and contact phone number are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        vehicle_brand: brand,
        vehicle_series: series,
        vehicle_reg: vrm,
        vehicle_vrm: vrm,
        engine_capacity: vehicle?.engineCapacity || "",
        fuel_type: vehicle?.fuelType || manualFuel || "",
        year: vehicle?.year || manualYear || "",
        name: name.trim(),
        number: number.trim(),
        email: email.trim(),
        postcode: postcode.trim().toUpperCase(),
        description: description.trim() || "Quote requested via Blog Guide",
      };

      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok && resData.status === "success") {
        setIsSubmitted(true);
      } else {
        setSubmitError(resData.message || "Failed to submit quote request. Please try again or call us.");
      }
    } catch {
      setSubmitError("Network connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header with BMW style blue gradient */}
      <div className="bg-gradient-to-r from-[#007ff8] to-[#0062c4] px-5 py-4 text-white">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-bold tracking-tight">Instant BMW Engine Quote</h3>
        </div>
        <p className="mt-1 text-xs text-blue-100">
          Reconditioned & Low-Mileage BMW Engines with Warranty
        </p>
      </div>

      <div className="p-5">
        {isSubmitted ? (
          <div className="rounded-xl bg-green-50 p-6 text-center text-green-900 border border-green-200">
            <svg className="mx-auto h-12 w-12 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-base font-bold">Quote Request Received!</h4>
            <p className="mt-1 text-xs text-green-700">
              Our BMW engine specialists will check stock and contact you shortly with the best pricing.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setVehicle(null);
                setReg("");
              }}
              className="mt-4 inline-block text-xs font-semibold text-green-800 underline hover:text-green-900"
            >
              Get another quote
            </button>
          </div>
        ) : (
          <form onSubmit={vehicle || showManualFields ? handleSubmit : handleLookup} className="space-y-4 text-left">
            {/* Step 1: Reg lookup */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Enter Registration Number
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={reg}
                    onChange={(e) => setReg(e.target.value.toUpperCase())}
                    placeholder="e.g. GY68 WXJ"
                    className="w-full rounded-lg border-2 border-amber-400 bg-amber-50/40 px-3 py-2 text-center text-sm font-black uppercase tracking-widest text-slate-900 placeholder:text-slate-400 focus:border-[#007ff8] focus:bg-white focus:outline-none"
                    maxLength={10}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleLookup}
                  disabled={isLookingUp}
                  className="rounded-lg bg-[#007ff8] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#0062c4] disabled:opacity-60 transition"
                >
                  {isLookingUp ? "Looking up..." : "Lookup"}
                </button>
              </div>
              {lookupError && (
                <p className="mt-1.5 text-xs text-amber-600 font-medium">{lookupError}</p>
              )}
            </div>

            {/* Vehicle Card / Manual Confirmation */}
            {vehicle && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3.5 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{vehicle.make} {vehicle.model}</span>
                  <span className="rounded bg-white px-2 py-0.5 text-[11px] font-mono border border-slate-200">{vehicle.vrm}</span>
                </div>
                <div className="mt-1 text-slate-600 flex gap-3 text-[11px]">
                  {vehicle.year && <span>Year: {vehicle.year}</span>}
                  {vehicle.fuelType && <span>Fuel: {vehicle.fuelType}</span>}
                  {vehicle.engineCapacity && <span>{vehicle.engineCapacity} cc</span>}
                </div>
              </div>
            )}

            {showManualFields && !vehicle && (
              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                <p className="font-semibold text-slate-800">Specify Vehicle Model:</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Series (e.g. 3 Series, 520d)"
                    value={manualModel}
                    onChange={(e) => setManualModel(e.target.value)}
                    className="rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g. 2018)"
                    value={manualYear}
                    onChange={(e) => setManualYear(e.target.value)}
                    className="rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Customer Contact Info (Shown once looked up or manual fallback) */}
            {(vehicle || showManualFields) && (
              <div className="space-y-2.5 border-t border-slate-100 pt-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="mt-0.5 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-[#007ff8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Contact Number"
                    className="mt-0.5 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-[#007ff8] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="mt-0.5 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-[#007ff8] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">Postcode</label>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      placeholder="e.g. B1 1AA"
                      className="mt-0.5 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-[#007ff8] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">Optional Notes</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Bare engine or complete with turbo?"
                    className="mt-0.5 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-[#007ff8] focus:outline-none"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-600 font-medium">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#007ff8] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0062c4] disabled:opacity-60 transition"
                >
                  {isSubmitting ? "Submitting..." : "Get Free Engine Quote Now"}
                </button>
              </div>
            )}
          </form>
        )}
      </div>

      {/* Trust Badges */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-600 flex items-center justify-around">
        <span>✓ 12-Month Warranty</span>
        <span>✓ Nationwide Delivery</span>
        <span>✓ Tested Units</span>
      </div>
    </div>
  );
}
