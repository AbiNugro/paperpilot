"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileUp, LoaderCircle, Paperclip, Sparkles, UploadCloud, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PrimaryButton, SecondaryButton } from "./ui";

type UploadState = "idle" | "dragging" | "file-selected" | "analyzing" | "complete" | "error";
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
    if (!supported) { setErrorMessage(t("unsupported")); setUploadState("error"); return; }
    if (selectedFile.size > 10 * 1024 * 1024) { setErrorMessage(t("tooLarge")); setUploadState("error"); return; }
    setErrorMessage("");
    setFile(selectedFile);
    setUploadState("file-selected");
  };

  const analyze = () => {
    if (!file && !text.trim()) return;
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
    setUploadState("idle");
    if (inputRef.current) inputRef.current.value = "";
  };
  const hasInput = Boolean(file || text.trim());
  const disabled = !hasInput || uploadState === "analyzing" || uploadState === "complete";

  return <div className="app-page-enter mx-auto max-w-3xl space-y-8">
    <header><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#4e70c7]">{t("eyebrow")}</p><h1 className="text-balance mt-2 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.03] tracking-[-.055em] text-[#1b2943]">{t("title")}</h1><p className="text-pretty mt-4 max-w-2xl text-base leading-7 text-[#707b8e]">{t("copy")}</p></header>
    <section aria-labelledby="upload-zone-title" className="rounded-[18px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,.065),0_18px_45px_-35px_rgba(15,23,42,.25)] sm:p-4">
      <input ref={inputRef} id="document-upload" type="file" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} />
      <div id="upload-zone-title" role="button" tabIndex={0} onClick={() => inputRef.current?.click()} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); inputRef.current?.click(); } }} onDragOver={(event) => { event.preventDefault(); setUploadState("dragging"); }} onDragLeave={() => setUploadState(file ? "file-selected" : "idle")} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files?.[0]); }} className={`flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[14px] border border-dashed px-5 py-10 text-center outline-none transition-[background-color,border-color,transform] duration-180 ease-out focus-visible:ring-3 focus-visible:ring-[#a9c1f4] ${uploadState === "dragging" ? "border-[#5280e4] bg-[#edf3ff]" : "border-[#c9d6e8] bg-[#f8fafc] hover:border-[#8eabe4] hover:bg-[#f4f7fd]"}`}>
        <span className={`flex size-14 items-center justify-center rounded-[14px] ${uploadState === "dragging" ? "bg-[#dce8ff] text-[#315fca]" : "bg-white text-[#5577c9] shadow-[0_0_0_1px_rgba(37,99,235,.1)]"}`}><UploadCloud aria-hidden="true" className="size-6" /></span>
        <h2 className="mt-5 text-base font-semibold text-[#30405e]">{uploadState === "dragging" ? t("dragging") : file ? t("selectedTitle") : t("dropHere")}</h2>{!file && <p className="mt-2 text-xs text-[#66748a]">{t("chooseDevice")}</p>}<p className="mt-2 text-xs text-[#8590a2]">{t("formats")} · {t("maxSize")}</p>
        {file && <div className="mt-5 flex max-w-full items-center gap-3 rounded-[10px] bg-white px-3 py-2 text-left shadow-[0_0_0_1px_rgba(15,23,42,.07)]" onClick={(event) => event.stopPropagation()}><span className="flex size-8 items-center justify-center rounded-[8px] bg-[#edf3ff] text-[#416dcc]"><FileUp aria-hidden="true" className="size-4" /></span><span className="min-w-0"><span className="block max-w-[220px] truncate text-xs font-semibold text-[#35445f]">{file.name}</span><span className="tabular-nums mt-0.5 block text-[10px] text-[#8993a4]">{(file.size / 1024 / 1024).toFixed(1)} MB · {t("ready")}</span></span><button type="button" aria-label={t("removeLabel")} onClick={removeFile} className="ml-2 flex size-10 shrink-0 items-center justify-center rounded-[8px] text-[#7b8799] transition-[background-color,transform] duration-150 ease-out hover:bg-[#f0f3f8] active:scale-[0.96]"><X aria-hidden="true" className="size-4" /></button></div>}
        {uploadState === "error" && <p role="alert" className="mt-5 text-xs font-semibold text-[#a34c45]">{errorMessage}</p>}
        {(uploadState === "analyzing" || uploadState === "complete") && <div className="mt-5 w-full max-w-sm rounded-[11px] bg-white p-3 text-left shadow-[0_0_0_1px_rgba(15,23,42,.07)]"><p className="text-xs font-semibold text-[#3b4c6b]">{t("reading")}</p><div className="mt-3 space-y-2">{analysisStepKeys.map((key, index) => <p key={key} className={`flex items-center gap-2 text-[11px] ${index <= analysisStep ? "text-[#3f7a55]" : "text-[#98a2b0]"}`}>{index <= analysisStep ? <CheckCircle2 aria-hidden="true" className="size-3.5" /> : <span aria-hidden="true" className="size-3.5 rounded-full border border-current" />}{t(`steps.${key}`)}</p>)}</div></div>}
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"><p className="flex items-start gap-2 text-[11px] leading-5 text-[#8a95a5]"><Paperclip aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />{t("privacyHint")}</p><PrimaryButton disabled={disabled} onClick={analyze}>{uploadState === "analyzing" ? <><LoaderCircle aria-hidden="true" className="size-4 animate-spin" />{t("analyzing")}</> : uploadState === "complete" ? <><CheckCircle2 aria-hidden="true" className="size-4" />{t("complete")}</> : t("analyze")}</PrimaryButton></div>
    </section>
    <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[#a0a9b7]"><span className="h-px flex-1 bg-[#e0e5ec]" />{t("pasteDivider")}<span className="h-px flex-1 bg-[#e0e5ec]" /></div>
    <section className="rounded-[16px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,.065)] sm:p-5"><label htmlFor="paste-text" className="text-sm font-semibold text-[#35445f]">{t("pasteLabel")}</label><textarea id="paste-text" value={text} onChange={(event) => setText(event.target.value)} placeholder={t("pastePlaceholder")} className="mt-3 min-h-32 w-full resize-y rounded-[10px] bg-[#f6f8fb] p-3 text-sm leading-6 text-[#35445f] outline-none ring-1 ring-transparent transition-[background-color,box-shadow] duration-150 ease-out placeholder:text-[#9ba5b3] focus:bg-white focus:ring-[#9db7ef]" /><div className="mt-3 flex justify-end"><SecondaryButton disabled={!text.trim() || uploadState === "analyzing" || uploadState === "complete"} onClick={analyze}><Sparkles aria-hidden="true" className="size-4" />{t("analyzeText")}</SecondaryButton></div></section>
  </div>;
}
