import React, { useState } from 'react';

const TermsAndConditions = () => {
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
        <p>
          Welcome to AIGIRI, an online e-learning platform that provides educational content, courses, and learning resources. 
          These Terms and Conditions ("Terms") govern your access to and use of the AIGIRI platform, website, and services 
          (collectively, the "Services").
          <br /><br />
          By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
          please do not access or use our Services.
        </p>
      )
    },
    {
      id: 'definitions',
      title: '2. Definitions',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>"AIGIRI"</strong>, "we", "our", or "us" refers to AIGIRI Inc., the company that operates the e-learning platform.</li>
          <li><strong>"User"</strong>, "you", or "your" refers to any individual or entity that accesses or uses our Services.</li>
          <li><strong>"Content"</strong> refers to all courses, materials, videos, texts, graphics, and other information available on the platform.</li>
          <li><strong>"Subscription"</strong> refers to the payment plan that provides access to our Services.</li>
        </ul>
      )
    },
    {
      id: 'account',
      title: '3. Account Registration',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">3.1 Account Creation</h4>
            <p>
              To access certain features of our Services, you must create an account. When creating an account, 
              you agree to provide accurate, current, and complete information and to update such information 
              to keep it accurate, current, and complete.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">3.2 Account Security</h4>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities 
              that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">3.3 Age Requirement</h4>
            <p>
              You must be at least 16 years of age to create an account. If you are under 18, you represent that you have 
              your parent's or legal guardian's permission to use the Services.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'subscription',
      title: '4. Subscription and Payments',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">4.1 Subscription Plans</h4>
            <p>
              AIGIRI offers various subscription plans. The fees, duration, and features of each subscription plan 
              are described on our website at the time of purchase.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">4.2 Payment</h4>
            <p>
              Payment for subscription must be made in advance. We accept payment through the methods specified on our website.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">4.3 Automatic Renewal</h4>
            <p>
              Unless otherwise stated, subscriptions automatically renew for the same duration as the original subscription period. 
              You can cancel auto-renewal at any time through your account settings.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">4.4 Refunds</h4>
            <p>
              Refund policies are specified for each course or subscription plan. Generally, refunds are available within 14 days 
              of purchase if you are not satisfied with the course content and have completed less than 30% of the course.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'conduct',
      title: '5. User Conduct',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">5.1 Prohibited Activities</h4>
            <p>You agree not to engage in any of the following prohibited activities:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing upon the intellectual property rights of others</li>
              <li>Sharing your account credentials with others</li>
              <li>Attempting to access other users' accounts</li>
              <li>Distributing malware or other harmful code</li>
              <li>Scraping or copying content from the platform</li>
              <li>Disrupting or interfering with the platform's functionality</li>
              <li>Harassing, threatening, or intimidating others</li>
              <li>Using the platform for commercial purposes without authorization</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">5.2 Content Interaction</h4>
            <p>
              When posting comments, participating in forums, or otherwise interacting with content on the platform, 
              you agree to be respectful and constructive.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'ip',
      title: '6. Intellectual Property Rights',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">6.1 AIGIRI Content</h4>
            <p>
              All content provided on the platform, including courses, videos, texts, graphics, logos, and software, 
              is owned by AIGIRI or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">6.2 Limited License</h4>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use our Services 
              for personal, non-commercial educational purposes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">6.3 Restrictions</h4>
            <p>You may not:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Reproduce, distribute, display, or sell any content from the platform</li>
              <li>Modify, create derivative works, or reverse engineer any content</li>
              <li>Remove any copyright or proprietary notices from the content</li>
              <li>Use the content for any commercial purpose without prior written consent</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'user-content',
      title: '7. User-Generated Content',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">7.1 Ownership</h4>
            <p>
              You retain ownership of any content you submit to the platform, including comments, forum posts, and assignments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">7.2 License Grant</h4>
            <p>
              By submitting content to the platform, you grant AIGIRI a worldwide, non-exclusive, royalty-free license 
              to use, reproduce, modify, and display such content in connection with providing and promoting our Services.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      title: '8. Privacy',
      content: (
        <p>
          Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into 
          these Terms by reference. Our Privacy Policy can be found at [website URL]/privacy-policy.
        </p>
      )
    },
    {
      id: 'termination',
      title: '9. Termination',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">9.1 Termination by User</h4>
            <p>
              You may terminate your account at any time by following the instructions in your account settings 
              or by contacting customer support.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">9.2 Termination by AIGIRI</h4>
            <p>
              We reserve the right to suspend or terminate your access to our Services, with or without notice, 
              for violation of these Terms, for engaging in prohibited activities, or for any other reason at our sole discretion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">9.3 Effect of Termination</h4>
            <p>
              Upon termination, your right to access and use our Services will immediately cease. 
              Provisions that by their nature should survive termination shall survive, including intellectual property rights, 
              warranties, indemnities, and limitations of liability.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'disclaimers',
      title: '10. Disclaimers',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">10.1 "As Is" Services</h4>
            <p>
              Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied, 
              including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, 
              or non-infringement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">10.2 Educational Content</h4>
            <p>
              While we strive to provide accurate and up-to-date educational content, we do not warrant that the content 
              is error-free, complete, or suitable for any particular purpose.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">10.3 Third-Party Content</h4>
            <p>
              Our Services may include content provided by third parties. We are not responsible for the accuracy, 
              reliability, or legality of such content.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'liability',
      title: '11. Limitation of Liability',
      content: (
        <p>
          To the maximum extent permitted by law, AIGIRI and its officers, directors, employees, and agents shall not 
          be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, 
          data, or goodwill, arising from or in connection with your use of our Services.
        </p>
      )
    },
    {
      id: 'indemnification',
      title: '12. Indemnification',
      content: (
        <p>
          You agree to indemnify and hold harmless AIGIRI and its officers, directors, employees, and agents from and 
          against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, 
          arising from or in connection with your use of our Services or violation of these Terms.
        </p>
      )
    },
    {
      id: 'modifications',
      title: '13. Modifications to Terms',
      content: (
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting 
          the updated Terms on our website and updating the "Last Updated" date. Your continued use of our Services 
          after such modifications constitutes your acceptance of the modified Terms.
        </p>
      )
    },
    {
      id: 'governing-law',
      title: '14. Governing Law and Dispute Resolution',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">14.1 Governing Law</h4>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], 
              without regard to its conflict of law principles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">14.2 Dispute Resolution</h4>
            <p>
              Any dispute arising from or relating to these Terms or our Services shall be resolved through binding 
              arbitration in accordance with the rules of [Arbitration Association]. The arbitration shall take place 
              in [City, State/Country].
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">14.3 Class Action Waiver</h4>
            <p>
              You agree that any dispute resolution proceedings will be conducted only on an individual basis and 
              not in a class, consolidated, or representative action.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'general',
      title: '15. General Provisions',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">15.1 Entire Agreement</h4>
            <p>
              These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, 
              constitute the entire agreement between you and AIGIRI concerning your use of our Services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">15.2 Severability</h4>
            <p>
              If any provision of these Terms is found to be unenforceable, that provision shall be enforced to the 
              maximum extent possible, and the remaining provisions shall remain in full force and effect.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">15.3 No Waiver</h4>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of such 
              right or provision.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">15.4 Assignment</h4>
            <p>
              You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. 
              We may assign our rights and obligations under these Terms without restriction.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: '16. Contact Information',
      content: (
        <div>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <address className="mt-2 not-italic">
            AIGIRI Inc.<br />
            Email: legal@aigiri.com<br />
            Address: [Company Address]<br />
            Phone: [Company Phone Number]
          </address>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AIGIRI E-Learning Platform</h1>
        <h2 className="text-2xl font-semibold mb-6">Terms and Conditions</h2>
        <p className="text-gray-600">Last Updated: April 5, 2025</p>
      </header>

      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 p-4 rounded-lg max-w-2xl">
          <p className="text-center">
            By accessing or using our Services, you agree to be bound by these Terms. 
            If you do not agree to these Terms, please do not access or use our Services.
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

      
      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} AIGIRI Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;