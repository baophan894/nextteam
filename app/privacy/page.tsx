import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
       
        
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
        
        <p className="mb-4">
          <strong>NEXT TEAM</strong> built the android apps as Ad-supported/Commercial apps. This SERVICE is provided by <strong>NEXT TEAM</strong> at no cost and is intended for use as is.
        </p>
        
        <p className="mb-4">
          This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
        </p>
        
        <p className="mb-4">
          If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
        </p>
        
        <p className="mb-8">
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at our Android Apps unless otherwise defined in this Privacy Policy.
        </p>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information Collection and Use</h2>
          <p className="mb-4">
            For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained on your device and is not collected by us in any way.
          </p>
          <p className="mb-4">
            The app does use third party services that may collect information used to identify you.
          </p>
          <p className="mb-4">
            Our apps use and transfer to any other app of information received from Google APIs will adhere to{" "}
            <a 
              href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>, including the Limited Use requirements.
          </p>
          <p className="mb-2">Link to privacy policy of third party service providers used by the app:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <a href="https://www.google.com/policies/privacy/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Google Play Services
              </a>
            </li>
            <li>
              <a href="https://support.google.com/admob/answer/6128543?hl=en" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                AdMob
              </a>
            </li>
            <li>
              <a href="https://firebase.google.com/policies/analytics" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Firebase Analytics
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/about/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Face data sharing and storage</h2>
          <p className="mb-4">
            We will not collect your face data and will not share with any third party, nor will we store any face information you record, and the photos/videos you record will be stored in your phone memory.
          </p>
        </div>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Log Data</h2>
          <p className="mb-4">
            We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
          </p>
        </div>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cookies</h2>
          <p className="mb-4">
            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
          </p>
          <p className="mb-4">
            This Service does not use these "cookies" explicitly. However, the app may use third party code and libraries that use "cookies" to collect information and improve their services. You have the option to either accept or refuse these cookies. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
          </p>
        </div>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Service Providers</h2>
          <p className="mb-4">We may employ third-party companies and individuals due to the following reasons:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services;</li>
            <li>To assist us in analyzing how our Service is used.</li>
          </ul>
          <p className="mb-4">
            We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
          </p>
        </div>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Security</h2>
          <p className="mb-4">
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>
        </div>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Links to Other Sites</h2>
          <p className="mb-4">
            This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites.
          </p>
        </div>
        
        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Children's Privacy</h2>
          <p className="mb-4">
            These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers.
          </p>
        </div>

        <div className="privacy-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. These changes are effective immediately after they are posted on this page.
          </p>
        </div>
        
        <div className="contact mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="mb-4">
            If you have any issues or questions, please contact us at{" "}
            <a href="mailto:support@nextteam.com" className="text-blue-600 hover:underline">
              support@nextteam.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
