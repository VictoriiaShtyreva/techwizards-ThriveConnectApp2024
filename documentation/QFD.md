
### **QFD for ThriveConnect Hackathon MVP**

| **User Requirements**                          | **Technical Requirements**                      | **Priority** | **Description**                                                                                | **Implementation Strategy**                                                                                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Skill-Based Matching**                    | **Skills Matching Algorithm**                   | High               | Match job seekers with companies based on relevant skills.                                           | Use LangChain to build a skills compatibility agent, using a skills-focused prompt. Embed job seeker and company skill profiles and store in vector DB.                           |
| **2. Values & Well-Being Alignment**           | **Values Compatibility Algorithm**              | High               | Ensure candidates and companies have aligned values, especially regarding mental health and culture. | Use LangChain to build a values compatibility agent, with a cultural/values-based prompt, using well-being metrics. Aggregate and analyze values to create a compatibility score. |
| **3. Personalized Recommendations**            | **Weighted Scoring Algorithm**                  | Medium             | Display top matches with a weighted 50/50 balance between skills and values.                         | Implement a simple weighted score calculator to combine skills and values scores from agents, using LangGraph's aggregator.                                                       |
| **4. Streamlined Matching Process**            | **Automated Match Suggestions**                 | High               | Provide job seekers with a short list of tailored job recommendations.                               | Use LangGraph to combine outputs of both agents and rank final results for display on a user dashboard.                                                                           |
| **5. Transparent Company Profile Insights**    | **Public Data Aggregator for Companies**        | Medium             | Show an overview of a company's well-being and culture based on public data.                         | Integrate LangChain's tools for scraping or summarizing company info from public sources (optional if time permits).                                                              |
| **6. Simple, Anonymous Employee Feedback**     | **Anonymous Feedback Collection Tool**          | Medium             | Allow employees to leave feedback on culture and well-being practices anonymously.                   | Basic UI for feedback; if feasible, apply NLP sentiment analysis for quick insights.                                                                                              |
| **7. Easy, Guided Onboarding for Job Seekers** | **Guided Profile Creation with Questionnaires** | High               | Help job seekers create profiles that cover skills, values, and well-being preferences.              | Build a step-by-step profile setup with questions on both technical skills and well-being priorities.                                                                             |

---

### **Implementation Details**

**1. Skills Rating Agent (LangChain with Sequential Chain):**

- **Objective**: Rate job seeker skills with job requirements based on a compatibility score (0-100).
- **Flow**:
  - Prompt candidates for their position, skills, experience.
  - Prompt companies for their job requirements or job description.
  - Embed job descriptions and candidate skills in the vector database.
  - Use a vector search for skill matching and compute a skill compatibility score based on skill, experience keywords.
- **Tools**:Vector search for skill matching tool, Comparator tool, LangChain Sequential Chain, Vector DB for embeddings, GoogleGenerativeAIEmbeddings, GroqCloud API.

**2. Values Rating Agent (LangChain with Refinement Chain):**

- **Objective**: Assess alignment on cultural values and well-being based on a compatibility score (0-100).
- **Flow**:
  - Candidates and companies fill out a values and well-being questionnaire.
  - Embed both candidate and company responses, focusing on well-being aspects.
  - Apply NLP for sentiment analysis on public data for additional insights on company values (Scrap information of company based on their given social URL maybe included Linkedin, company's website or X,...).
- **Tools**: LangChain Refinement Chain, NLP tools for sentiment analysis, Internet Search tool, Vector DB for embeddings, GoogleGenerativeAIEmbeddings, GroqCloud API.

**3. Matching Agent for Final Scoring (Weighted Matching):**

- **Objective**: Calculate the average of skills and values scores into a final“Compatibility Score.”
- **Flow**:
  - Collect outputs from Skills and Values Compatibility agents.
  - Calculate average score of skills and values.
- **Tools**: LangChain Aggregator Chain, Weighted Score Calculator tool.

**4. UI Components for User Experience:**

- **Job Seeker Profile Creation**: Simple form with sections for skills, experience and values (prioritizing well-being needs).
- **Company Profile Display**: Shows company well-being score, aggregated feedback, and values compatibility.
- **Match Suggestions Page**: Lists recommended roles with compatibility scores for quick review.

### **Development Schedule (3-Day Hackathon)**

| **Day**   | **Tasks**                                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Day 1** | Set up project structure and configure LangChain and vector database. Develop core APIs. Develop basic UI for profile creation. Implement embedding and storage of job seeker and company profiles. |
| **Day 2** | Finalize Skills Rating Agent and Values Rating Agent. Begin work on Matching Agent. Integrate embeddings and implement vector search for skills. Finish basic UI (Do not need style yet)            |
| **Day 3** | Finalize Matching Agent. Build good style UI in frontend for match results and recommendations. Test end-to-end matching flow and refine compatibility scoring. Make presentation pitch.            |

---

### **Additional Tips for Hackathon**

- **Focus on Core Matching Feature**: Limit extra features; ensure Dual-Factor Matching System is fully functional.
- **Mock Data for Testing**: Use synthetic data for profiles to quickly test compatibility scoring.
- **Leverage LangChain's Toolset**: Use pre-built tools in LangChain to avoid building NLP tools from scratch.
