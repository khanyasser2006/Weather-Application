import React from 'react';
import PageShell from '../components/PageShell';

export default function Privacy() {
  return (
    <PageShell 
      title="Privacy Policy" 
      subtitle="How we collect, use, and protect your data."
    >
      <h3>Information We Collect</h3>
      <p>
        When you use Skyrora, we collect information regarding your location in order to provide accurate, hyper-local weather forecasts. 
        This location data is processed locally on your device or ephemerally on our servers and is never stored permanently unless you explicitly create an account and save your locations.
      </p>

      <h3>How We Use Your Data</h3>
      <p>
        Your data is used strictly to improve the core functionality of the application. We use analytical data to monitor performance, 
        improve our forecast models, and ensure our services are running smoothly across different regions.
      </p>

      <h3>Third-Party Services</h3>
      <p>
        We partner with trusted meteorological providers to bring you the best data possible. In some cases, anonymous, aggregated location 
        data may be shared with these partners to request weather telemetry. No personally identifiable information (PII) is ever shared or sold.
      </p>

      <h3>Data Security</h3>
      <p>
        We employ industry-standard encryption protocols (TLS/SSL) for all data in transit. We take the security of your information very seriously 
        and continuously monitor our infrastructure for potential vulnerabilities.
      </p>
    </PageShell>
  );
}
