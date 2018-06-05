import React,{ Component} from 'react';


var firebase=require('firebase');
var uuid=require('uuid');


var config = {
   apiKey: "AIzaSyDjMtYmH2m5EQvrOukDjJX2KNZDXrv2r3A",
   authDomain: "survey-b84cf.firebaseapp.com",
   databaseURL: "https://survey-b84cf.firebaseio.com",
   projectId: "survey-b84cf",
   storageBucket: "survey-b84cf.appspot.com",
   messagingSenderId: "563167556242"
 };
 firebase.initializeApp(config);


class Survey extends Component {

answerSelected(event){
  var answers = this.state.answers;
  if(event.target.name === 'answer1'){
    answers.answer1=event.target.value;
  }else if(event.target.name === 'answer2'){
    answers.answer2=event.target.value;
  } else if(event.target.name === 'answer3'){
    answers.answer3=event.target.value;
  }

  this.setState({answers:answers},function () {
    console.log(this.state);
  });
}


questionSubmit(){
  firebase.database().ref('survey/'+this.state.uid).set({
  studentName:this.state.studentName,
  answers:this.state.answers
});

this.setState({isSubmitted:true});
}


nameSubmit(event){
  var studentName=this.refs.name.value;
  this.setState({studentName:studentName},function(){
    console.log(this.state);
  });

}


constructor(props){
  super(props);

  this.state = {
    uid:uuid.v1(),
    studentName:'',
    answers:{
      answer1:'',
      answer2:'',
      answer3:''
    },
    isSubmitted:false
  };
  this.nameSubmit=this.nameSubmit.bind(this);
  this.answerSelected=this.answerSelected.bind(this);
  this.questionSubmit=this.questionSubmit.bind(this);
}

  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div className="card bg-info text-white">
        <h1>Hey student, let us know your name:</h1>
        <form onSubmit={this.nameSubmit}>
          <input type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>;
      questions=''
    }else if(this.state.studentName !== '' && this.state.isSubmitted === false ){
      studentName=<h2>welcome to servey,{this.state.studentName}</h2>;
      questions =<div>
        <h2>questions</h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card bg-info text-white">
            <label>what kind of course you like the most</label>
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
          </div>
          <div className="card bg-warning text-white">
            <label>You are a:</label>
            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />Student
            <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} />in-job
            <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected} />looking-job
  </div>
  <div className="card bg-danger text-white">
            <label>Is online course is helpful</label>
            <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} />Yes
            <input type="radio" name="answer3" value="No" onChange={this.answerSelected} />No
            <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected} />Maybe
          </div>
          <input className="btn-info" type="submit" value="submit" />
        </form>
      </div>;
    }else if(this.state.isSubmitted === true){
      studentName=<h3>Thanks {this.state.studentName}</h3>;
    }
        return(
      <div className="col-lg-5">
        {studentName}
        ------------------------------
        {questions}
      </div>
    );
  }
}

export default Survey;
