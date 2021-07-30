export class ApplicantSubmission {
  applicationId: string;
  applicantId: string;
  applicantName: string;
  dateSubmitted: string;

  constructor(options: {
    applicationId?: string;
    applicantId?: string;
    applicantName?: string;
    dateSubmitted?: string;
  }) {
    this.applicationId = options.applicationId;
    this.applicantId = options.applicantId;
    this.applicantName = options.applicantName;
    this.dateSubmitted = options.dateSubmitted;
  }
}
