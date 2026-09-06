import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {

  // =========================================================
  // QUIZ STATE
  // =========================================================

  currentQuestion = 0;
  score = 0;

  selectedCategory = '';

  quizStarted = false;
  quizFinished = false;
  timeUp = false;

  // =========================================================
  // CATEGORIES
  // =========================================================

  categories = [
    '💻 Programming',
    '🤖 Artificial Intelligence',
    '🌐 Web Development',
    '🧠 General Knowledge',
    '🔬 Science & Technology'
  ];

  // =========================================================
  // TIMER
  // =========================================================

  timeLeft = signal(30);

  private timer: any;

  // =========================================================
  // PROGRAMMING QUESTIONS
  // =========================================================

  programmingQuestions = [
    {
      question: 'Which programming language is known for its simplicity and readability?',
      options: ['Java', 'Python', 'C++', 'JavaScript'],
      answer: 'Python'
    },
    {
      question: 'Which data structure follows the LIFO principle?',
      options: ['Queue', 'Stack', 'Array', 'Tree'],
      answer: 'Stack'
    },
    {
      question: 'Which keyword is used to declare a constant in JavaScript?',
      options: ['var', 'let', 'const', 'static'],
      answer: 'const'
    },
    {
      question: 'What does OOP stand for?',
      options: [
        'Object-Oriented Programming',
        'Online Object Processing',
        'Object Operation Program',
        'Ordered Output Processing'
      ],
      answer: 'Object-Oriented Programming'
    },
    {
      question: 'Which data structure follows the FIFO principle?',
      options: ['Stack', 'Queue', 'Tree', 'Graph'],
      answer: 'Queue'
    },
    {
      question: 'Which language is commonly used to query relational databases?',
      options: ['SQL', 'Python', 'CSS', 'HTML'],
      answer: 'SQL'
    },
    {
      question: 'What does IDE stand for?',
      options: [
        'Integrated Development Environment',
        'Internet Development Engine',
        'Internal Data Editor',
        'Integrated Design Element'
      ],
      answer: 'Integrated Development Environment'
    },
    {
      question: 'Which of these is a version control system?',
      options: ['Git', 'MongoDB', 'Angular', 'Node.js'],
      answer: 'Git'
    },
    {
      question: 'Which keyword is used to define a function in JavaScript?',
      options: ['function', 'define', 'method', 'func'],
      answer: 'function'
    },
    {
      question: 'Which language is primarily used for Android development today?',
      options: ['Kotlin', 'HTML', 'CSS', 'SQL'],
      answer: 'Kotlin'
    }
  ];

  // =========================================================
  // ARTIFICIAL INTELLIGENCE QUESTIONS
  // =========================================================

  artificialIntelligenceQuestions = [
    {
      question: 'What does AI stand for?',
      options: [
        'Artificial Intelligence',
        'Automated Internet',
        'Advanced Information',
        'Automated Intelligence'
      ],
      answer: 'Artificial Intelligence'
    },
    {
      question: 'Which technology allows machines to learn from data?',
      options: [
        'Machine Learning',
        'Cloud Computing',
        'Web Design',
        'Networking'
      ],
      answer: 'Machine Learning'
    },
    {
      question: 'What does ML stand for?',
      options: [
        'Machine Learning',
        'Modern Language',
        'Machine Logic',
        'Multiple Learning'
      ],
      answer: 'Machine Learning'
    },
    {
      question: 'Which of these is an example of generative AI?',
      options: [
        'ChatGPT',
        'Calculator',
        'File Explorer',
        'Notepad'
      ],
      answer: 'ChatGPT'
    },
    {
      question: 'What is the main purpose of a neural network?',
      options: [
        'Learn patterns from data',
        'Store files',
        'Create websites',
        'Manage databases'
      ],
      answer: 'Learn patterns from data'
    },
    {
      question: 'Which field focuses on enabling computers to understand human language?',
      options: [
        'Natural Language Processing',
        'Computer Graphics',
        'Cybersecurity',
        'Networking'
      ],
      answer: 'Natural Language Processing'
    },
    {
      question: 'What is computer vision mainly concerned with?',
      options: [
        'Understanding images and videos',
        'Writing programs',
        'Managing servers',
        'Creating databases'
      ],
      answer: 'Understanding images and videos'
    },
    {
      question: 'Which type of learning uses labelled data?',
      options: [
        'Supervised Learning',
        'Unsupervised Learning',
        'Reinforcement Learning',
        'Random Learning'
      ],
      answer: 'Supervised Learning'
    },
    {
      question: 'Which learning method uses rewards and penalties?',
      options: [
        'Reinforcement Learning',
        'Supervised Learning',
        'Unsupervised Learning',
        'Static Learning'
      ],
      answer: 'Reinforcement Learning'
    },
    {
      question: 'What is a chatbot designed to do?',
      options: [
        'Interact with users through conversation',
        'Only store files',
        'Only edit images',
        'Only calculate numbers'
      ],
      answer: 'Interact with users through conversation'
    }
  ];

  // =========================================================
  // WEB DEVELOPMENT QUESTIONS
  // =========================================================

  webDevelopmentQuestions = [
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Hyperlink Text Management Language',
        'Home Tool Markup Language'
      ],
      answer: 'Hyper Text Markup Language'
    },
    {
      question: 'Which language is mainly used for styling web pages?',
      options: ['Python', 'CSS', 'Java', 'C++'],
      answer: 'CSS'
    },
    {
      question: 'Which language is used to add interactivity to web pages?',
      options: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      answer: 'JavaScript'
    },
    {
      question: 'Which HTML tag is used to create a hyperlink?',
      options: ['<a>', '<link>', '<href>', '<url>'],
      answer: '<a>'
    },
    {
      question: 'Which CSS property changes the text color?',
      options: ['color', 'font', 'text-color', 'background'],
      answer: 'color'
    },
    {
      question: 'Which technology is used to structure web pages?',
      options: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
      answer: 'HTML'
    },
    {
      question: 'Which technology is used to make web pages responsive and interactive?',
      options: ['JavaScript', 'SQL', 'MongoDB', 'Git'],
      answer: 'JavaScript'
    },
    {
      question: 'What does CSS stand for?',
      options: [
        'Cascading Style Sheets',
        'Computer Style System',
        'Creative Styling System',
        'Coded Style Sheets'
      ],
      answer: 'Cascading Style Sheets'
    },
    {
      question: 'Which HTTP method is commonly used to retrieve data?',
      options: ['GET', 'POST', 'DELETE', 'PATCH'],
      answer: 'GET'
    },
    {
      question: 'Which technology is commonly used to build single-page applications?',
      options: ['Angular', 'MySQL', 'Git', 'Photoshop'],
      answer: 'Angular'
    }
  ];

  // =========================================================
  // GENERAL KNOWLEDGE QUESTIONS
  // =========================================================

  generalKnowledgeQuestions = [
    {
      question: 'What is the capital of India?',
      options: ['Mumbai', 'New Delhi', 'Hyderabad', 'Chennai'],
      answer: 'New Delhi'
    },
    {
      question: 'Which is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Jupiter'
    },
    {
      question: 'Who is known as the Father of the Indian Constitution?',
      options: [
        'Mahatma Gandhi',
        'Dr. B. R. Ambedkar',
        'Jawaharlal Nehru',
        'Sardar Patel'
      ],
      answer: 'Dr. B. R. Ambedkar'
    },
    {
      question: 'How many continents are there in the world?',
      options: ['5', '6', '7', '8'],
      answer: '7'
    },
    {
      question: 'Which is the largest ocean on Earth?',
      options: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Pacific Ocean',
        'Arctic Ocean'
      ],
      answer: 'Pacific Ocean'
    },
    {
      question: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'Japan', 'India', 'Thailand'],
      answer: 'Japan'
    },
    {
      question: 'How many days are there in a leap year?',
      options: ['365', '366', '364', '367'],
      answer: '366'
    },
    {
      question: 'Which is the fastest land animal?',
      options: ['Lion', 'Cheetah', 'Tiger', 'Horse'],
      answer: 'Cheetah'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
      answer: 'Mars'
    },
    {
      question: 'What is the national animal of India?',
      options: ['Lion', 'Elephant', 'Bengal Tiger', 'Peacock'],
      answer: 'Bengal Tiger'
    }
  ];

  // =========================================================
  // SCIENCE & TECHNOLOGY QUESTIONS
  // =========================================================

  scienceTechnologyQuestions = [
    {
      question: 'What is the chemical formula for water?',
      options: ['CO2', 'H2O', 'O2', 'NaCl'],
      answer: 'H2O'
    },
    {
      question: 'Which gas do humans need to breathe?',
      options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
      answer: 'Oxygen'
    },
    {
      question: 'What is the closest star to Earth?',
      options: ['Sirius', 'The Sun', 'Polaris', 'Alpha Centauri'],
      answer: 'The Sun'
    },
    {
      question: 'What force keeps planets in orbit around the Sun?',
      options: ['Magnetism', 'Gravity', 'Friction', 'Electricity'],
      answer: 'Gravity'
    },
    {
      question: 'Which organ pumps blood throughout the human body?',
      options: ['Brain', 'Liver', 'Heart', 'Lung'],
      answer: 'Heart'
    },
    {
      question: 'What does DNA stand for?',
      options: [
        'Deoxyribonucleic Acid',
        'Dynamic Nuclear Acid',
        'Digital Nucleic Arrangement',
        'Deoxygenated Nucleic Acid'
      ],
      answer: 'Deoxyribonucleic Acid'
    },
    {
      question: 'Which device is used to measure temperature?',
      options: ['Barometer', 'Thermometer', 'Speedometer', 'Altimeter'],
      answer: 'Thermometer'
    },
    {
      question: 'Which planet is famous for its prominent rings?',
      options: ['Mars', 'Saturn', 'Venus', 'Mercury'],
      answer: 'Saturn'
    },
    {
      question: 'What is the basic unit of life?',
      options: ['Atom', 'Cell', 'Tissue', 'Organ'],
      answer: 'Cell'
    },
    {
      question: 'Which technology enables devices to connect wirelessly over short distances?',
      options: ['Bluetooth', 'HTML', 'SQL', 'Ethernet'],
      answer: 'Bluetooth'
    }
  ];

  // =========================================================
  // CURRENT QUESTIONS
  // =========================================================

  questions = this.programmingQuestions;

  // =========================================================
  // SELECT CATEGORY
  // =========================================================

  selectCategory(category: string) {

    // Save selected category
    this.selectedCategory = category;

    // IMPORTANT:
    // Selecting a category does NOT start the quiz.
    this.quizStarted = false;
    this.quizFinished = false;
    this.timeUp = false;

    // Stop any previous timer
    clearInterval(this.timer);

    // Reset timer display
    this.timeLeft.set(30);

    // Select the correct question set
    if (category === '💻 Programming') {

      this.questions = this.programmingQuestions;

    } else if (category === '🤖 Artificial Intelligence') {

      this.questions = this.artificialIntelligenceQuestions;

    } else if (category === '🌐 Web Development') {

      this.questions = this.webDevelopmentQuestions;

    } else if (category === '🧠 General Knowledge') {

      this.questions = this.generalKnowledgeQuestions;

    } else if (category === '🔬 Science & Technology') {

      this.questions = this.scienceTechnologyQuestions;
    }

    // Reset question and score
    this.currentQuestion = 0;
    this.score = 0;
  }

  // =========================================================
  // START BATTLE
  // =========================================================

  startQuiz() {

    // Do nothing if category isn't selected
    if (!this.selectedCategory) {
      return;
    }

    // Stop any existing timer
    clearInterval(this.timer);

    // Reset quiz
    this.currentQuestion = 0;
    this.score = 0;

    this.quizFinished = false;
    this.timeUp = false;

    // Start quiz
    this.quizStarted = true;

    // Reset timer
    this.timeLeft.set(30);

    // Start countdown
    this.startTimer();
  }

  // =========================================================
  // TIMER
  // =========================================================

  startTimer() {

    clearInterval(this.timer);

    this.timer = setInterval(() => {

      this.timeLeft.update(time => {

        // Time is over
        if (time <= 1) {

          clearInterval(this.timer);

          this.timeUp = true;
          this.quizFinished = true;
          this.quizStarted = false;

          return 0;
        }

        return time - 1;
      });

    }, 1000);
  }

  // =========================================================
  // SELECT ANSWER
  // =========================================================

  selectAnswer(option: string) {

    // Prevent answering when quiz isn't active
    if (!this.quizStarted || this.quizFinished) {
      return;
    }

    // Check answer internally
    // We DO NOT show correct/wrong feedback to the user.
    if (option === this.questions[this.currentQuestion].answer) {
      this.score++;
    }

    // Move to next question
    this.nextQuestion();
  }

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  nextQuestion() {

    if (this.currentQuestion < this.questions.length - 1) {

      this.currentQuestion++;

    } else {

      // Quiz completed
      clearInterval(this.timer);

      this.quizFinished = true;
      this.quizStarted = false;
      this.timeUp = false;
    }
  }

  // =========================================================
  // PLAY AGAIN
  // =========================================================

  restartQuiz() {

    clearInterval(this.timer);

    this.currentQuestion = 0;
    this.score = 0;

    this.quizFinished = false;
    this.timeUp = false;
    this.quizStarted = true;

    this.timeLeft.set(30);

    this.startTimer();
  }

  // =========================================================
  // CHANGE CATEGORY
  // =========================================================

  changeCategory() {

    clearInterval(this.timer);

    this.selectedCategory = '';

    this.currentQuestion = 0;
    this.score = 0;

    this.quizStarted = false;
    this.quizFinished = false;
    this.timeUp = false;

    this.timeLeft.set(30);

    this.questions = this.programmingQuestions;
  }

  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy() {

    clearInterval(this.timer);

  }

}