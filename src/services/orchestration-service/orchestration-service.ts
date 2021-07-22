export class OrchestrationService {
  static processApplicationSubmission() {
    // Receive message from SQS
    // Build out the application pdf
    // Push pdf to S3
    // Save pdf location and needed info to DDB
    // Event based?: Send email notifying managers of tenant about application
    // Ack message in SQS
  }
}
