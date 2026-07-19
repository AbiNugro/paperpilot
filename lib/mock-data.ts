export type DocumentStatus =
  | "action_required"
  | "needs_attention"
  | "in_progress"
  | "completed"
  | "upcoming";

export type TaskStatus = "open" | "completed";

export interface PaperTask {
  id: string;
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
    fileName: "scholarship-application.pdf",
    fileSize: "2.4 MB",
    requiredDocuments: [
      { name: "KTM", status: "ready" },
      { name: "KTP", status: "ready" },
      { name: "Academic Transcript", status: "missing" },
      { name: "Recommendation Letter", status: "missing" },
    ],
    tasks: [
      { id: "prepare-transcript", title: "Prepare academic transcript", due: "Due Jul 25", status: "open" },
      { id: "request-letter", title: "Request recommendation letter", due: "Due Jul 26", status: "open" },
      { id: "complete-application", title: "Complete scholarship application", due: "Due Jul 27", status: "open" },
      { id: "review-details", title: "Review application details", due: "Due Jul 27", status: "open" },
      { id: "submit-application", title: "Submit before July 28", due: "Due Jul 28", status: "open" },
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
    status: "completed",
    uploadedAt: "July 17, 2026",
    fileName: "internship-agreement.pdf",
    fileSize: "1.8 MB",
    requiredDocuments: [{ name: "Signed agreement", status: "ready" }, { name: "Student ID", status: "ready" }],
    tasks: [{ id: "internship-submit", title: "Submit registration", due: "Completed", status: "completed" }],
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
    fileName: "internet-bill-july.pdf",
    fileSize: "480 KB",
    requiredDocuments: [{ name: "Payment confirmation", status: "missing" }],
    tasks: [{ id: "internet-payment", title: "Pay internet bill", due: "Due Aug 2", status: "open" }],
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
    fileName: "competition-registration.png",
    fileSize: "920 KB",
    requiredDocuments: [{ name: "Registration form", status: "ready" }, { name: "Portfolio", status: "missing" }],
    tasks: [{ id: "competition-portfolio", title: "Attach portfolio", due: "Due Aug 3", status: "open" }],
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
    fileName: "student-verification.pdf",
    fileSize: "670 KB",
    requiredDocuments: [{ name: "Enrollment letter", status: "missing" }],
    tasks: [{ id: "verification-letter", title: "Request enrollment letter", due: "Due Aug 6", status: "open" }],
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
    fileName: "insurance-renewal.pdf",
    fileSize: "1.1 MB",
    requiredDocuments: [{ name: "Policy confirmation", status: "ready" }],
    tasks: [{ id: "insurance-review", title: "Review renewal details", due: "Due Aug 10", status: "open" }],
  },
  {
    id: "freelance-client-contract",
    title: "Freelance Client Contract",
    type: "Contract",
    summary: "A client contract covering scope, payment terms, and delivery expectations.",
    urgency: "low",
    status: "completed",
    uploadedAt: "July 10, 2026",
    fileName: "client-contract.pdf",
    fileSize: "1.5 MB",
    requiredDocuments: [{ name: "Signed contract", status: "ready" }],
    tasks: [{ id: "contract-sign", title: "Sign contract", due: "Completed", status: "completed" }],
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
    fileName: "campus-notice.jpg",
    fileSize: "1.2 MB",
    requiredDocuments: [{ name: "Response form", status: "missing" }],
    tasks: [{ id: "campus-response", title: "Review and respond", due: "Due Aug 14", status: "open" }],
  },
];

export const primaryDocument = documents[0];

export const getDocument = (id: string) => documents.find((document) => document.id === id) ?? primaryDocument;

export const upcomingDeadlines = [
  { documentId: "scholarship-application-2026", title: "Scholarship Application", due: "July 28", detail: "3 tasks remaining", status: "action_required" as DocumentStatus },
  { documentId: "internship-agreement", title: "Internship Registration", due: "July 30", detail: "1 task remaining", status: "in_progress" as DocumentStatus },
  { documentId: "internet-bill-july", title: "Internet Bill", due: "August 2", detail: "Payment required", status: "upcoming" as DocumentStatus },
];
