import { Report } from "../models/report.model";

export type ReportDTO = Report
export type CreateReportDTO = Omit<Report, 'id' | 'created_at' | 'updated_at'>
export type UpdateReportDTO = Partial<CreateReportDTO>
