export class OrchestrationService {
  static processApplicationSubmission(eventBody: string) {
    // Receive message from SQS and parse to POJO
    // Build out the application pdf
    // Push pdf to S3
    // Save pdf location and needed info to DDB
    // Event based?: Send email notifying managers of tenant about application
    // Ack message in SQS
  }
}
