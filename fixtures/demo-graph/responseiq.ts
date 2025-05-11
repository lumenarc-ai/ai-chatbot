const data = {
  nodes: [
    {
      id: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      type: "initial_node",
      title: "",
      url: "",
      requires_login: false,
      narration: {
        text: "",
        voice: false,
      },
      parent_page: "",
      actions: [],
      options: [],
      next: null,
      metadata: {
        section: "",
      },
    },
    {
      id: "5306b92d-50bf-479d-af94-e24a717eab03",
      type: "page",
      title: "Login Page",
      url: "https://app.responseiq.com/login",
      requires_login: true,
      narration: {
        text: "The login page of our platform offers robust customisation options, allowing you to align the consent message with your brand's unique voice and values. By tailoring the tone and presentation, you ensure a seamless experience that reinforces your company's identity every time a visitor logs in. This feature is particularly valuable as it increases engagement and brand trust without the need for extensive technical adjustments.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/login",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: "#password",
            value: "RIQ@*De&!@7656@#",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#page-signin-form > .btn",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Login Page",
      },
    },
    {
      id: "72fbc9eb-9f91-44e1-be3e-782a4da89eed",
      type: "page",
      title: "Call Settings",
      url: "https://app.responseiq.com/widgets/call_setting/5629",
      requires_login: true,
      narration: {
        text: "In the Call Settings feature of ResponseiQ, you can customize the language and gender of your audio prompts to better suit your business needs. This ensures that your customers have a seamless experience, no matter where they're located or what language they speak. By setting up ResponseiQ to integrate with your existing web forms, you can dramatically increase the rate of direct phone interactions with potential leads, potentially boosting conversion rates by 25%. With just a simple setup, once a lead hits submit on your form, your sales team gets notified and a call is instantly triggered. This means you can connect with interested leads within 60 seconds, enhancing customer engagement and satisfaction.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/call_setting/5629",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: "fieldset:nth-of-type(2) > .form-control",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(2) > .table-header > .table-caption",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#setnav > li:nth-of-type(4) > a",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Call Settings",
      },
    },
    {
      id: "59b250ca-70a0-4574-9076-4a767c660a7e",
      type: "terminal_node",
      title: "",
      url: "",
      requires_login: false,
      narration: {
        text: "",
        voice: false,
      },
      parent_page: "",
      actions: [],
      options: [],
      next: null,
      metadata: {
        section: "",
      },
    },
    {
      id: "0fb47642-8126-44d2-adc2-967d82b008ea",
      type: "page",
      title: "Homepage Introduction",
      url: "https://app.responseiq.com/login",
      requires_login: true,
      narration: {
        text: "Welcome to the Homepage introduction of ResponseiQ. After you provide your basic information, our team will ensure your widget perfectly matches your site's branding. You'll receive a small piece of code to effortlessly integrate the widget onto your site. This setup empowers your business to instantly connect a qualified lead with your team through a phone call right after a web form submission, streamlining customer engagement. By offering real-time communication, you can significantly enhance your response rates and customer satisfaction. Let's explore how this simple addition can transform your visitor interactions into meaningful conversations.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/login",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: "#password",
            value: "RIQ@*De&!@7656@#",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#page-signin-form > .btn",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Homepage Introduction",
      },
    },
    {
      id: "6df51fa9-415a-48b9-b2f9-e771abf4cd32",
      type: "page",
      title: "Recording Settings",
      url: "https://app.responseiq.com/widgets/agent_recording_control/5629",
      requires_login: true,
      narration: {
        text: "Let's explore the Recording Settings feature of ResponseiQ. This powerful tool allows you to set languages for call recordings, ensuring your agents control and adapt communications based on your specific needs. It also supports seamless compliance with industry standards by announcing recordings for quality and training purposes. Moreover, you can customize automated visual prompts, adjusting their appearance and timing to enhance user experience. With these capabilities, your team can maintain consistent communication quality, tailored to your global audience.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value:
              "https://app.responseiq.com/widgets/agent_recording_control/5629",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value:
              "https://app.responseiq.com/widgets/agent_recording_control/5629",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value:
              "https://app.responseiq.com/widgets/agent_recording_control/5629",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(6) > .table-caption",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".panel-body",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".clearfix > .p-b-1",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".panel-body > div:nth-of-type(3)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".clearfix > .p-b-1",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".clearfix > .p-b-1",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".clearfix > .p-b-1 > .form-group",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".clearfix > .p-b-1 > .form-group",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "fieldset:nth-of-type(1) > .col-lg-5",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "fieldset:nth-of-type(1) > .col-lg-5",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".p-b-0 > .col-lg-12",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".p-b-0 > .col-lg-12",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".recordMessage",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#setnav > li:nth-of-type(6) > a",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Recording Settings",
      },
    },
    {
      id: "a44ce2a9-b6c0-40ef-800c-db767bf91099",
      type: "page",
      title: "Login Page",
      url: "https://responseiq.com/call-tracking",
      requires_login: false,
      narration: {
        text: "",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/call-tracking",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Login Page",
      },
    },
    {
      id: "9a078604-7b31-4f95-bb8e-ac56cb92e8b8",
      type: "page",
      title: "Webhooks Integration",
      url: "https://app.responseiq.com/masters/dashboard",
      requires_login: true,
      narration: {
        text: "Let's explore how Webhooks Integration can transform your data management workflow. This feature allows you to automate real-time data sharing across your tools by generating customizable reports that are instantly sent to multiple recipients. With just a few quick settings, you can access vital insights on call activities and widget interactions, all designed to enhance your decision-making process. By automating these updates, you'll streamline your operations, ensuring timely delivery of critical information without lifting a finger. So, whether you're managing team communications or coordinating with partners, Webhooks integration offers seamless and efficient data connectivity.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/masters/dashboard",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "li:nth-of-type(10) > a",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Webhooks Integration",
      },
    },
    {
      id: "59340ac9-9cbd-4c6d-93d5-2fa2c0c809e6",
      type: "page",
      title: "Landing Page",
      url: "https://responseiq.com/call-tracking",
      requires_login: false,
      narration: {
        text: "Welcome to the landing page feature, where you can easily enhance your customer engagement by setting up tracking templates at the account level in your Google Ads account. This feature is crucial because it allows you to integrate seamlessly with your current forms, triggering immediate calls to your team as soon as customers submit their inquiries. Imagine your lead being connected with an agent in under 60 seconds after submitting a form—dramatically increasing the likelihood of meaningful conversations. Additionally, you can effortlessly monitor these interactions through detailed call reports that not only aid in training but also provide insightful analytics. These streamlined processes drive efficiency and ensure you never miss a chance to connect with prospective clients.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/call-tracking",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/call-tracking",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'a[data-highlight="true"][data-border="true"]',
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Landing Page",
      },
    },
    {
      id: "8bd8de94-5a04-4a8a-aeaf-71a984bdf8bb",
      type: "page",
      title: "Settings",
      url: "https://app.responseiq.com/widgets/settings/5629",
      requires_login: true,
      narration: {
        text: "In the settings section, you have the flexibility to choose and track events from four main categories. This feature is crucial for tailoring the data you gather to your specific business needs, enhancing your ability to make informed decisions. We'll explore how this integrates seamlessly with your system for intuitive and efficient tracking. After this, we'll dive into the call reports to uncover deeper insights into your interactions. Before moving forward, let me know if you have any questions about setting this up.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/settings/5629",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".col-lg-8",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Settings",
      },
    },
    {
      id: "eed5a623-8362-409c-b6c1-ab7e6bf0f355",
      type: "page",
      title: "Installation Details",
      url: "https://app.responseiq.com/widgets/install/5629",
      requires_login: true,
      narration: {
        text: "Let's take a look at how easy it is to get started with our widget installation. You can integrate it seamlessly using Google Tag Manager, WordPress, or by adding a simple code to your site's footer. This setup empowers your team to start generating calls immediately and allows them to monitor their activity directly from our platform. If your team isn't fully ready yet, don't worry, we provide guidance through our Help Centre and offer dedicated support whenever you need it. Plus, we support integration with major CRMs like Hubspot or Salesforce, ensuring your call tracking is aligned with your preferred tools. Ready to enhance your customer interactions with just a few clicks?",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/install/5629",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/install/5629",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/install/5629",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/install/5629",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".table-caption",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".row",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#clipboarddiv",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#clipboarddiv",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#clipboarddiv",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "p:nth-of-type(3)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "p:nth-of-type(3)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "p:nth-of-type(3)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".col-sm-12 > p:nth-of-type(1)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".col-sm-12 > p:nth-of-type(1)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#clipboarddiv",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Installation Details",
      },
    },
    {
      id: "6e97180e-1dd3-45fb-a85e-6bf97311f715",
      type: "page",
      title: "API Integration Settings",
      url: "https://app.responseiq.com/widgets/apis/5629",
      requires_login: true,
      narration: {
        text: "",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/apis/5629",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".table-header > div:nth-of-type(1)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(2) > .col-md-3",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "API Integration Settings",
      },
    },
    {
      id: "fb946999-56a3-438d-8493-90f177fe4230",
      type: "page",
      title: "Country Rules",
      url: "https://app.responseiq.com/widgets/allow_only_country/5629",
      requires_login: true,
      narration: {
        text: "Our Country Rules feature lets you customize call handling and engagement strategies based on the specific needs of each country, ensuring compliance and enhancing customer interaction. This powerful tool is particularly valuable for businesses operating in multiple regions, as it allows you to tailor communication practices effectively. By implementing country-specific actions, you can maximize engagement and maintain a consistent brand presence globally. Now, let's move on to see how this can be set up swiftly and seamlessly.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/allow_only_country/5629",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".btn-xs",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: '.modal-footer > [data-dismiss="modal"]',
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "td:nth-of-type(2)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "td:nth-of-type(2)",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Country Rules",
      },
    },
    {
      id: "634e6434-5097-4460-b129-0b5df82802da",
      type: "page",
      title: "Unknown Section",
      url: "https://app.responseiq.com/widgets/settings/5629",
      requires_login: true,
      narration: {
        text: "Let's explore the setup process for integrating your analytics more effectively. By selecting the GA4 Version and entering your measurement ID and API secret, you can streamline data collection to enhance your marketing insights. This setup empowers businesses to track and optimize customer interactions with precision. Ultimately, it enhances your decision-making process by providing clearer insights into user behavior. Feel free to ask if you want a deeper understanding of how this integration can benefit your team.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/settings/5629",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#setnav > li:nth-of-type(7) > a",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Unknown Section",
      },
    },
    {
      id: "83b64daf-bb34-411a-b8a4-891878f63726",
      type: "page",
      title: "Homepage",
      url: "https://responseiq.com/",
      requires_login: false,
      narration: {
        text: "",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Homepage",
      },
    },
    {
      id: "34076bb9-0973-4d54-9a85-b568a938ffab",
      type: "page",
      title: "Sales Inquiries",
      url: "https://responseiq.com",
      requires_login: false,
      narration: {
        text: "Our Sales Inquiries feature ensures your team never misses a crucial opportunity to connect with potential leads through real-time alerts. By configuring email notifications, key team members can keep track of missed, claimed, or scheduled calls, allowing them to respond swiftly and efficiently. This setup empowers your team to convert inquiries into meaningful conversations, boosting your engagement rates by up to 25%. For larger teams, directing notifications to one or two leaders helps focus communication where it matters most. This thoughtful organization and timely follow-up can significantly enhance your sales process and client interaction.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".agentpositions",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Sales Inquiries",
      },
    },
    {
      id: "5c53dec2-6e77-4749-b588-2f2ca03f2951",
      type: "page",
      title: "Callback Widget Details",
      url: "https://responseiq.com/callback-widget",
      requires_login: false,
      narration: {
        text: "With the Callback Widget from ResponseiQ, you can turn more of your website visitors into qualified leads by allowing them to connect instantly with your team. Data is safeguarded through encryption, ensuring every interaction is secure. The real power here is speed: as soon as a visitor submits their form, your team gets alerted and can begin a call with them within 60 seconds. This immediacy is crucial, given that customers are far more likely to choose a business that responds swiftly. The backend allows for an insightful view of visitor interactions, enhancing your ability to adapt and optimize. This feature ensures you're capitalizing on every potential lead by making it incredibly easy for them to reach you.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/callback-widget",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/callback-widget",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'a[data-framer-name="Hover"][data-highlight="true"]',
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: 'div[data-framer-name="Variant 1"]',
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'div[data-framer-name="Variant 1"]',
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'div[data-framer-name="Variant 1"]',
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Callback Widget Details",
      },
    },
    {
      id: "9260e748-a669-4075-b195-1e1acc350219",
      type: "page",
      title: "Lead Connect Solutions",
      url: "https://responseiq.com/lead-connect",
      requires_login: false,
      narration: {
        text: "Lead Connect Solutions by ResponseiQ revolutionizes how you engage with your leads. Equipped with robust data encryption, it ensures your information remains secure while offering a seamless callback scheduling feature. When leads visit your site outside of business hours, they can easily schedule a call, doubling your chances of engaging potential customers when it's most convenient for them. This feature alone generates about 25% of total call volume for our clients. Plus, our smart triggers ensure that your sales team connects with high-priority leads almost instantly. With ResponseiQ, you're not just capturing leads; you're crafting opportunities.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/lead-connect",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/lead-connect",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              "#main > div > div > div:nth-of-type(3) > div:nth-of-type(2)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(2) > div > div > h3",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              "#main > div > div > div:nth-of-type(3) > div:nth-of-type(2)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'div[data-framer-name="Copy section"]',
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              "#main > div > div > div:nth-of-type(3) > div:nth-of-type(3)",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Lead Connect Solutions",
      },
    },
    {
      id: "28e864f6-ef97-4362-8321-0ef9bb8687f9",
      type: "page",
      title: "Dashboard",
      url: "https://responseiq.com/call-tracking",
      requires_login: false,
      narration: {
        text: "Here on the dashboard, you'll immediately gain valuable insights into how visitors are interacting with your communication tools. It displays essential metrics like total calls, answer rates, and average call durations, helping you monitor engagement levels effectively. One particularly insightful feature is the ability to track how many users see the widget and choose to use it, with an average usage rate of around one percent. This data empowers you to refine strategies and enhance customer interaction by understanding user behavior more deeply.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/call-tracking",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/call-tracking",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'a[data-framer-name="Hover"][data-highlight="true"]',
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: "#main > div > div > div:nth-of-type(2)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'a[data-highlight="true"][data-border="true"]',
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Dashboard",
      },
    },
    {
      id: "79724e15-77f7-4be0-b66f-2ae5543650b3",
      type: "page",
      title: "Lead Connect Dashboard",
      url: "https://app.responseiq.com/dashboard",
      requires_login: true,
      narration: {
        text: "The Lead Connect Dashboard is a powerful tool that gives you a comprehensive view of how your website visitors are interacting with your communication tools. This feature not only tracks total calls and answer rates, but also provides valuable insights into user engagement, such as the percentage of visitors who utilize the callback option. By enabling instant responses to form submissions, your team can connect with potential leads within 60 seconds, boosting your chances of conversion significantly. Its seamless integration requires no changes to your existing setup, simply ensuring that ResponseiQ receives a copy of your forms. This dashboard allows your team to act swiftly and efficiently, optimizing lead follow-up like never before.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/dashboard",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/dashboard",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              ".ps-theme-default > div > div > .highcharts-root > .highcharts-background",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".col-md-8 > div > span",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              "div:nth-child(3) > #stvid > div > div > .highcharts-root > .highcharts-background",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "div:nth-of-type(6) > #metrics > .box-row > .col-md-12 > .panel > .panel-title",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              "body > div:nth-of-type(6) > div:nth-of-type(8) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "div:nth-of-type(8) > #metrics > .box-row > div:nth-of-type(2)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".col-md-4 > .panel > .panel-body > .ps-theme-default",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(3) > .panel > .panel-title",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(3) > .panel > .panel-title",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".highcharts-legend-item-hidden > text > tspan",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "body > div:nth-of-type(6) > div:nth-of-type(8) > div > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > svg > g:nth-of-type(3) > g > g > g:nth-of-type(3) > text > tspan",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".highcharts-legend-item-hidden > text > tspan",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              "div:nth-of-type(9) > #metrics > .box-row > div:nth-of-type(1) > .panel > .panel-title",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "body > div:nth-of-type(6) > div:nth-of-type(8) > div > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > svg > g:nth-of-type(3) > g > g > g > text > tspan",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "#piecontainer > div > .highcharts-root > .highcharts-button > .highcharts-button-symbol",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "div:nth-of-type(9) > #metrics > .box-row > div:nth-of-type(2) > .panel > .panel-title",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              ".table-light > tbody > tr:nth-of-type(1) > .text-xs-right",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "div:nth-of-type(9) > #metrics > .box-row > div:nth-of-type(1) > .panel",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".col-md-6 > .panel > .panel-body > .ps-theme-default",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".table-light > thead > tr > .text-xs-right",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".table-light > thead > tr > .text-xs-right",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(9) > #metrics > .box-row",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              ".lead_connect_date_dashboard_div > .table > thead > tr > th:nth-of-type(7)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".px-content",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              "div:nth-of-type(11) > .box > .box-row > .col-md-12 > .panel > .panel-title",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector:
              ".tableWidgetOutcomeList > tfoot > tr > th:nth-of-type(6)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "body",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(1) > .table-header > .table-caption > i",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(1) > .table-header > .table-caption > i",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(1) > .table-header > .table-caption > i",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Lead Connect Dashboard",
      },
    },
    {
      id: "8562cc33-551c-4c12-8878-460a4e8a86e2",
      type: "page",
      title: "Dashboard",
      url: "https://responseiq.com/call-tracking",
      requires_login: false,
      narration: {
        text: "Here's a look at our dashboard, where you can gain valuable insights into your customer interactions. It provides an overview of metrics like total calls, answer rates, and average call duration, helping you understand how effectively you're engaging with your site visitors. Plus, you can see the widget interaction rate, where our clients typically see about 1% of visitors using the tool to request a callback. This information is crucial for optimizing your customer service approach and ensuring your team is prepared to handle inquiries efficiently. If you're keen to explore further and perhaps trial ResponseiQ, our support team is ready to assist.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://responseiq.com/call-tracking",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: 'a[data-highlight="true"][data-border="true"]',
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Dashboard",
      },
    },
    {
      id: "301d1e96-5af4-466e-b678-0cdc19a765cc",
      type: "page",
      title: "Widget Customization",
      url: "https://app.responseiq.com/widgets/customize_widget",
      requires_login: true,
      narration: {
        text: "Elevate your brand experience by fully customizing ResponseiQ's widget to align with your company's identity. Easily tailor the look and feel by applying your unique HEX color code and uploading your logo, ensuring seamless integration with your site. While you can tweak the text for personalized communication, our default settings are optimized for maximal engagement. Our multilingual audio prompts enable meaningful interactions in various languages, further enhancing user connection. With these powerful customization options, your business can create a cohesive and engaging online presence that resonates with your audience.",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/customize_widget",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/customize_widget",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/customize_widget",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/customize_widget",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/customize_widget",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/customize_widget",
          },
        },
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/widgets/customize_widget",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".rgtwdnewpract",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#formSubmit > div:nth-of-type(1) > .form-control",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#formSubmit > div:nth-of-type(1) > .form-control",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#formSubmit > div:nth-of-type(1) > .form-control",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#formSubmit > div:nth-of-type(2) > .m-t-0",
            value: "",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: "#hexcolor",
            value: "#915454",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(2) > .clrpcclrs",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#formSubmit > div:nth-of-type(2)",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#formSubmit",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#formSubmit > div:nth-of-type(3) > .m-t-0",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".txtpostng > .m-t-0",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".rgtwdnewpract",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".clrpstn > .rgtbtm",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".rgtwdnewpract",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".clrpstn > .lftbtm",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".rgtwdnewpract",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(6) > .form-control",
            value: "",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: "#widgettitle",
            value: "Booking Inquiries",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#widgettitle",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "body",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".popnew > div:nth-of-type(3) > .m-t-0",
            value: "",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: "#popupplaceholdertext",
            value: "Enter your number",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#popupplaceholdertext",
            value: "",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: "#popupbuttontext",
            value: "Call me now",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#popupbuttontext",
            value: "",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".px-content > .row",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: ".col-md-5",
            value: "",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: "#schedulepopupbuttontext",
            value: "Call me later",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "#schedulepopupbuttontext",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector: "div:nth-of-type(19) > .form-group",
            value: "",
          },
        },
        {
          action: "click",
          delay: 1000,
          target: {
            selector:
              'div:nth-of-type(19) > .form-group > label > [data-trigger="hover"] > .m-t-0',
            value: "",
          },
        },
        {
          action: "fill_input",
          delay: 1000,
          target: {
            selector: ".validation-switcher-85",
            value: "on",
          },
        },
        {
          action: "scroll_to_section",
          delay: 1000,
          target: {
            selector: ".rgtwdnewpract",
            value: "",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Widget Customization",
      },
    },
    {
      id: "ef9a2496-1d6d-4900-bd63-9161d664fbde",
      type: "page",
      title: "Dashboard Page",
      url: "https://app.responseiq.com/dashboard",
      requires_login: true,
      narration: {
        text: "",
        voice: true,
      },
      parent_page: "",
      actions: [
        {
          action: "go_to",
          delay: 0,
          target: {
            selector: null,
            value: "https://app.responseiq.com/dashboard",
          },
        },
      ],
      options: [],
      next: null,
      metadata: {
        section: "Dashboard Page",
      },
    },
  ],
  edges: [
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "5306b92d-50bf-479d-af94-e24a717eab03",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "5306b92d-50bf-479d-af94-e24a717eab03",
      to: "72fbc9eb-9f91-44e1-be3e-782a4da89eed",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "72fbc9eb-9f91-44e1-be3e-782a4da89eed",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "0fb47642-8126-44d2-adc2-967d82b008ea",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "0fb47642-8126-44d2-adc2-967d82b008ea",
      to: "6df51fa9-415a-48b9-b2f9-e771abf4cd32",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "6df51fa9-415a-48b9-b2f9-e771abf4cd32",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "a44ce2a9-b6c0-40ef-800c-db767bf91099",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "a44ce2a9-b6c0-40ef-800c-db767bf91099",
      to: "9a078604-7b31-4f95-bb8e-ac56cb92e8b8",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "9a078604-7b31-4f95-bb8e-ac56cb92e8b8",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "59340ac9-9cbd-4c6d-93d5-2fa2c0c809e6",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "59340ac9-9cbd-4c6d-93d5-2fa2c0c809e6",
      to: "8bd8de94-5a04-4a8a-aeaf-71a984bdf8bb",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "8bd8de94-5a04-4a8a-aeaf-71a984bdf8bb",
      to: "eed5a623-8362-409c-b6c1-ab7e6bf0f355",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "eed5a623-8362-409c-b6c1-ab7e6bf0f355",
      to: "6e97180e-1dd3-45fb-a85e-6bf97311f715",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "6e97180e-1dd3-45fb-a85e-6bf97311f715",
      to: "fb946999-56a3-438d-8493-90f177fe4230",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "fb946999-56a3-438d-8493-90f177fe4230",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "634e6434-5097-4460-b129-0b5df82802da",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "634e6434-5097-4460-b129-0b5df82802da",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "83b64daf-bb34-411a-b8a4-891878f63726",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "83b64daf-bb34-411a-b8a4-891878f63726",
      to: "34076bb9-0973-4d54-9a85-b568a938ffab",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "34076bb9-0973-4d54-9a85-b568a938ffab",
      to: "5c53dec2-6e77-4749-b588-2f2ca03f2951",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "5c53dec2-6e77-4749-b588-2f2ca03f2951",
      to: "9260e748-a669-4075-b195-1e1acc350219",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "9260e748-a669-4075-b195-1e1acc350219",
      to: "28e864f6-ef97-4362-8321-0ef9bb8687f9",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "28e864f6-ef97-4362-8321-0ef9bb8687f9",
      to: "79724e15-77f7-4be0-b66f-2ae5543650b3",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "79724e15-77f7-4be0-b66f-2ae5543650b3",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "8562cc33-551c-4c12-8878-460a4e8a86e2",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "8562cc33-551c-4c12-8878-460a4e8a86e2",
      to: "301d1e96-5af4-466e-b678-0cdc19a765cc",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "301d1e96-5af4-466e-b678-0cdc19a765cc",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "cb20e749-1444-4e41-a8ce-b70605b591dd",
      to: "ef9a2496-1d6d-4900-bd63-9161d664fbde",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
    {
      from: "ef9a2496-1d6d-4900-bd63-9161d664fbde",
      to: "59b250ca-70a0-4574-9076-4a767c660a7e",
      condition: null,
      narration: null,
      weight: 1.0,
      metadata: {},
    },
  ],
};

export default data;
