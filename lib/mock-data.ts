export type DocumentStatus =
  | "action_required"
  | "needs_attention"
  | "in_progress"
  | "completed"
  | "upcoming";

export type TaskStatus = "open" | "completed";

export interface PaperTask {
  id: string;
  documentId: string;
  title: string;
  due: string;
  status: TaskStatus;
}

export interface RequiredDocument {
  name: string;
  status: "ready" | "missing";
}

export interface PaperDocument {
  id: string;
  title: string;
  type: string;
  summary: string;
  deadline?: string;
  deadlineLabel?: string;
  urgency: "low" | "medium" | "high";
  status: DocumentStatus;
  uploadedAt: string;
  fileName: string;
  fileSize: string;
  updatedAt: string;
  requiredDocuments: RequiredDocument[];
  tasks: PaperTask[];
}

export const documents: PaperDocument[] = [
  {
    id: "scholarship-application-2026",
    title: "Scholarship Application 2026",
    type: "Scholarship",
    summary: "This is a scholarship application for active university students. Applicants must complete the form and submit the required documents before July 28, 2026.",
    deadline: "July 28, 2026",
    deadlineLabel: "Due Jul 28",
    urgency: "high",
    status: "action_required",
    uploadedAt: "July 19, 2026",
    updatedAt: "Today",
    fileName: "scholarship-application.pdf",
    fileSize: "2.4 MB",
    requiredDocuments: [
      { name: "KTM", status: "ready" },
      { name: "KTP", status: "ready" },
      { name: "Academic Transcript", status: "missing" },
      { name: "Recommendation Letter", status: "missing" },
    ],
    tasks: [
      { id: "prepare-transcript", documentId: "scholarship-application-2026", title: "Prepare academic transcript", due: "Due Jul 25", status: "open" },
      { id: "request-letter", documentId: "scholarship-application-2026", title: "Request recommendation letter", due: "Due Jul 26", status: "open" },
      { id: "complete-application", documentId: "scholarship-application-2026", title: "Complete scholarship application", due: "Due Jul 27", status: "completed" },
      { id: "review-details", documentId: "scholarship-application-2026", title: "Review application details", due: "Due Jul 27", status: "completed" },
      { id: "submit-application", documentId: "scholarship-application-2026", title: "Submit before July 28", due: "Due Jul 28", status: "open" },
    ],
  },
  {
    id: "internship-agreement",
    title: "Internship Agreement",
    type: "Contract",
    summary: "An internship agreement outlining your placement, responsibilities, and registration requirements.",
    deadline: "July 30, 2026",
    deadlineLabel: "Due Jul 30",
    urgency: "medium",
    status: "in_progress",
    uploadedAt: "July 17, 2026",
    updatedAt: "2 days ago",
    fileName: "internship-agreement.pdf",
    fileSize: "1.8 MB",
    requiredDocuments: [{ name: "Signed agreement", status: "ready" }, { name: "Student ID", status: "ready" }],
    tasks: [{ id: "internship-submit", documentId: "internship-agreement", title: "Submit registration", due: "Due Jul 30", status: "open" }],
  },
  {
    id: "internet-bill-july",
    title: "Internet Bill — July",
    type: "Bill",
    summary: "Your monthly internet bill with a payment due date and account reference details.",
    deadline: "August 2, 2026",
    deadlineLabel: "Due Aug 2",
    urgency: "medium",
    status: "upcoming",
    uploadedAt: "July 16, 2026",
    updatedAt: "3 days ago",
    fileName: "internet-bill-july.pdf",
    fileSize: "480 KB",
    requiredDocuments: [{ name: "Payment confirmation", status: "missing" }],
    tasks: [{ id: "internet-payment", documentId: "internet-bill-july", title: "Pay internet bill", due: "Due Aug 2", status: "open" }],
  },
  {
    id: "competition-registration",
    title: "Competition Registration",
    type: "Registration",
    summary: "Registration information for an upcoming competition, including required forms and submission steps.",
    deadline: "August 5, 2026",
    deadlineLabel: "Due Aug 5",
    urgency: "low",
    status: "in_progress",
    uploadedAt: "July 15, 2026",
    updatedAt: "4 days ago",
    fileName: "competition-registration.png",
    fileSize: "920 KB",
    requiredDocuments: [{ name: "Registration form", status: "ready" }, { name: "Portfolio", status: "missing" }],
    tasks: [{ id: "competition-portfolio", documentId: "competition-registration", title: "Attach portfolio", due: "Due Aug 3", status: "open" }],
  },
  {
    id: "student-verification-form",
    title: "Student Verification Form",
    type: "University",
    summary: "A student verification form to confirm current enrollment and academic details.",
    deadline: "August 8, 2026",
    deadlineLabel: "Due Aug 8",
    urgency: "low",
    status: "needs_attention",
    uploadedAt: "July 14, 2026",
    updatedAt: "5 days ago",
    fileName: "student-verification.pdf",
    fileSize: "670 KB",
    requiredDocuments: [{ name: "Enrollment letter", status: "missing" }],
    tasks: [{ id: "verification-letter", documentId: "student-verification-form", title: "Request enrollment letter", due: "Due Aug 6", status: "open" }],
  },
  {
    id: "insurance-renewal",
    title: "Insurance Renewal",
    type: "Insurance",
    summary: "A renewal notice with coverage information and the next payment date.",
    deadline: "August 12, 2026",
    deadlineLabel: "Due Aug 12",
    urgency: "low",
    status: "upcoming",
    uploadedAt: "July 12, 2026",
    updatedAt: "1 week ago",
    fileName: "insurance-renewal.pdf",
    fileSize: "1.1 MB",
    requiredDocuments: [{ name: "Policy confirmation", status: "ready" }],
    tasks: [],
  },
  {
    id: "freelance-client-contract",
    title: "Freelance Client Contract",
    type: "Contract",
    summary: "A client contract covering scope, payment terms, and delivery expectations.",
    urgency: "low",
    status: "completed",
    uploadedAt: "July 10, 2026",
    updatedAt: "1 week ago",
    fileName: "client-contract.pdf",
    fileSize: "1.5 MB",
    requiredDocuments: [{ name: "Signed contract", status: "ready" }],
    tasks: [{ id: "contract-sign", documentId: "freelance-client-contract", title: "Sign contract", due: "Completed", status: "completed" }],
  },
  {
    id: "campus-administration-notice",
    title: "Campus Administration Notice",
    type: "Notice",
    summary: "A campus notice with an update that may require a response from enrolled students.",
    deadline: "August 15, 2026",
    deadlineLabel: "Due Aug 15",
    urgency: "medium",
    status: "in_progress",
    uploadedAt: "July 9, 2026",
    updatedAt: "1 week ago",
    fileName: "campus-notice.jpg",
    fileSize: "1.2 MB",
    requiredDocuments: [{ name: "Response form", status: "missing" }],
    tasks: [{ id: "campus-response", documentId: "campus-administration-notice", title: "Review and respond", due: "Due Aug 14", status: "open" }],
  },
  {
    id: "tax-registration-notice", title: "Tax Registration Notice", type: "Government", summary: "A registration notice with account information and a reference number.", urgency: "low", status: "completed", uploadedAt: "July 7, 2026", updatedAt: "2 weeks ago", fileName: "tax-registration.png", fileSize: "760 KB", requiredDocuments: [], tasks: [],
  },
  {
    id: "rental-lease-renewal", title: "Rental Lease Renewal", type: "Housing", summary: "A lease renewal notice with updated terms and a response window.", deadline: "August 20, 2026", deadlineLabel: "Due Aug 20", urgency: "low", status: "upcoming", uploadedAt: "July 5, 2026", updatedAt: "2 weeks ago", fileName: "lease-renewal.pdf", fileSize: "1.4 MB", requiredDocuments: [], tasks: [],
  },
  {
    id: "bank-account-letter", title: "Bank Account Letter", type: "Finance", summary: "A bank correspondence letter with account information and next steps.", urgency: "low", status: "completed", uploadedAt: "July 3, 2026", updatedAt: "2 weeks ago", fileName: "bank-letter.pdf", fileSize: "530 KB", requiredDocuments: [], tasks: [],
  },
  {
    id: "medical-registration-form", title: "Medical Registration Form", type: "Registration", summary: "A registration form with appointment and identity details.", urgency: "low", status: "completed", uploadedAt: "July 1, 2026", updatedAt: "3 weeks ago", fileName: "medical-form.jpg", fileSize: "890 KB", requiredDocuments: [], tasks: [],
  },
];

