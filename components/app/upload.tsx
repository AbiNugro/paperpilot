"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileUp, LoaderCircle, Paperclip, Sparkles, UploadCloud, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PrimaryButton, SecondaryButton } from "./ui";

type UploadState = "idle" | "dragging" | "selected" | "analyzing" | "complete" | "error";
const analysisStepKeys = ["reading", "dates", "requirements", "actions", "complete"] as const;

export function UploadPage() {
  const t = useTranslations("Upload");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }, []);

  const chooseFile = (selectedFile?: File) => {
    if (!selectedFile) return;
    const supported = ["application/pdf", "image/png", "image/jpeg"].includes(selectedFile.type) || /\.(pdf|png|jpe?g)$/i.test(selectedFile.name);
    if (!supported) {
      setFile(null);
      setText("");
      setErrorMessage(t("unsupported"));
      setUploadState("error");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setText("");
      setErrorMessage(t("tooLarge"));
      setUploadState("error");
      return;
    }
    setErrorMessage("");
    setText("");
    setFile(selectedFile);
    setUploadState("selected");
  };

  const analyze = () => {
    if (!file && text.trim().length < 10) return;
    setUploadState("analyzing");
    setAnalysisStep(0);
    intervalRef.current = window.setInterval(() => setAnalysisStep((current) => Math.min(current + 1, analysisStepKeys.length - 2)), 430);
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      setAnalysisStep(analysisStepKeys.length - 1);
      setUploadState("complete");
      timeoutRef.current = setTimeout(() => router.push("/documents/scholarship-application-2026"), 450);
    }, 2050);
  };

  const removeFile = () => {
    setFile(null);
    setErrorMessage("");
    setAnalysisStep(0);
    setUploadState("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  const isBusy = uploadState === "analyzing" || uploadState === "complete";
  const hasInput = Boolean(file || text.trim().length >= 10);
  const fileType = file?.name.split(".").pop()?.toLocaleUpperCase() ?? "";

  return <div className="app-page-enter mx-auto max-w-3xl space-y-8">
    <header><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#4e70c7]">{t("eyebrow")}</p><h1 className="text-balance mt-2 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.03] tracking-[-.055em] text-[#1b2943]">{t("title")}</h1><p className="text-pretty mt-4 max-w-2xl text-base leading-7 text-[#707b8e]">{t("copy")}</p></header>

    <section aria-labelledby="upload-zone-title" className="rounded-[18px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.065),0_18px_45px_-35px_rgba(15,23,42,.25)] sm:p-4">
      <input ref={inputRef} id="document-upload" type="file" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} />
      {!file && !isBusy ? <div id="upload-zone-title" role="button" tabIndex={0} aria-describedby={uploadState === "error" ? "upload-error" : undefined} onClick={() => inputRef.current?.click()} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); inputRef.current?.click(); } }} onDragEnter={(event) => { event.preventDefault(); setUploadState("dragging"); }} onDragOver={(event) => event.preventDefault()} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setUploadState(errorMessage ? "error" : "idle"); }} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files?.[0]); }} className={`flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[14px] border border-dashed px-5 py-10 text-center outline-none transition-[background-color,border-color,transform] duration-180 ease-out focus-visible:ring-3 focus-visible:ring-[#a9c1f4] ${uploadState === "dragging" ? "border-[#5280e4] bg-[#edf3ff]" : uploadState === "error" ? "border-[#d89089] bg-[#fff8f7]" : "border-[#c9d6e8] bg-[#f8fafc] hover:border-[#8eabe4] hover:bg-[#f4f7fd]"}`}>
        <span className={`flex size-14 items-center justify-center rounded-[14px] ${uploadState === "dragging" ? "bg-[#dce8ff] text-[#315fca]" : "bg-white text-[#5577c9] shadow-[0_0_0_1px_rgba(37,99,235,.1)]"}`}><UploadCloud aria-hidden="true" className="size-6" /></span>
        <h2 className="mt-5 text-base font-semibold text-[#30405e]">{uploadState === "dragging" ? t("dragging") : t("dropHere")}</h2>
        <p className="mt-2 text-xs text-[#66748a]">{t("chooseDevice")}</p>
        <p className="mt-2 text-xs text-[#8590a2]">{t("formats")} · {t("maxSize")}</p>
        {uploadState === "error" && <p id="upload-error" role="alert" className="mt-5 text-xs font-semibold text-[#a34c45]">{errorMessage}</p>}
      </div> : <div id="upload-zone-title" className="rounded-[14px] bg-[#f7f9fc] p-4 sm:p-6">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#416dcc] shadow-[0_0_0_1px_rgba(37,99,235,.1)]"><FileUp aria-hidden="true" className="size-5" /></span>
          <div className="min-w-0 flex-1"><h2 className="text-sm font-semibold text-[#30405e]">{file ? t("selectedTitle") : t("textSelected")}</h2>{file && <><p className="mt-1 break-all text-sm font-semibold text-[#35445f]">{file.name}</p><p className="tabular-nums mt-1 text-[11px] text-[#8993a4]">{fileType} · {(file.size / 1024 / 1024).toFixed(1)} MB · {t("ready")}</p></>}</div>
          {file && !isBusy && <button type="button" aria-label={t("removeLabel")} onClick={removeFile} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[9px] px-3 text-xs font-semibold text-[#657187] transition-[background-color,transform] duration-150 ease-out hover:bg-white active:scale-[0.96]"><X aria-hidden="true" className="size-4" />{t("remove")}</button>}
        </div>
        {isBusy && <AnalysisProgress state={uploadState} step={analysisStep} />}
      </div>}
      <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-start gap-2 text-[11px] leading-5 text-[#8a95a5]"><Paperclip aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />{t("privacyHint")}</p><PrimaryButton className="w-full sm:w-auto" disabled={!hasInput || isBusy} onClick={analyze}>{uploadState === "analyzing" ? <><LoaderCircle aria-hidden="true" className="size-4 animate-spin" />{t("analyzing")}</> : uploadState === "complete" ? <><CheckCircle2 aria-hidden="true" className="size-4" />{t("complete")}</> : t("analyze")}</PrimaryButton></div>
    </section>

    <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[#a0a9b7]"><span className="h-px flex-1 bg-[#e0e5ec]" />{t("pasteDivider")}<span className="h-px flex-1 bg-[#e0e5ec]" /></div>
    <section className="rounded-[16px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-5"><label htmlFor="paste-text" className="text-sm font-semibold text-[#35445f]">{t("pasteLabel")}</label><textarea id="paste-text" value={text} disabled={isBusy || Boolean(file)} onChange={(event) => { setText(event.target.value); setErrorMessage(""); setUploadState("idle"); }} placeholder={t("pastePlaceholder")} className="mt-3 min-h-32 w-full resize-y rounded-[10px] bg-[#f6f8fb] p-3 text-sm leading-6 text-[#35445f] outline-none ring-1 ring-transparent transition-[background-color,box-shadow] duration-150 ease-out placeholder:text-[#9ba5b3] focus:bg-white focus:ring-[#9db7ef] disabled:cursor-not-allowed disabled:opacity-55" /><div className="mt-3 flex justify-end"><SecondaryButton className="w-full sm:w-auto" disabled={text.trim().length < 10 || isBusy || Boolean(file)} onClick={analyze}><Sparkles aria-hidden="true" className="size-4" />{t("analyzeText")}</SecondaryButton></div></section>
  </div>;
}

function AnalysisProgress({ state, step }: { state: "analyzing" | "complete"; step: number }) {
  const t = useTranslations("Upload");
  return <div aria-live="polite" aria-atomic="true" className="mt-5 rounded-[11px] bg-white p-4 text-left shadow-[0_0_0_1px_rgba(15,23,42,.07)]"><p className="text-xs font-semibold text-[#3b4c6b]">{state === "complete" ? t("complete") : t("reading")}</p><div className="mt-3 space-y-2.5">{analysisStepKeys.map((key, index) => { const done = state === "complete" || index < step; const active = state === "analyzing" && index === step; return <p key={key} className={`flex items-center gap-2 text-[11px] ${done ? "text-[#3f7a55]" : active ? "font-semibold text-[#315fca]" : "text-[#98a2b0]"}`}>{done ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : active ? <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" /> : <span aria-hidden="true" className="size-3.5 rounded-full border border-current" />}{t(`steps.${key}`)}</p>; })}</div></div>;
}
