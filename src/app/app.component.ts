import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  gmatFrm: any;
  isSubmitted = false;
  currentVal: any;
  totalCurrentScore: number;
  totalTargetScore: number;
  progressBarWidth: number = 0;
  qprogressBarWidth: number = 0;
  vprogressBarWidth: number = 0;

  progressbarTotalScore:any = {
    totcurrent: 0,
    tottarget: 0,
    totcurrentwidth: 0,
    tottargetwidth: 0,
    totwidthdiffinpx: 0,
    totdiff: 0,
    message: ''
  };

  progressbarQuantAndVarbal:any = {
    quantcurrentwidth: 0,
    quanttargetwidth: 0,
    quantwidthdiffinpx: 0,
    quantcurrentscore: 0,
    quanttargetscore: 0,
    quanttotdiff: 0,
    quantmessage: '',
    verbalcurrentwidth: 0,
    verbaltargetwidth: 0,
    verbalwidthdiffinpx: 0,
    verbalcurrentscore: 0,
    verbaltargetscore: 0,
    verbaltotdiff: 0,
    verbalmessage: ''
  };

  validation_messages = {
    'fieldname': [
      { type: 'required', message: 'Enter a value' },
      { type: 'pattern', message: 'Enter a valid number' },
      { type: 'min', message: 'Enter a value more or equal to 1' },
      { type: 'max', message: 'Enter a value less or equal to 60' }
    ]
  }

  constructor(){}

  ngOnInit() {
    this.gmatFrm = new FormGroup({
      quant_current: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(60)]),
      quant_target: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(60)]),
      verbal_current: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(60)]),
      verbal_target: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(60)])
    });
  }

  progressWidth(getProgressBarWidth: number) {
    this.progressBarWidth = getProgressBarWidth;
  }

  qprogressWidth(getqProgressBarWidth: number) {
    this.qprogressBarWidth = getqProgressBarWidth;
  }

  vprogressWidth(getvProgressBarWidth: number) {
    this.vprogressBarWidth = getvProgressBarWidth;
  }

  submitform(){
    this.isSubmitted = true;
    this.calculatedata();
    return true;
  }
  
  calculatedata(){
    if(this.isSubmitted){
      this.currentVal = this.gmatFrm.value;
      this.totalCurrentScore = 200 + (Number(this.currentVal.verbal_current) + Number(this.currentVal.quant_current))*5;
      this.totalTargetScore = 200 + (Number(this.currentVal.verbal_target) + Number(this.currentVal.quant_target))*5;

      setTimeout(() => { 
        let totalwidthdiff = Math.floor(Number(((this.totalTargetScore - this.totalCurrentScore)*this.progressBarWidth)/800));
        let quantwidthdiff = Math.floor(Number(((this.currentVal.quant_target - this.currentVal.quant_current)*this.qprogressBarWidth)/60));
        let verbalwidthdiff = Math.floor(Number(((this.currentVal.verbal_target - this.currentVal.verbal_current)*this.vprogressBarWidth)/60));
        
        let targetString = this.getmessagefortot(this.totalTargetScore, this.totalCurrentScore, totalwidthdiff);
        let quantmsg = this.getmessage('quantitative', 'quant', this.currentVal);
        let verbalmsg = this.getmessage('verbal', 'verbal', this.currentVal);

        this.progressbarTotalScore.totcurrent = this.totalCurrentScore;
        this.progressbarTotalScore.tottarget = this.totalTargetScore;      this.progressbarTotalScore.totcurrentwidth = Math.floor((100*this.totalCurrentScore) / 800);
        this.progressbarTotalScore.tottargetwidth = Math.floor((100*this.totalTargetScore) / 800);
        this.progressbarTotalScore.totwidthdiffinpx = totalwidthdiff;
        this.progressbarTotalScore.totdiff = (this.totalTargetScore - this.totalCurrentScore);
        this.progressbarTotalScore.message = targetString;
        
        this.progressbarQuantAndVarbal.quantcurrentwidth = ((100*this.currentVal.quant_current) / 60).toFixed(2);
        this.progressbarQuantAndVarbal.quanttargetwidth = ((100*this.currentVal.quant_target) / 60).toFixed(2);
        this.progressbarQuantAndVarbal.quantwidthdiffinpx = quantwidthdiff;
        this.progressbarQuantAndVarbal.quantcurrentscore= this.currentVal.quant_current;
        this.progressbarQuantAndVarbal.quanttargetscore= this.currentVal.quant_target;
        this.progressbarQuantAndVarbal.quanttotdiff = (this.currentVal.quant_target - this.currentVal.quant_current);
        this.progressbarQuantAndVarbal.quantmessage = quantmsg;
        this.progressbarQuantAndVarbal.verbalcurrentwidth = ((100*this.currentVal.verbal_current) / 60).toFixed(2);
        this.progressbarQuantAndVarbal.verbaltargetwidth = ((100*this.currentVal.verbal_target) / 60).toFixed(2);
        this.progressbarQuantAndVarbal.verbalwidthdiffinpx = verbalwidthdiff;
        this.progressbarQuantAndVarbal.verbalcurrentscore= this.currentVal.verbal_current;
        this.progressbarQuantAndVarbal.verbaltargetscore= this.currentVal.verbal_target;
        this.progressbarQuantAndVarbal.verbaltotdiff = (this.currentVal.verbal_target - this.currentVal.verbal_current);
        this.progressbarQuantAndVarbal.verbalmessage = verbalmsg;

      }, 300);
    }
  }

  getmessage(name, key, data){
    return (data[key+'_target']-data[key+'_current'])>0 ? `Your estimated ${name} score per your performance in this mock test is Q${data[key+'_current']}, which is ${data[key+'_target']-data[key+'_current']} points lower than your target ${name} score of Q${data[key+'_target']}.` : (data[key+'_target']==data[key+'_current']) ? `Your estimated total score per your performance in this mock test is Q${data[key+'_current']}, which is equal to your target ${name} score. ` : (data[key+'_current']-data[key+'_target'])>0 ? `Your estimated total score per your performance in this mock test is Q${data[key+'_current']}, which is ${data[key+'_current']-data[key+'_target']} points higher than your target ${name} score of Q${data[key+'_target']}.` : '';
  }

  getmessagefortot(totalTargetScore, totalCurrentScore, totalwidthdiff){
    return (totalTargetScore - totalCurrentScore) > 0 && totalwidthdiff > 50 ? `Your estimated GMAT score per your performance in this mock test is ${totalCurrentScore}, which is ${totalTargetScore - totalCurrentScore} points lower than your target GMAT score of ${totalTargetScore}.` : (totalTargetScore - totalCurrentScore) > 0 && totalwidthdiff <= 50 ? `Your estimated total score per your performance in this mock test is ${totalCurrentScore}, which is ${totalTargetScore - totalCurrentScore} points higher than your target score of ${totalTargetScore}` : (totalTargetScore==totalCurrentScore) ? `Your estimated total score per your performance in this mock test is ${totalTargetScore} which is equal to your target score.` : (totalCurrentScore - totalTargetScore) > 0 ? `Your estimated total score per your performance in this mock test is ${totalCurrentScore}, which is ${totalCurrentScore - totalTargetScore} ponts higher than your target score of ${totalTargetScore}` : ''
  }
}
