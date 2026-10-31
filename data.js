const NARRATION = {
welcome:   "00-welcome.mp3",
s1:        "01-arrival-jetty.mp3",
s2:        "02-worldview-lookout.mp3",
s3:        "03-craft-market.mp3",
s4:        "04-fishermans-pier.mp3",
s5:        "05-courthouse-library.mp3",
s6:        "06-boatyard.mp3",
s7:        "07-lighthouse.mp3",
s8:        "08-cookshop.mp3",
s9:        "09-coffee-sorting-shed.mp3",
s10:       "10-proposal-pavilion.mp3",
farewell:  "11-departure.mp3"
};
const STATIONS = [
{
id: "s1", num: 1, name: "Arrival Jetty", theme: "What research is",
keepsake: "Captain's Logbook",
bigIdea: "Research is a careful, open, step-by-step way of answering a question with evidence. Looking things up is not the same as researching them.",
feeds: "Every section of your proposal",
concepts: [
{ term: "Educational research", def: "A systematic process of asking a question, collecting and analysing data, and reporting an answer that helps us understand or improve teaching and learning.", ex: "Collecting three years of attendance records to see whether school feeding days change attendance in a rural primary school." },
{ term: "Systematic and empirical", def: "Systematic means the steps are planned and followed in order. Empirical means the answer rests on evidence you gathered or examined, not on opinion.", ex: "A blog post about phones in class is opinion. A study that observes 20 classrooms with a checklist is empirical." },
{ term: "Purposes of research", def: "Research adds to knowledge, improves practice, informs policy, and gives voice to people whose experiences are rarely heard.", ex: "Interviewing Creole-dominant learners about reading in Standard English gives them a voice in policy talk about language." },
{ term: "The research process", def: "Most studies move through six connected steps: identify a problem, review the literature, state a purpose and questions, collect data, analyse and interpret, then report and evaluate.", ex: "Your proposal covers the first four steps in writing and plans the last two." },
{ term: "Critical consumer", def: "A reader who asks of every study: who was studied, how, by whom, and can I trust the conclusion? You must be a critical consumer before you can be a good producer.", ex: "A headline says 'Boys hate reading'. A critical consumer asks: how many boys, which schools, measured how?" }
],
caribbean: { title: "Why this matters here", text: "Caribbean schools are often reformed on the strength of imported studies and good intentions. When we do our own research, in our own classrooms, with our own learners, we stop borrowing answers and start producing them." },
reading: [
{ cite: "Creswell (2013), Chapter 1", note: "The research process and the three approaches." },
{ cite: "Leedy, Ormrod & Johnson (2014), Chapter 1", note: "What research is and what it is not." }
],
activities: [
{ type: "sort", prompt: "Research or not research? Tap a card, then tap the right basket.",
buckets: ["This is research", "This is not research"],
items: [
{ t: "A teacher reads three blogs and writes her opinion on phones in class.", b: 1, why: "Opinion built on other people's opinions. No data collected, no method." },
{ t: "A principal compares three years of attendance with school feeding days.", b: 0, why: "A clear question, existing records as data, and a comparison. That is research." },
{ t: "Searching online for last year's CSEC mathematics pass rate for a staff meeting.", b: 1, why: "This is finding information. Useful, but not research." },
{ t: "Interviewing eight rural teachers about teaching after a hurricane and analysing the interviews for themes.", b: 0, why: "Planned data collection and systematic analysis. That is qualitative research." },
{ t: "A survey of 300 Grade 6 students on reading habits, analysed with descriptive statistics.", b: 0, why: "Planned instrument, a sample and analysis. That is quantitative research." },
{ t: "A newspaper column arguing that boys in Jamaica are falling behind.", b: 1, why: "It may cite figures, but it argues a view. It does not follow a research method." }
] },
{ type: "order", prompt: "Put the six steps of the research process in order. Tap them in sequence.",
steps: ["Identify a research problem", "Review the literature", "State the purpose and research questions", "Collect data", "Analyse and interpret the data", "Report and evaluate the research"] }
],
reflection: "Before today, what did you think research was? Describe one decision in your work that was made without evidence, and say how research could have changed it.",
resources: []
},
{
id: "s2", num: 2, name: "Worldview Lookout", theme: "Paradigms and approaches",
keepsake: "Spyglass of Worldviews",
bigIdea: "How you see the world shapes how you study it. Your worldview points you toward quantitative, qualitative, mixed or action research, and your question should make the final choice.",
feeds: "Methodology: research approach and justification",
concepts: [
{ term: "Paradigm (worldview)", def: "A set of beliefs about what reality is (ontology) and how we can know it (epistemology). It sits underneath every choice in a study.", ex: "If you believe reading ability can be measured, you lean one way. If you believe it is lived differently by each child, you lean another." },
{ term: "Post-positivist → Quantitative", def: "Reality exists and can be measured, though never perfectly. Researchers test theories, use numbers, and aim for objectivity and generalisation.", ex: "Testing whether a phonics programme raises PEP language arts scores across 40 schools." },
{ term: "Constructivist → Qualitative", def: "People build meaning from experience, so there are many realities. Researchers study meaning in context, using words, observation and documents.", ex: "Exploring how first-year teachers in rural St. Elizabeth make sense of their first term." },
{ term: "Pragmatic → Mixed methods", def: "Use whatever works to answer the question. Collect both numbers and words and bring them together.", ex: "Survey 200 parents about homework, then interview 10 of them to explain the patterns." },
{ term: "Transformative and critical", def: "Research should expose unfair power and help change it. This connects to Freire: research as a way of reading the world in order to change it.", ex: "Working with a community to study why girls in one district leave school early, and acting on what is found." },
{ term: "Action research", def: "A practitioner studies a problem in their own setting through cycles of plan, act, observe and reflect, to improve practice.", ex: "A Grade 3 teacher tries peer reading for six weeks, collects reading logs, reflects, then adjusts." }
],
caribbean: { title: "Connecting to Miron (1998)", text: "Miron writes about research for education reform in the South, which includes us. The key message: quantitative and qualitative methods each have strengths and limits, neither is automatically better, and the choice should follow from the question you are asking and the context you are in. Often the strongest studies combine them." },
reading: [
{ cite: "Miron, G. (1998). Choosing the right research methods: Qualitative, quantitative, or both?", note: "The core reading for this station. Read it before you choose your approach." },
{ cite: "Creswell (2013), Chapter 1", note: "The four worldviews and how they connect to designs." }
],
activities: [
{ type: "sort", prompt: "Which worldview is speaking? Sort each statement.",
buckets: ["Post-positivist", "Constructivist", "Pragmatic", "Transformative"],
items: [
{ t: "\"I want to measure whether the new timetable improves test scores.\"", b: 0, why: "Measuring cause and effect with numbers: post-positivist." },
{ t: "\"I want to understand how deaf learners experience inclusive classrooms, in their own words.\"", b: 1, why: "Meaning from lived experience: constructivist." },
{ t: "\"I'll use whatever combination of survey and interview best answers my question.\"", b: 2, why: "Choosing by what works: pragmatic." },
{ t: "\"My study should help rural parents challenge unequal school funding.\"", b: 3, why: "Research aimed at changing power and inequality: transformative." },
{ t: "\"Results should generalise to all secondary schools in the region.\"", b: 0, why: "Generalisation from a sample: post-positivist." },
{ t: "\"Each teacher's story of migration is shaped by family, money and identity.\"", b: 1, why: "Multiple, context-bound realities: constructivist." }
] },
{ type: "mcq", prompt: "Choose the right approach.",
questions: [
{ q: "A ministry wants to know whether a reading reform raised scores across 200 schools, and why some schools struggled with it.", options: ["Quantitative only", "Qualitative only", "Mixed methods", "No research needed"], a: 2, why: "\"Whether\" asks for numbers across many schools. \"Why\" asks for depth. Together they call for mixed methods, as Miron suggests." },
{ q: "You are a teacher who wants to improve your own students' spelling over one term and study what happens.", options: ["Action research", "Ethnography", "Survey research", "Experimental research with 2,000 students"], a: 0, why: "Practitioner, own setting, improvement through cycles: action research." },
{ q: "According to Miron (1998), what should mainly drive your choice of method?", options: ["What your supervisor likes", "The research question and context", "Whatever is fastest", "Numbers are always more scientific"], a: 1, why: "The question and the context come first. Methods are tools chosen to fit them." }
] }
],
reflection: "Which worldview feels closest to how you see your own topic? Explain why, and say whether your study is leaning quantitative, qualitative, mixed or action research.",
resources: []
},
{
id: "s3", num: 3, name: "Craft Market", theme: "Topic, background and problem",
keepsake: "Woven Problem Basket",
bigIdea: "A topic is a market full of goods. A research problem is the one item you pick up, examine, and say: this needs fixing, and here is the evidence.",
feeds: "Section 1: Background, problem statement, significance, definitions",
concepts: [
{ term: "Topic vs. problem", def: "A topic is a broad area of interest. A research problem is a specific issue, gap or difficulty within that topic that needs to be studied.", ex: "Topic: reading. Problem: Grade 4 boys in one parish are reading two levels below their grade, and we do not know why." },
{ term: "Background and context", def: "The opening of your introduction. It sets the scene with facts, local data and recent developments so the reader understands why the problem exists.", ex: "National literacy results, recent policy changes, and what is happening in your school or region." },
{ term: "Problem statement", def: "A short, evidence-based argument: what the problem is, proof it exists, who is affected, what is missing in what we know, and what happens if it is not studied.", ex: "\"Despite three literacy initiatives since 2015, ... Little is known about ... This study therefore ...\"" },
{ term: "Narrowing the topic", def: "Funnel from broad to focused by adding a population, a place, a time and a specific issue. A focused problem is researchable.", ex: "Literacy → boys' literacy → reading motivation of Grade 4 boys → in three rural primary schools." },
{ term: "Significance", def: "Who will benefit from the study and how: learners, teachers, schools, policy makers, other researchers.", ex: "Findings could guide how teachers in small rural schools choose reading materials for boys." },
{ term: "Feasibility", def: "Can you actually do it with your time, access, money and skills, and can you do it ethically?", ex: "A national study of 10,000 students is not feasible for a single proposal. Two schools you can access may be." },
{ term: "Operational definitions", def: "Clear, measurable meanings for your key terms, so every reader knows exactly what you mean in this study.", ex: "\"Reading motivation\" is defined as the score on a 20-item reading motivation scale." }
],
caribbean: { title: "A Caribbean problem, not a borrowed one", text: "A strong problem statement uses local evidence: national examination results, ministry reports, school records, Caribbean studies. If your only evidence comes from the United States or the United Kingdom, ask whether the problem looks the same in your setting." },
reading: [
{ cite: "Creswell (2013), Chapter 6", note: "Writing the introduction and the problem." },
{ cite: "Walliman (2022), Chapter 3", note: "Finding and focusing a research problem." }
],
activities: [
{ type: "order", prompt: "Narrow the funnel. Tap from broadest to most focused.",
steps: ["Education", "Literacy", "Boys' literacy in primary schools", "Reading motivation among Grade 4 boys", "Reading motivation among Grade 4 boys in three rural primary schools in one parish"] },
{ type: "mcq", prompt: "Spot the strongest problem statement.",
questions: [
{ q: "Which is the best problem statement?", options: [
"Technology is very important in education today and all teachers should use it.",
"I have always loved using technology and want to research it.",
"Although most secondary teachers in the region received laptops by 2022, school reports show few use them in lessons, and no study has examined why. Without this knowledge, investment may be wasted.",
"This study is about technology." ], a: 2, why: "It names the issue, gives evidence, identifies a gap in knowledge and states the consequence." },
{ q: "\"Reading achievement\" in your study will be measured by scores on the school's end-of-term reading test. This is an example of:", options: ["A hypothesis", "An operational definition", "A limitation", "A literature review"], a: 1, why: "You have defined the term in a measurable way for this study." }
] }
],
reflection: "Write your topic in one sentence. Then narrow it twice. Finally, name one piece of local evidence that shows the problem exists.",
resources: []
},
{
id: "s4", num: 4, name: "Fisherman's Pier", theme: "Purpose, questions and hypotheses",
keepsake: "Cast Net of Questions",
bigIdea: "Your purpose is where you are fishing. Your research questions are the lines you cast. If the line is wrong, you catch nothing useful.",
feeds: "Section 1: Purpose statement and research questions or hypotheses",
concepts: [
{ term: "Purpose statement", def: "One or two sentences stating the intent of the study. Quantitative purposes name variables and their relationship. Qualitative purposes name a central phenomenon, participants and site.", ex: "Qual: \"The purpose of this case study is to explore how early-childhood teachers in two Kingston centres use play to support language.\"" },
{ term: "Quantitative research questions", def: "Ask about description, comparison or relationship between variables. They often begin with 'What is the relationship...', 'Is there a difference...', or 'To what extent...'.", ex: "\"Is there a difference in mathematics scores between students taught with and without manipulatives?\"" },
{ term: "Qualitative research questions", def: "A central question plus a few sub-questions. Open, beginning with 'How' or 'What', focused on experience and meaning. They can evolve.", ex: "\"How do parents in a fishing community describe their role in their children's schooling?\"" },
{ term: "Hypotheses", def: "Testable predictions in quantitative studies. The null hypothesis (H0) predicts no effect or no difference. The alternative (H1) predicts one.", ex: "H0: There is no difference in attendance between schools with and without breakfast programmes." },
{ term: "Variables", def: "The independent variable is the presumed cause or the thing you change. The dependent variable is the outcome you measure. Control variables are held steady.", ex: "In 'Daily read-alouds improve comprehension', read-alouds are independent and comprehension scores are dependent." },
{ term: "Alignment", def: "Problem, purpose, questions and methods must point in the same direction. A qualitative purpose with a 'to what extent' question is misaligned.", ex: "Problem about why teachers leave → purpose to explore reasons → 'How do teachers describe...' → interviews." }
],
caribbean: { title: "Questions with a Caribbean line", text: "Good questions name real people and places: Grade 9 students in technical high schools, parents in a fishing community, teachers who returned after working abroad. Specific questions catch specific answers." },
reading: [
{ cite: "Creswell (2013), Chapters 6 and 7", note: "Purpose statements, research questions and hypotheses." }
],
activities: [
{ type: "sort", prompt: "Quantitative or qualitative question?",
buckets: ["Quantitative", "Qualitative"],
items: [
{ t: "Is there a relationship between hours of sleep and CSEC English scores?", b: 0, why: "Relationship between two measurable variables." },
{ t: "How do novice teachers describe their first year in a rural school?", b: 1, why: "Open 'how', lived experience." },
{ t: "To what extent does homework completion differ between boys and girls in Grade 7?", b: 0, why: "Comparison of groups on a measurable outcome." },
{ t: "What meanings do Creole-dominant learners give to reading in Standard English?", b: 1, why: "Meaning-making in context." },
{ t: "What percentage of teachers use AI tools for lesson planning?", b: 0, why: "Descriptive question answered with numbers." },
{ t: "How do principals experience implementing a new school mobile phone policy?", b: 1, why: "Experience of a process." }
] },
{ type: "mcq", prompt: "Find the variables and fix the alignment.",
questions: [
{ q: "\"Students who receive daily read-aloud sessions will score higher on reading comprehension tests than those who do not.\" What is the dependent variable?", options: ["Daily read-aloud sessions", "Reading comprehension test scores", "The students", "The teacher"], a: 1, why: "The outcome being measured is comprehension scores." },
{ q: "Which is the null hypothesis for that study?", options: ["Read-alouds will increase scores", "There will be no difference in comprehension scores between students who receive daily read-alouds and those who do not", "Students enjoy read-alouds", "How do students feel about read-alouds?"], a: 1, why: "The null predicts no difference." },
{ q: "A study's purpose is 'to explore teachers' experiences of inclusion'. Which question fits?", options: ["Is there a significant difference in inclusion scores?", "How do teachers describe their experiences of including learners with disabilities?", "What is the mean inclusion score?", "Does training cause inclusion?"], a: 1, why: "An exploratory, experience-focused purpose needs an open qualitative question." }
] }
],
reflection: "Draft your purpose statement and one research question (or a hypothesis). Then check: do they point in the same direction as your problem?",
resources: []
},
{
id: "s5", num: 5, name: "Old Courthouse Library", theme: "Reviewing the literature",
keepsake: "Library Matrix Scroll",
bigIdea: "A literature review is not a list of book reports. It is a conversation among researchers, and you show where your study joins that conversation.",
feeds: "Section 2: Literature review and theoretical framework",
concepts: [
{ term: "Purpose of a literature review", def: "To show what is already known, how it was studied, where the gaps and disagreements are, and why your study is needed.", ex: "\"Studies in Barbados and Trinidad found ..., but none examined primary schools in Jamaica.\"" },
{ term: "Searching databases", def: "Use library databases (ERIC, JSTOR, EBSCO, Google Scholar, your university library) with keywords and Boolean operators: AND narrows, OR widens, NOT excludes.", ex: "\"reading motivation\" AND boys AND Caribbean" },
{ term: "Empirical vs. non-empirical", def: "An empirical source reports a study where the authors collected and analysed data. Non-empirical sources include opinion pieces, theory papers and policy statements.", ex: "Your review needs at least two-thirds empirical sources." },
{ term: "Peer review", def: "A journal article checked by other experts before publication. It is stronger evidence than a website or magazine.", ex: "Journal of Education and Development in the Caribbean is peer-reviewed." },
{ term: "Literature matrix", def: "A cross-analysis table: author and year, purpose, method, sample, findings, and gap. It lets you see patterns across sources before you write.", ex: "Columns across, one study per row. Patterns become your themes." },
{ term: "Synthesis vs. summary", def: "Summary describes one source at a time. Synthesis groups sources by theme, compares them and shows agreement, conflict and gaps.", ex: "\"Three studies (A, B, C) agree that ..., while D found the opposite in rural schools.\"" },
{ term: "Theoretical vs. conceptual framework", def: "A theoretical framework is an established theory that explains your problem. A conceptual framework is your own map of how the key concepts in your study connect.", ex: "Theory: Vygotsky's sociocultural theory. Concept map: home literacy → motivation → reading scores." },
{ term: "APA 7th edition", def: "The referencing style for your proposal: author-date in-text citations and a matching, alphabetical reference list.", ex: "(Miron, 1998) in the text, and the full reference at the end." }
],
caribbean: { title: "Look for Caribbean voices first", text: "Search for Caribbean scholarship before you rely on overseas studies. If you cannot find local research on your problem, that absence may be the gap your study fills. Say so clearly." },
reading: [
{ cite: "Creswell (2013), Chapter 2", note: "Reviewing the literature and literature maps." },
{ cite: "Onwuegbuzie, Leech & Collins (2012)", note: "Qualitative techniques for analysing and synthesising the literature." }
],
activities: [
{ type: "sort", prompt: "Empirical or non-empirical source?",
buckets: ["Empirical", "Non-empirical"],
items: [
{ t: "A study that surveyed 412 Jamaican secondary teachers about burnout.", b: 0, why: "Data collected and analysed by the authors." },
{ t: "An editorial arguing for more technology in schools.", b: 1, why: "Argument without data collection." },
{ t: "A case study of two Trinidad schools using interviews and observations.", b: 0, why: "Qualitative data collected and analysed." },
{ t: "A ministry policy document setting out a new curriculum.", b: 1, why: "Policy statement, not a study." },
{ t: "A paper explaining Freire's theory of critical literacy.", b: 1, why: "Theoretical discussion." },
{ t: "An experiment comparing two reading programmes in 12 classrooms.", b: 0, why: "Planned data collection and comparison." }
] },
{ type: "mcq", prompt: "Search smart and write like a scholar.",
questions: [
{ q: "Which search will give you the MOST results?", options: ["literacy AND Caribbean AND boys", "literacy OR reading OR biliteracy", "literacy NOT adult", "\"reading motivation of boys in Jamaica\""], a: 1, why: "OR widens the search to include any of the terms." },
{ q: "Which sentence shows synthesis?", options: [
"Smith (2019) studied teachers. Then Brown (2020) studied students.",
"Smith (2019), Brown (2020) and Grant (2021) all found that feedback improved writing, although Grant's rural sample showed smaller gains.",
"I think feedback is important.",
"Feedback is defined in the dictionary as a response." ], a: 1, why: "It groups sources, compares them and notes a difference." },
{ q: "Correct APA 7 in-text citation for one author:", options: ["(Miron 1998, UNESCO)", "(G. Miron)", "(Miron, 1998)", "[Miron - 1998]"], a: 2, why: "Author surname, comma, year." }
] }
],
reflection: "Name two sources you have found for your topic. Are they empirical? What theme connects them, and what gap do you see?",
resources: []
},
{
id: "s6", num: 6, name: "Boatyard", theme: "Research design and sampling",
keepsake: "Boat-Builder's Plan",
bigIdea: "The design is the boat that carries your study. A canoe and a cargo ship are both good boats, for different voyages. Choose the design that fits your question.",
feeds: "Section 3: Research design, participants and sampling",
concepts: [
{ term: "Research design", def: "The overall plan for answering your question: what type of study, with whom, where, and how data will be gathered and analysed.", ex: "\"This study will use a qualitative case study design.\"" },
{ term: "Quantitative designs", def: "Experimental and quasi-experimental (test an intervention), correlational (relationships between variables) and survey or descriptive (describe trends in a population).", ex: "Quasi-experimental: two intact Grade 5 classes, one uses a new maths app, one does not." },
{ term: "Qualitative designs", def: "Case study (a bounded case in depth), phenomenology (lived experience), ethnography (culture of a group), narrative (life stories), grounded theory (build a theory from data).", ex: "Phenomenology: the lived experience of teachers returning home after working abroad." },
{ term: "Mixed methods designs", def: "Convergent (collect both at once and compare), explanatory sequential (numbers first, then interviews to explain), exploratory sequential (interviews first, then build a survey).", ex: "Survey 150 students on online learning, then interview 10 with the lowest scores." },
{ term: "Population and sample", def: "The population is the whole group you want to know about. The sample is the part you actually study.", ex: "Population: all Grade 6 teachers in a region. Sample: 60 of them." },
{ term: "Probability sampling", def: "Everyone has a known chance of selection, which supports generalisation. Types: simple random, stratified, cluster.", ex: "Stratified: randomly select urban and rural schools in proportion to their numbers." },
{ term: "Non-probability sampling", def: "Participants are chosen for a reason, not by chance. Types: purposive, convenience, snowball. Common in qualitative studies.", ex: "Purposive: choose six principals who have led schools through a hurricane recovery." },
{ term: "Sample size logic", def: "Quantitative studies need enough people to represent the population. Qualitative studies need enough depth, and stop when new data adds nothing new (saturation).", ex: "300 survey responses vs. 8 rich interviews: both can be right." }
],
caribbean: { title: "Miron again: fit the boat to the sea", text: "Small island systems have small populations. A national random sample may be possible in one territory and impossible in another. Miron's advice applies: let your question and your real context decide the design, then defend that choice in your methods section." },
reading: [
{ cite: "Creswell (2013), Chapters 8 to 10", note: "Quantitative, qualitative and mixed methods procedures." },
{ cite: "Miron (1998)", note: "Strengths and limitations of each approach." }
],
activities: [
{ type: "mcq", prompt: "Choose the right boat for each voyage.",
questions: [
{ q: "You want to test whether a new phonics programme improves reading scores, using two existing classes.", options: ["Quasi-experimental", "Ethnography", "Narrative", "Grounded theory"], a: 0, why: "Intervention vs. comparison with intact (not random) groups." },
{ q: "You want to understand the daily culture of a rural basic school over a full term.", options: ["Correlational", "Ethnography", "Survey", "Experimental"], a: 1, why: "Studying the culture of a group through extended observation." },
{ q: "You want to know whether time spent on social media is related to GPA among university students.", options: ["Phenomenology", "Case study", "Correlational", "Action research"], a: 2, why: "Relationship between two measured variables." },
{ q: "You survey 200 teachers, then interview 12 of them to explain surprising results.", options: ["Convergent", "Explanatory sequential", "Exploratory sequential", "Narrative"], a: 1, why: "Numbers first, then words to explain them." }
] },
{ type: "sort", prompt: "Probability or non-probability sampling?",
buckets: ["Probability", "Non-probability"],
items: [
{ t: "Drawing 50 names at random from a list of all teachers in the region.", b: 0, why: "Simple random sampling." },
{ t: "Interviewing the colleagues on your staff who agree to take part.", b: 1, why: "Convenience sampling." },
{ t: "Choosing six principals who led schools after a hurricane.", b: 1, why: "Purposive sampling." },
{ t: "Randomly selecting schools in proportion from urban and rural strata.", b: 0, why: "Stratified random sampling." },
{ t: "Asking each participant to refer another teacher who returned from abroad.", b: 1, why: "Snowball sampling." }
] }
],
reflection: "Which design fits your research question, and why? Name your population, your sample and your sampling technique. Use Miron's idea of fit in your answer.",
resources: []
},
{
id: "s7", num: 7, name: "Lighthouse", theme: "Research ethics",
keepsake: "Lighthouse Lantern",
bigIdea: "Ethics is the lighthouse. It keeps every person in your study safe, and it keeps your study from running aground. It belongs in every section, not just one paragraph at the end.",
feeds: "Section 3: Ethical considerations, and your appendices",
concepts: [
{ term: "Informed consent", def: "Participants agree to take part after being told the purpose, what they will do, risks, benefits, and that they may withdraw at any time without penalty.", ex: "A signed consent form attached as an appendix." },
{ term: "Minors: consent and assent", def: "Children cannot give legal consent. You need a parent or guardian's consent and the child's own agreement (assent) in language they understand.", ex: "A short, child-friendly assent script read aloud before a reading test." },
{ term: "Anonymity", def: "Even the researcher cannot link the data to a person. Usually only possible with anonymous surveys.", ex: "An online questionnaire that collects no names or email addresses." },
{ term: "Confidentiality", def: "The researcher knows who said what but protects identities, using pseudonyms and secure storage. Interviews are confidential, not anonymous.", ex: "\"Teacher A\" instead of a name, and recordings stored on a password-protected drive." },
{ term: "Do no harm", def: "Minimise physical, emotional, social and professional risk. Think about how questions may upset people or expose them.", ex: "Questions about home life can distress children. Have support in place." },
{ term: "Power and insider research", def: "When you study your own students or staff, they may feel they cannot say no. Reduce pressure and say how in your proposal.", ex: "A colleague, not the class teacher, collects consent forms." },
{ term: "Permissions and approval", def: "You need approval from the university's research ethics committee, plus gatekeeper permission from schools, boards or the ministry where required.", ex: "A letter of permission from the principal in your appendices." },
{ term: "Data protection and integrity", def: "Store data securely, keep it only as long as needed, follow data protection law, report honestly, and acknowledge all sources and any AI assistance.", ex: "Jamaica's Data Protection Act (2020) applies to personal data you collect." }
],
caribbean: { title: "Small places, big ethics", text: "In small Caribbean communities, people are easy to identify. 'A principal of a small rural school in the west' may point to one person. Disguise details carefully, and think about who could recognise your participants." },
reading: [
{ cite: "Creswell (2013), Chapter 4", note: "Ethical issues across the research process." }
],
activities: [
{ type: "sort", prompt: "Anonymity or confidentiality?",
buckets: ["Anonymity", "Confidentiality"],
items: [
{ t: "An online survey that collects no names, emails or school names.", b: 0, why: "No one, including you, can identify the respondent." },
{ t: "Face-to-face interviews where you use pseudonyms in the report.", b: 1, why: "You know who they are but protect their identity." },
{ t: "A focus group where you agree not to share what was said with the principal.", b: 1, why: "Identities known, protected." },
{ t: "Paper questionnaires dropped in a sealed box with no identifying details.", b: 0, why: "Responses cannot be traced." }
] },
{ type: "mcq", prompt: "Steer clear of the rocks.",
questions: [
{ q: "You want to interview your own Grade 10 students about their grades. What is the main ethical concern?", options: ["The interviews will be too long", "Students may feel pressured to take part or to give answers that please you", "Students are too old to interview", "There is no concern"], a: 1, why: "Your power as their teacher. Plan how to reduce pressure." },
{ q: "Participants under 18 need:", options: ["Only their own signature", "Only the principal's permission", "Parental consent plus the child's assent", "Nothing if the study is short"], a: 2, why: "Both the guardian's consent and the child's own agreement." },
{ q: "Where should ethics appear in your proposal?", options: ["Only in one sentence at the end", "In the methods section, with consent forms and permission letters in the appendices", "Ethics is not part of a proposal", "Only in the references"], a: 1, why: "A clear ethics section in methods, supported by appendices." }
] }
],
reflection: "What is the biggest ethical risk in your study? Explain how you will handle consent, confidentiality or anonymity, power, and data storage.",
resources: []
},
{
id: "s8", num: 8, name: "Cookshop", theme: "Data collection and data quality",
keepsake: "Recipe Book of Instruments",
bigIdea: "Instruments are your pots and ingredients. If the recipe is not tested and the ingredients are poor, the meal fails no matter how good the cook is.",
feeds: "Section 3: Instruments, procedures, validity, reliability, trustworthiness",
concepts: [
{ term: "Quantitative instruments", def: "Questionnaires (often with Likert scales), tests, structured observation checklists and existing records such as attendance or exam data.", ex: "A 5-point scale from Strongly Disagree to Strongly Agree." },
{ term: "Qualitative techniques", def: "Semi-structured interviews, focus groups, observation with field notes, documents, photographs and artefacts. Each needs a protocol.", ex: "An interview guide with 8 open questions and follow-up probes." },
{ term: "Validity", def: "Does the instrument measure what it claims to measure? Check content (covers the topic), construct (matches the concept) and face validity (looks right to experts).", ex: "Ask two literacy specialists to review your reading survey." },
{ term: "Reliability", def: "Does it give consistent results? Check with a pilot, test-retest, or internal consistency (Cronbach's alpha, usually 0.70 or higher).", ex: "Pilot the questionnaire with 15 teachers from a school not in your sample." },
{ term: "Trustworthiness", def: "The qualitative partner of validity and reliability: credibility, transferability, dependability and confirmability (Lincoln and Guba).", ex: "Member checking: participants review your summary of their interview." },
{ term: "Pilot study", def: "A small trial run of your instruments and procedures before the main study, to fix confusing questions and timing.", ex: "Two practice interviews show that one question is leading, so you reword it." },
{ term: "Objectivity, subjectivity and reflexivity", def: "Quantitative writing aims for distance and objectivity. Qualitative writing acknowledges the researcher's position and reflects on how it shapes the study.", ex: "\"As a teacher in this community for 15 years, I bring ...\"" }
],
caribbean: { title: "Season the instrument for the setting", text: "An instrument built in another country may not fit here. Check words and examples: does 'grade school' or 'semester' make sense to your participants? Will a Creole-dominant child understand the item? Adapt, then pilot." },
reading: [
{ cite: "Walliman (2022), Chapters 6 to 10", note: "Data, variables, data quality and collection methods." },
{ cite: "Creswell (2013), Chapters 8 and 9", note: "Instruments, validity, reliability and qualitative procedures." }
],
activities: [
{ type: "sort", prompt: "Which tradition does each quality term belong to?",
buckets: ["Quantitative quality", "Qualitative quality"],
items: [
{ t: "Cronbach's alpha of 0.82", b: 0, why: "Internal consistency reliability." },
{ t: "Member checking", b: 1, why: "Supports credibility." },
{ t: "Test-retest reliability", b: 0, why: "Consistency over time." },
{ t: "Thick description for transferability", b: 1, why: "Lets readers judge fit to their context." },
{ t: "Audit trail", b: 1, why: "Supports dependability and confirmability." },
{ t: "Construct validity", b: 0, why: "Does the scale measure the concept?" }
] },
{ type: "mcq", prompt: "Pick the right pot for the dish.",
questions: [
{ q: "Question: 'How do parents in a fishing community describe their role in schooling?' Best instrument:", options: ["A 40-item Likert questionnaire", "Semi-structured interviews", "A standardised test", "Attendance records"], a: 1, why: "An open 'how describe' question needs rich words." },
{ q: "Question: 'What percentage of teachers use AI for planning?' Best instrument:", options: ["Focus group", "Life-story interview", "Questionnaire", "Ethnography"], a: 2, why: "Many respondents, a countable answer." },
{ q: "Two practice interviews before your main study are called:", options: ["Triangulation", "A pilot", "Saturation", "Coding"], a: 1, why: "A pilot tests your instruments first." }
] }
],
reflection: "List the instrument or instruments you will use. How will you check validity and reliability, or trustworthiness? Who will you pilot with?",
resources: []
},
{
id: "s9", num: 9, name: "Coffee Sorting Shed", theme: "Analysing data",
keepsake: "Coffee-Grader's Scale",
bigIdea: "At the coffee works, beans are sorted, graded and weighed before anyone tastes a cup. Analysis is the same: you sort and grade your data before you say what it means.",
feeds: "Section 3: Data analysis procedures",
concepts: [
{ term: "Levels of measurement", def: "Nominal (categories: school type), ordinal (ranked: Likert agreement), interval (equal steps, no true zero: temperature) and ratio (true zero: test score, age).", ex: "Gender is nominal. Exam score out of 100 is ratio." },
{ term: "Descriptive statistics", def: "Summarise your data: frequencies and percentages, mean, median, mode, range and standard deviation.", ex: "\"The mean reading score was 62.4 (SD = 8.1).\"" },
{ term: "Inferential statistics", def: "Use a sample to draw conclusions about a population. t-test (compare 2 groups), ANOVA (3 or more groups), correlation (relationship), chi-square (categories).", ex: "A t-test comparing boys' and girls' scores." },
{ term: "Statistical significance", def: "A p-value below 0.05 usually means the result is unlikely to be due to chance alone. It does not tell you the result is large or important.", ex: "p = .03 is significant at the .05 level." },
{ term: "Coding", def: "Labelling chunks of qualitative data with short words or phrases that capture meaning. First open codes, then grouped into categories.", ex: "\"I had no books at home\" → code: limited home resources." },
{ term: "Thematic analysis", def: "Familiarise, generate codes, search for themes, review themes, define and name them, then write up (Braun and Clarke).", ex: "Theme: 'Reading as a shame zone' built from five related codes." },
{ term: "Match analysis to question", def: "The kind of question decides the analysis. Description → descriptives. Comparison → t-test or ANOVA. Relationship → correlation. Experience → thematic analysis.", ex: "If your RQ asks 'how', a t-test cannot answer it." }
],
caribbean: { title: "Grading Blue Mountain beans", text: "Coffee graders do not judge a harvest by one bean. They sort, sample and grade carefully. Likewise, do not build a finding on one quote or one striking number. Look for patterns across the data." },
reading: [
{ cite: "Walliman (2022), Chapters 7 to 10", note: "Quantitative and qualitative analysis." },
{ cite: "Creswell (2013), Chapters 8 and 9", note: "Analysis plans in the methods section." }
],
activities: [
{ type: "calc", prompt: "Weigh the beans. Five students scored 12, 15, 15, 18 and 20 on a reading quiz. Calculate:",
fields: [ { label: "Mean", answer: 16, tol: 0.05 }, { label: "Median", answer: 15, tol: 0 }, { label: "Mode", answer: 15, tol: 0 }, { label: "Range", answer: 8, tol: 0 } ],
why: "Mean = 80 ÷ 5 = 16. Median = middle value, 15. Mode = most frequent, 15. Range = 20 − 12 = 8." },
{ type: "mcq", prompt: "Match the analysis to the question.",
questions: [
{ q: "Is there a difference in mathematics scores between students in single-sex and co-educational schools?", options: ["Independent samples t-test", "Thematic analysis", "Chi-square only", "No analysis"], a: 0, why: "Comparing the mean scores of two groups." },
{ q: "What is the relationship between hours of reading at home and comprehension scores?", options: ["ANOVA", "Correlation", "Coding", "Mode"], a: 1, why: "A relationship between two continuous variables." },
{ q: "How do teachers experience mentoring in their first year?", options: ["t-test", "Correlation", "Thematic analysis", "Standard deviation"], a: 2, why: "An experience question with interview data." },
{ q: "\"Agree / Neutral / Disagree\" responses are which level of measurement?", options: ["Nominal", "Ordinal", "Ratio", "Interval"], a: 1, why: "Ordered categories without equal distances." }
] }
],
reflection: "Describe how you will analyse your data, step by step. Show how your analysis answers each research question.",
resources: []
},
{
id: "s10", num: 10, name: "Proposal Pavilion", theme: "Writing and aligning the proposal",
keepsake: "Research Passport, fully stamped",
bigIdea: "Everything you gathered in the village comes together here. A proposal is strong when every part lines up, from title to methods, like boats moored in a straight row.",
feeds: "Your full research proposal",
concepts: [
{ term: "Parts of the proposal", def: "Title; Section 1 Introduction (background, problem, purpose, questions, significance, definitions); Section 2 Literature review; Section 3 Methods (design, participants, instruments, procedures, analysis, ethics); References; Appendices.", ex: "Use this order as your checklist." },
{ term: "The alignment chain", def: "Title → problem → purpose → research questions → design → sample → instruments → analysis. Each link must connect to the next.", ex: "A 'how do teachers experience' question cannot be answered by a test and a t-test." },
{ term: "Proposal tense", def: "A proposal describes a plan, so the methods are written in the future tense.", ex: "\"Data will be collected through ...\"" },
{ term: "Academic voice", def: "Clear, precise, evidence-backed and cautious. Use hedging where appropriate: 'suggests', 'may', 'indicates'. Avoid slang and unsupported claims.", ex: "Not 'Everyone knows boys hate reading.' Instead: 'Recent data suggest a gap in boys' reading motivation (Author, Year).'" },
{ term: "Citing and referencing", def: "Every claim from another source is cited in APA 7, and every citation appears in the reference list. Aim for at least 12 scholarly references.", ex: "Cross-check your in-text citations against your list before submitting." },
{ term: "Appendices", def: "Supporting documents placed at the end: consent and assent forms, permission letters, instruments, interview guides, timelines.", ex: "Appendix A: Parent consent form. Appendix B: Interview guide." }
],
caribbean: { title: "From the word to the proposal", text: "You arrived with a question. You now carry a worldview, a focused problem, aligned questions, a literature map, a design, an ethical plan, instruments and an analysis plan. Build your blueprint below, then take it into your full proposal." },
reading: [
{ cite: "Walliman (2022), Chapter 11", note: "Writing up." },
{ cite: "APA (2020). Publication Manual, 7th ed.", note: "Formatting, citations and references." }
],
activities: [
{ type: "mcq", prompt: "Alignment detective: find the broken link.",
questions: [
{ q: "Problem: teachers are leaving rural schools and we do not know why. Purpose: to explore reasons teachers leave. RQ: 'How do teachers describe their reasons for leaving?' Method: a test of teaching knowledge with a t-test. Which link is broken?", options: ["The problem", "The purpose", "The research question", "The method"], a: 3, why: "An exploratory 'how describe' question needs interviews and thematic analysis, not a test and t-test." },
{ q: "Title: 'The relationship between attendance and CSEC results'. RQ: 'How do students feel about attendance?' What is wrong?", options: ["Nothing", "The RQ is qualitative but the title promises a quantitative relationship", "The title is too short", "Attendance cannot be studied"], a: 1, why: "The title and the RQ point in different directions." },
{ q: "Which sentence is written correctly for a proposal's methods section?", options: ["Data was collected from 50 teachers.", "Data will be collected from 50 teachers through a questionnaire.", "I collected data yesterday.", "We might maybe collect some data."], a: 1, why: "Future tense, specific and clear." }
] }
],
reflection: "Look at your blueprint. Which link in your alignment chain is strongest, and which still needs work? What will you do next?",
resources: [],
final: true
}
];
