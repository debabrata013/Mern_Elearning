import React, { useState } from 'react';

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <div>
          <p>
            At AIGIRI ("we", "our", or "us"), we are committed to protecting your privacy and personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            e-learning platform, website, mobile application, and related services (collectively, the "Services").
          </p>
          <p className="mt-3">
            Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have 
            read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, 
            please do not use our Services.
          </p>
        </div>
      )
    },
    {
      id: 'information-collection',
      title: '2. Information We Collect',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">2.1 Information You Provide to Us</h4>
            <p>We may collect the following types of information when you register, use our platform, or communicate with us:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Personal identifiers (name, email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (profile picture, biography, educational background)</li>
              <li>Payment and billing information (credit card details, billing address)</li>
              <li>Course preferences and learning history</li>
              <li>Content you create, share, or upload (comments, forum posts, assignments)</li>
              <li>Communications with us or other users through our platform</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2.2 Information Collected Automatically</h4>
            <p>When you use our Services, we may automatically collect certain information, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Device information (device type, operating system, browser type)</li>
              <li>Log information (IP address, access times, pages viewed)</li>
              <li>Location information (approximate location derived from IP address)</li>
              <li>Usage information (courses viewed, time spent on platform, learning patterns)</li>
              <li>Cookies and similar tracking technologies (as described in our Cookie Policy)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2.3 Information from Third Parties</h4>
            <p>
              We may receive information about you from third parties, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Social media platforms if you connect your AIGIRI account to those services</li>
              <li>Educational institutions if you access our platform through an institutional subscription</li>
              <li>Payment processors who facilitate your transactions with us</li>
              <li>Other partners with whom we offer co-branded services or engage in joint marketing activities</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'information-use',
      title: '3. How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p>
            We use the information we collect for various purposes, including to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Provide, maintain, and improve our Services</strong>
              <p className="mt-1">
                This includes authenticating users, processing transactions, fulfilling orders, and providing customer support.
              </p>
            </li>
            <li>
              <strong>Personalize your experience</strong>
              <p className="mt-1">
                We use your information to understand your preferences, learning patterns, and interests to recommend 
                relevant courses and content.
              </p>
            </li>
            <li>
              <strong>Communicate with you</strong>
              <p className="mt-1">
                This includes sending administrative emails, service announcements, and responses to your inquiries.
              </p>
            </li>
            <li>
              <strong>Send marketing communications</strong>
              <p className="mt-1">
                With your consent, we may send promotional communications about new courses, special offers, or other 
                information we think you may find interesting.
              </p>
            </li>
            <li>
              <strong>Analyze and improve our Services</strong>
              <p className="mt-1">
                We use data analytics to understand how users interact with our platform to improve functionality, 
                user experience, and educational content.
              </p>
            </li>
            <li>
              <strong>Monitor and ensure compliance</strong>
              <p className="mt-1">
                We may use information to enforce our Terms and Conditions, protect our rights, privacy, safety, or property, 
                and to comply with applicable laws and regulations.
              </p>
            </li>
            <li>
              <strong>Enable social features</strong>
              <p className="mt-1">
                If you choose to engage with our community features, we use your information to facilitate interactions 
                with other users, such as discussion forums or collaborative projects.
              </p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'information-sharing',
      title: '4. How We Share Your Information',
      content: (
        <div className="space-y-4">
          <p>
            We may share your information in the following circumstances:
          </p>
          
          <div>
            <h4 className="font-semibold mb-2">4.1 Service Providers</h4>
            <p>
              We may share your information with third-party vendors, service providers, contractors, or agents who perform 
              services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, 
              and marketing assistance.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4.2 Educational Partners</h4>
            <p>
              If you access our platform through an educational institution or employer, we may share information about your 
              progress, completion status, and engagement with the sponsoring organization.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4.3 Social Media Features</h4>
            <p>
              If you choose to connect your AIGIRI account with social media platforms, information may be shared with 
              those platforms according to your account settings and their privacy policies.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4.4 Business Transfers</h4>
            <p>
              If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information 
              may be transferred as part of that transaction.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4.5 Legal Requirements</h4>
            <p>
              We may disclose your information if required to do so by law or in response to valid requests by public 
              authorities (e.g., court order, government request).
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4.6 With Your Consent</h4>
            <p>
              We may share your information with third parties when you have given us your consent to do so.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: '5. Data Security',
      content: (
        <div>
          <p>
            We have implemented appropriate technical and organizational measures designed to protect the security of your 
            personal information. However, please note that no method of transmission over the Internet or electronic storage 
            is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot 
            guarantee its absolute security.
          </p>
          <p className="mt-3">
            We take the following security measures:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls to limit employee access to personal information</li>
            <li>Regular backups to prevent data loss</li>
            <li>Incident response procedures to address potential breaches</li>
          </ul>
        </div>
      )
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      content: (
        <div>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
            unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>The length of time we have an ongoing relationship with you</li>
            <li>Whether there is a legal obligation to which we are subject</li>
            <li>Whether retention is advisable in light of our legal position (e.g., regarding applicable statutes of limitations, litigation, or regulatory investigations)</li>
          </ul>
          <p className="mt-3">
            When we no longer need to use your personal information, we will either delete it or anonymize it so that it can no longer be 
            associated with you.
          </p>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: '7. Your Rights and Choices',
      content: (
        <div className="space-y-4">
          <p>
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          
          <div>
            <h4 className="font-semibold mb-2">7.1 Access and Update</h4>
            <p>
              You can access and update certain information through your account settings. If you need assistance accessing 
              information not available through your account, please contact us using the information in the "Contact Us" section.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">7.2 Data Portability</h4>
            <p>
              You may have the right to receive a copy of your personal information in a structured, machine-readable format.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">7.3 Deletion</h4>
            <p>
              You may request deletion of your personal information. Note that we may retain certain information as required by law or 
              for legitimate business purposes.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">7.4 Objection and Restriction</h4>
            <p>
              You may have the right to object to our processing of your personal information or ask us to restrict processing in certain circumstances.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">7.5 Marketing Communications</h4>
            <p>
              You can opt out of receiving marketing communications from us by following the unsubscribe instructions included in 
              our emails or by contacting us directly.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">7.6 Cookies</h4>
            <p>
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. 
              Please note that if you choose to block or delete cookies, certain functions of our Services may not work properly.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'children',
      title: '8. Children\'s Privacy',
      content: (
        <div>
          <p>
            Our Services are not intended for children under the age of 16. We do not knowingly collect personal information from 
            children under 16. If you are a parent or guardian and believe that your child has provided us with personal information, 
            please contact us immediately. If we become aware that we have collected personal information from children without 
            verification of parental consent, we will take steps to remove that information from our servers.
          </p>
        </div>
      )
    },
    {
      id: 'international',
      title: '9. International Data Transfers',
      content: (
        <div>
          <p>
            Your information may be transferred to, and maintained on, computers located outside of your state, province, country, 
            or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
          </p>
          <p className="mt-3">
            If you are located outside of the country where our servers are located and choose to provide information to us, 
            please note that we transfer the data, including personal information, to that country and process it there. 
            Your submission of such information represents your agreement to that transfer.
          </p>
          <p className="mt-3">
            We ensure appropriate safeguards are in place for international transfers, including:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Standard contractual clauses approved by relevant data protection authorities</li>
            <li>Privacy Shield certification where applicable</li>
            <li>Binding corporate rules for transfers to our group companies</li>
          </ul>
        </div>
      )
    },
    {
      id: 'third-party',
      title: '10. Third-Party Links and Services',
      content: (
        <div>
          <p>
            Our Services may contain links to third-party websites, services, or applications that are not operated by us. 
            If you click on a third-party link, you will be directed to that third party's site.
          </p>
          <p className="mt-3">
            We strongly advise you to review the privacy policy of every site you visit. We have no control over and assume 
            no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
          <p className="mt-3">
            Some of our courses may include embedded content from third-party providers such as YouTube or Vimeo. 
            These providers may use cookies and similar technologies to collect information about you. Please refer to 
            their privacy policies for more information.
          </p>
        </div>
      )
    },
    {
      id: 'cookies',
      title: '11. Cookies and Tracking Technologies',
      content: (
        <div>
          <p>
            We use cookies and similar tracking technologies to track activity on our Services and hold certain information. 
            Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p className="mt-3">
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Essential cookies:</strong> Necessary for the functioning of our Services</li>
            <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Analytics cookies:</strong> Help us understand how you use our Services</li>
            <li><strong>Marketing cookies:</strong> Used to deliver advertisements relevant to you</li>
          </ul>
          <p className="mt-3">
            For more detailed information about the cookies we use, please refer to our Cookie Policy at [website URL]/cookie-policy.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      title: '12. Changes to This Privacy Policy',
      content: (
        <div>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
            on this page and updating the "Last Updated" date at the top of this Privacy Policy.
          </p>
          <p className="mt-3">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective 
            when they are posted on this page.
          </p>
          <p className="mt-3">
            For significant changes, we will provide a more prominent notice, which may include an email notification to the 
            email address associated with your account.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      title: '13. Contact Us',
      content: (
        <div>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <address className="mt-3 not-italic">
            AIGIRI Inc.<br />
            Attn: Privacy Officer<br />
            Email: privacy@aigiri.com<br />
            Address: [Company Address]<br />
            Phone: [Company Phone Number]
          </address>
          <p className="mt-3">
            If you have an unresolved privacy or data use concern that we have not addressed satisfactorily, 
            please contact our third-party dispute resolution provider (free of charge) at [Dispute Resolution Provider].
          </p>
        </div>
      )
    },
    {
      id: 'dpo',
      title: '14. Data Protection Officer',
      content: (
        <div>
          <p>
            For users in the European Economic Area (EEA), we have appointed a Data Protection Officer who can be 
            contacted with any questions about how we process your personal information:
          </p>
          <address className="mt-3 not-italic">
            Data Protection Officer<br />
            Email: dpo@aigiri.com<br />
            Address: [DPO Address]
          </address>
        </div>
      )
    },
    {
      id: 'supervisory',
      title: '15. Supervisory Authority',
      content: (
        <div>
          <p>
            If you are located in the European Economic Area (EEA), you have the right to lodge a complaint with 
            a supervisory authority if you believe our processing of your personal information violates applicable law.
          </p>
          <p className="mt-3">
            The supervisory authority will depend on your country of residence. A list of supervisory authorities 
            is available <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-blue-600 underline">here</a>.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AIGIRI E-Learning Platform</h1>
        <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
        <p className="text-gray-600">Last Updated: April 5, 2025</p>
      </header>

      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 p-4 rounded-lg max-w-2xl">
          <p className="text-center">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => {
            const newExpandedSections = {};
            sections.forEach(section => {
              newExpandedSections[section.id] = true;
            });
            setExpandedSections(newExpandedSections);
          }}
        >
          Expand All Sections
        </button>
        <button 
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded ml-4"
          onClick={() => {
            const newExpandedSections = {};
            sections.forEach(section => {
              newExpandedSections[section.id] = false;
            });
            setExpandedSections(newExpandedSections);
          }}
        >
          Collapse All Sections
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="border border-gray-200 rounded shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center p-4 focus:outline-none bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="text-lg font-medium">{section.title}</h3>
              <span className="text-xl">
                {expandedSections[section.id] ? '−' : '+'}
              </span>
            </button>
            {expandedSections[section.id] && (
              <div className="p-4 border-t border-gray-200 bg-white">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <label className="flex items-center justify-center">
          <input type="checkbox" className="mr-2 h-4 w-4" />
          <span>I have read and understand the Privacy Policy</span>
        </label>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-lg">
          Accept Privacy Policy
        </button>
      </div>

      

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} AIGIRI Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;