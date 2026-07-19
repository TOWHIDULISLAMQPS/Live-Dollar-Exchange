function calculate(){

let usd=document.getElementById("usd").value;

let rate=122;

let total=usd*rate;

document.getElementById("result").innerHTML=
usd+" USD = "+total.toFixed(2)+" BDT";

}
