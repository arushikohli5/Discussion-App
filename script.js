var DATA=[];
var showfav=false;

//forms
const questionForm=document.getElementById('question');
const responseForm=document.getElementById('responseFornm');

//buttons
const newQuesBtn=document.getElementById('new-ques');
const reolveBtn=document.getElementById('resolve');
const responseBtn=document.getElementById('response-submit');
const submitBtn=document.getElementById('ques-submit');
const responseSubmitbtn=document.getElementById('response-submit')

const welcome=document.getElementById('welcome');
const query=document.getElementById('query');
const noMatchFound=document.getElementById('no-match-found');
const response=document.getElementById('response');
const quesInfo=document.getElementById('question-info');
const index=document.getElementById('pos');
const quesList=document.getElementsByTagName('ul')[0];


newQuesBtn.addEventListener('click',()=>{
    response.classList.add('d-none');
    welcome.classList.remove('d-none');
});

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let ques=questionForm.ques.value;
    let sub=questionForm.subject.value;
    questionForm.ques.value='';
    questionForm.subject.value='';
    DATA.push({ques, subj, quesHighlight: [], subjHighLight: [], response: []});
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderQuestionList(DATA);
})
setup();

function setup(){
    if(localStorage.getItem('DATA')){
        DATA=JSON.parse(localStorage.getItem('DATA'));
    }

    renderQuestionList(DATA);
    response.classList.add('d-none');
    welcome.classList.remove('d-none');

}

function renderQuestionList(questions,isQueryList=false){
    if(query.value.trim()!==''){
        isQueryList=true;
    }

    questions.forEach((obj,pos)=>{
        if(quesList&&obj.quesHighlight.length===0&&obj.subHighlight.length===0){}
        else{
            let div=createBox(obj.sub,obj.ques,isQueryList,obj.subHighlight,obj.quesHighlight);
            let iconBar=document.createElement('div');
            iconBar.setAttribute('class','mr-2 ml-auto d-flex justufy-content-end');
            div.appendChild(iconBar);

            let li=document.createElement('li');
            li.appendChild('div');
            li.addEventListener('click',()=>displayResponseArea(pos));
            quesList.appendChild(li);
        }
    });
}

function createBox(title,subtitle,isQueryList=false,titleHighlight=[],subtitleHighlight=[]){
    let h5=document.createElement('h5');
    h5.setAttribute('class','mb-1');
    
    if(!isQueryList){
        let header=document.createTextNode(title);
        h5.appendChild(header);
    }
    else{
        generateHighlight(h5,title,titleHighlight);
    }
    
    let p=document.createElement('p');
    p.setAttribute('class', 'text-secondary mb-1');

    if(!isQueryList){
        let a=document.createTextNode(subtitle);
        p.appendChild(a);
    }
    else{
        generateHighlight(p,subtitle,subtitleHighlight);
    }

    let div=document.createElement('div');
    div.setAttribute('class','py-1 pl-1 boder-bottom');
    div.appendChild(h5);
    div.appendChild(p);

    return div;
}
