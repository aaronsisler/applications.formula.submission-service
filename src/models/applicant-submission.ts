export class ApplicantSubmission {
  applicationId: string;
  applicantId: string;
  applicantName: string;
  applicationUrl: string;
  dateSubmitted: string;

  constructor(options: {
    applicationId?: string;
    applicantId?: string;
    applicantName?: string;
    applicationUrl?: string;
    dateSubmitted?: string;
  }) {
    this.applicationId = options.applicationId;
    this.applicantId = options.applicantId;
    this.applicantName = options.applicantName;
    this.applicationUrl = options.applicationUrl;
    this.dateSubmitted = options.dateSubmitted;
  }
}
