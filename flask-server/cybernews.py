from flask import Flask, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from langchain_google_genai import ChatGoogleGenerativeAI
from crewai import Agent, Task, Crew
from langchain_community.tools import DuckDuckGoSearchRun
from flask_caching import Cache
from flask_cors import CORS 




app = Flask(__name__)

# Set up your langchain_google_genai model
llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    verbose=True,
    temperature=0.6,
    google_api_key="AIzaSyDREFwVhqxVObm6zeRCYrheoYRh2Q4y1fc"
)
cache = Cache(app)
CORS(app)


# Define your agents with roles, goals, and other attributes
search_tool = DuckDuckGoSearchRun()

researcher = Agent(
    role='security assistant that scripts the web',
    goal='A security assistant plays a supportive role in ensuring the safety and security of an organization by providing solutions and detecting threats',
    backstory="""You work at a leading tech think tank.
  Your expertise lies in identifying emerging trends.
  You have a knack for dissecting complex data and presenting
  actionable insights.""",
    verbose=True,
    allow_delegation=False,
    llm=llm,
    tools=[search_tool]
)

writer = Agent(
    role='Tech Content Strategist',
    goal='Craft compelling content on tech advancements',
    backstory="""You are a renowned Content Strategist, known for
  your insightful and engaging articles.
  You transform complex concepts into compelling narratives.""",
    verbose=True,
    allow_delegation=False,
    llm=llm,
    tools=[]
)

# Create tasks for your agents
task1 = Task(
    description="""Conduct a comprehensive latest 10 security attacks in 2024.
  Identify key trends, breakthrough technologies, and potential industry impacts.
  Your final answer MUST be a full security report""",
    expected_output="",  # Placeholder for expected_output
    agent=researcher
)

task2 = Task(
    description="""Using the insights provided, develop an engaging blog
  post that highlights the most significant security advancements.
  Your post should be informative yet accessible, catering to a tech-savvy audience.
  Make it sound cool, avoid complex words so it doesn't sound like AI.
  Your final answer MUST be the full blog post of at least 6 short paragraphs.""",
    expected_output="",  # Placeholder for expected_output
    agent=writer
)

# Instantiate your crew with the defined agents and tasks
crew = Crew(
    agents=[researcher, writer],
    tasks=[task1, task2],
    verbose=2
)

# Function to generate daily update
def generate_daily_update():
    result = crew.kickoff()
    return result

# Schedule the daily update task
scheduler = BackgroundScheduler()
scheduler.add_job(generate_daily_update, 'cron', hour=8)  # Run daily at 8 AM
scheduler.start()

# Define route to fetch the daily update
@app.route('/daily-update', methods=['GET'])
def get_daily_update():
    daily_update = generate_daily_update()
    return jsonify({'daily_update': daily_update})

if __name__ == '__main__':
    app.run(debug=True, port=8080) 
    cache.clear()
from flask import Flask, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from langchain_google_genai import ChatGoogleGenerativeAI
from crewai import Agent, Task, Crew
from langchain_community.tools import DuckDuckGoSearchRun
from flask_caching import Cache
from flask_cors import CORS 




app = Flask(__name__)

# Set up your langchain_google_genai model
llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    verbose=True,
    temperature=0.6,
    google_api_key="AIzaSyDREFwVhqxVObm6zeRCYrheoYRh2Q4y1fc"
)
cache = Cache(app)
CORS(app)


# Define your agents with roles, goals, and other attributes
search_tool = DuckDuckGoSearchRun()

researcher = Agent(
    role='security assistant that scripts the web',
    goal='A security assistant plays a supportive role in ensuring the safety and security of an organization by providing solutions and detecting threats',
    backstory="""You work at a leading tech think tank.
  Your expertise lies in identifying emerging trends.
  You have a knack for dissecting complex data and presenting
  actionable insights.""",
    verbose=True,
    allow_delegation=False,
    llm=llm,
    tools=[search_tool]
)

writer = Agent(
    role='Tech Content Strategist',
    goal='Craft compelling content on tech advancements',
    backstory="""You are a renowned Content Strategist, known for
  your insightful and engaging articles.
  You transform complex concepts into compelling narratives.""",
    verbose=True,
    allow_delegation=False,
    llm=llm,
    tools=[]
)

# Create tasks for your agents
task1 = Task(
    description="""Conduct a comprehensive latest 10 security attacks in 2024.
  Identify key trends, breakthrough technologies, and potential industry impacts.
  Your final answer MUST be a full security report""",
    expected_output="",  # Placeholder for expected_output
    agent=researcher
)

task2 = Task(
    description="""Using the insights provided, develop an engaging blog
  post that highlights the most significant security advancements.
  Your post should be informative yet accessible, catering to a tech-savvy audience.
  Make it sound cool, avoid complex words so it doesn't sound like AI.
  Your final answer MUST be the full blog post of at least 6 short paragraphs.""",
    expected_output="",  # Placeholder for expected_output
    agent=writer
)

# Instantiate your crew with the defined agents and tasks
crew = Crew(
    agents=[researcher, writer],
    tasks=[task1, task2],
    verbose=2
)

# Function to generate daily update
def generate_daily_update():
    result = crew.kickoff()
    return result

# Schedule the daily update task
scheduler = BackgroundScheduler()
scheduler.add_job(generate_daily_update, 'cron', hour=8)  # Run daily at 8 AM
scheduler.start()

# Define route to fetch the daily update
@app.route('/daily-update', methods=['GET'])
def get_daily_update():
    daily_update = generate_daily_update()
    return jsonify({'daily_update': daily_update})

if __name__ == '__main__':
    app.run(debug=True, port=8080) 
    cache.clear()