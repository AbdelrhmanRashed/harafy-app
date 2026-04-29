// ─── Status values ────────────────────────────────────────────────────────────
// 0 = UnderReview  (initial, cannot be set again)
// 1 = Resolved     (report is valid → provider gets banned)
// 2 = Rejected     (report is invalid → no action taken)

export interface IReport {
  id: number;
  reason: string | null;
  reporterId: number;
  reporterName: string;
  reporterPictureUrl: string | null;
  targetUserId: number;
  targetUserName: string;
  targetUserPictureUrl: string | null;
  serviceRequestId: number;
  lastUpdate: string;
  status?: 0 | 1 | 2;
  reportType?: number;
}

// ─── Paginated response wrapper ───────────────────────────────────────────────
export interface PaginatedReports {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IReport[];
}