export const primaryDocument = documents[0];

export const mockToday = "Sunday, July 19, 2026";

export const getDaysRemaining = (deadline?: string) => {
  if (!deadline) return null;
  const end = new Date(deadline);
  const start = new Date("2026-07-19T00:00:00Z");
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
};

export const getTaskStats = (document: PaperDocument) => {
  const completed = document.tasks.filter((task) => task.status === "completed").length;
  return { total: document.tasks.length, completed, open: document.tasks.length - completed };
};

export const getRequirementStats = (document: PaperDocument) => {
  const ready = document.requiredDocuments.filter((item) => item.status === "ready").length;
  return { total: document.requiredDocuments.length, ready, missing: document.requiredDocuments.length - ready };
};

export const allTasks = documents.flatMap((document) => document.tasks);

export const openTasks = allTasks.filter((task) => task.status === "open");

export const getDocument = (id: string) => documents.find((document) => document.id === id) ?? primaryDocument;

export const upcomingDeadlines = [
  primaryDocument,
  documents.find((document) => document.id === "internship-agreement")!,
  documents.find((document) => document.id === "internet-bill-july")!,
].map((document) => ({
  documentId: document.id,
  title: document.title,
  due: document.deadlineLabel?.replace("Due ", "") ?? "No date",
  detail: `${getTaskStats(document).open} ${getTaskStats(document).open === 1 ? "task" : "tasks"} remaining`,
  status: document.status,
}));
