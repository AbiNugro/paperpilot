export type DocumentStatus =
  | "action_required"
  | "needs_attention"
  | "in_progress"
  | "completed"
  | "upcoming";

export type TaskStatus = "open" | "completed";
export type Urgency = "low" | "medium" | "high";

export interface PaperTask {
  id: string;
  documentId: string;
  dueDate?: string;
  status: TaskStatus;
}

export interface RequiredDocument {
  id: string;
  status: "ready" | "missing";
}

export interface PaperDocument {
  id: string;
  deadline?: string;
  urgency: Urgency;
  status: DocumentStatus;
  uploadedAt: string;
  fileName: string;
  fileSize: string;
  updatedAt: string;
  requiredDocuments: RequiredDocument[];
  tasks: PaperTask[];
}

const task = (id: string, documentId: string, dueDate: string | undefined, status: TaskStatus): PaperTask => ({
  id,
  documentId,
  dueDate,
  status,
});

export const documents: PaperDocument[] = [
  {
    id: "scholarship-application-2026",
    deadline: "2026-07-28",
    urgency: "high",
    status: "action_required",
    uploadedAt: "2026-07-19",
    updatedAt: "2026-07-19",
    fileName: "scholarship-application.pdf",
    fileSize: "2.4 MB",
    requiredDocuments: [
      { id: "ktm", status: "ready" },
      { id: "ktp", status: "ready" },
      { id: "academic-transcript", status: "missing" },
      { id: "recommendation-letter", status: "missing" },
    ],
    tasks: [
      task("prepare-transcript", "scholarship-application-2026", "2026-07-25", "open"),
      task("request-letter", "scholarship-application-2026", "2026-07-26", "open"),
      task("complete-application", "scholarship-application-2026", "2026-07-27", "completed"),
      task("review-details", "scholarship-application-2026", "2026-07-27", "completed"),
      task("submit-application", "scholarship-application-2026", "2026-07-28", "open"),
    ],
  },
  {
    id: "internship-agreement",
    deadline: "2026-07-30",
    urgency: "medium",
    status: "in_progress",
    uploadedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    fileName: "internship-agreement.pdf",
    fileSize: "1.8 MB",
    requiredDocuments: [{ id: "signed-agreement", status: "ready" }, { id: "student-id", status: "ready" }],
    tasks: [task("internship-submit", "internship-agreement", "2026-07-30", "open")],
  },
  {
    id: "internet-bill-july",
    deadline: "2026-08-02",
    urgency: "medium",
    status: "upcoming",
    uploadedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    fileName: "internet-bill-july.pdf",
    fileSize: "480 KB",
    requiredDocuments: [{ id: "payment-confirmation", status: "missing" }],
    tasks: [task("internet-payment", "internet-bill-july", "2026-08-02", "open")],
  },
  {
    id: "competition-registration",
    deadline: "2026-08-05",
    urgency: "low",
    status: "in_progress",
    uploadedAt: "2026-07-15",
    updatedAt: "2026-07-15",
    fileName: "competition-registration.png",
    fileSize: "920 KB",
    requiredDocuments: [{ id: "registration-form", status: "ready" }, { id: "portfolio", status: "missing" }],
    tasks: [
      task("competition-portfolio", "competition-registration", "2026-08-03", "open"),
      task("complete-competition-form", "competition-registration", "2026-08-04", "open"),
    ],
  },
  {
    id: "student-verification-form",
    deadline: "2026-08-08",
    urgency: "low",
    status: "needs_attention",
    uploadedAt: "2026-07-14",
    updatedAt: "2026-07-14",
    fileName: "student-verification.pdf",
    fileSize: "670 KB",
    requiredDocuments: [{ id: "enrollment-letter", status: "missing" }],
    tasks: [],
  },
  {
    id: "insurance-renewal",
    deadline: "2026-08-12",
    urgency: "low",
    status: "upcoming",
    uploadedAt: "2026-07-12",
    updatedAt: "2026-07-12",
    fileName: "insurance-renewal.pdf",
    fileSize: "1.1 MB",
    requiredDocuments: [{ id: "policy-confirmation", status: "ready" }],
    tasks: [],
  },
  {
    id: "freelance-client-contract",
    urgency: "low",
    status: "completed",
    uploadedAt: "2026-07-10",
    updatedAt: "2026-07-10",
    fileName: "client-contract.pdf",
    fileSize: "1.5 MB",
    requiredDocuments: [{ id: "signed-contract", status: "ready" }],
    tasks: [task("contract-sign", "freelance-client-contract", undefined, "completed")],
  },
  {
    id: "campus-administration-notice",
    deadline: "2026-08-15",
    urgency: "medium",
    status: "in_progress",
    uploadedAt: "2026-07-09",
    updatedAt: "2026-07-09",
    fileName: "campus-notice.jpg",
    fileSize: "1.2 MB",
    requiredDocuments: [{ id: "response-form", status: "missing" }],
    tasks: [],
  },
  {id: "tax-registration-notice", urgency: "low", status: "completed", uploadedAt: "2026-07-07", updatedAt: "2026-07-07", fileName: "tax-registration.png", fileSize: "760 KB", requiredDocuments: [], tasks: []},
  {id: "rental-lease-renewal", deadline: "2026-08-20", urgency: "low", status: "upcoming", uploadedAt: "2026-07-05", updatedAt: "2026-07-05", fileName: "lease-renewal.pdf", fileSize: "1.4 MB", requiredDocuments: [], tasks: []},
  {id: "bank-account-letter", urgency: "low", status: "completed", uploadedAt: "2026-07-03", updatedAt: "2026-07-03", fileName: "bank-letter.pdf", fileSize: "530 KB", requiredDocuments: [], tasks: []},
  {id: "medical-registration-form", urgency: "low", status: "completed", uploadedAt: "2026-07-01", updatedAt: "2026-07-01", fileName: "medical-form.jpg", fileSize: "890 KB", requiredDocuments: [], tasks: []},
];

export const mockToday = "2026-07-19";
export const primaryDocument = documents[0];
export const allTasks = documents.flatMap((document) => document.tasks);
export const openTasks = allTasks.filter((item) => item.status === "open");
export const upcomingDeadlineDocuments = documents.filter((document) => document.deadline).slice(0, 3);

export const getDaysRemaining = (deadline?: string) => {
  if (!deadline) return null;
  const end = new Date(`${deadline}T12:00:00Z`);
  const start = new Date(`${mockToday}T12:00:00Z`);
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
};

export const getTaskStats = (document: PaperDocument) => {
  const completed = document.tasks.filter((item) => item.status === "completed").length;
  return { total: document.tasks.length, completed, open: document.tasks.length - completed };
};

export const getRequirementStats = (document: PaperDocument) => {
  const ready = document.requiredDocuments.filter((item) => item.status === "ready").length;
  return { total: document.requiredDocuments.length, ready, missing: document.requiredDocuments.length - ready };
};

export const getDocument = (id: string) => documents.find((document) => document.id === id) ?? primaryDocument;

export const isDueSoon = (taskItem: PaperTask) => {
  if (!taskItem.dueDate || taskItem.status !== "open") return false;
  const days = getDaysRemaining(taskItem.dueDate);
  return days !== null && days <= 9;
};
