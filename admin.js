<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>TS Dollar Exchange Admin</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">

<style>

body{
    background:#071826;
    font-family:Poppins,Arial;
}

.admin-box{
    max-width:600px;
    margin:40px auto;
    background:white;
    padding:30px;
    border-radius:20px;
    box-shadow:0 10px 40px rgba(0,0,0,.3);
}

h2{
    text-align:center;
    color:#0d6efd;
    margin-bottom:30px;
}

input,select{
    height:50px;
    margin-bottom:15px;
}

.btn-save{
    width:100%;
    height:50px;
    font-size:18px;
}

</style>

</head>


<body>


<div class="admin-box">

<h2>
TS Dollar Exchange
<br>
Admin Panel
</h2>


<h5>Update Exchange Rate</h5>


<select id="wallet" class="form-select">

<option value="payoneer">Payoneer USD</option>

<option value="wise">Wise USD</option>

<option value="usdt">USDT</option>

<option value="skrill">Skrill</option>

</select>


<input 
id="buyRate"
class="form-control"
type="number"
placeholder="Buy Rate">


<input 
id="sellRate"
class="form-control"
type="number"
placeholder="Sell Rate">



<button 
class="btn btn-primary btn-save"
onclick="saveRate()">

Save Rate

</button>


<p id="message" class="text-center mt-3"></p>


</div>



<script type="module" src="admin.js"></script>


</body>

</html>
