import React from 'react';
import PageShell from '../components/PageShell';

export default function Terms() {
  return (
    <PageShell 
      title="Terms of Service" 
      subtitle="Please read these terms carefully before using Skyrora."
    >
      <h3>Acceptance of Terms</h3>
      <p>
        By accessing or using the Skyrora application, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
      </p>

      <h3>Use of Service</h3>
      <p>
        Skyrora provides weather forecasts and related data for informational purposes only. While we strive for accuracy, meteorology is an inexact science. 
        We do not guarantee the accuracy, completeness, or timeliness of the information provided. You should not rely solely on our service for decisions regarding life safety or property protection.
      </p>

      <h3>Intellectual Property</h3>
      <p>
        The service and its original content, features, design system, and functionality are and will remain the exclusive property of Skyrora and its licensors. 
        Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Skyrora.
      </p>

      <h3>Limitation of Liability</h3>
      <p>
        In no event shall Skyrora, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, 
        consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
      </p>
    </PageShell>
  );
}
