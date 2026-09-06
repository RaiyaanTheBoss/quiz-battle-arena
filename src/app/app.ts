import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  currentQuestion = 0;
  score = 0;
  quizFinished = false;
  timeUp = false;

  // Timer
  timeLeft = signal(30);

  private timer: any;

  questions = [

    {
      question: 'Which programming language is known for its simplicity and readability?',
      options: ['Java', 'Python', 'C++', 'JavaScript'],
      answer: 'Python'
    },

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
      question: 'What does AI stand for?',
      options: [
        'Automated Internet',
        'Artificial Intelligence',
        'Advanced Information',
        'Automated Intelligence'
      ],
      answer: 'Artificial Intelligence'
    },

    {
      question: 'Which database is commonly used with the MERN stack?',
      options: ['MySQL', 'MongoDB', 'Oracle', 'PostgreSQL'],
      answer: 'MongoDB'
    },

    {
      question: 'Which technology is used to build the frontend of our project?',
      options: ['Angular', 'Express.js', 'MongoDB', 'Node.js'],
      answer: 'Angular'
    },

    {
      question: 'Which runtime environment allows JavaScript to run on the server?',
      options: ['Angular', 'Node.js', 'HTML', 'CSS'],
      answer: 'Node.js'
    },

    {
      question: 'What does API stand for?',
      options: [
        'Application Programming Interface',
        'Advanced Programming Internet',
        'Application Process Integration',
        'Automated Program Interface'
      ],
      answer: 'Application Programming Interface'
    },

    {
      question: 'Which technology will we use for real-time multiplayer communication?',
      options: ['Socket.IO', 'Bootstrap', 'Git', 'Webpack'],
      answer: 'Socket.IO'
    }

  ];

  ngOnInit() {
    this.startTimer();
  }

  // Start the 30-second battle timer
 startTimer() {
  this.timer = setInterval(() => {

    this.timeLeft.update(time => {

      if (time <= 1) {
        clearInterval(this.timer);

        this.timeUp = true;
        this.quizFinished = true;

        return 0;
      }

      return time - 1;
    });

  }, 1000);
}

  // Select an answer
  selectAnswer(option: string) {

    if (this.quizFinished) {
      return;
    }

    if (option === this.questions[this.currentQuestion].answer) {
      this.score++;
    }

    this.nextQuestion();
  }

  // Move to the next question
  nextQuestion() {

    if (this.currentQuestion < this.questions.length - 1) {

      this.currentQuestion++;

    } else {

      clearInterval(this.timer);
      this.quizFinished = true;

    }
  }

  // Restart the quiz
  restartQuiz() {

    clearInterval(this.timer);

    this.currentQuestion = 0;
    this.score = 0;
    this.quizFinished = false;
    this.timeUp = false;

    this.timeLeft.set(30);

    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}