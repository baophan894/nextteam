import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Terms of Use</h1>
        
        <p className="mb-4">
          Thank you for using our apps. We’re continually improving and producing more innovative products to bring the best values to you. These terms of service are applied to all products of <strong>NEXT TEAM</strong>. Please read carefully before using our apps.
        </p>
        
        <p className="mb-8">
          By using <strong>NEXT TEAM</strong> products, you agree to be bound by these Terms. If you don’t agree to these Terms, do not use our apps. If you are using our products on behalf of an organization, you are agreeing to these Terms for that organization.
        </p>

        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Auto Renewing Subscriptions</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Subscribed user has unlimited access to the app services including all premium features and advanced tools.</li>
            <li>Unsubscribed user can only use those services with a limited quota per day.</li>
            <li>Payment will be charged to Google Play Account at confirmation of purchase.</li>
            <li>Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.</li>
            <li>Account will be charged for renewal within 24-hours prior to the end of the current period.</li>
            <li>Subscriptions may be managed by the user and auto-renewal may be turned off by going to the user’s Account Settings after purchase.</li>
            <li>Any unused portion of a free trial period, if offered, will be forfeited when the user purchases a subscription.</li>
          </ul>
        </div>

        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">General Prohibitions</h2>
          <p className="mb-4 italic">You agree not to do—or attempt to do—any of the following:</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Probe, scan, or test the vulnerability of any <strong>NEXT TEAM</strong> system or network.</li>
            <li>Access, tamper with, or use non-public areas of our computer systems.</li>
            <li>Decipher, decompile, disassemble or reverse engineer any of the software used.</li>
            <li>Interfere with the access of any user, host or network, including sending viruses or spamming.</li>
            <li>Plant malware or use our services to distribute malware.</li>
            <li>Send altered, deceptive or false source-identifying information (spoofing/phishing).</li>
            <li>Violate the privacy of others or any applicable law or regulation.</li>
          </ul>
        </div>

        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">App Updates and Responsibility</h2>
          <p className="mb-4">
            <strong>NEXT TEAM</strong> accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on the functionality of the app.
          </p>
          <p className="mb-4">
            The app is currently available on mobile. The requirements for the system may change, and you'll need to download updates if you want to keep using the app. We may also wish to stop providing the app at any time without notice.
          </p>
        </div>

        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">DMCA/Copyright Policy</h2>
          <p className="mb-4">
            We respect copyright law and expect you to do the same. It’s our policy to terminate those accounts that repeatedly infringe the rights of copyright holders.
          </p>
        </div>

        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to These Terms</h2>
          <p className="mb-4">
            We may update our Terms of Use from time to time. These changes are effective immediately after they are posted on this page.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: January 10, 2026
          </p>
        </div>
        
        <div className="contact mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="mb-4">
            If you have any issues or questions, please contact us at{" "}
            <a href="mailto:support@nextteam.com" className="text-blue-600 hover:underline font-medium">
              support@nextteam.com
            </a>.
          </p>
        </div>

      </div>
    </div>
  )
}